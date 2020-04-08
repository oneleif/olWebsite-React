import { VALIDATION_ERROR_MESSAGES as Messages } from './constants';

/**
 * A rule to be validated against.
 * @typedef ValidationRule
 * @property {RegExp} pattern - The regex pattern.
 * @property {string} error - The corresponding custom error message.
 */

// This regex pattern was gotten from: https://www.w3resource.com/javascript/form/email-validation.php
const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

/**
 * Email rule.
 */
export const EMAIL = {
  pattern: emailPattern,
  error: Messages.EMAIL
};

/**
 * Digit rule.
 */
export const DIGIT = {
  pattern: new RegExp('[0-9]'),
  error: Messages.DIGIT
};

/**
 * Special character rule.
 */
export const SYMBOL = {
  pattern: new RegExp(`[!@#$%^&*(),.?":{}|<>]`),
  error: Messages.SYMBOL
};

/**
 * Lowercase rule.
 */
export const LOWERCASE = {
  pattern: new RegExp('[a-z]'),
  error: Messages.LOWERCASE
};

/**
 * Uppercase rule.
 */
export const UPPERCASE = {
  pattern: new RegExp('[A-Z]'),
  error: Messages.UPPERCASE
};

/**
 * Required property error message.
 */
export const REQUIRED = {
  error: Messages.REQUIRED
};

/**
 * Generate a rule for matching properties.
 * @param {string} value - The matching property's value.
 * @param {string} matchingProperty - The property corresponding to the current one.
 * @returns {ValidationRule} The matching property regex pattern and message.
 */
export function getMatchesRule(value, matchingProperty) {
  return {
    pattern: new RegExp(`^${escape(value)}$`),
    error: Messages.MATCHING.replace('PROPERTY', matchingProperty)
  };
}

/**
 * Generate a rule for minimum number of characters in a string.
 * @param {number} value - The minimum length.
 * @returns {ValidationRule} The minimum length regex pattern and message.
 */
export function getMinLengthRule(value) {
  return {
    pattern: new RegExp(`^.{${value},}$`),
    error: Messages.MIN_LENGTH.replace('VALUE', `${value}`)
  };
}

/**
 * Generate a rule for maximum number of characters in a string.
 * @param {number} value - The maximum length.
 * @returns {ValidationRule} The maximum length regex pattern and message.
 */
export function getMaxLengthRule(value) {
  return {
    pattern: new RegExp(`^.{0,${value}}$`),
    error: Messages.MAX_LENGTH.replace('VALUE', `${value}`)
  };
}

/**
 * Escape a value in regex pattern.
 * @param {string} value - The value to be escaped.
 * @returns {string} The value with escape character.
 */
function escape(value) {
  return value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}
