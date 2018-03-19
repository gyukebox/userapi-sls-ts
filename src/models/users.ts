import { Callback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DeleteParameter, InsertionParameter, ScanParameter } from '..';
import { generateResponse, generateScanParams, generateUpdateParams, generateUserParams } from '../utils';

export class UserModel {
  private database: DynamoDB.DocumentClient;
  private tableName: string;
  private reqBody: string;

  constructor(reqBody: string) {
    this.database = new DynamoDB.DocumentClient({
      region: 'ap-northeast-2',
    });
    this.tableName = 'sample-user-db';
    this.reqBody = reqBody;
  }

  public save(callback: Callback) {
    const params = generateUserParams(this.reqBody);

    this.database.put(params, (err, result) => {
      if (err) {
        console.error(`Error during insertion: ${err}`);
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        console.log(`Insertion successful!`);
        callback(null, generateResponse(201, { message: 'Insertion successful!' }));
      }
    });
  }

  public findOne(callback: Callback) {
    const params = generateScanParams(this.reqBody, true);

    this.database.scan(params, (err, result) => {
      if (err) {
        console.error(`Error during querying: ${err}`);
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        console.log('Query successful!');
        callback(null, generateResponse(200, {
          message: 'Scanning single item successful!',
          detail: result,
        }));
      }
    });
  }

  public findAll(callback: Callback) {
    const params = generateScanParams();

    this.database.scan(params, (err, result) => {
      if (err) {
        console.error(`Error during querying: ${err}`);
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        console.log('Query successful!');
        callback(null, generateResponse(200, {
          message: 'Scanning all items successful!',
          detail: result,
        }));
      }
    });
  }

  public findAndUpdate(callback: Callback) {
    const params = generateUpdateParams(JSON.parse(this.reqBody));

    this.database.update(params, (err, result) => {
      if (err) {
        console.error(err);
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        console.log('Update successful!');
        callback(null, generateResponse(200, {
          message: 'Updating user info successful!',
          detail: result,
        }));
      }
    });
  }

  public findAndDelete(callback: Callback) {
    const parsedBody = JSON.parse(this.reqBody);
    const params: DeleteParameter = {
      TableName: this.tableName,
      Key: {
        username: parsedBody.username,
      },
    };

    this.database.delete(params, (err, result) => {
      if (err) {
        console.error(err);
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        console.log('Delete successful!');
        callback(null, generateResponse(204, {
          message: 'Deleting user info successful!',
          detail: result,
        }));
      }
    });
  }
}
