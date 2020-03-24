import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { register } from '../services/authService.js';
import { Schema, validate } from '../validation';
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

  const { formData, formErrors, setFormErrors, handleSubmit, handleInputChange, submitErrorMessage } = useForm(
    FORM_SCHEMA,
    DEFAULT_STATE
  );
  const [isRegistered, setIsRegistered] = useState(false);

  /************************************
   * Helper Functions
   ************************************/

  async function doSubmit() {
    await register(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
    setIsRegistered(true);
  }

  function validateForm(form, schema) {
    const { isValid, errors } = validate(form, schema);

    let formIsValid = isValid;

    if (formIsValid && passwordsDiffer()) {
      formIsValid = false;
      errors[CONFIRMED_PASSWORD_PROPERTY] = [ERROR_MISMATCH_PASSWORDS];
    }

    return formIsValid ? null : errors;
  }

  function validateProperty(value, schema, propertyName) {
    const { errors } = validate(value, schema);
    const allErrors = { ...formErrors, [propertyName]: [...errors] };

    // Deal with re-entering password:
    validateConfirmedPassword(value, propertyName, allErrors);

    setFormErrors({ ...allErrors });
  }

  function inputHasBeenTouched(property) {
    return Array.isArray(formErrors[property]);
  }

  function passwordsDiffer() {
    return formData[PASSWORD_PROPERTY] !== formData[CONFIRMED_PASSWORD_PROPERTY];
  }

  function validateConfirmedPassword(value, propertyName, errors) {
    // Could have easily just check if values are the same, but opted for
    // more robust solution because function setting the state are asynchronous

    // On password input change
    if (propertyName === PASSWORD_PROPERTY) {
      if (value !== formData[CONFIRMED_PASSWORD_PROPERTY] && inputHasBeenTouched(CONFIRMED_PASSWORD_PROPERTY)) {
        errors[CONFIRMED_PASSWORD_PROPERTY] = [ERROR_MISMATCH_PASSWORDS];
      }

      // reset confirmed password
      if (value === formData[CONFIRMED_PASSWORD_PROPERTY]) {
        errors[CONFIRMED_PASSWORD_PROPERTY] = [];
      }
    }

    // On confirmed password input change
    if (propertyName === CONFIRMED_PASSWORD_PROPERTY) {
      if (value !== formData[PASSWORD_PROPERTY]) {
        errors[CONFIRMED_PASSWORD_PROPERTY] = [ERROR_MISMATCH_PASSWORDS];
      }
    }
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='authentication-view-body'>
      <div className='authentication-input-container'>
        <img src={homeLogo} alt='oneleif logo' />
        <form onSubmit={event => handleSubmit(event, validateForm, doSubmit)} className='form-container'>
          <Input
            name={EMAIL_PROPERTY}
            label='Email'
            className='auth'
            errorMessage={formErrors[EMAIL_PROPERTY]}
            onValueChange={event => handleInputChange(event, validateProperty)}
          />
          <Input
            type='password'
            name={PASSWORD_PROPERTY}
            label='Password'
            className='auth'
            errorMessage={formErrors[PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={event => handleInputChange(event, validateProperty)}
          />
          <Input
            type='password'
            name={CONFIRMED_PASSWORD_PROPERTY}
            label='Reenter Password'
            className='auth'
            errorMessage={formErrors[CONFIRMED_PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={event => handleInputChange(event, validateProperty)}
          />
          <div className='authentication-actions-module'>
            <Link to='/login'>Already have an account?</Link>
            {/* TODO: Disable button if there is an error in form */}
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
