import { NO_ERRORS, ERROR_MESSAGES as Errors, VALIDATION_ERROR_MESSAGES as Messages } from './constants';
import { getMatchesRule } from './rules';
import { isString, isObject, isEmptyString } from './utils';

/**
 * The validation configurations.
 * @typedef {Object} ValidationOptions
 * @property {boolean} [includeLabel=false] - Configuration for pre-appending label to the error messages.
 * @property {boolean} [abortEarly=false] - Configuration indicating whether
 *                                          to stop validation at the first invalid rule.
 */

/**
 *  The response from validating a form.
 * @typedef {Object} FormValidationResponse
 * @property {boolean} isValid - Property detailing whether the form validated successfully.
 * @property {Object<string,string[]>} errors - The errors present in the form.
 */

/**
 * The response from validating a single property.
 * @typedef {Object} PropertyValidationResponse
 * @property {boolean} isValid - Property detailing whether the value was validated successfully.
 * @property {string[]} errors - The errors present in the property.
 */

/************************************
 *        Symbolic Constants
 ************************************/
const DEFAULT_OPTIONS = { includeLabel: false, abortEarly: false };

/**
 * Validate a form or string value based on corresponding schema.
 * @param {(string|Object<string,string>)} value - The string or form to validate.
 * @param {Object<string,Function> | Function} schema - The corresponding schema.
 * @param {ValidationOptions} [options] - The validation configurations.
 * @returns {( FormValidationResponse | PropertyValidationResponse)} Object with validation results.
 * @throws {TypeError} When given value is neither an object (form) nor a string (single property).
 */
export default function validate(value, schema, options = DEFAULT_OPTIONS) {
  if (isString(value)) {
    return validateProperty(value, validateSchema(schema), options);
  }

  if (isObject(value)) {
    return validateForm(value, schema, options);
  }

  // Given value is neither a single value nor a form
  throw new TypeError(Errors.INVALID_VALUE_TYPE);
}

/************************************
 *         Helper Functions
 ************************************/

/**
 * Validate entire form based on given schema.
 * @param {Object<string, string>} form - The form to validate.
 * @param {Object<string, Function>} formSchema - The corresponding schema.
 * @param {ValidationOptions} options - The validation configurations.
 * @returns {...FormValidationResponse}
 */
function validateForm(form, formSchema, options) {
  let formIsValid = true;

  const formErrors = {};

  // Check that schema matches form and validate
  let schema, errors, isValid;
  Object.keys(form).forEach(property => {
    // Throw error if property does not have corresponding schema
    schema = formSchema[property];
    if (!schema) {
      throw new Error(Errors.FORM_SCHEMA_MISMATCH);
    }

    // Check if current schema has corresponding property and
    // set current schema to test for matching value
    schema = validateSchema(schema);
    if (schema.matchingProperty) {
      schema = getMatchingSchema(schema, form);
    }

    // Validate properties and set errors
    ({ isValid, errors } = validateProperty(form[property], schema, options));
    if (!isValid) {
      formIsValid = false;
      formErrors[property] = [...errors];
    }
  });

  return { isValid: formIsValid, errors: { ...formErrors } };
}

/**
 * Generate special schema for property that matches to another form property.
 * @param {object} schema - The schema for the current property.
 * @param {Object<string, string>} form - The form to validate.
 * @returns {Object} New schema with the matching property's value as a rule.
 * @throws Error when no matching property is found.
 */
function getMatchingSchema(schema, form) {
  const { matchingProperty } = schema;
  const matchingValue = form[matchingProperty];

  if (!isString(matchingValue)) {
    throw new Error(Errors.NO_MATCHING_PROPERTY.replace('PROPERTY', matchingProperty));
  }

  return {
    ...schema,
    rules: [getMatchesRule(matchingValue, matchingProperty)]
  };
}

/**
 * Validate property value based on given schema.
 * @param {string} value - The value to be validated.
 * @param {object} schema - The corresponding schema.
 * @param {ValidationOptions} options - The validation configurations.
 * @returns {PropertyValidationResponse} An object with validation status and error messages.
 */
function validateProperty(value, schema, options) {
  const errors = [];
  if (!schema.required) {
    return { isValid: true, errors };
  }

  // Return immediately if empty
  if (isEmptyString(value.trim())) {
    errors.push(Messages.REQUIRED);
    return { isValid: false, errors };
  }

  testRules(value, schema, errors, options);
  return { isValid: errors.length === NO_ERRORS, errors };
}

/**
 * Check whether schema is valid.
 * @param {object} schema - The schema to validate.
 * @returns {object} The validated schema.
 * @throws Error when schema is invalid.
 * @throws {TypeError} When schema type is invalid
 */
function validateSchema(schema) {
  try {
    schema = schema.validateSchema();
  } catch (error) {
    if (error.name === TypeError.name) {
      error.message = Errors.INVALID_SCHEMA_TYPE;
    }
    throw error;
  }
  return schema;
}

/**
 * Test value against all the validation rules in the schema.
 * @param {string} value - The value to be validated.
 * @param {object} schema - The schema with the rules to be validated against.
 * @param {string[]} errors - The error messages for failed rules.
 * @param {ValidationOptions} options - The validation configurations.
 * @returns {void} Nothing.
 */
function testRules(value, schema, errors, options) {
  const { rules, label } = schema;
  const { abortEarly, includeLabel } = options;

  // Loop through testing each rule
  let pattern, error;
  for (let index = 0; index < rules.length; index++) {
    ({ pattern, error } = rules[index]);

    // Add label if present and break if abortEarly set to true
    if (pattern.test(value) === false) {
      errors.push(getErrorMessage(label, error, includeLabel));

      if (abortEarly) break;
    }
  }
}

/**
 * Get the appropriate error message.
 * @param {string} label - The label to be pre-appended to the error message.
 * @param {string} errorMessage - The error message.
 * @param {boolean} includeLabel - Check determining whether the label should be included.
 * @returns {string} Error message with label pre-appended if includeLabel is true.
 */
function getErrorMessage(label, errorMessage, includeLabel) {
  return includeLabel && label ? `${label} ${errorMessage}` : errorMessage;
}
