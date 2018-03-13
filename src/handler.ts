import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { Users } from './models/users';
import { generateUserParams } from './utils';

export const create: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const user = new Users(generateUserParams(event.body));
  user.save(callback);
};
