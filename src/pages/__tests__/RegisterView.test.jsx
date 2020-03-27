import React from 'react';

import { VALIDATION_ERROR_MESSAGES as Messages } from '../../validation/constants';
import { act, fireEvent, fireChangeEvent, renderWithRouter } from 'test-utils';

import RegisterView from '../RegisterView';

/************************************
 * Constants
 ************************************/

const VALID_EMAIL = 'test1@gmail.com';
const VALID_PASSWORD = 'Test123!';
const INVALID_EMAIL = 'test';

describe('Register View Component Tests', function() {
  function setup() {
    return renderWithRouter(<RegisterView />);
  }

  test('initial render, registration inputs should be in view', () => {
    const { getAllByLabelText } = setup();
    const inputs = getAllByLabelText(/input/i);

    expect(inputs.length).toBe(3);

    inputs.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  test('Invalid email typed, error message should be shown', () => {
    const { getByLabelText, getByText } = setup();
    const emailInput = getByLabelText(/email/i);

    fireChangeEvent(emailInput, INVALID_EMAIL);

    const emailErrorMessage = getByText(/email address/i);
    expect(emailErrorMessage).toBeInTheDocument();
  });

  test('Valid inputs entered, fetch should be called', async () => {
    const { getByLabelText, getByText } = setup();

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/^password$/i);
    const reenteredPasswordInput = getByLabelText(/reenter/i);

    fireChangeEvent(emailInput, VALID_EMAIL);
    fireChangeEvent(passwordInput, VALID_PASSWORD);
    fireChangeEvent(reenteredPasswordInput, VALID_PASSWORD);

    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    await act(async () => {
      fireEvent.click(getByText(/sign up/i));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Inputs not entered, error messages should be displayed', () => {
    const { getAllByText, getByText } = setup();

    fireEvent.click(getByText(/sign up/i));

    // TODO: should setup actual messages to be used;
    // every time the error messages change, the tests have
    // to be modified. Flimsy
    const errorMessages = getAllByText(Messages.REQUIRED);
    expect(errorMessages.length).toBe(3);
    errorMessages.forEach(message => {
      expect(message).toBeInTheDocument();
    });
  });
});
