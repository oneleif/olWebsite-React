import React from "react";

export default function Input({ 
  className, 
  label, 
  onValueChange, 
  errorMessage,
  type='text',
  ...rest
}) {
  /************************************
   * Render
   ************************************/

  return (
    <label className={className ? `${className}-input-container` : 'input-container'}>
        <h6>{label}</h6>
        <input className={errorMessage ? 'error-input' : ''} {...rest} aria-label={`${label}-input`} type={type} onChange={onValueChange}/>
        {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
