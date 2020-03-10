import { apiUrl } from '../config.json';
import { post, get } from './httpService';

const loginEndpoint = apiUrl + '/login';
const logoutEndpoint = apiUrl + '/logout';
const registerEndpoint = apiUrl + '/register';

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
  return await post(loginEndpoint, { username, password }, options);
}

/**
 * Log out user
 * @param {Object} options request parameters
 * @returns {Promise} Rejected Promise on unsuccessful logout
 */
async function logout(options) {
  // TODO: remove token or cookie
  await get(logoutEndpoint, options);
}

/**
 * Register user
 * @param {string} username
 * @param {string} password
 * @param {Object} options request parameters
 * @returns {Promise} Rejected Promise on unsuccessful register
 */
async function register(username, password, options) {
  await post(registerEndpoint, { username, password }, options);
}

export { register, login, logout };
