import { DynamoDB, SharedIniFileCredentials } from 'aws-sdk';

const configuration: DynamoDB.ClientConfiguration = {
  credentials: new SharedIniFileCredentials({ profile: 'gyukebox' }),
  region: 'ap-northeast-2',
  endpoint: 'dynamodb.ap-northeast-2.amazonaws.com',
};

export const database = new DynamoDB(configuration);
export const docClient = new DynamoDB.DocumentClient(configuration);
