import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableDealer,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'dealershipId': Identity Pool identity id of the authenticated user
    // - 'name': path parameter
    // KeyConditionExpression: "id = :id",
    // FilterExpression: "readAt = :readAt",
    // ExpressionAttributeValues: {
    //   ":dealershipId": parseInt(event.pathParameters.id),
    //   ":readAt": 0,
    // },
    Key: {
      dealership: event.pathParameters.id,
      dealerId: event.pathParameters.dealerid,
    },
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error("Item not found. in table:");
  }

  // Return the retrieved item
  return result.Item;
});
