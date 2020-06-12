import React, { useState } from "react";

import FormLabel from "../Form/FormLabel";
import FormCaption from "../Form/FormCaption";

export default function Input({ 
  className, 
  label, 
  caption = 'Caption Required',
  errorMessage,
  type = 'text',
  showCaption = false,
  disable = false,
  onValueChange,
  ...rest
}) {
  /************************************
   * State
   ************************************/

  const [labelState, setLabelState] = useState({isFocused: false, isActive: false});

  /************************************
   * Private Helper
   ************************************/

  /**
   * Called when the value of the input is changed, just used to set the state of the form to active
   * then calls the parent callback function
   * @param event
   */
  function handleValueChanged(event) {
    const isActive = !!event.target.value;
    setLabelState({...labelState, isActive: isActive})
    onValueChange(event);
  }
  
  /************************************
   * Render
   ************************************/

  return (
    <label className={className ? `${className}-input-container` : 'input-container'}  onFocus={() => setLabelState({...labelState, isFocused: true})} onBlur={() => setLabelState({...labelState, isFocused: false})}>
      <FormLabel labelState={labelState} hasError={!!errorMessage} isDisabled={disable}>{label}</FormLabel>
      <input className={errorMessage ? 'error-input' : ''} {...rest} aria-label={`${label}-input`} type={type} onChange={handleValueChanged} disabled={disable}/>
      <FormCaption showCaption={showCaption} hasError={!!errorMessage} isDisabled={disable}>{errorMessage ? errorMessage : caption}</FormCaption>
    </label>
  );
};
