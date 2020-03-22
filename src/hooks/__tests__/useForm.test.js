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

    const callback = jest.fn().mockImplementation((propertyName, errors) => {
      return { [propertyName]: [...errors] };
    });
    return { result, callback };
  }

  test('should set no errors by default and form data from state', () => {
    const { result } = setup();

    expect(result.current.formErrors).toStrictEqual({});
    expect(result.current.formData).toStrictEqual(DEFAULT_STATE);
  });

  test('should handle proper element value and error onChange', () => {
    const { result, callback } = setup();

    act(() => {
      result.current.handleInputChange(EVENT, callback);
    });

    expect(result.current.formData[FIRST_NAME]).toBe(EVENT.target.value);
    expect(result.current.formErrors[FIRST_NAME].length).toBeGreaterThan(0);
  });

  test('should set form errors when invalid form submitted', () => {
    const { result } = setup();

    act(() => {
      result.current.handleSubmit(EVENT);
    });

    expect(result.current.submitErrorMessage).toBeNull();
    expect(result.current.formErrors[FIRST_NAME].length).toBeGreaterThan(0);
  });

  test('should call user submit callback when form is valid', () => {
    const { result } = setup(undefined, VALID_FORM);
    const callback = jest.fn().mockResolvedValue(true);

    act(() => {
      result.current.handleSubmit(EVENT, callback);
    });

    expect(callback).toHaveBeenCalled();
    expect(result.current.submitErrorMessage).toBeNull();
  });

  test('should set submitErrorMessage when error occurs while submitting valid form', () => {
    const { result } = setup(undefined, VALID_FORM);

    act(() => {
      result.current.handleSubmit(EVENT);
    });

    expect(result.current.submitErrorMessage).not.toBeNull();
  });
});
