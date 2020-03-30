import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import PageNotFound from '../PageNotFoundView';

const INTENDED_LOCATION = 'abc';
const HOME = '/';

describe('PageNotFoundView', () => {
  function setup(route = '/') {
    return renderWithRouter(<PageNotFound />, { route });
  }

  test('should display intended location', () => {
    const { getByText } = setup(INTENDED_LOCATION);

    expect(getByText(INTENDED_LOCATION)).toBeVisible();
  });

  test('should take user to home on button click', () => {
    const { getByText, history } = setup(INTENDED_LOCATION);

    fireEvent.click(getByText(/take me home/i));

    expect(history.location.pathname).toBe(HOME);
  });
});
