import React from "react";

export default function TextArea({ 
  className, 
  label, 
  onValueChange,
  errorMessage,
  ...rest
}) {
  /************************************
   * Render
   ************************************/

  return (
    <label className={className ? `${className}-textarea-container` : 'textarea-container'}>
        <h6>{label}</h6>
        <textarea className={errorMessage ? 'error-input' : ''} {...rest} aria-label={`${label}-textarea`} onChange={onValueChange}/>
        {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
