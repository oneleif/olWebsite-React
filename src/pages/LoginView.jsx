import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Input from '../components/Objects/Input/Input';
import { login } from '../services/authService';
import { useUser } from '../contexts/UserContext';
import { ERROR_EMPTY_EMAIL, ERROR_EMPTY_PASSWORD } from '../constants/authentication-constants';
import homeLogo from '../assets/homeLogo.png';

function LoginView(props) {
  /************************************
   * State
   ************************************/

  const [user, setUser] = useUser();
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  /************************************
   * Helper Functions
   ************************************/

  /**
   * Handler for log in button clicked, if valid inputs logs in user
   */ 
  async function loginClicked() {
    if (validateInput()) {
      try {
        // Ideally login should handle setting the user
        const userData = await login(email, password);
        setUser(userData);

        // Make sure that userData is safely stored since this
        // does a *full* reload
        window.location = props.location.state?.referer || '/';
      } catch (error) {
        // This assumes that the server returns custom validation errors
        // 500 errors should be handled and "prettied" in the httpService
        setErrorMessage(error.message);
      }
    }
  }

  /**
  * Validates inputs, if invalid then it will display an error message
  */ 
  function validateInput() {
    handleEmailValidationResponse(email);
    handlePasswordValidationResponse(password);

    return email !== '' && password !== '';
  }

  function emailValidationCheck(email) {
    setEmail(email);
    handleEmailValidationResponse(email);
  }

  function passwordValidationCheck(password) {
    setPassword(password);
    handlePasswordValidationResponse(password);
  }

  /**
   * Takes in validation response of email and sets based on success or not
   * @param input
   */
  function handleEmailValidationResponse(input) {
    const message = input === '' ? ERROR_EMPTY_EMAIL : null;
    setEmailErrorMessage(message);
  }

  /**
   * Takes in validation response of password and sets based on success or not
   * @param input
   */
  function handlePasswordValidationResponse(input) {
    const message = input === '' ? ERROR_EMPTY_PASSWORD : null;
    setPasswordErrorMessage(message);
  }

  /************************************
   * Render
   ************************************/

  if (user) return <Redirect to='/' />;
  return (
    <div className='authentication-view-body'>
      <div className='authentication-input-container'>
        <img src={homeLogo} alt='oneleif logo' />
        <div className='form-container'>
          <Input
            className='auth'
            label='Email'
            onValueChange={email => emailValidationCheck(email)}
            errorMessage={emailErrorMessage}
          />
          <Input
            className='auth'
            label='Password'
            type='password'
            onValueChange={password => passwordValidationCheck(password)}
            errorMessage={passwordErrorMessage}
          />
          <div className='authentication-actions-module'>
            <span>Forgot your password?</span>
            <button onClick={() => loginClicked()}>Log in</button>
          </div>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default withRouter(LoginView);
