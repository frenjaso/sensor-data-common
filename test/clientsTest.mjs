import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { clients } from "../clients.mjs";

const item = {
    TableName: "TestTable",
    Item: {
        // Specify the attributes of the item
        hashKey: { S: "Hello" },
        sortKey: { S: "Hello Sort" }
    },
};

const command = new PutItemCommand(item);

const dynamoDbClient = clients.getDynamoDocumentClient();

const response = await dynamoDbClient.send(command);

console.log(response);