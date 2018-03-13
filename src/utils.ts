import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import * as uuid from 'uuid/v1';
import { LambdaHttpResponse, UserInfo } from './index';

export function generateUserParams(body: string): DynamoDB.DocumentClient.PutItemInput {
  const newUser: UserInfo = JSON.parse(body);
  newUser.uuid = uuid();

  return {
    TableName: 'sample-userdb',
    Item: newUser,
  };
}

export function generateResponse(status: number, body: object): LambdaHttpResponse {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
}
