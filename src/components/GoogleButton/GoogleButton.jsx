import React from 'react';
import GoogleIcon from '../../assets/Icons/GoogleIcon/GoogleIcon';
import Button from '../Objects/Button/Button';

export default function GoogleButton({ children }) {
  /************************************
   * Render
   ************************************/

  return (
    <Button theme='google-button' handleClick={() => {/* Nothing to be done yet*/}} eventLabel='google-login'>
      <GoogleIcon />
      <span>{children}</span>
    </Button>
  );
}
