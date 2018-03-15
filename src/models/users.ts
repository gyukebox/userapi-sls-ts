import { Callback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { InsertionParameter, ScanParameter } from '..';
import { generateResponse } from '../utils';

export class UserModel {
  private insertParams: InsertionParameter;
  private scanParams: ScanParameter;
  private database: DynamoDB.DocumentClient;

  constructor(insertParams?: InsertionParameter, scanParams?: ScanParameter) {
    this.insertParams = insertParams;
    this.scanParams = scanParams;
    this.database = new DynamoDB.DocumentClient();
  }

  public save(callback: Callback) {
    this.database.put(this.insertParams, (err, result) => {
      if (err) {
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        callback(null, generateResponse(200, { message: 'Insertion successful!' }));
      }
    });
  }

  public findOne(callback: Callback) {
    this.database.scan(this.scanParams, (err, result) => {
      if (err) {
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        callback(null, generateResponse(200, {
          message: 'Scanning single item successful!',
          detail: result,
        }));
      }
    });
  }

  public findAll(callback: Callback) {
    this.database.scan(this.scanParams, (err, result) => {
      if (err) {
        callback(null, generateResponse(400, {
          message: 'Something went wrong',
          detail: err,
        }));
      } else {
        callback(null, generateResponse(200, {
          message: 'Scanning all items successful!',
          detail: result,
        }));
      }
    });
  }
}
