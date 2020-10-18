import React from 'react';

import ReactGA from 'react-ga';

export default function Button({ children, theme = 'primary', handleClick, eventLabel, ...rest }) {
 /************************************
  * Private Methods
  ************************************/

 /**
  * Called when an button is clicked, used to capture the event for analytics
  * and calls parent's callback function
  */
  function handleButtonClick() {
    ReactGA.event({ category: 'Button', action: 'Clicked', label: eventLabel ? eventLabel : children });
    handleClick();
  }

  /************************************
   * Render
   ************************************/

  return (
    <button className={'button ' + theme} onClick={handleButtonClick} {...rest}>
      {children}
    </button>
  );
}
