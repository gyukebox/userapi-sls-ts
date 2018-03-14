import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { UserModel } from './models/users';
import { generateResponse, generateScanParams, generateUserParams } from './utils';

export const create: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const user = new UserModel(generateUserParams(event.body));
  user.save(callback);
};

export const retrieve: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const user = new UserModel(null, generateScanParams(event.body, true));
  user.findOne(callback);
};

export const retrieveAll: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const user = new UserModel(null, generateScanParams());
  user.findAll(callback);
};

export const update: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  callback(null, generateResponse(200, JSON.parse(event.body)));
};

export const remove: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  callback(null, generateResponse(200, JSON.parse(event.body)));
};
