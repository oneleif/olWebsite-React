import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import homeLogo from '../images/homeLogo.png';
import { login } from '../services/authService';
import { useUser } from '../contexts/UserContext';
import { Schema, validateProperty, validateForm } from '../validation';

// TODO: Refactor to hook
const PASSWORD_PROPERTY = 'password';
const PASSWORD_SCHEMA = new Schema().validate();

const EMAIL_PROPERTY = 'email';
const EMAIL_SCHEMA = new Schema().validate();

const FORM_SCHEMA = {
  [EMAIL_PROPERTY]: EMAIL_SCHEMA,
  [PASSWORD_PROPERTY]: PASSWORD_SCHEMA
};
const DEFAULT_STATE = { [EMAIL_PROPERTY]: '', [PASSWORD_PROPERTY]: '' };
const DEFAULT_ERRORS = {};

function LoginView(props) {
  /************************************
   * State
   ************************************/

  const [user, setUser] = useUser();
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [formErrors, setFormErrors] = useState(DEFAULT_ERRORS);
  const [errorMessage, setErrorMessage] = useState(null);

  /************************************
   * Helper Functions
   ************************************/

  async function handleSubmit(event) {
    event.preventDefault();
    const { isValid: formIsValid, errors } = validateForm(formData, FORM_SCHEMA);

    if (formIsValid) {
      try {
        const userData = await login(formData[EMAIL_PROPERTY], formData[PASSWORD_PROPERTY]);
        setUser(userData);

        // Make sure that userData is safely stored since this
        // does a *full* reload
        window.location = props.location.state?.referer || '/';
      } catch (error) {
        // This assumes that the server returns custom validation errors
        // 500 errors should be handled and "prettied" in the httpService
        setErrorMessage(error.message);
      }
    } else {
      setFormErrors({ ...formErrors, ...errors });
    }
  }

  function handleInputChange(event) {
    const { name: propertyName, value } = event.target;

    setFormData({ ...formData, [propertyName]: value });
    setFormErrors({ ...formErrors, ...validate(propertyName, value) });
  }

  function validate(propertyName, value) {
    const { errors } = validateProperty(value, FORM_SCHEMA[propertyName]);

    return { [propertyName]: [...errors] };
  }

  /************************************
   * Render
   ************************************/

  if (user) return <Redirect to='/' />;
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
            errorMessage={formErrors[PASSWORD_PROPERTY]}
            onValueChange={handleInputChange}
          />
          <div className='authentication-actions-module'>
            <span>Forgot your password?</span>
            <button type='submit'>Log in</button>
          </div>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default withRouter(LoginView);
