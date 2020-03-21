import { EMPTY_INPUT, DEFAULT_SCHEMA, ERROR_MESSAGES as Errors } from './constants';

import { validateType, isNumber, isString, isBoolean } from './utils';

export default class Schema {
  #schema = { ...DEFAULT_SCHEMA };

  /**
   * Expect minimum length
   * @param {number} minLength minimum length
   */
  min(minLength) {
    validateSize(minLength);

    this.#schema.minimum = minLength;
    return this;
  }

  /**
   * Expect maximum length
   * @param {number} maxLength maximum length
   */
  max(maxLength) {
    validateSize(maxLength);

    this.#schema.maximum = maxLength;
    return this;
  }

  /**
   * Expect at least one digit
   */
  hasDigit() {
    this.#schema.digit = true;
    return this;
  }

  /**
   * Expect at least one special character
   */
  hasSymbol() {
    this.#schema.symbol = true;
    return this;
  }

  /**
   * Expect at least one uppercase character
   */
  hasUppercase() {
    this.#schema.uppercase = true;
    return this;
  }

  /**
   * Expect at least one lowercase character
   */
  hasLowercase() {
    this.#schema.lowercase = true;
    return this;
  }

  /**
   *
   * @param {string} name label to use for custom errors
   */
  label(name) {
    validateLabel(name);

    this.#schema.label = name;
    return this;
  }

  /**
   * Must be called last to make sure schema is properly configured
   * @returns {object} created schema
   */
  validate() {
    validateSchema(this.#schema);

    return this.#schema;
  }
}

function validateSize(value) {
  validateType(value, isNumber);

  // Validate range
  if (value < 0) {
    throw new RangeError(Errors.INVALID_NUMBER);
  }
}

function validateLabel(value) {
  validateType(value, isString);

  // Empty validation
  if (value === EMPTY_INPUT) {
    throw new Error(Errors.EMPTY_LABEL);
  }
}

/**
 * Determine whether schema is properly configured
 * @param {Object} schema
 */
function validateSchema(schema) {
  const { minimum, maximum } = schema;

  // min greater than max
  if (minimum > maximum) {
    throw new Error(Errors.INVALID_MIN_OVER_MAX);
  }

  const requiredCharacters = getRequiredCharacters(schema);

  // more characters than min/max length
  if (maximum < requiredCharacters || minimum < requiredCharacters) {
    throw new Error(Errors.INVALID_MIN_MAX);
  }
}

/**
 * Get the number of required characters
 * @param {Object} schema
 * @returns number of required characters
 */
function getRequiredCharacters(schema) {
  return Object.values(schema).reduce((acc, current) => {
    if (isBoolean(current) && current) {
      return acc + 1;
    }
    return acc;
  }, 0);
}
