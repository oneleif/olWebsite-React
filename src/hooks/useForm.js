import { useState } from 'react';

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
   * @param {Function} validateForm user validation function to be called
   * @param {Function} submitCallback async function that does actual submission
   */
  async function handleSubmit(event, validateForm, submitCallback) {
    event.preventDefault();

    const errors = validateForm(formData, schema);
    if (!errors) {
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
   * @param {Function} validateProperty user function for further
   * validation. Must return an array of errors
   */
  function handleInputChange(event, validateProperty) {
    const { name: propertyName, value } = event.target;

    setFormData({ ...formData, [propertyName]: value });
    validateProperty(value, schema[propertyName], propertyName);
  }

  return {
    formData,
    formErrors,
    handleSubmit,
    setFormErrors,
    handleInputChange,
    submitErrorMessage
  };
}
