import { VALIDATION_ERROR_MESSAGES as ValidationMessages } from './constants';

/**
 * This file exports different validation rules, each
 * with it's specific pattern and custom error.
 */

// This regex pattern was gotten from: https://html.form.guide/best-practices/validate-email-address-using-javascript.html
const emailRegex = new RegExp(
  /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
);

export const EMAIL = {
  pattern: new RegExp(emailRegex),
  error: ValidationMessages.EMAIL
};

export const DIGIT = {
  pattern: new RegExp('[0-9]'),
  error: ValidationMessages.DIGIT
};

export const SYMBOL = {
  pattern: new RegExp('[!@#$%^&*]'),
  error: ValidationMessages.SYMBOL
};

export const LOWERCASE = {
  pattern: new RegExp('[a-z]'),
  error: ValidationMessages.LOWERCASE
};

export const UPPERCASE = {
  pattern: new RegExp('[A-Z]'),
  error: ValidationMessages.UPPERCASE
};

export function getMinLengthRule(value) {
  return {
    pattern: new RegExp(`^.{${value},}$`),
    error: ValidationMessages.MIN_LENGTH.replace('VALUE', `${value}`)
  };
}

export function getMaxLengthRule(value) {
  return {
    pattern: new RegExp(`^.{0,${value}}$`),
    error: ValidationMessages.MAX_LENGTH.replace('VALUE', `${value}`)
  };
}
