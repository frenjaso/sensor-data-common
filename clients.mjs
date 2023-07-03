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
    const client = new DynamoDBClient(getClientConfiguration());

    return new DynamoDBDocumentClient(client)
}

function getCloudWatchClientInternal() {
    return new CloudWatchClient(getClientConfiguration())
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