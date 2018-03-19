import { Callback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DeleteParameter, InsertionParameter, ScanParameter } from '..';
import { generateResponse, generateScanParams, generateUpdateParams, generateUserParams } from '../utils';

export class UserModel {
  private _database: DynamoDB.DocumentClient;
  private _tableName: string;
  private _reqBody: string;
  private _region: string;

  constructor(_region: string, _reqBody: string) {
    this._database = new DynamoDB.DocumentClient({ region: _region });
    this._tableName = 'sample-user-db';
    this._reqBody = _reqBody;
  }

  get database(): DynamoDB.DocumentClient {
    return this._database;
  }

  get reqBody(): string {
    return this._reqBody;
  }

  public save(callback: Callback) {
    const params = generateUserParams(this._reqBody);

    this._database.put(params, (err, result) => {
      if (err) {
        console.error(err);
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
    const params = generateScanParams(this._reqBody, true);

    this._database.scan(params, (err, result) => {
      if (err) {
        console.error(err);
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

    this._database.scan(params, (err, result) => {
      if (err) {
        console.error(err);
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
    const params = generateUpdateParams(JSON.parse(this._reqBody));

    this._database.update(params, (err, result) => {
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
    const parsedBody = JSON.parse(this._reqBody);
    const params: DeleteParameter = {
      TableName: this._tableName,
      Key: {
        username: parsedBody.username,
      },
    };

    this._database.delete(params, (err, result) => {
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
