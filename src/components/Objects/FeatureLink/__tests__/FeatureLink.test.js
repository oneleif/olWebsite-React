import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import FeatureLink from '../FeatureLink';

const TEST = 'test';
const TEST_PATH = '/test';

describe('Feature Link Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<FeatureLink>{TEST}</FeatureLink>);
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Url path changes after link clicked', () => {
    const { history, queryByText } = renderWithRouter(<FeatureLink path={TEST_PATH}>{TEST}</FeatureLink>);
    fireEvent.click(queryByText(TEST));

    expect(history.location.pathname).toEqual(TEST_PATH);
  });
});
