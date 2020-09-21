import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'dealershipId = :dealershipId': only return items with matching 'dealershipId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':dealershipId': defines 'dealershipId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "dealershipId = :dealershipId",
        ExpressionAttributeValues: {
            ":dealershipId": event.requestContext.identity.cognitoIdentityId
        }
    };

    const result = await dynamoDb.query(params);

    // Return the matching list of items in response body
    return result.Items;
});