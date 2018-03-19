import { generateUpdateParams } from '../../src/utils';

describe('Test for generateUpdateParams utility function', () => {

  test('Successfully generates AWS DynamoDB UpdateItemInput with valid information provided', () => {
    const body = {
      original: {
        username: 'sample-username',
        password: 'sample-password',
      },
      new: {
        password: 'updated-password',
      },
    };
    const params = generateUpdateParams(body);

    expect(params.Key).toEqual({ username: body.original.username });
    expect(params.ExpressionAttributeValues).toEqual({ ':newpw': body.new.password });
  });

});
