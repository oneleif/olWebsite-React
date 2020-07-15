import React from "react";
import FormConstants from '../../../constants/form-constants';

export default function FormCaption({
  children,
  showCaption,
  hasError,
  isDisabled,
}) {
  /************************************
   * Private Helpers
   ************************************/

  /**
   * Computes the style for the Caption of the Label/Text area components based on the state of the form
   * @param showCaption - {@type boolean} whether or not the caption should be shown in view
   * @param hasError - {@type boolean}
   * @param isDisabled - {@type boolean}
   * @return {@type Object { visibility, color }} - object with keys of visibility and color with a hex code coordinating to a specified color
   */
  function computeFormCaptionStyle(showCaption, hasError, isDisabled) {
    const visible = { visibility: 'visible' };
    if (hasError) {
      return { ...visible, color: FormConstants.ERROR };
    }
    else if (!showCaption) {
      return { visibility: 'hidden' };
    }
    else if (isDisabled) {
      return { ...visible, color: FormConstants.DISABLED };
    }
    else {
      return visible;
    }
  }

  /************************************
   * Render
   ************************************/

  return (
    <span style={computeFormCaptionStyle(showCaption, hasError, isDisabled)}>{children}</span>
  );
};
