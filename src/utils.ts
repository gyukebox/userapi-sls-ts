import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import * as uuid from 'uuid/v1';
import { InsertionParameter, LambdaHttpResponse, ScanParameter, UserInfo } from './index';

export function generateUserParams(body: string): InsertionParameter {
  const newUser: UserInfo = JSON.parse(body);
  newUser.uuid = uuid();

  return {
    TableName: 'sample-userdb',
    Item: newUser,
  };
}

export function generateScanParams(body?: string | null, query = false): ScanParameter {
  const parameter: ScanParameter = {
    TableName: 'sample-userdb',
  };

  if (query) {
    parameter.FilterExpression = '#id = :username and #pw = :password';
    parameter.ExpressionAttributeNames = {
      '#id': 'username',
      '#pw': 'password',
    };
    parameter.ExpressionAttributeValues = JSON.parse(body);
  }

  return parameter;
}

export function generateResponse(status: number, body: object): LambdaHttpResponse {
  return {
    statusCode: status,
    body: JSON.stringify(body),
  };
}
