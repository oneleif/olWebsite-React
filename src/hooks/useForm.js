import { useState } from 'react';

import { validateForm, validateProperty } from '../validation';

/**
 * Hook to handle underlying form functionality such as setting input changes,
 * errors, form and property validation and form submission
 * @param {Object} schema schema of whole form
 * @param {Object} defaultState object with properties corresponding to form elements
 * @param {Object} defaultErrors form errors
 */
export default function useForm(schema, defaultState, defaultErrors = {}) {
  /************************************
   * State
   ************************************/

  const [formData, setFormData] = useState(defaultState);
  const [formErrors, setFormErrors] = useState(defaultErrors);
  const [submitErrorMessage, setSubmitErrorMessage] = useState(null);

  /************************************
   * Helper Functions
   ************************************/

  /**
   * Handles validating form and calling submitCallback
   * @param {Event} event form submit event
   * @param {Function} submitCallback async function that does actual submission
   */
  async function handleSubmit(event, submitCallback) {
    event.preventDefault();
    const { isValid: formIsValid, errors } = validateForm(formData, schema);

    if (formIsValid) {
      try {
        await submitCallback();
      } catch (error) {
        setSubmitErrorMessage(error.message);
      }
    } else {
      setFormErrors({ ...formErrors, ...errors });
    }
  }

  /**
   * Sets the appropriate state and errors. Validates the property
   * and allows user to run further validation
   * @param {Event} event onChange event
   * @param {Function} userValidationCallback user function for further
   * validation. Must return an object with property names and the
   * corresponding errors set. Ex: {email: [...errors]}
   */
  function handleInputChange(event, userValidationCallback) {
    const { name: propertyName, value } = event.target;

    setFormData({ ...formData, [propertyName]: value });

    const { errors } = validateProperty(value, schema[propertyName]);
    const validationErrors = userValidationCallback(propertyName, errors, value);

    setFormErrors({
      ...formErrors,
      ...validationErrors
    });
  }

  return {
    formData,
    formErrors,
    handleSubmit,
    handleInputChange,
    submitErrorMessage
  };
}
