import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableDealer,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'dealerId': Identity Pool identity id of the authenticated user
        // - 'name': path parameter
        Key: {
            dealership: event.pathParameters.id,
            dealerId: event.pathParameters.dealerid
        }
    };

    await dynamoDb.delete(params);

    return { status: true };
});