import { NO_ERRORS, EMPTY_VALUE, ERROR_MESSAGES as Errors, VALIDATION_ERROR_MESSAGES as Messages } from './constants';
import * as ValidationRules from './rules';
import { isString, isObject, isEmptyObject, isBoolean } from './utils';

const DEFAULT_OPTIONS = { includeLabel: false, abortEarly: false };

/**
 * Validate a form or string value based on corresponding schema
 * @param {*} value string of form to validate
 * @param {Object} schema schema corresponding to value
 * @param {Object} options configuration options
 */
export default function validate(value, schema, options = DEFAULT_OPTIONS) {
  if (!isObject(schema)) {
    throw new TypeError(Errors.INVALID_SCHEMA_TYPE);
  }

  if (isString(value)) {
    return validateProperty(value, schema, options);
  }

  if (isObject(value)) {
    return validateForm(value, schema, options);
  }

  throw new TypeError(Errors.INVALID_VALUE_TYPE);
}

function validateForm(form, schema, options) {
  let formIsValid = true;
  const formErrors = {};

  Object.keys(form).forEach(property => {
    if (!schema.hasOwnProperty(property)) {
      throw new Error(Errors.FORM_SCHEMA_MISMATCH);
    }

    const { isValid, errors } = validate(form[property], schema[property], options);

    if (!isValid) {
      formErrors[property] = [...errors];
      formIsValid = false;
    }
  });

  return { isValid: formIsValid, errors: { ...formErrors } };
}

function validateProperty(value, schema, options) {
  validateSchema(schema);
  const errors = [];

  if (value === EMPTY_VALUE) {
    errors.push(Messages.EMPTY_VALUE);
    return { isValid: false, errors };
  }

  matchPatterns(value, getRules(schema), errors, getLabel(schema, options), options.abortEarly);

  return { isValid: errors.length === NO_ERRORS, errors };
}

/**
 * Check whether schema is an empty object
 * @param {Object} schema
 */
function validateSchema(schema) {
  if (isEmptyObject(schema)) {
    throw new Error(Errors.EMPTY_SCHEMA);
  }
}

/**
 * Generate validation rules from schema
 * @param {Object} schema
 */
function getRules(schema) {
  const rules = [];
  const { minimum, maximum } = schema;

  if (minimum) {
    rules.push(ValidationRules.getMinLengthRule(minimum));
  }

  if (maximum) {
    rules.push(ValidationRules.getMaxLengthRule(maximum));
  }

  // Get 'required' rules
  Object.entries(schema).forEach(rule => {
    if (isRequiredRule(rule[1])) {
      rules.push(ValidationRules[rule[0].toUpperCase()]);
    }
  });

  return rules;
}

/**
 * Return label to pre-append to messages
 * @param {Object} schema
 * @param {Object} options
 */
function getLabel(schema, options) {
  return schema.label && options.includeLabel ? schema.label : null;
}

/**
 * Execute each pattern/rule on given value
 * @param {object} value value to be validated
 * @param {array} rules validation rules to be tested for
 * @param {array} errors validation error messages for failed tests
 * @param {string} label property title to include in custom error message
 */
function matchPatterns(value, rules, errors, label, abortEarly) {
  let rule;
  for (let index = 0; index < rules.length; index++) {
    rule = rules[index];
    if (rule.pattern.test(value) === false) {
      errors.push(label ? `${label} ${rule.error}` : rule.error);
    }

    if (abortEarly) break;
  }
}

/**
 * Check if given rule is a 'required' rule and is true
 * @param {*} rule
 */
function isRequiredRule(rule) {
  // Checking for truthiness is somewhat overkill because
  // required rules should never be set to false anyway
  return isBoolean(rule) && rule;
}
