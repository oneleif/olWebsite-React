import React from 'react';
import LoginSVG from '../assets/LoginSVG/LoginSVG';
import AuthenticationCard from '../components/AuthenticationCard/AuthenticationCard';
import AuthenticationSeparator from '../components/AuthenticationSeparator/AuthenticationSeparator';
import GitHubButton from '../components/GithubButton/GithubButton';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import Button from '../components/Objects/Button/Button';
import Input from '../components/Objects/Input/Input';

export default function LoginView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className='login-view-container'>
      <LoginSVG />
      <AuthenticationCard>
        <h1>Log In</h1>
        <div className='button-container'>
          <GoogleButton>Log In with Google</GoogleButton>
          <GitHubButton>Log In with GitHub</GitHubButton>
        </div>
        <AuthenticationSeparator />
        <form className='login-email-input'>
          <Input
            id='loginEmail'
            className='login-input'
            label='Email'
            placeholder='Enter your email address...'
            caption='Login Email Input'
          />
          <Input
            id='loginPassword'
            className='login-input'
            type='password'
            label='Password'
            placeholder='Enter your password...'
            caption='Login Password Input'
          />
          <Button
            type='submit'
            theme='primary login-button'
            value='Log In'
            aria-label='Log in'
            eventLabel='Log in Submission Attempted'
            handleClick={() => {
              /* do nothing */
            }}
          >
            Log In
          </Button>
          <div className='link-containers'>
            <div className='remember-me-container'>
              <input type='checkbox' />
              <span>Remember Me</span>
            </div>
            <a className='forgot-password-link' href="https://www.oneleif.com">Forgot Password?</a>
          </div>
        </form>
      </AuthenticationCard>
    </div>
  );
};
