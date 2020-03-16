import React from "react";

/**
* Component intented to displayed Featured text. Currently includes
* children, aka text, and header being passed in. 
* Designed to have text aligned left.
*
*/
export default function FeatureCopy({ children, header }) {
  /************************************
   * Render
   ************************************/

  return (
      <div className='feature-copy-container'>
        <h1>{header}</h1>
        <p>{children}</p>
      </div>
  );
}
