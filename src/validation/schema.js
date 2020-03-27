import { validateType, isNumber, isString, isBoolean } from './utils';
import { EMPTY_VALUE, DEFAULT_SCHEMA, ERROR_MESSAGES as Errors } from './constants';

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
   * label to use for custom errors
   * @param {string} name
   */
  label(name) {
    validateStringInput(name, Errors.EMPTY_LABEL);

    this.#schema.label = name;
    return this;
  }

  /**
   * Specify whether property should be validated as an email
   */
  isEmail() {
    this.#schema.email = true;
    return this;
  }

  /**
   * Set property to be required
   */
  isRequired() {
    this.#schema.required = true;
    return this;
  }

  /**
   * Set property validation to match that of given property name
   * @param {*} propertyName matching property name
   */
  matches(propertyName) {
    validateStringInput(propertyName, Errors.EMPTY_MATCHING_PROPERTY);
    this.#schema.matchingProperty = propertyName;
    return this;
  }

  /**
   * Must be called last to make sure schema is properly configured
   * @returns {object} created schema
   */
  validate() {
    // voodoo to get new cleared schema if email is set to true
    this.#schema = validateSchema(this.#schema);

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

function validateStringInput(value, message) {
  validateType(value, isString);

  // Empty validation
  if (value === EMPTY_VALUE) {
    throw new Error(message);
  }
}

/**
 * Determine whether schema is properly configured
 * @param {Object} schema
 * @returns new copy of schema reference
 */
function validateSchema(schema) {
  const { email, maximum, minimum, matchingProperty, required } = schema;

  if (email) {
    return { email, required, matchingProperty };
  }

  // min greater than max
  if (minimum > maximum) {
    throw new Error(Errors.INVALID_MIN_OVER_MAX);
  }

  const requiredCharacters = getRequiredCharacters(schema);

  // more characters than min/max length
  if (maximum < requiredCharacters || minimum < requiredCharacters) {
    throw new Error(Errors.INVALID_MIN_MAX);
  }

  return schema;
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
