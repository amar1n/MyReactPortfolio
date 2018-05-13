package com.amarin.portfolio;

public interface ContactMeLambdaConstants {
    // According to... https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
    public static final String JSON_HTTP_METHOD = "httpMethod";
    public static final String JSON_HEADERS = "headers";
    public static final String JSON_BODY = "body";
    public static final String JSON_HEADER_KEY_ORIGIN = "origin";
    public static final String JSON_HEADER_KEY_ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
    public static final String JSON_HEADER_KEY_CONTENT_TYPE = "Content-Type";
    public static final String JSON_HEADER_VALUE_APP_JSON = "application/json";
    public static final String JSON_CONTACT_NAME = "name";
    public static final String JSON_CONTACT_EMAIL = "email";
    public static final String JSON_CONTACT_SUBJECT = "subject";
    public static final String JSON_CONTACT_MESSAGE = "message";

    public static final String RESPONSE_MSG_OK = "RESPONSE_MSG_OK";
    public static final String RESPONSE_MSG_ERROR_INPUTVALUES = "RESPONSE_MSG_ERROR_INPUTVALUES";
    public static final String RESPONSE_CODE_ERROR_INPUTVALUES = "RESPONSE_CODE_ERROR_INPUTVALUES";
    public static final String RESPONSE_MSG_ERROR_HTTPMETHOD = "RESPONSE_MSG_ERROR_HTTPMETHOD";
    public static final String RESPONSE_CODE_ERROR_HTTPMETHOD = "RESPONSE_CODE_ERROR_HTTPMETHOD";

    public static final String RESPONSE_SUCCESS = "success";
    public static final String RESPONSE_MESSAGE = "message";
    public static final String RESPONSE_IS_BASE_64_ENCODED = "isBase64Encoded";
    public static final String RESPONSE_STATUS_CODE = "statusCode";
    public static final String RESPONSE_HEADERS = "headers";
    public static final String RESPONSE_BODY = "body";
    public static final String RESPONSE_EXCEPTION = "exception";

    public static final String SNS_TITLE = "snsTitle";

    public static final String CONTACT_ME_TOPIC_ARN = "CONTACT_ME_TOPIC_ARN";
    public static final String PORTFOLIO_URL = "PORTFOLIO_URL";
    public static final String LOCALHOST_URL = "LOCALHOST_URL";
}
