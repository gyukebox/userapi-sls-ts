import { generateResponse } from '../../src/utils';

describe('Test for generateResponse utility function', () => {

  test('Successfully generates HTTP Response compatible with AWS Lambda', () => {
    const body = { message: 'It works!' };
    const response = generateResponse(200, body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(body));
  });

});
