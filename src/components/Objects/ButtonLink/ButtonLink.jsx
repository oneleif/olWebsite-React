import React from 'react';

import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';

export default function ButtonLink({ children, theme = 'primary', path, handleClick, eventLabel, ...rest }) {
 /************************************
  * Private Methods
  ************************************/
 
 /**
  * Called when an external button link is clicked, used to capture the event for analytics
  * and calls parent's callback function
  * @param event
  */
  function handleButtonClicked(event) {
    ReactGA.event({ category: 'Button Link External', action: 'Clicked', label: eventLabel ? eventLabel : event.target.href });
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
