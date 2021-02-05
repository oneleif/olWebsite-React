import React from 'react';
import GoogleIcon from '../../assets/Icons/GoogleIcon/GoogleIcon';
import Button from '../Objects/Button/Button';

export default function GoogleButton() {
  /************************************
   * Render
   ************************************/

  return (
    <Button theme='google-button' handleClick={() => {/* Nothing to be done yet*/}} eventLabel='google-login'>
      <GoogleIcon />
      <span>Log In with Google</span>
    </Button>
  );
}
