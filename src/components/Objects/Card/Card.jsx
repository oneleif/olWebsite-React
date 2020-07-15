import React from "react";

export default function Card({ className, children }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className={`card-module ${className ? className : ''}`}>
        {children}
    </div>
  );
}
