import { apiUrl } from '../../config.json';
import httpService from '../httpService';
import * as authService from '../authService';

jest.mock('../httpService.js', () => {
  return {
    get: jest.fn(),
    post: jest.fn()
  };
});

const email = 'abc';
const password = 'cde';
const urlEndpoint = apiUrl + '/login';

describe('Authentication Service', () => {
  test('should send form data to login endpoint when logging in', async () => {
    await authService.login(email, password);

    expect(httpService.post).toHaveBeenCalledWith(urlEndpoint, { password, username: email }, {});
  });

  test('should return user information when successful', async () => {
    const expectedValue = { username: email };
    httpService.post.mockResolvedValueOnce(expectedValue);

    const value = await authService.login(email, password);

    expect(value).toBe(expectedValue);
  });
});
