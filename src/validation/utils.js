import { ERROR_MESSAGES as Errors } from './constants';

/**
 * Throw error when value not expected type
 * @param {*} value
 * @param {function} callback typechecking function
 */
export function validateType(value, callback) {
  if (!callback(value)) {
    throw new TypeError(generateTypeError(callback.name.replace('is', '')));
  }
}

/**
 * Check whether object has no properties
 * @param {object} obj
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && isObject(obj);
}

/**
 * Check whether value is of type boolean
 * @param {*} value
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * Check whether value is of type string
 * @param {*} value
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

/**
 * Check whether value is of type object
 * @param {*} value
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * Check whether value is of type number
 * @param {*} value
 */
export function isNumber(value) {
  return typeof value === 'number' && Number.isInteger(value);
}

/**
 * Generate a custom TypeError error message
 * @param {string} type name of data type
 */
export function generateTypeError(type) {
  return Errors.INVALID_TYPE.replace('TYPE', type);
}
