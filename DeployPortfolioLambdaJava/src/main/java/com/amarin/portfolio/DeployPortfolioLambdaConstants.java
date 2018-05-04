package com.amarin.portfolio;

public interface DeployPortfolioLambdaConstants {
    // According to... https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
    public static final String JSON_JOB = "CodePipeline.job";
    public static final String JSON_ID = "id";
    public static final String JSON_DATA = "data";
    public static final String JSON_INPUT_ARTIFACTS = "inputArtifacts";
    public static final String JSON_NAME = "name";
    public static final String JSON_LOCATION = "location";
    public static final String JSON_S3_LOCATION = "s3Location";
    public static final String JSON_BUCKET_NAME = "bucketName";
    public static final String JSON_OBJECT_KEY = "objectKey";

    public static final String TOPIC_ARN = "topicArn";
    public static final String BUCKET_CODE_BUILD = "bucketCodeBuild";
    public static final String ARTIFACT_CODE_BUILD = "artifactCodeBuild";
    public static final String BUCKET_PORTFOLIO = "bucketPortfolio";
    public static final String SNS_TITLE_OK = "snsTitleOK";
    public static final String SNS_MSG_OK = "snsMsgOK";
    public static final String SNS_TITLE_ERROR = "snsTitleError";
    public static final String SNS_MSG_ERROR = "snsMsgError";
    public static final String CODE_BUILD_ARTIFACT_NAME = "codeBuildArtifactName";
}
