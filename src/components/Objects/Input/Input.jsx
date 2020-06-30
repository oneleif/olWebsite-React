import React, { useState } from "react";

import FormLabel from "../Form/FormLabel";
import FormCaption from "../Form/FormCaption";

export default function Input({ 
  className,
  id,
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
    setLabelState({...labelState, isActive: isActive});
    onValueChange(event);
  }
  
  /************************************
   * Render
   ************************************/

  return (
    <div 
      className={className ? `${className}-input-container` : 'input-container'} 
      onFocus={() => setLabelState({...labelState, isFocused: true})} 
      onBlur={() => setLabelState({...labelState, isFocused: false})}
      >
      <FormLabel 
        id={id} 
        labelState={labelState}
        hasError={!!errorMessage}
        isDisabled={disable}
        >
          {label}
      </FormLabel>
      <input
        id={id}
        className={errorMessage ? 'error-input' : ''}
        aria-label={`${label}-input`}
        type={type}
        onChange={handleValueChanged}
        disabled={disable}
        {...rest} 
        />
      <FormCaption
        showCaption={showCaption}
        hasError={!!errorMessage}
        isDisabled={disable}
        >
          {errorMessage ? errorMessage : caption}
      </FormCaption>
    </div>
  );
};
