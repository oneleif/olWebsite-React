import { ERROR_MESSAGES as Errors, EMPTY_VALUE, TYPES } from './constants';

/**
 * Check value type.
 * @param {*} value - The value to check.
 * @param {function} callback - The typechecking function.
 * @throws {TypeError} When value is not of the expected type.
 *
 * @example
 * validateType(5, isBoolean); // Error: Value must be of type boolean.
 */
export function validateType(value, callback) {
  if (!callback(value)) {
    throw new TypeError(generateTypeError(callback.name.replace('is', '')));
  }
}

/**
 * Check whether object is empty.
 * @param {object} obj - The object to check;
 * @returns {boolean} Whether value is an empty object.
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && isObject(obj);
}

/**
 * Check whether value is of type boolean.
 * @param {*} value - The value to be checked.
 * @returns {boolean} Whether value is a boolean.
 */
export function isBoolean(value) {
  return typeof value === TYPES.BOOLEAN;
}

/**
 * Check whether value is of type string.
 * @param {*} value - The value to be checked.
 * @returns {boolean} Whether value is a string.
 */
export function isString(value) {
  return typeof value === TYPES.STRING || value instanceof String;
}

/**
 * Check whether string is empty.
 * @param {string} value - The value to be checked.
 * @returns {boolean} Whether value is an empty string.
 */
export function isEmptyString(value) {
  return value === EMPTY_VALUE;
}

/**
 * Check whether value is of type object.
 * @param {*} value - The value to be checked.
 * @returns {boolean} Whether value is an object.
 */
export function isObject(value) {
  return typeof value === TYPES.OBJECT && value !== null;
}

/**
 * Check whether value is of type number.
 * @param {*} value - The value to be checked.
 * @returns {boolean} Whether value is a number.
 */
export function isNumber(value) {
  return typeof value === TYPES.NUMBER && Number.isInteger(value);
}

/**
 * Generate a custom TypeError error message.
 * @param {string} type - The name of data type.
 * @return {string} The custom error message.
 */
export function generateTypeError(type) {
  return Errors.INVALID_TYPE.replace('TYPE', type);
}

/**
 * Capitalize the first letter of a string.
 * @param {string} value - The string to capitalize.
 */
export function capitalize(value) {
  return value[0].toUpperCase() + value.slice(1);
}
