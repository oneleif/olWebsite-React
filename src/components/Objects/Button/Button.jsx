import React from "react";

export default function Button({ children, theme = 'primary', handleClick }) {
  /************************************
   * Render
   ************************************/

  return (
    <button className={'button ' + theme} onClick={handleClick}>
        {children}
    </button>
  );
}
