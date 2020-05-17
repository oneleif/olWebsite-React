import React from 'react';

import ReactGA from 'react-ga';

export default function Icon({ children, label, width, height, handleClick }) {
 /************************************
  * Private Methods
  ************************************/
 
 /**
  * Called when an icon link is clicked, used to capture the event for analytics
  * and calls parent's callback function
  */
  function handleIconClick() {
    ReactGA.event({ category: 'Icon', action: 'Clicked', label: label });
    handleClick();
  }

  /************************************
   * Render
   ************************************/

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} tabIndex='0' aria-label={label} fill='none' xmlns='http://www.w3.org/2000/svg' onClick={handleIconClick} onKeyPress={handleIconClick}>
      {children}
    </svg>
  );
}
