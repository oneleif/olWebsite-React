import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { 
  validateEmail, 
  validatePassword
} from '../utils/authentication-utils';
import { SUCCESS } from '../constants/authentication-constants';
import { LOGIN_PATH } from '../constants/rest-constants';

import Input from '../components/Objects/Input/Input';
import homeLogo from "../images/homeLogo.png";

function LoginView() {
  /************************************
   * State
   ************************************/

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  /************************************
   * Helper Functions
   ************************************/

 /* Handler for log in button clicked, if valid inputs logs in user
  */
  async function loginClicked() {
    if (validateInput()) {
      await loginUser();
    }
  }

 /* Makes REST request to log in user, based on response status will 
  * redirect to the landing view or display and error message
  */
  async function loginUser() {
    //TODO: Set up a reverse proxy so the backend/frontend can be reached on same port
    // const url = "http://localhost:8080/api/login"; //will need to use this ran locally
    const response = await fetch(LOGIN_PATH, {
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username: email, password: password }),
      method: 'POST'
    });

    if (response.status >= 200 && response.status < 300) {
      //user registered successfully 
      //TODO: store authentication values
      setIsLoggedIn(true);
    } 
    else if (response.status === 400) {
      setErrorMessage('Invalid username or password.');
    }
    else {
      //TODO: Errors to handle invalid passwords entered
      //handling a 404 or 500 server error
      setErrorMessage("An error has occured while logging in.");
    }
  }

 /* Validates inputs, if invalid then it will display an error message
  */
  function validateInput() {
    const emailResponse = validateEmail(email);
    const passwordResponse = validatePassword(password);

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

    return (emailResponse === SUCCESS) && (passwordResponse === SUCCESS);
  }
  
  /************************************
   * Render
   ************************************/

  return (
    <div className='authentication-view-body'>
        <div className='authentication-input-container'> 
            <img src={homeLogo} alt="oneleif logo" />
            <div className="form-container">
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
              <div className='authentication-actions-module'>
                <span>Forgot your password?</span>
                <button onClick={() => loginClicked()}>Log in</button>
              </div>
            </div>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
        {isLoggedIn && <Redirect to="/" />}
    </div>
  );
};

export default withRouter(LoginView);
