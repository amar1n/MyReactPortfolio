package com.amarin.portfolio;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.codepipeline.AWSCodePipeline;
import com.amazonaws.services.codepipeline.AWSCodePipelineClientBuilder;
import com.amazonaws.services.codepipeline.model.PutJobSuccessResultRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tika.Tika;

import java.io.*;
import java.util.Iterator;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import static com.amarin.portfolio.DeployPortfolioLambdaConstants.*;

// Handler: com.amarin.portfolio.DeployPortfolioLambdaHandler::handleRequest
public class DeployPortfolioLambdaHandler {
    private AWSCodePipeline codePipelineClient;
    private AmazonSNS snsClient;
    private AmazonS3 s3client;

    private String jobId;
    private String bucketCodeBuild;
    private String artifactCodeBuild;

    public void handleRequest(InputStream is, OutputStream os, Context context) throws IOException {
        processEvent(is);

        initAWSServices();

        deployCodeBuildArtifact();

        endCodePipeline();
    }

    private void processEvent(InputStream is) throws IOException {
        bucketCodeBuild = System.getenv(BUCKET_CODE_BUILD);
        artifactCodeBuild = getProperty(ARTIFACT_CODE_BUILD);
        String codeBuildArtifactName = getProperty(CODE_BUILD_ARTIFACT_NAME);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(is);
        JsonNode job = rootNode.path(JSON_JOB);
        if (job.size() > 0) {
            jobId = job.path(JSON_ID).asText();

            JsonNode inputArtifactsNode = job.path(JSON_DATA).path(JSON_INPUT_ARTIFACTS);
            Iterator<JsonNode> inputArtifacts = inputArtifactsNode.elements();
            while (inputArtifacts.hasNext()) {
                JsonNode inputArtifact = inputArtifacts.next();
                if (inputArtifact.path(JSON_NAME).asText().equals(codeBuildArtifactName)) {
                    bucketCodeBuild = inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_BUCKET_NAME).asText();
                    artifactCodeBuild = inputArtifact.path(JSON_LOCATION).path(JSON_S3_LOCATION).path(JSON_OBJECT_KEY).asText();
                }
            }
        }
    }

    private void initAWSServices() {
        codePipelineClient = AWSCodePipelineClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        snsClient = AmazonSNSClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        s3client = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
    }

    private void deployCodeBuildArtifact() throws IOException {
        try (
                ZipInputStream zis = new ZipInputStream(
                        s3client.getObject(bucketCodeBuild, artifactCodeBuild).getObjectContent()) {
                    @Override
                    public void close() throws IOException {
                        // Drain before closing to keep S3 client happy
                        while (getNextEntry() != null) ;
                        while (read() >= 0) ;
                        while (in.read() >= 0) ;
                        super.close();
                    }
                }
        ) {
            String mimeType;
            ByteArrayOutputStream outputStream;
            byte[] buffer = new byte[1024];

            Tika tika = new Tika();

            ZipEntry ze = zis.getNextEntry();
            while (ze != null) {
                String fileName = ze.getName();

                mimeType = tika.detect(fileName);

                outputStream = new ByteArrayOutputStream();
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    outputStream.write(buffer, 0, len);
                }

                ObjectMetadata meta = new ObjectMetadata();
                meta.setContentLength(outputStream.size());
                meta.setContentType(mimeType);
                String bucketPortfolio = System.getenv(BUCKET_PORTFOLIO);
                PutObjectRequest putObjectRequest = new PutObjectRequest(
                        bucketPortfolio,
                        ze.getName(),
                        new ByteArrayInputStream(outputStream.toByteArray()),
                        meta
                ).withCannedAcl(CannedAccessControlList.PublicRead);
                s3client.putObject(putObjectRequest);

                zis.closeEntry();
                ze = zis.getNextEntry();
            }
        } catch (IOException e) {
            e.printStackTrace();
            snsPublish(getProperty(SNS_MSG_ERROR), getProperty(SNS_TITLE_ERROR));
            throw e;
        }

        snsPublish(getProperty(SNS_MSG_OK), getProperty(SNS_TITLE_OK));
    }

    private void snsPublish(String msg, String title) {
        String topicArn = System.getenv(DEPLOYED_TOPIC_ARN);
        PublishRequest publishRequest = new PublishRequest(topicArn, msg, title);
        snsClient.publish(publishRequest);
    }

    private void endCodePipeline() {
        if (jobId != null) {
            PutJobSuccessResultRequest request = new PutJobSuccessResultRequest().withJobId(jobId);
            codePipelineClient.putJobSuccessResult(request);
        }
    }

    private String getProperty(String key) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(getClass().getResourceAsStream("/portfolio.properties")))) {
            Properties properties = new Properties();
            properties.load(reader);
            return properties.getProperty(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}