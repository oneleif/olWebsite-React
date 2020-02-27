const json = 'application/json; charset=utf-8';
const DEFAULT_HEADERS = { 'content-type': json };
const DEFAULT_OPTIONS = {
  headers: DEFAULT_HEADERS,
  credentials: 'same-origin'
};

/**
 * Sets the default headers to be used with each request.
 * This function should be called at the start of the application.
 * @param {*} headers object containing headers
 */
function setDefaultHeaders(headers) {
  Object.assign(DEFAULT_HEADERS, headers);
}

/**
 * Returns a JavaScript object if the response is not empty
 * @param {*} response original http response
 */
function parseJson(response) {
  return response.text().then(text => {
    return text ? JSON.parse(text) : {};
  });
}

/**
 * Returns an error. The reason property indicates a server error,
 * whereas using statusText for the error message indicates a network error
 * @param {*} response original http response
 * @param {*} jsonResponse parsed response
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
 */
async function handleResponse(response) {
  const jsonResponse = await parseJson(response);
  if (!response.ok) {
    return Promise.reject(getError(response, jsonResponse));
  }
  return jsonResponse;
}

/**
 * Sends data to the server using the given http request method
 * @param {String} url api endpoint
 * @param {String} method http request method
 * @param {*} data  data to be sent to the server
 * @param {*} options
 */
async function sendData(url, method, data, options = {}) {
  const params = {
    ...DEFAULT_OPTIONS,
    method,
    body: JSON.stringify(data)
  };

  const response = await fetch(url, Object.assign(params, options));
  return handleResponse(response);
}

/**
 * GET request
 * @param {String} url url endpoint
 * @param {*} options request parameters
 */
async function get(url, options = {}) {
  const params = { ...DEFAULT_OPTIONS, method: 'GET' };
  const response = await fetch(url, Object.assign(params, options));
  return handleResponse(response);
}

/**
 * PATCH request
 * @param {String} url url endpoint
 * @param {*} data data to be sent to the server
 * @param {*} options request parameters
 */
function patch(url, data, options = {}) {
  return sendData(url, 'PATCH', data, options);
}

/**
 * POST request
 * @param {String} url url endpoint
 * @param {*} data data to be sent to the server
 * @param {*} options request parameters
 */
function post(url, data, options = {}) {
  return sendData(url, 'POST', data, options);
}

/**
 * PUT request
 * @param {String} url url endpoint
 * @param {*} data data to be sent to the server
 * @param {*} options request parameters
 */
function put(url, data, options = {}) {
  return sendData(url, 'PUT', data, options);
}

/**
 * DELETE request
 * @param {*} url url endpoint
 * @param {*} options request parameters
 */
async function remove(url, options = {}) {
  const params = { ...DEFAULT_OPTIONS, method: 'DELETE' };
  const response = await fetch(url, Object.assign(params, options));
  return handleResponse(response);
}

export { get, put, post, patch, remove, setDefaultHeaders };
