import { VALIDATION_ERROR_MESSAGES as ValidationMessages } from './constants';

/**
 * This file exports different validation rules, each
 * with it's specific pattern and custom error.
 */

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
