import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import homeLogo from '../images/homeLogo.png';
import { register } from '../services/authService.js';
import { ERROR_MISMATCH_PASSWORDS } from '../constants/authentication-constants';
import { Schema, validateProperty, validateForm } from '../validation';

/************************************
 * Constants
 ************************************/

const REQUIRED_PASSWORD_LENGTH = 8;
const CONFIRMED_PASSWORD_SCHEMA = new Schema().validate();
const CONFIRMED_PASSWORD_PROPERTY = 'confirmedPassword';

const EMAIL_SCHEMA = new Schema().isEmail().validate();
const EMAIL_PROPERTY = 'email';

const PASSWORD_PROPERTY = 'password';
const PASSWORD_SCHEMA = new Schema()
  .hasDigit()
  .hasSymbol()
  .hasLowercase()
  .hasUppercase()
  .min(REQUIRED_PASSWORD_LENGTH)
  .validate();

const FORM_SCHEMA = {
  [EMAIL_PROPERTY]: EMAIL_SCHEMA,
  [PASSWORD_PROPERTY]: PASSWORD_SCHEMA,
  [CONFIRMED_PASSWORD_PROPERTY]: CONFIRMED_PASSWORD_SCHEMA
};
const DEFAULT_STATE = { [EMAIL_PROPERTY]: '', [PASSWORD_PROPERTY]: '', [CONFIRMED_PASSWORD_PROPERTY]: '' };
const DEFAULT_ERRORS = {};

function RegisterView() {
  /************************************
   * State
   ************************************/

  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [formErrors, setFormErrors] = useState(DEFAULT_ERRORS);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);

  /************************************
   * Helper Functions
   ************************************/

  async function handleSubmit(event) {
    event.preventDefault();
    const { isValid: formIsValid, errors } = validateForm(formData, FORM_SCHEMA);

    if (formIsValid) {
      try {
        await register(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
        setIsRegistered(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setFormErrors({ ...formErrors, ...errors });
    }
  }

  // TODO: remove properties on schema when email is true
  function handleInputChange(event) {
    const { name: propertyName, value } = event.target;

    setFormData({ ...formData, [propertyName]: value });
    setFormErrors({ ...formErrors, ...validate(propertyName, value) });
  }

  function validate(propertyName, value) {
    const { errors } = validateProperty(value, FORM_SCHEMA[propertyName]);
    const allErrors = { [propertyName]: [...errors] };

    if (propertyName === PASSWORD_PROPERTY) {
      if (value !== formData[CONFIRMED_PASSWORD_PROPERTY] && inputHasBeenTouched(CONFIRMED_PASSWORD_PROPERTY)) {
        allErrors[CONFIRMED_PASSWORD_PROPERTY] = [ERROR_MISMATCH_PASSWORDS];
      }
    }

    if (propertyName === CONFIRMED_PASSWORD_PROPERTY) {
      if (value !== formData[PASSWORD_PROPERTY]) {
        allErrors[CONFIRMED_PASSWORD_PROPERTY] = [ERROR_MISMATCH_PASSWORDS];
      }
    }

    return allErrors;
  }

  function inputHasBeenTouched(property) {
    return Array.isArray(formErrors[property]);
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='authentication-view-body'>
      <div className='authentication-input-container'>
        <img src={homeLogo} alt='oneleif logo' />
        <form onSubmit={handleSubmit} className='form-container'>
          <Input
            name={EMAIL_PROPERTY}
            label='Email'
            className='auth'
            errorMessage={formErrors[EMAIL_PROPERTY]}
            onValueChange={handleInputChange}
          />
          <Input
            type='password'
            name={PASSWORD_PROPERTY}
            label='Password'
            className='auth'
            errorMessage={formErrors[PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={handleInputChange}
          />
          <Input
            type='password'
            name={CONFIRMED_PASSWORD_PROPERTY}
            label='Reenter Password'
            className='auth'
            errorMessage={formErrors[CONFIRMED_PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={handleInputChange}
          />
          <div className='authentication-actions-module'>
            <Link to='/login'>Already have an account?</Link>
            <button type='submit'>Sign up</button>
          </div>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
      {isRegistered && <Redirect to='/login' />}
    </div>
  );
}

export default withRouter(RegisterView);
