import React from 'react';

export default function Input({ className, label, onValueChange, errorMessage, type = 'text', ...rest }) {
  /************************************
   * Render
   ************************************/

  return (
    <>
      <label className={`${className}-input-container`}>
        <div className='label-text-container'>
          <p>{label}</p>
          {errorMessage && <span>{errorMessage}</span>}
        </div>
        <input {...rest} aria-label={`${label}-input`} type={type} onChange={onValueChange} />
      </label>
    </>
  );
}
