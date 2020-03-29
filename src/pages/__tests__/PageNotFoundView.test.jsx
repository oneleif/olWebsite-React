import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import PageNotFound from '../PageNotFoundView';

const intendedLocation = 'abc';

describe('PageNotFoundView', () => {
  function setup(route = '/') {
    return renderWithRouter(<PageNotFound />, { route });
  }

  test('should display intended location', () => {
    const { getByText } = setup(intendedLocation);

    expect(getByText(intendedLocation)).toBeVisible();
  });

  test('should take user to home on button click', () => {
    const { getByText, history } = setup(intendedLocation);

    fireEvent.click(getByText(/take me home/i));

    expect(history.location.pathname).toBe('/');
  });
});
