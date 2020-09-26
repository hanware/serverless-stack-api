import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableDealer,
        // 'Item' contains the attributes of the item to be created
        // - 'dealershipId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        // - 'name': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current Unix timestamp
        Item: {
            dealership: event.pathParameters.id,
            dealerId: uuid.v1(),
            dealerfirstname: data.dealerfirstname,
            dealerlastname: data.dealerlastname,
            createdAt: Date.now()
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});
