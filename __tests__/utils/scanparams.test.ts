import { generateScanParams } from '../../src/utils';

describe('Test for generateScanParams utility funcion', () => {

  test('Successfully generates AWS DynamoDB ScanInput with ExpressionAttributeValues', () => {
    const sampleBody = JSON.stringify({
      ':username': 'sample-username',
      ':password': 'sample-password',
    });
    const sample = generateScanParams(sampleBody, true);

    expect(sample.FilterExpression).toBeDefined();
    expect(sample.ExpressionAttributeNames).toBeDefined();
    expect(sample.ExpressionAttributeValues).toEqual(JSON.parse(sampleBody));
  });

  test('Successfully generates AWS DynamoDB ScanInput without ExpressionAttributeValues', () => {
    const sample = generateScanParams();
    expect(sample).toEqual({
      TableName: 'sample-user-db',
    });
  });

  test('Throws Error when body is not in correct JSON format', () => {
    const sampleBody = 'asdf';
    expect(() => {
      generateScanParams(sampleBody, true);
    }).toThrowError();
  });

  test('Throws Error when body is not provided when query is true', () => {
    expect(() => {
      generateScanParams(null, true);
    }).toThrowError();

    expect(() => {
      generateScanParams(undefined, true);
    }).toThrowError();
  });

});
