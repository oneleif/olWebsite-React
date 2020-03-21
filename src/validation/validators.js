import { isObject, isString, isBoolean, validateType, isEmptyObject } from './utils';

import { NO_ERRORS, EMPTY_INPUT, ERROR_MESSAGES as Errors, VALIDATION_ERROR_MESSAGES as ValidationMessages } from './constants';

import * as ValidationRules from './rules';

/**
 * @typedef {Object} ValidationResponse
 * @property {boolean} isValid - validation result
 * @property {array} errors - validation errors
 */

/**
 * Validates an array of form elements
 * @param {Object} form all form elements
 * @param {Object} schemas schemas corresponding to each form element
 * @returns {array} validation response
 */
function validateForm(form, schemas) {
  validateParams(form, isObject, Errors.INVALID_FORM);
  validateParams(schemas, isObject, Errors.INVALID_SCHEMA);

  const formErrors = {};
  let formIsValid = true;

  // Check that form property has corresponding schema
  // before validating
  Object.keys(form).forEach(key => {
    if (!schemas.hasOwnProperty(key)) {
      throw new Error(Errors.FORM_SCHEMA_MISMATCH);
    }

    const { isValid, errors } = validateProperty(form[key], schemas[key], schemas[key].label || key);

    if (!isValid) {
      formErrors[key] = [...errors];
      formIsValid = false;
    }
  });

  return { isValid: formIsValid, errors: { ...formErrors } };
}

/**
 * Runs input through list of validation rules on the schema
 * @param {string} input
 * @param {object} schema
 * @returns {ValidationResponse} isValid and errors array
 */
function validateProperty(input, schema, label) {
  const errors = [];

  // Process empty input
  if (input === EMPTY_INPUT) {
    errors.push(ValidationMessages.EMPTY_VALUE);
    return { isValid: false, errors: [...errors] };
  }

  validateParams(input, isString, Errors.INVALID_INPUT);
  validateParams(schema, isObject, Errors.INVALID_SCHEMA);

  try {
    matchPatterns(schema.label || label, input, generateValidationRules(schema), errors);
  } catch (ex) {
    if (ex.name === 'TypeError') {
      ex.message = Errors.INVALID_SCHEMA;
    }
    throw ex;
  }

  return { isValid: errors.length === NO_ERRORS, errors: [...errors] };
}

/**
 * Validate parameters for individual properties
 * @param {object} value property to validate
 * @param {Function} callback typechecking function
 * @param {string} errorMessage error message
 */
function validateParams(value, callback, errorMessage) {
  if (!value || isEmptyObject(value)) {
    throw new Error(errorMessage);
  }

  validateType(value, callback);
}

/**
 * Generate validation rules from schema
 * @param {object} schema
 * @returns {array} rules by which to validate input
 */
function generateValidationRules(schema) {
  const rules = [];
  const { minimum: min, maximum: max } = schema;

  //Map length rules
  if (min) {
    rules.push(ValidationRules.getMinLengthRule(schema.minimum));
  }

  if (max) {
    rules.push(ValidationRules.getMaxLengthRule(schema.maximum));
  }

  //Map 'required' rules
  Object.entries(schema).forEach(rule => {
    if (isBoolean(rule[1]) && rule[1]) {
      rules.push(ValidationRules[rule[0].toUpperCase()]);
    }
  });
  return rules;
}

/**
 * Execute each pattern/rule on given value
 * @param {string} label property title to include in custom error message
 * @param {object} value value to be validated
 * @param {array} rules validation rules to be tested for
 * @param {array} errors validation error messages for failed tests
 */
function matchPatterns(label, value, rules, errors) {
  rules.forEach(rule => {
    if (rule.pattern.test(value) === false) {
      errors.push(label ? `${label} ${rule.error}` : rule.error);
    }
  });
}

export { validateProperty, validateForm };
