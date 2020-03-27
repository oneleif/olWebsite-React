import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { Schema } from '../validation';
import { register } from '../services/authService.js';

/************************************
 * Constants
 ************************************/

const EMAIL_PROPERTY = 'email';
const PASSWORD_PROPERTY = 'password';
const REQUIRED_PASSWORD_LENGTH = 8;
const CONFIRMED_PASSWORD_PROPERTY = 'confirmedPassword';

const DEFAULT_STATE = { [EMAIL_PROPERTY]: '', [PASSWORD_PROPERTY]: '', [CONFIRMED_PASSWORD_PROPERTY]: '' };

const EMAIL_SCHEMA = new Schema()
  .isEmail()
  .isRequired()
  .validate();

const PASSWORD_SCHEMA = new Schema()
  .hasDigit()
  .hasSymbol()
  .hasLowercase()
  .hasUppercase()
  .isRequired()
  .min(REQUIRED_PASSWORD_LENGTH)
  .validate();

const CONFIRMED_PASSWORD_SCHEMA = new Schema()
  .isRequired()
  .matches(PASSWORD_PROPERTY)
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

  const [isRegistered, setIsRegistered] = useState(false);
  const { formData, formErrors, handleSubmit, handleInputChange, submitErrorMessage } = useForm(FORM_SCHEMA, DEFAULT_STATE);

  /************************************
   * Helper Functions
   ************************************/

  async function submitForm() {
    await register(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
    setIsRegistered(true);
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='authentication-view-body'>
      <div className='authentication-input-container'>
        <img src={homeLogo} alt='oneleif logo' />
        <form onSubmit={event => handleSubmit(event, submitForm)} className='form-container'>
          <Input
            name={EMAIL_PROPERTY}
            label='Email'
            className='auth'
            autoComplete='email'
            errorMessage={formErrors[EMAIL_PROPERTY]}
            onValueChange={handleInputChange}
          />
          <Input
            type='password'
            name={PASSWORD_PROPERTY}
            label='Password'
            className='auth'
            autoComplete='new-password'
            errorMessage={formErrors[PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={handleInputChange}
          />
          <Input
            type='password'
            name={CONFIRMED_PASSWORD_PROPERTY}
            label='Reenter Password'
            className='auth'
            autoComplete='new-password'
            errorMessage={formErrors[CONFIRMED_PASSWORD_PROPERTY]?.[0]} // TODO: change display
            onValueChange={handleInputChange}
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
