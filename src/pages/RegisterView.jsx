import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

import { 
  validateEmail, 
  validatePassword, 
  validateReenteredPassword 
} from '../utils/authentication-utils';
import { SUCCESS } from '../constants/authentication-constants';
import { registerUser } from '../rest/authentication-rest';

import Input from '../components/Objects/Input/Input';
import homeLogo from "../images/homeLogo.png";

function RegisterView() {
  /************************************
   * State
   ************************************/

  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [reenteredPasswordErrorMessage, setReenteredPasswordErrorMessage] = useState(null);

  /************************************
   * Private Functions
   ************************************/

 /* Handler for sign up button clicked, if valid inputs registers user
  */
  async function registerClicked() {
    if (validateInput()) {
      const response = await registerUser(email, password);

      if (response === SUCCESS) {
        setIsRegistered(true);
      }
      else {
        setErrorMessage(response);
      } 
    }
  }

 /* Validates inputs, if invalid then it will display an error message
  */
  function validateInput() {
    const emailResponse = validateEmail(email);
    const passwordResponse = validatePassword(password);
    const reenteredPasswordResponse = validateReenteredPassword(password, reenteredPassword);

    if (emailResponse !== SUCCESS) {
      setEmailErrorMessage(emailResponse);
    }
    else {
      setEmailErrorMessage(null);
    }

    if (passwordResponse !== SUCCESS) {
      setPasswordErrorMessage(passwordResponse);
    }
    else {
      setPasswordErrorMessage(null);
    }

    if (reenteredPasswordResponse !== SUCCESS) {
      setReenteredPasswordErrorMessage(reenteredPasswordResponse);
    }
    else {
      setReenteredPasswordErrorMessage(null);
    }

    return (emailResponse === SUCCESS) && (passwordResponse === SUCCESS) && (reenteredPasswordResponse === SUCCESS);
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='authentication-view-body'>
        <div className='authentication-input-container'> 
            <img src={homeLogo} alt='oneleif logo' />
            <div className='form-container'>
                <Input 
                className='auth' 
                label='Email'
                onValueChange={(email) => setEmail(email)} 
                errorMessage={emailErrorMessage}/>
                <Input 
                className='auth'
                label='Password'
                type='password'
                onValueChange={(password) => setPassword(password)} 
                errorMessage={passwordErrorMessage}/>
                <Input 
                className='auth'
                label='Reenter Password'
                type='password'
                onValueChange={(password) => setReenteredPassword(password)} 
                errorMessage={reenteredPasswordErrorMessage}/>
                <div className='authentication-actions-module'>
                  <Link to="/login">
                    Already have an account?
                  </Link>
                  <button onClick={() => registerClicked()}>Sign up</button>
                </div>
            </div>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
        {isRegistered && <Redirect to="/login" />}
    </div>
  );
};

export default withRouter(RegisterView);
