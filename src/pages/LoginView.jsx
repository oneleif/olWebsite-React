import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { 
  validateEmail, 
  validatePassword
} from '../utils/authentication-utils';
import { SUCCESS } from '../constants/authentication-constants';
import { loginUser } from '../rest/authentication-rest';

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
      const response = await loginUser(email, password);

      if (response === SUCCESS) {
        setIsLoggedIn(true);
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

    handleEmailValidationResponse(emailResponse);
    handlePasswordValidationResponse(passwordResponse);

    return (emailResponse === SUCCESS) && (passwordResponse === SUCCESS);
  }
  
  function emailValidationCheck(email) {
    setEmail(email);
    handleEmailValidationResponse(validateEmail(email));
  }

  function passwordValidationCheck(password) {
    setPassword(password);
    handlePasswordValidationResponse(validatePassword(password));
  }
 
 /* Takes in validation response of email and sets based on success or not
  *
  * @param response
  */
  function handleEmailValidationResponse(response) {
    const message = (response !== SUCCESS) ? response : null;
    setEmailErrorMessage(message);
  }

 /* Takes in validation response of password and sets based on success or not
  *
  * @param response
  */
  function handlePasswordValidationResponse(response) {
    const message = (response !== SUCCESS) ? response : null;
    setPasswordErrorMessage(message);
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
                onValueChange={(email) => emailValidationCheck(email)} 
                errorMessage={emailErrorMessage}/>
              <Input 
                className='auth'
                label='Password'
                type='password'
                onValueChange={(password) => passwordValidationCheck(password)} 
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
