import { VALIDATION_ERROR_MESSAGES as ValidationMessages } from './constants';

/**
 * This file exports different validation rules, each
 * with its specific pattern and custom error.
 */

// This regex pattern was gotten from: https://www.w3resource.com/javascript/form/email-validation.php
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const EMAIL = {
  pattern: emailPattern,
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
