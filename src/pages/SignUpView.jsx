import React from 'react';
import LoginSVG from '../assets/LoginSVG/LoginSVG';
import AuthenticationCard from '../components/AuthenticationCard/AuthenticationCard';
import AuthenticationSeparator from '../components/AuthenticationSeparator/AuthenticationSeparator';
import GitHubButton from '../components/GithubButton/GithubButton';
import GoogleButton from '../components/GoogleButton/GoogleButton';
import Button from '../components/Objects/Button/Button';
import Input from '../components/Objects/Input/Input';
import { withRouter, Link } from 'react-router-dom';

function SignUpView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className='sign-up-view-container'>
      <LoginSVG />
      <AuthenticationCard>
        <h1>Join the Team</h1>
        <div className='button-container'>
          <GoogleButton>Sign Up with Google</GoogleButton>
          <GitHubButton>Sign Up with GitHub</GitHubButton>
        </div>
        <AuthenticationSeparator />
        <form className='sign-up-email-input'>
        <Input
            id='signUpEmail'
            className='sign-up-input'
            label='Name'
            placeholder='Enter your name...'
            caption='Sign Up Name Input'
          />
          <Input
            id='signUpEmail'
            className='sign-up-input'
            label='Email'
            placeholder='Enter your email address...'
            caption='Sign Up Email Input'
          />
          <Input
            id='signUpPassword'
            className='sign-up-input'
            type='password'
            label='Password'
            placeholder='Enter your password...'
            caption='Sign Up Password Input'
          />
          <Input
            id='signUpConfirmPassword'
            className='sign-up-input'
            type='password'
            label='Confirm Password'
            placeholder='Confirm your password...'
            caption='Sign Up Confirm Password Input'
          />
          <Button
            type='submit'
            theme='primary sign-up-button'
            value='Sign Up'
            aria-label='Sign Up'
            eventLabel='Sign Up Submission Attempted'
            handleClick={() => {
              /* do nothing */
            }}
          >
            Sign Up
          </Button>
        </form>
        <Link to='/login' className='login-link'>
          Already a member? Log in
        </Link>
        <p className='privacy-policy-copy'>By registering, you are agreeing to oneleif's <Link to='/terms-of-service'>Terms of Service</Link> and <Link to='/privacy-policy'>Privacy Policy</Link>.</p>
      </AuthenticationCard>
    </div>
  );
};

export default withRouter(SignUpView);
