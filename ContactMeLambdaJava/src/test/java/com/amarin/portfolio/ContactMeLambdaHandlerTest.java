package com.amarin.portfolio;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import static com.amarin.portfolio.ContactMeLambdaConstants.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyString;
import static org.hamcrest.core.IsNot.not;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ContactMeLambdaHandlerTest {
    private JSONParser parser = new JSONParser();

    @Test
    public void checkGetProperty() {
        assertNotNull("RESPONSE_MSG_OK can not be null", getProperty(RESPONSE_MSG_OK));
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

    @Test
    public void checkApiGatewayEventStructure() {
        // According to... https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
        try (InputStream is = getClass().getResourceAsStream("/ApiGatewayEvent.json")) {

            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            JSONObject event = (JSONObject) parser.parse(reader);
            assertNotNull("ApiGatewayEvent can not be null", event);
            assertThat("ApiGatewayEvent can not be empty", event.toString(), not(isEmptyString()));

            assertNotNull("JSON_HTTP_METHOD can not be null", event.get(JSON_HTTP_METHOD));
            String httpMethod = (String) event.get(JSON_HTTP_METHOD);
            assertThat("JSON_HTTP_METHOD can not be empty", httpMethod, not(isEmptyString()));
            assertEquals("JSON_HTTP_METHOD must be POST", "POST", httpMethod);

            assertNotNull("JSON_HEADERS can not be null", event.get(JSON_HEADERS));
            JSONObject headers = (JSONObject) event.get(JSON_HEADERS);
            assertThat("JSON_HEADERS can not be empty", headers.toString(), not(isEmptyString()));

            assertNotNull("JSON_ACCESS_CONTROL_ALLOW_ORIGIN can not be null", headers.get(JSON_HEADER_KEY_ACCESS_CONTROL_ALLOW_ORIGIN));
            String origin = (String) headers.get(JSON_HEADER_KEY_ACCESS_CONTROL_ALLOW_ORIGIN);
            assertThat("JSON_HEADER_KEY_ACCESS_CONTROL_ALLOW_ORIGIN can not be empty", origin, not(isEmptyString()));

            assertNotNull("JSON_BODY can not be null", event.get(JSON_BODY));
            JSONObject body = (JSONObject) parser.parse((String) event.get(JSON_BODY));
            assertThat("JSON_BODY can not be empty", body.toString(), not(isEmptyString()));

            assertNotNull("JSON_CONTACT_NAME can not be null", body.get(JSON_CONTACT_NAME));
            String contactName = (String) body.get(JSON_CONTACT_NAME);
            assertThat("JSON_CONTACT_NAME can not be empty", contactName, not(isEmptyString()));

            assertNotNull("JSON_CONTACT_EMAIL can not be null", body.get(JSON_CONTACT_EMAIL));
            String contactEmail = (String) body.get(JSON_CONTACT_EMAIL);
            assertThat("JSON_CONTACT_EMAIL can not be empty", contactEmail, not(isEmptyString()));

            assertNotNull("JSON_CONTACT_SUBJECT can not be null", body.get(JSON_CONTACT_SUBJECT));
            String contactSubject = (String) body.get(JSON_CONTACT_SUBJECT);
            assertThat("JSON_CONTACT_SUBJECT can not be empty", contactSubject, not(isEmptyString()));

            assertNotNull("JSON_CONTACT_MESSAGE can not be null", body.get(JSON_CONTACT_MESSAGE));
            String contactMessage = (String) body.get(JSON_CONTACT_MESSAGE);
            assertThat("JSON_CONTACT_MESSAGE can not be empty", contactMessage, not(isEmptyString()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
