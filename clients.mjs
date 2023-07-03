import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";

const dynamoDbClient = getDynamoDocumentClientInternal();
const cloudWatchClient = getCloudWatchClientInternal();

function getDynamoDocumentClient() {
    return dynamoDbClient;
}

function getCloudWatchClient() {
    return cloudWatchClient;
}

function getDynamoDocumentClientInternal() {
    const clientConfig = getClientConfiguration();
    console.log("Creating DynamoDB client with config: " + JSON.stringify(clientConfig, null, 2));

    const client = new DynamoDBClient(clientConfig);
    return new DynamoDBDocumentClient(client)
}

function getCloudWatchClientInternal() {
    const clientConfig = getClientConfiguration();
    console.log("Creating CloudWatch client with config: " + JSON.stringify(clientConfig, null, 2));

    return new CloudWatchClient(clientConfig)
}

function getClientConfiguration() {
    if (isLocalEnv()) {
        return {
            region: process.env.localAwsRegion,
            credentials: {
                accessKeyId: process.env.localAccessKeyId,
                secretAccessKey: process.env.localSecretAccessKey
            }
        }
    } else {
        return {
            region: process.env.AWS_REGION
        }
    }
}

function isLocalEnv() {
    return process.env.isLocalEnv === 'true';
}

export const clients = {
    getDynamoDocumentClient,
    getCloudWatchClient
}