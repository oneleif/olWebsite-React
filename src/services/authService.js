import { post, get } from './httpService';
import * as endpoints from '../constants/rest-constants';

/**
 * Log in user
 * @param {string} username
 * @param {string} password
 * @param {Object} options request parameters
 * @returns {Object} user data
 * @returns {Promise} Rejected Promise on unsuccessful login
 */
async function login(username, password, options = {}) {
  // TODO: set token or cookie; Note that context CANNOT be set
  return await post(endpoints.LOGIN, { username, password }, options);
}

/**
 * Log out user
 * @param {Object} options request parameters
 * @returns {Promise} Rejected Promise on unsuccessful logout
 */
async function logout(options) {
  // TODO: remove token or cookie
  await get(endpoints.LOGOUT, options);
}

/**
 * Register user
 * @param {string} username
 * @param {string} password
 * @param {Object} options request parameters
 * @returns {Promise} Rejected Promise on unsuccessful register
 */
async function register(username, password, options) {
  await post(endpoints.REGISTER, { username, password }, options);
}

export { register, login, logout };
