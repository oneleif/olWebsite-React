import React from "react";
import FormConstants from '../../../constants/form-constants';

export default function FormLabel({
  children,
  labelState,
  hasError,
  isDisabled,
}) {
  /************************************
   * Private Helpers
   ************************************/

  /**
   * Computes the style for the Label of the Label/Text area components based on the state of the form
   * @param labelState - { {@type boolean} isFocused, {@type boolean} isActive } 
   *                     isFocused if the form has been clicked on/tabbed to
   *                     isActive if the form has a value entered into it
   * @param hasError - {@type boolean}
   * @param isDisabled - {@type boolean}
   * @return {@type Object {color}} - object with key of color with a hex code coordinating to a specified color
   */
  function computeFormLabelStyle(labelState, hasError, isDisabled) {
    const {isFocused, isActive} = labelState;
    debugger;
    if (isDisabled) {
      return {color: FormConstants.DISABLED};
    }
    else if (hasError) {
      return {color: FormConstants.ERROR};
    }
    else if (isFocused) {
      return {color: FormConstants.FOCUSED_LABEL};
    }
    else if (isActive) {
      return {color: FormConstants.ACTIVE_LABEL};
    }
    else {
      return {};
    }
  }

  /************************************
   * Render
   ************************************/

  return (
    <p style={computeFormLabelStyle(labelState, hasError, isDisabled)}>{children}</p>
  );
};
