import { DynamoDB } from 'aws-sdk';
import { database, docClient } from '../config';
import { generateResponse } from '../utils';

export class Users {
  private params: DynamoDB.DocumentClient.PutItemInput;

  constructor(params) {
    this.params = params;
  }

  public save(callback) {
    docClient.put(this.params, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, generateResponse(200, { message: 'Insertion successful!' }));
      }
    });
  }
}
