import { apiUrl } from '../../config.json';
import httpService from '../httpService';
import * as authService from '../authService';

jest.mock('../httpService.js', () => {
  return {
    get: jest.fn(),
    post: jest.fn()
  };
});

const EMAIL = 'ABC';
const PASSWORD = 'CDE';
const URL_ENDPOINT = apiUrl + '/login';

describe('Authentication Service', () => {
  test('should send form data to login endpoint when logging in', async () => {
    await authService.login(EMAIL, PASSWORD);

    expect(httpService.post).toHaveBeenCalledWith(URL_ENDPOINT, { password: PASSWORD, username: EMAIL }, {});
  });

  test('should return user information when successful', async () => {
    const expectedValue = { username: EMAIL };
    httpService.post.mockResolvedValueOnce(expectedValue);

    const value = await authService.login(EMAIL, PASSWORD);

    expect(value).toBe(expectedValue);
  });
});
