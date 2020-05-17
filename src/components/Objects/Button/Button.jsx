import React from 'react';

import ReactGA from 'react-ga';

export default function Button({ children, theme = 'primary', handleClick, eventLabel }) {

  function handleButtonClick() {
    ReactGA.event({ category: 'Button', action: 'Clicked', label: eventLabel ? eventLabel : children });
    handleClick();
  }

  /************************************
   * Render
   ************************************/

  return (
    <button className={'button ' + theme} onClick={handleButtonClick}>
      {children}
    </button>
  );
}
