import { renderHook, act } from '@testing-library/react-hooks';

import useForm from '../useForm';
import { Schema } from '../../validation';

const LAST_NAME = 'last';
const FIRST_NAME = 'first';
const EVENT = {
  target: { name: FIRST_NAME, value: 'def' },
  preventDefault: jest.fn()
};

const VALID_FORM = { [FIRST_NAME]: 'abcd', [LAST_NAME]: 'abcd' };
const DEFAULT_STATE = { [FIRST_NAME]: '', [LAST_NAME]: '' };

const DEFAULT_SCHEMA = {
  [FIRST_NAME]: new Schema().min(4).isRequired(),
  last: new Schema()
};

describe('useForm hook', () => {
  function setup(schema = DEFAULT_SCHEMA, state = DEFAULT_STATE) {
    const { result } = renderHook(() => useForm(schema, state));

    return result;
  }

  test('should set no errors by default and form data from state', () => {
    const result = setup();

    expect(result.current.errors).toStrictEqual({});
    expect(result.current.form).toStrictEqual(DEFAULT_STATE);
  });

  test('should set proper element value', () => {
    const result = setup();

    act(() => {
      result.current.handleInputChange(EVENT);
    });

    expect(result.current.form[FIRST_NAME]).toBe(EVENT.target.value);
  });

  test('should call user submit callback when form is valid', () => {
    const result = setup(undefined, VALID_FORM);
    const submitCallback = jest.fn();

    act(() => {
      result.current.handleSubmit(submitCallback, EVENT);
    });

    expect(submitCallback).toHaveBeenCalled();
    expect(result.current.errors).toEqual({});
    expect(result.current.submitError).toBe('');
  });

  test('should set submitErrorMessage when error occurs while submitting valid form', () => {
    const result = setup(undefined, VALID_FORM);
    const submitCallback = {}; // Will throw when called by handleSubmit

    act(() => {
      result.current.handleSubmit(submitCallback, EVENT);
    });

    expect(result.current.submitError).not.toBeNull();
  });
});
