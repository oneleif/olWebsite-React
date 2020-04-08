export const TYPES = {
  STRING: 'string',
  NUMBER: 'number',
  OBJECT: 'object',
  BOOLEAN: 'boolean'
};

export const ERROR_MESSAGES = {
  EMPTY_LABEL: 'Label cannot be empty',
  EMPTY_SCHEMA: 'Schema must not be an empty object',
  INVALID_TYPE: 'Value must be of type TYPE',
  INVALID_SCHEMA: 'Invalid schema',
  INVALID_NUMBER: 'Length cannot be negative',
  INVALID_VALUE_TYPE: 'Invalid value type',
  INVALID_SCHEMA_TYPE: 'Invalid schema type',
  FORM_SCHEMA_MISMATCH: 'Schema and form do not match',
  NO_MATCHING_PROPERTY: `No PROPERTY property to match`,
  INVALID_MIN_OVER_MAX: 'Minimum length cannot be greater than the maximum',
  EMPTY_PROPERTY: 'PROPERTY cannot be empty',
  EMPTY_MATCHING_PROPERTY: 'Matching property cannot be empty',
  INVALID_MIN_MAX: 'Minimum or maximum length cannot be less than the number of required characters'
};

export const VALIDATION_ERROR_MESSAGES = {
  EMAIL: 'must be a valid email address',
  DIGIT: 'must include at least one digit',
  SYMBOL: 'must include at least one special character',
  REQUIRED: 'must not be empty',
  MATCHING: 'does not match PROPERTY',
  LOWERCASE: 'must include at least one lowercase character',
  UPPERCASE: 'must include at least one uppercase character',
  MIN_LENGTH: 'must be at least VALUE character(s) long',
  MAX_LENGTH: 'cannot be longer than VALUE character(s)'
};

export const SCHEMA = {
  DEFAULT_MIN: 1,
  DEFAULT_MAX: 255
};

export const NO_ERRORS = 0;
export const LABEL_TYPE = TYPES.STRING;
export const EMPTY_VALUE = '';
export const MIN_MAX_TYPE = TYPES.NUMBER;
