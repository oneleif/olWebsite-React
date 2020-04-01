import React from "react";

export default function TextArea({ 
  className, 
  label, 
  onValueChange,
  ...rest
}) {
  /************************************
   * Render
   ************************************/

  return (
    <label className={className ? `${className}-textarea-container` : 'textarea-container'}>
        <div className='label-text-container'>
            <h6>{label}</h6>
        </div>
        <textarea {...rest} aria-label={`${label}-textarea`} onChange={onValueChange}/>
    </label>
  );
};
