import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  //const orderDetails = JSON.parse(event.orderJSON);
  const params = {
    TableName: process.env.tableOrders,
    Item: {
      dealerId: data.dealerid, // The id of the author
      orderId: uuid.v1(), // A unique uuid
      content: data.orderJSON, // Parsed from request body
      //attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});