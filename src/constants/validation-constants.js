import { Schema } from '../validation';

const EMAIL_PROPERTY = 'email';
const PASSWORD_PROPERTY = 'password';
const REQUIRED_PASSWORD_LENGTH = 8;
const CONFIRMED_PASSWORD_PROPERTY = 'confirmedPassword';

export const LOGIN_CONSTANTS = {
  EMAIL_PROPERTY,
  PASSWORD_PROPERTY,
  EMAIL_SCHEMA: new Schema().isRequired(),
  PASSWORD_SCHEMA: new Schema().isRequired()
};

export const REGISTER_CONSTANTS = {
  EMAIL_PROPERTY,
  PASSWORD_PROPERTY,
  REQUIRED_PASSWORD_LENGTH,
  CONFIRMED_PASSWORD_PROPERTY,
  EMAIL_SCHEMA: new Schema().isEmail().isRequired(),
  CONFIRMED_PASSWORD_SCHEMA: new Schema().isRequired().matches(PASSWORD_PROPERTY),
  PASSWORD_SCHEMA: new Schema()
    .hasDigit()
    .hasSymbol()
    .isRequired()
    .hasLowercase()
    .hasUppercase()
    .min(REQUIRED_PASSWORD_LENGTH)
};
