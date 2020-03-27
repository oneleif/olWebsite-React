import { useState } from 'react';

import { validate } from '../validation';

/**
 * Hook to handle underlying form functionality such as setting input changes,
 * errors, form and property validation and form submission
 * @param {Object} formSchema schema of whole form
 * @param {Object} defaultState object with properties corresponding to form elements
 * @param {Object} defaultErrors form errors
 */
export default function useForm(formSchema, defaultState = {}, defaultErrors = {}) {
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
   * @param {Function} submitForm async function that does actual submission
   */
  async function handleSubmit(event, submitForm) {
    event.preventDefault();

    const { isValid, errors } = validate(formData, formSchema);

    if (isValid) {
      try {
        await submitForm();
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
  function handleInputChange(event) {
    const { name: propertyName, value } = event.target;

    setFormData({ ...formData, [propertyName]: value });
    validateProperty(value, formSchema[propertyName], propertyName);
  }

  function validateProperty(value, schema, propertyName) {
    const matchingProperty = getMatchingProperty(schema, formSchema, propertyName);

    if (!matchingProperty) {
      const { errors } = validate(value, schema);
      setFormErrors({ ...formErrors, [propertyName]: errors });
      return;
    }

    // Matching properties present. ex: password & confirm password
    const newForm = { [propertyName]: value, [matchingProperty]: formData[matchingProperty] };
    const newSchema = { [propertyName]: schema, [matchingProperty]: formSchema[matchingProperty] };

    // Validate
    const { isValid, errors } = validate(newForm, newSchema);
    if (isValid) return;

    // Set errors if invalid
    // Reset properties with previous errors
    const allErrors = { ...formErrors, ...errors };
    resetProperties(errors, allErrors, propertyName, matchingProperty);
    setFormErrors({ ...allErrors });
  }

  function resetProperties(errors, allErrors, propertyName, matchingProperty) {
    if (!errors[propertyName]) {
      delete allErrors[propertyName];
    }

    if (!errors[matchingProperty]) {
      delete allErrors[matchingProperty];
    }
  }

  function getMatchingProperty(schema, formSchema, propertyName) {
    if (schema.matchingProperty) return schema.matchingProperty;

    for (const property in formSchema) {
      if (property === propertyName) continue;

      if (formSchema.hasOwnProperty(property) && formSchema[property].matchingProperty === propertyName) {
        return property;
      }
    }
  }

  return {
    formData,
    formErrors,
    handleSubmit,
    handleInputChange,
    submitErrorMessage
  };
}
