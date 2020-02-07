import React from "react";

export default function Input({ 
  className, 
  label, 
  onValueChange, 
  errorMessage,
  type='text'
}) {
 
  /************************************
   * Helper Functions
   ************************************/

  function handleChange(event) {
    onValueChange(event.target.value);
  }

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
          <input aria-label={`${label}-input`} type={type} onChange={handleChange}/>
      </label>
    </>
  );
};
