import _ from 'lodash';

/**
 * @typedef {Object} CustomError
 * @property {string} message - Error message
 * @property {Response} response - Original http response
 */

const DEFAULT_HEADERS = {};
const DEFAULT_OPTIONS = {
  headers: DEFAULT_HEADERS,
  credentials: 'same-origin'
};

/**
 * Sets the default headers to be used with each request.
 * This function should be called at the start of the application.
 * @param {Object} headers object containing headers
 */
function setDefaultHeaders(headers) {
  Object.assign(DEFAULT_HEADERS, headers);
}

/**
 * Clear default headers
 */
function resetHeaders() {
  for (const key in DEFAULT_HEADERS) {
    delete DEFAULT_HEADERS[key];
  }
}

/**
 * @param {Response} response original http response
 * @returns {Object} Parsed response
 */
function parseJson(response) {
  return response.text().then(text => {
    return text ? JSON.parse(text) : {};
  });
}

/**
 * The reason property indicates a server error, whereas using
 * statusText for the error message indicates a network error
 * @param {Response} response original http response
 * @param {Object} jsonResponse parsed response
 * @returns {CustomError} An error with the original response appended
 */
function getError(response, jsonResponse) {
  const error = new Error(jsonResponse.reason || response.statusText);
  error.response = response;
  return error;
}

/**
 * Rejects whole promise when the status code is not OK.
 * Resolves with parsed JSON data.
 * @param {Response} response
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
async function handleResponse(response) {
  const jsonResponse = await parseJson(response);

  // TODO: It might be a good idea to handle all 500 errors here
  if (!response.ok) {
    return Promise.reject(getError(response, jsonResponse));
  }
  return jsonResponse;
}

/**
 * Sends data to the server using the given http request method
 * @param {string} url api endpoint
 * @param {string} method http request method
 * @param {Object} data  JavaScript data to be sent to the server
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
async function sendData(url, method, data, options = {}) {
  const params = {
    ...DEFAULT_OPTIONS,
    method,
    body: JSON.stringify(data)
  };

  const response = await fetch(url, _.merge(params, options));
  return handleResponse(response);
}

/**
 * GET request
 * @param {string} url url endpoint
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
async function get(url, options = {}) {
  const params = { ...DEFAULT_OPTIONS, method: 'GET' };
  const response = await fetch(url, _.merge(params, options));
  return handleResponse(response);
}

/**
 * PATCH request
 * @param {string} url url endpoint
 * @param {Object} data  JavaScript data to be sent to the server
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
function patch(url, data, options = {}) {
  return sendData(url, 'PATCH', data, options);
}

/**
 * POST request
 * @param {String} url url endpoint
 * @param {Object} data  JavaScript data to be sent to the server
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
function post(url, data, options = {}) {
  return sendData(url, 'POST', data, options);
}

/**
 * PUT request
 * @param {string} url url endpoint
 * @param {Object} data  JavaScript data to be sent to the server
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
function put(url, data, options = {}) {
  return sendData(url, 'PUT', data, options);
}

/**
 * DELETE request
 * @param {string} url url endpoint
 * @param {Object} options request parameters
 * @returns {Object} Parsed data from response
 * @returns {Promise} Rejected Promise when request status is not OK
 */
async function remove(url, options = {}) {
  const params = { ...DEFAULT_OPTIONS, method: 'DELETE' };
  const response = await fetch(url, _.merge(params, options));
  return handleResponse(response);
}

export { get, put, post, patch, remove, resetHeaders, setDefaultHeaders };
