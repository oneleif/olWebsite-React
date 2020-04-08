import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import useForm from '../hooks/useForm';
import homeLogo from '../images/homeLogo.png';
import { login } from '../services/authService';
import { useUser } from '../contexts/UserContext';
import { LOGIN_CONSTANTS } from '../constants/validation-constants';

/************************************
 * Constants
 ************************************/

const { EMAIL_PROPERTY, PASSWORD_PROPERTY, EMAIL_SCHEMA, PASSWORD_SCHEMA } = LOGIN_CONSTANTS;

const FORM_SCHEMA = {
  [EMAIL_PROPERTY]: EMAIL_SCHEMA,
  [PASSWORD_PROPERTY]: PASSWORD_SCHEMA
};

function LoginView(props) {
  /************************************
   * State
   ************************************/

  const [user, setUser] = useUser();
  const { form, errors, submitError, handleSubmit, handleInputChange } = useForm(FORM_SCHEMA);

  /************************************
   * Helper Functions
   ************************************/

  async function submitForm() {
    const userData = await login(form[EMAIL_PROPERTY], form[PASSWORD_PROPERTY]);
    setUser(userData);

    // Make sure that userData is safely stored since this
    // does a *full* reload
    window.location = props.location.state?.referer || '/';
  }

  /************************************
   * Render
   ************************************/

  if (user) return <Redirect to='/' />;
  return (
    <div className='authentication-view-body'>
      <div className='authentication-input-container'>
        <img src={homeLogo} alt='oneleif logo' />
        <form onSubmit={event => handleSubmit(submitForm, event)} className='form-container'>
          <Input
            name={EMAIL_PROPERTY}
            label='Email'
            className='auth'
            autoComplete='username'
            errorMessage={errors[EMAIL_PROPERTY]}
            onValueChange={handleInputChange}
          />
          <Input
            type='password'
            name={PASSWORD_PROPERTY}
            label='Password'
            className='auth'
            autoComplete='current-password'
            errorMessage={errors[PASSWORD_PROPERTY]}
            onValueChange={handleInputChange}
          />
          <div className='authentication-actions-module'>
            <span>Forgot your password?</span>
            <button type='submit'>Log in</button>
          </div>
        </form>
        {submitError && <p className='error-message'>{submitError}</p>}
      </div>
    </div>
  );
}

export default withRouter(LoginView);
