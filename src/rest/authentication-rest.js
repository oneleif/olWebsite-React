// TODO- to be removed

import { SUCCESS } from '../constants/authentication-constants';
import { LOGIN_PATH, REGISTER_PATH } from '../constants/rest-constants';

/* Makes REST request to log in user, based on response status will
 * redirect to the landing view or display and error message
 *
 * @param email
 * @param password
 * @returns {String} - SUCCESS if successful or error message
 */
export async function loginUser(email, password) {
  const abortController = new AbortController();
  //TODO: Set up a reverse proxy so the backend/frontend can be reached on same port
  // const url = "http://localhost:8080/api/login"; //will need to use this ran locally
  const response = await fetch(LOGIN_PATH, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password: password }),
    method: 'POST',
    signal: abortController.signal
  });

  setTimeout(() => abortController.abort(), 5000);

  if (response.status >= 200 && response.status < 300) {
    //user registered successfully
    //TODO: store authentication values
    return SUCCESS;
  } else if (response.status === 400) {
    return 'Invalid username or password.';
  } else {
    //TODO: Errors to handle invalid passwords entered
    //handling a 404 or 500 server error
    return 'An error has occurred while logging in.';
  }
}

/* Makes REST request to register user, based on response status will
 * redirect to the landing view or display and error message
 *
 * @param email
 * @param password
 * @returns {String} - SUCCESS if successful or error message
 */
export async function registerUser(email, password) {
  const abortController = new AbortController();
  //TODO: Set up a reverse proxy so the backend/frontend can be reached on same port
  // const url = "http://localhost:8080/api/register";  //will need to use this ran locally
  const response = await fetch(REGISTER_PATH, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: email, password: password }),
    method: 'POST',
    signal: abortController.signal
  });

  setTimeout(() => abortController.abort(), 5000);

  if (response.status >= 200 && response.status < 300) {
    //user registered successfully
    return SUCCESS;
  } else if (response.status === 400) {
    return 'An account already exists for this email address.';
  } else {
    //TODO: Errors to handle invalid passwords entered
    //handling a 404 or 500 server error
    return 'An error has occurred while registering.';
  }
}
