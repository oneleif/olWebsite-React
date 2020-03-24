import { VALIDATION_ERROR_MESSAGES as Messages } from './constants';

/**
 * This file exports different validation rules, each
 * with its specific pattern and custom error.
 */

// This regex pattern was gotten from: https://www.w3resource.com/javascript/form/email-validation.php
const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

export const EMAIL = {
  pattern: emailPattern,
  error: Messages.EMAIL
};

export const DIGIT = {
  pattern: new RegExp('[0-9]'),
  error: Messages.DIGIT
};

export const SYMBOL = {
  pattern: new RegExp('[!@#$%^&*]'),
  error: Messages.SYMBOL
};

export const LOWERCASE = {
  pattern: new RegExp('[a-z]'),
  error: Messages.LOWERCASE
};

export const UPPERCASE = {
  pattern: new RegExp('[A-Z]'),
  error: Messages.UPPERCASE
};

export function getMinLengthRule(value) {
  return {
    pattern: new RegExp(`^.{${value},}$`),
    error: Messages.MIN_LENGTH.replace('VALUE', `${value}`)
  };
}

export function getMaxLengthRule(value) {
  return {
    pattern: new RegExp(`^.{0,${value}}$`),
    error: Messages.MAX_LENGTH.replace('VALUE', `${value}`)
  };
}
