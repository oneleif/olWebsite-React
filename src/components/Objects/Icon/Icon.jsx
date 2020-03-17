import React from "react";

export default function Icon({ children, label, width, height, handleClick }) {
  /************************************
   * Render
   ************************************/

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} tabIndex='0' aria-label={label} fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick} onKeyPress={handleClick}>
      {children}
    </svg>
  );
}
