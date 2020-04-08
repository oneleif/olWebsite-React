import { useState } from 'react';

import { validate } from '../validation';
import { EMPTY_VALUE } from '../validation/constants';

/**
 * The useForm hook return value.
 * @typedef {object} UseFormReturnValue
 * @property {Object.<string,string>} form - The values of the properties in the form.
 * @property {Object.<string,string[]>} errors - The errors in the form.
 * @property {string} submitError - The error message when the form fails to submit successfully.
 * @property {Function} handleReset - Function to reset the form to its initial state.
 * @property {Function} handleSubmit - Function to validate the form and call the user callback.
 * @property {Function} handleInputChange - Function to validate changed input and set the state.
 */

/**
 * The useForm state.
 * @typedef {object} UseFormState
 * @property {Object.<string,string>} form - The values of the properties in the form.
 * @property {Object.<string,string[]>} errors - The errors in the form.
 * @property {string} submitError - The error message when the form fails to submit successfully.
 */

/**
 * Handle form functionality.
 * @class
 * @param {Function} schema - The schema of the form.
 * @param {object} [initialFormState=null] - The default values for form elements.
 * @returns {UseFormReturnValue} The form, errors and handlers.
 *
 * @example
 * const {
 *  form,
 *  errors,
 *  submitError,
 *  handleReset,
 *  handleSubmit,
 *  handleInputChange
 * } = useForm(formSchema);
 */
function useForm(schema, initialFormState = null) {
  /************************************
   * State
   ************************************/

  const [state, setState] = useState(init(schema, initialFormState));

  /************************************
   * Helper Functions
   ************************************/

  /**
   * Handles validating form and calling a user provided function when form is valid.
   * @async
   * @param {Function} submitForm - The user function to call on submit.
   * @param {Event} [event=null] - The form submit event.
   * @returns {Promise<void>} Nothing.
   */
  async function handleSubmit(submitForm, event = null) {
    if (event) event.preventDefault();

    // Validate and return errors
    const { isValid, errors: validationErrors } = validate(state.form, schema);
    if (!isValid) {
      setState({
        ...state,
        errors: {
          ...validationErrors
        }
      });
      return;
    }

    try {
      await submitForm();
    } catch (error) {
      // Note that the state will NOT be set if the  error is
      // caught inside the callback (submitForm) and not re-thrown
      setState({
        ...state,
        submitError: error.message
      });
    }
  }

  /**
   * Reset the form to its initial value.
   * @returns {void} Nothing.
   */
  function handleReset() {
    setState(init(schema, initialFormState));
  }

  /**
   * Set the new value onchange, and validate property or matching properties.
   * @param {Event} event - The onChange event.
   * @returns {void} Nothing.
   */
  function handleInputChange(event) {
    const { form } = state;
    const { value, name } = event.target;

    // Ah, the good old days!
    setState({
      ...state,
      form: {
        ...form,
        [name]: value
      },
      errors: {
        ...validateProperty(name, value)
      }
    });
  }

  /**
   * Validate one or pair of corresponding properties.
   * @param {string} name - The property name.
   * @param {string} value - The property value.
   * @returns {object} All the errors in the entire form.
   */
  function validateProperty(name, value) {
    const { errors, form } = state;
    let allErrors = {
      ...errors
    };
    const matchingProperty = getMatchingProperty(name, schema);

    // No matching property, just validate this one property
    if (!matchingProperty) {
      const { isValid, errors: propertyErrors } = validate(value, schema[name]);

      isValid
        ? delete allErrors[name]
        : (allErrors = {
            ...allErrors,
            [name]: propertyErrors
          });

      return { ...allErrors };
    }

    // Matching properties present. ex: password & confirm password
    const matchingValues = {
      [name]: value,
      [matchingProperty]: form[matchingProperty]
    };

    const matchingValuesSchema = {
      [name]: schema[name],
      [matchingProperty]: schema[matchingProperty]
    };

    // Clear previous errors on matching properties before
    // potentially re-setting them
    delete allErrors[name];
    delete allErrors[matchingProperty];

    const { errors: propertyErrors } = validate(matchingValues, matchingValuesSchema);

    return {
      ...allErrors,
      ...propertyErrors
    };
  }

  return {
    ...state,
    handleReset,
    handleSubmit,
    handleInputChange
  };
}

/**
 * Derive state from the given schema.
 * @param {object} schema - The given schema.
 * @param {object} initialFormState - The initial values of the form properties.
 * @returns {...UseFormState} The useForm initial state.
 */
function init(schema, initialFormState) {
  let form = initialFormState;

  if (!form) {
    form = {};
    for (const property in schema) {
      if (schema.hasOwnProperty(property)) {
        form[property] = EMPTY_VALUE;
      }
    }
  }
  return { form, errors: {}, submitError: EMPTY_VALUE };
}

/**
 * Get the corresponding property that matches the
 * current property being validated.
 *
 * @param {string} name - The property being validated.
 * @param {object} schema - The schema of the entire form.
 * @return {string} The name of the matching property.
 */
function getMatchingProperty(name, schema) {
  const { matchingProperty } = schema[name];

  if (matchingProperty) return matchingProperty;

  for (const property in schema) {
    // Don't bother comparing if it's the current property's schema
    if (property === name) continue;

    // Find and return the matching property
    if (schema.hasOwnProperty(property) && schema[property].matchingProperty === name) return property;
  }
}

export default useForm;
