import { APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

import * as uuid from 'uuid/v1';
import {
  InsertionParameter, LambdaHttpResponse, ScanParameter,
  UpdateParameter, UpdateRequestBody, UserInfo,
} from './index';

export function generateUserParams(body: string): InsertionParameter {
  const newUser: UserInfo = JSON.parse(body);
  newUser.uuid = uuid();

  return {
    TableName: 'sample-user-db',
    Item: newUser,
  };
}

export function generateScanParams(body?: string | null, query = false): ScanParameter {
  const parameter: ScanParameter = {
    TableName: 'sample-user-db',
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

export function generateUpdateParams(body: UpdateRequestBody) {
  const parameter: UpdateParameter = {
    TableName: 'sample-user-db',
    Key: {
      username: body.original.username,
    },
    UpdateExpression: 'set password=:newpw',
    ExpressionAttributeValues: {
      ':newpw': body.new.password,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return parameter;
}

export function generateResponse(statusCode: number, body: object): LambdaHttpResponse {
  return { statusCode, body };
}
