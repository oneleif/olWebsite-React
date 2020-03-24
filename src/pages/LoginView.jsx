import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { login } from '../services/authService';
import { useUser } from '../contexts/UserContext';
import { Schema, validate } from '../validation';

const EMAIL_SCHEMA = new Schema().validate();
const EMAIL_PROPERTY = 'email';
const PASSWORD_SCHEMA = new Schema().validate();
const PASSWORD_PROPERTY = 'password';
const DEFAULT_STATE = { [EMAIL_PROPERTY]: '', [PASSWORD_PROPERTY]: '' };
const FORM_SCHEMA = {
  [EMAIL_PROPERTY]: EMAIL_SCHEMA,
  [PASSWORD_PROPERTY]: PASSWORD_SCHEMA
};

function LoginView(props) {
  /************************************
   * State
   ************************************/

  const [user, setUser] = useUser();
  const { formData, formErrors, setFormErrors, submitErrorMessage, handleSubmit, handleInputChange } = useForm(
    FORM_SCHEMA,
    DEFAULT_STATE
  );

  /************************************
   * Helper Functions
   ************************************/

  async function doSubmit() {
    const userData = await login(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
    setUser(userData);

    // Make sure that userData is safely stored since this
    // does a *full* reload
    window.location = props.location.state?.referer || '/';
  }

  // per useForm docs, must return object with each property
  // containing an array of error messages or null if no errors
  function validateForm(form, schema) {
    const { isValid, errors } = validate(form, schema);
    return isValid ? null : errors;
  }

  // Per useForm docs, must return array of error messages
  function validateProperty(value, schema, propertyName) {
    const { errors } = validate(value, schema);
    setFormErrors({
      ...formErrors,
      [propertyName]: [...errors]
    });
  }

  /************************************
   * Render
   ************************************/

  if (user) return <Redirect to='/' />;
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
            errorMessage={formErrors[PASSWORD_PROPERTY]}
            onValueChange={event => handleInputChange(event, validateProperty)}
          />
          <div className='authentication-actions-module'>
            <span>Forgot your password?</span>
            <button type='submit'>Log in</button>
          </div>
        </form>
        {submitErrorMessage && <p className='error-message'>{submitErrorMessage}</p>}
      </div>
    </div>
  );
}

export default withRouter(LoginView);
