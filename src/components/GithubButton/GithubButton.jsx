import React from 'react';
import GithubIcon from '../../assets/Icons/GithubIcon/github-icon.png'
import Button from '../Objects/Button/Button';

export default function GitHub() {
  /************************************
   * Render
   ************************************/

  return (
    <Button theme='github-button' handleClick={() => {/* Nothing to be done yet*/}} eventLabel='github-login'>
      <img src={GithubIcon} alt="GitHub Icon" width="17.25" height="14.75" />
      <span>Log In with GitHub</span>
    </Button>
  );
}
