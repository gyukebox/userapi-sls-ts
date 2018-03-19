import { generateUserParams } from '../../src/utils';

const uuidRegex = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/;

describe('Test for generateUserParams utility function', () => {

  test('Successfully generates AWS DynamoDB PutItemInput with all three informations', () => {
    const sampleBody = JSON.stringify({
      username: 'sample_username',
      password: 'sample_password',
      email: 'sampleemail@gmail.com',
    });
    const result = generateUserParams(sampleBody);

    expect(result.Item.uuid).toBeDefined();
    expect(uuidRegex.test(result.Item.uuid)).toBeTruthy();
  });

  test('Successfully generates AWS DynamoDB PutItemInput with username and password provided', () => {
    const sampleBody = JSON.stringify({
      username: 'sample_username',
      password: 'sample_password',
    });
    const result = generateUserParams(sampleBody);

    expect(result.Item.uuid).toBeDefined();
    expect(result.Item.email).toBeUndefined();
    expect(uuidRegex.test(result.Item.uuid)).toBeTruthy();
  });

  test('Throws Error when body is not in correct JSON format', () => {
    expect(() => {
      generateUserParams('asdf');
    }).toThrowError();
  });

  test('Throws Error when username is not provided', () => {
    const sampleBody = JSON.stringify({
      password: 'sample_password',
    });

    expect(() => {
      generateUserParams(sampleBody);
    }).toThrowError();
  });

  test('Throws Error when password is not provided', () => {
    const sampleBody = JSON.stringify({
      username: 'sample_username',
    });

    expect(() => {
      generateUserParams(sampleBody);
    }).toThrowError();
  });

});
