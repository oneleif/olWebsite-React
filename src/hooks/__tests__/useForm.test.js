import { renderHook, act } from '@testing-library/react-hooks';

import useForm from '../useForm';
import { Schema } from '../../validation';

const LAST_NAME = 'last';
const FIRST_NAME = 'first';
const EVENT = { target: { name: FIRST_NAME, value: 'def' }, preventDefault: jest.fn() };

const VALID_FORM = { [FIRST_NAME]: 'abcd', [LAST_NAME]: 'abcd' };
const DEFAULT_STATE = { [FIRST_NAME]: '', [LAST_NAME]: '' };
const DEFAULT_SCHEMA = { [FIRST_NAME]: new Schema().min(4).validate(), last: new Schema().validate() };

describe('useForm hook', () => {
  function setup(schema = DEFAULT_SCHEMA, state = DEFAULT_STATE) {
    const { result } = renderHook(() => useForm(schema, state));

    const validateProperty = jest.fn();
    return { result, validateProperty };
  }

  test('should set no errors by default and form data from state', () => {
    const { result } = setup();

    expect(result.current.formErrors).toStrictEqual({});
    expect(result.current.formData).toStrictEqual(DEFAULT_STATE);
  });

  test('should set proper element value and call validation function', () => {
    const { result, validateProperty } = setup();

    act(() => {
      result.current.handleInputChange(EVENT, validateProperty);
    });

    const { value, name: propertyName } = EVENT.target;
    const schema = DEFAULT_SCHEMA[propertyName];

    expect(result.current.formData[FIRST_NAME]).toBe(EVENT.target.value);
    expect(validateProperty).toHaveBeenCalledWith(value, schema, propertyName);
  });

  test('should call user submit callback when form is valid', () => {
    const { result, validateProperty: validateForm } = setup(undefined, VALID_FORM);
    const doSubmit = jest.fn().mockResolvedValue(true);

    act(() => {
      result.current.handleSubmit(EVENT, validateForm, doSubmit);
    });

    expect(doSubmit).toHaveBeenCalled();
    expect(result.current.submitErrorMessage).toBeNull();
  });

  test('should set submitErrorMessage when error occurs while submitting valid form', () => {
    const { result, validateProperty: validateForm } = setup(undefined, VALID_FORM);

    act(() => {
      result.current.handleSubmit(EVENT, validateForm);
    });

    expect(result.current.submitErrorMessage).not.toBeNull();
  });
});
