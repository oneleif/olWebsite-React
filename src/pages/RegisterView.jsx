import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { Schema } from '../validation';
import { register } from '../services/authService.js';
import { ERROR_MISMATCH_PASSWORDS } from '../constants/authentication-constants';

/************************************
 * Constants
 ************************************/

const EMAIL_SCHEMA = new Schema().isEmail().validate();
const EMAIL_PROPERTY = 'email';
const PASSWORD_PROPERTY = 'password';
const REQUIRED_PASSWORD_LENGTH = 8;
const CONFIRMED_PASSWORD_SCHEMA = new Schema().validate();
const CONFIRMED_PASSWORD_PROPERTY = 'confirmedPassword';
const DEFAULT_STATE = { [EMAIL_PROPERTY]: '', [PASSWORD_PROPERTY]: '', [CONFIRMED_PASSWORD_PROPERTY]: '' };
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

function RegisterView() {
  /************************************
   * State
   ************************************/

  const { formData, formErrors, handleSubmit, handleInputChange, submitErrorMessage } = useForm(FORM_SCHEMA, DEFAULT_STATE);
  const [isRegistered, setIsRegistered] = useState(false);

  /************************************
   * Helper Functions
   ************************************/

  async function doSubmit() {
    await register(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
    setIsRegistered(true);
  }

  function validate(propertyName, errors, value) {
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
        <form onSubmit={event => handleSubmit(event, doSubmit)} className='form-container'>
          <Input
            name={EMAIL_PROPERTY}
            label='Email'
            className='auth'
            errorMessage={formErrors[EMAIL_PROPERTY]}
            onValueChange={event => handleInputChange(event, validate)}
          />
          <Input
            type='password'
            name={PASSWORD_PROPERTY}
            label='Password'
            className='auth'
            errorMessage={formErrors[PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={event => handleInputChange(event, validate)}
          />
          <Input
            type='password'
            name={CONFIRMED_PASSWORD_PROPERTY}
            label='Reenter Password'
            className='auth'
            errorMessage={formErrors[CONFIRMED_PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={event => handleInputChange(event, validate)}
          />
          <div className='authentication-actions-module'>
            <Link to='/login'>Already have an account?</Link>
            <button type='submit'>Sign up</button>
          </div>
        </form>
        {submitErrorMessage && <p className='error-message'>{submitErrorMessage}</p>}
      </div>
      {isRegistered && <Redirect to='/login' />}
    </div>
  );
}

export default withRouter(RegisterView);
