import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import Footer from '../Footer';

const ONELEIF = 'oneleif';
const PRIVACY_POLICY = 'Privacy Policy';
const TEST_PATH = '/privacy-policy';

describe('Footer Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<Footer />);
    expect(queryByText(ONELEIF)).toBeTruthy();
  });

  test('Url path changes after link clicked', () => {
    const { history, queryByText } = renderWithRouter(<Footer />);
    fireEvent.click(queryByText(PRIVACY_POLICY));

    expect(history.location.pathname).toEqual(TEST_PATH);
  });
});
