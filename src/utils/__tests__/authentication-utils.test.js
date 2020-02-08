import {
  validateEmail,
  validatePassword,
  validateReenteredPassword
} from "../authentication-utils";

import {
  SUCCESS,
  ERROR_EMPTY_EMAIL,
  ERROR_INVALID_EMAIL,
  ERROR_EMPTY_PASSWORD,
  ERROR_EMPTY_REENTERED_PASSWORD,
  ERROR_PASSWORDS_DONT_MATCH
} from "../../constants/authentication-constants";

/************************************
 * Constants
 ************************************/

const EMPTY_VALUE = "";
const INVALID_EMAIL = "test";
const VALID_EMAIL = "test@mail.com";
const VALID_PASSWORD = "Test123!";
const DIFF_PASSWORD = "Test1234!";

describe("Authentication Utilities Tests", function() {
  test("valid email entered, should return successful", () => {
    const validationResponse = validateEmail(VALID_EMAIL);
    expect(validationResponse).toEqual(SUCCESS);
  });

  test("empty email entered, should return empty email response", () => {
    const validationResponse = validateEmail(EMPTY_VALUE);
    expect(validationResponse).toEqual(ERROR_EMPTY_EMAIL);
  });

  test("invalid email entered, should return invalid email response", () => {
    const validationResponse = validateEmail(INVALID_EMAIL);
    expect(validationResponse).toEqual(ERROR_INVALID_EMAIL);
  });

  test("valid password entered, should return successful", () => {
    const validationResponse = validatePassword(VALID_PASSWORD);
    expect(validationResponse).toEqual(SUCCESS);
  });

  test("empty password entered, should return empty password response", () => {
    const validationResponse = validatePassword(EMPTY_VALUE);
    expect(validationResponse).toEqual(ERROR_EMPTY_PASSWORD);
  });

  test("valid password and reentered password entered, should return successful", () => {
    const validationResponse = validateReenteredPassword(
      VALID_PASSWORD,
      VALID_PASSWORD
    );
    expect(validationResponse).toEqual(SUCCESS);
  });

  test("empty reentered password entered, should return empty reentered password response", () => {
    const validationResponse = validateReenteredPassword(
      VALID_PASSWORD,
      EMPTY_VALUE
    );
    expect(validationResponse).toEqual(ERROR_EMPTY_REENTERED_PASSWORD);
  });

  test("different reentered password entered, should return passwords don't match response", () => {
    const validationResponse = validateReenteredPassword(
      VALID_PASSWORD,
      DIFF_PASSWORD
    );
    expect(validationResponse).toEqual(ERROR_PASSWORDS_DONT_MATCH);
  });
});
