import React from 'react';

import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';

export default function ButtonLink({ children, theme = 'primary', path, handleClick, eventLabel, ...rest }) {

  function handleButtonClicked(event) {
    ReactGA.event({ category: 'Button Link', action: 'Clicked', label: eventLabel ? eventLabel : event.target.href });
    handleClick(event);
  }

  /************************************
   * Render
   ************************************/

  return (
    <>
      {path ? 
        <Link className={`button ${theme}`} to={path} {...rest}>{children}</Link> 
        :
        <a className={`button ${theme}`} onClickCapture={handleButtonClicked} {...rest}>{children}</a>
      }
    </>
  );
}
