import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { UserModel } from './models/users';
import { generateResponse, generateScanParams, generateUserParams } from './utils';

export const create: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  new UserModel(event.body).save(callback);
};

export const retrieve: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  new UserModel(event.body).findOne(callback);
};

export const retrieveAll: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  new UserModel(event.body).findAll(callback);
};

export const update: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  new UserModel(event.body).findAndUpdate(callback);
};

export const remove: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  new UserModel(event.body).findAndDelete(callback);
};
