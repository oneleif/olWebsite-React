import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { login } from '../services/authService';
import { Schema } from '../validation';
import { useUser } from '../contexts/UserContext';

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
  const { formData, formErrors, submitErrorMessage, handleSubmit, handleInputChange } = useForm(FORM_SCHEMA, DEFAULT_STATE);

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

  function validate(propertyName, errors) {
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
            errorMessage={formErrors[PASSWORD_PROPERTY]}
            onValueChange={event => handleInputChange(event, validate)}
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
