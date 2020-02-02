import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

import { 
  validateEmail, 
  validatePassword, 
  validateReenteredPassword 
} from '../utils/authentication-utils';
import { SUCCESS } from '../constants/authentication-constants';
import { REGISTER_PATH } from '../constants/rest-constants';

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
      await registerUser();
    }
  }

 /* Makes REST request to register user, based on response status will 
  * redirect to the landing view or display and error message
  */
  async function registerUser() {
    //TODO: Set up a reverse proxy so the backend/frontend can be reached on same port
    // const url = "http://localhost:8080/api/register";  //will need to use this ran locally
    const response = await fetch(REGISTER_PATH, {
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username: email, password: password }),
      method: 'POST'
    });

    if (response.status >= 200 && response.status < 300) {
      //user registered successfully 
      setIsRegistered(true);
    } 
    else if (response.status === 400) {
      setErrorMessage("An account already exists for this email address.");
    }
    else {
      //TODO: Errors to handle invalid passwords entered
      //handling a 404 or 500 server error
      setErrorMessage("An error has occured while registering.");
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
