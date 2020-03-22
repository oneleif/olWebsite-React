import React from 'react';

import LoginView from '../LoginView';
import { act, fireChangeEvent, fireEvent, renderWithRouter } from 'test-utils';

/************************************
 * Constants
 ************************************/

const VALID_EMAIL = 'test1@gmail.com';
const VALID_PASSWORD = 'Test123!';

describe('Login View Component Tests', function() {
  function setup() {
    return renderWithRouter(<LoginView />);
  }

  test('initial render, login inputs should be in view', () => {
    const { getAllByLabelText } = setup();

    const inputs = getAllByLabelText(/input/i);
    expect(inputs.length).toBe(2);

    inputs.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });

  test('Valid inputs entered, fetch should be called', async () => {
    const { getByLabelText, getByText } = setup();

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/^password$/i);

    fireChangeEvent(emailInput, VALID_EMAIL);
    fireChangeEvent(passwordInput, VALID_PASSWORD);

    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    await act(async () => {
      fireEvent.click(getByText(/log in/i));
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Inputs not entered, error messages should be displayed', () => {
    const { getAllByText, getByText } = setup();

    fireEvent.click(getByText(/log in/i));

    // TODO: should setup actual messages to be used;
    // every time the error messages change, the tests have
    // to be modified. Flimsy
    const errorMessages = getAllByText(/value/i);
    expect(errorMessages.length).toBe(2);
    errorMessages.forEach(message => {
      expect(message).toBeInTheDocument();
    });
  });
});
