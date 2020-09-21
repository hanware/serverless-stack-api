import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'dealerId': Identity Pool identity id of the authenticated user
        // - 'name': path parameter
        Key: {
            dealershipId: event.requestContext.identity.cognitoIdentityId,
            name: event.pathParameters.id
        }
    };

    await dynamoDb.delete(params);

    return { status: true };
});