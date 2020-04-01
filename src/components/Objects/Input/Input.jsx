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
        <div className='label-text-container'>
          <h6>{label}</h6>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
        <input {...rest} aria-label={`${label}-input`} type={type} onChange={onValueChange}/>
    </label>
  );
};
