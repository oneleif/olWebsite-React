import {
  SUCCESS,
  ERROR_EMPTY_EMAIL,
  ERROR_INVALID_EMAIL,
  ERROR_EMPTY_PASSWORD,
  ERROR_EMPTY_REENTERED_PASSWORD,
  ERROR_PASSWORDS_DONT_MATCH
} from '../constants/authentication-constants';

/**
 * Validates passed in email, makes sure input wasn't empty
 * or the string matches an email format
 * @param email
 * @return {String} - SUCCESS or error message
 */
export function validateEmail(email) {
  if (email === '') {
    return ERROR_EMPTY_EMAIL;
  } else if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return SUCCESS;
  } else {
    return ERROR_INVALID_EMAIL;
  }
}

/**
 * Validates passed in password, makes sure input wasn't empty
 * @param password
 * @return {String} - SUCCESS or error message
 */
export function validatePassword(password) {
  if (password === '') {
    return ERROR_EMPTY_PASSWORD;
  } else {
    return SUCCESS;
  }
}

/**
 * Validates passed in passwords, makes sure input wasn't empty
 * and that the passwords match each other
 * @param password
 * @param reenteredPassword
 * @return {String} - SUCCESS or error message
 */
export function validateReenteredPassword(password, reenteredPassword) {
  if (reenteredPassword === '') {
    return ERROR_EMPTY_REENTERED_PASSWORD;
  } else if (password === reenteredPassword) {
    return SUCCESS;
  } else if (password !== '') {
    return ERROR_PASSWORDS_DONT_MATCH;
  }
}
