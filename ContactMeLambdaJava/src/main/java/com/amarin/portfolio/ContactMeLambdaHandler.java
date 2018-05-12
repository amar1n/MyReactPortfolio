package com.amarin.portfolio;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Properties;

import static com.amarin.portfolio.ContactMeLambdaConstants.*;

public class ContactMeLambdaHandler {
    private JSONParser parser = new JSONParser();
    private AmazonSNS snsClient;
    JSONObject event = null;
    String origin = null;
    String contactName = null;
    String contactEmail = null;
    String contactSubject = null;
    String contactMessage = null;

    // Handler: com.amarin.portfolio.ContactMeLambdaHandler::handleRequest
    public void handleRequest(InputStream is, OutputStream os, Context context) throws ParseException {
        processEvent(is, os);

        initAWSServices();

        snsPublish();

        answerRequest(os);
    }

    private void processEvent(InputStream is, OutputStream os) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
            event = (JSONObject) parser.parse(reader);

            if (event.get(JSON_HEADERS) != null) {
                JSONObject eventHeaders = (JSONObject) event.get(JSON_HEADERS);
                String eventOrigin = (String) eventHeaders.get(JSON_HEADER_KEY_ORIGIN);
                if (eventOrigin != null &&
                        (eventOrigin.equals(getProperty(PORTFOLIO_URL)) || eventOrigin.equals(getProperty(LOCALHOST_URL)))) {
                    origin = eventOrigin;
                }
            }

            String httpMethod = (String) event.get(JSON_HTTP_METHOD);
            if (httpMethod == null || !httpMethod.equals("POST")) {
                answerWithErrorRequest(getProperty(RESPONSE_MSG_ERROR_HTTPMETHOD), getProperty(RESPONSE_CODE_ERROR_HTTPMETHOD), os);
                throw new IllegalStateException("");
            }

            if (event.get(JSON_BODY) != null) {
                JSONObject body = (JSONObject) parser.parse((String) event.get(JSON_BODY));
                if (body.get(JSON_CONTACT_NAME) != null) {
                    contactName = (String) body.get(JSON_CONTACT_NAME);
                }
                if (body.get(JSON_CONTACT_EMAIL) != null) {
                    contactEmail = (String) body.get(JSON_CONTACT_EMAIL);
                }
                if (body.get(JSON_CONTACT_SUBJECT) != null) {
                    contactSubject = (String) body.get(JSON_CONTACT_SUBJECT);
                }
                if (body.get(JSON_CONTACT_MESSAGE) != null) {
                    contactMessage = (String) body.get(JSON_CONTACT_MESSAGE);
                }
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }

    private void initAWSServices() {
        snsClient = AmazonSNSClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
    }

    private void snsPublish() {
        JSONObject messageJson = new JSONObject();
        messageJson.put(JSON_CONTACT_NAME, contactName);
        messageJson.put(JSON_CONTACT_EMAIL, contactEmail);
        messageJson.put(JSON_CONTACT_SUBJECT, contactSubject);
        messageJson.put(JSON_CONTACT_MESSAGE, contactMessage);

        PublishRequest publishRequest = new PublishRequest(getProperty(TOPIC_ARN), messageJson.toJSONString(), getProperty(SNS_TITLE));
        snsClient.publish(publishRequest);
    }

    private void answerRequest(OutputStream os) throws ParseException {
        JSONObject responseJson = new JSONObject();

        if (contactName != null && !contactName.isEmpty()
                && contactEmail != null && !contactEmail.isEmpty()
                && contactSubject != null && !contactSubject.isEmpty()
                && contactMessage != null && !contactMessage.isEmpty()
                ) {
            responseJson.put(RESPONSE_IS_BASE_64_ENCODED, false);
            responseJson.put(RESPONSE_STATUS_CODE, 200);

            JSONObject responseHeaders = new JSONObject();
            responseHeaders.put(JSON_HEADER_KEY_CONTENT_TYPE, JSON_HEADER_VALUE_APP_JSON);
            if (origin != null) {
                responseHeaders.put(JSON_HEADER_KEY_ACCESS_CONTROL_ALLOW_ORIGIN, origin);
            }
            responseJson.put(RESPONSE_HEADERS, responseHeaders);

            JSONObject responseBody = new JSONObject();
            responseBody.put(RESPONSE_MESSAGE, getProperty(RESPONSE_MSG_OK));
            responseBody.put(RESPONSE_SUCCESS, true);
            responseJson.put(RESPONSE_BODY, responseBody.toString());

            try (OutputStreamWriter writer = new OutputStreamWriter(os, "UTF-8")) {
                writer.write(responseJson.toJSONString());
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            answerWithErrorRequest(getProperty(RESPONSE_MSG_ERROR_INPUTVALUES), getProperty(RESPONSE_CODE_ERROR_INPUTVALUES), os);
        }
    }

    private void answerWithErrorRequest(String error, String code, OutputStream os) throws ParseException {
        JSONObject responseJson = new JSONObject();
        responseJson.put(RESPONSE_STATUS_CODE, code);
        responseJson.put(RESPONSE_EXCEPTION, error);

        try (OutputStreamWriter writer = new OutputStreamWriter(os, "UTF-8")) {
            writer.write(responseJson.toJSONString());
        } catch (Exception e) {
            e.printStackTrace();
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