package com.amarin.portfolio;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.InputStream;
import java.util.Iterator;

import static com.amarin.portfolio.DeployPortfolioLambdaConstants.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyString;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class DeployPortfolioLambdaHandlerTest {
    @Test
    public void checkCodePipelineEventStructure() {
        String codeBuildArtifactName = "ArtifactName";
        boolean bFlag = false;

        // According to... https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
        try (InputStream is = getClass().getResourceAsStream("/CodePipelineEvent.json")) {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode rootNode = objectMapper.readTree(is);

            assertNotNull("CodePipelineEvent can not be null", rootNode);
            assertThat("CodePipelineEvent can not be empty", rootNode.toString(), not(isEmptyString()));

            JsonNode job = rootNode.path(JSON_JOB);
            assertNotNull("JSON_JOB can not be null", job);
            assertTrue("JSON_JOB must exist", job.size() > 0);

            if (job.size() > 0) {
                assertNotNull("JSON_ID can not be null", job.path(JSON_ID));
                assertThat("JSON_ID can not be empty", job.path(JSON_ID).asText(), not(isEmptyString()));
                // String jobId = job.path(JSON_ID).asText();

                assertNotNull("JSON_DATA can not be null", job.path(JSON_DATA));
                assertThat("JSON_DATA can not be empty", job.path(JSON_DATA).toString(), not(isEmptyString()));

                assertNotNull("JSON_INPUT_ARTIFACTS can not be null", job.path(JSON_DATA).path(JSON_INPUT_ARTIFACTS));
                assertThat("JSON_INPUT_ARTIFACTS can not be empty", job.path(JSON_DATA).path(JSON_INPUT_ARTIFACTS).toString(), not(isEmptyString()));
                JsonNode inputArtifactsNode = job.path(JSON_DATA).path(JSON_INPUT_ARTIFACTS);

                Iterator<JsonNode> inputArtifacts = inputArtifactsNode.elements();
                while (inputArtifacts.hasNext()) {
                    JsonNode inputArtifact = inputArtifacts.next();
                    assertNotNull("inputArtifact can not be null", inputArtifact);
                    assertThat("inputArtifact can not be empty", inputArtifact.toString(), not(isEmptyString()));

                    assertNotNull("JSON_NAME can not be null", inputArtifact.path(JSON_NAME));
                    assertThat("JSON_NAME can not be empty", inputArtifact.path(JSON_NAME).asText(), not(isEmptyString()));

                    if (inputArtifact.path(JSON_NAME).asText().equals(codeBuildArtifactName)) {
                        bFlag = true;

                        assertNotNull("JSON_LOCATION can not be null", inputArtifact.path(JSON_LOCATION));
                        assertThat("JSON_LOCATION can not be empty", inputArtifact.path(JSON_LOCATION).toString(), not(isEmptyString()));

                        assertNotNull("JSON_S3_LOCATION can not be null", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION));
                        assertThat("JSON_S3_LOCATION can not be empty", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).toString(), not(isEmptyString()));

                        assertNotNull("JSON_BUCKET_NAME can not be null", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_BUCKET_NAME));
                        assertThat("JSON_BUCKET_NAME can not be empty", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_BUCKET_NAME).asText(), not(isEmptyString()));

                        assertNotNull("JSON_OBJECT_KEY can not be null", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_OBJECT_KEY));
                        assertThat("JSON_OBJECT_KEY can not be empty", inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_OBJECT_KEY).asText(), not(isEmptyString()));

                        // bucketCodeBuild = inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_BUCKET_NAME).asText();
                        // artifactCodeBuild = inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_OBJECT_KEY).asText();
                    }
                }
            }

            assertTrue("Must exist an inputArtifact with the name " + codeBuildArtifactName, bFlag);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}