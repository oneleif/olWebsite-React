import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';
import ReactGA from 'react-ga';

import FeatureLink from '../FeatureLink';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST = 'test';
const TEST_PATH = '/path';

describe('Feature Link Tests', () => {
  function setUp() {
    const { history, queryByText } = renderWithRouter(<FeatureLink path={TEST_PATH}>{TEST}</FeatureLink>);
    return { history, queryByText };
  }

  test('Initial render', () => {
    const { queryByText } = setUp();
    expect(queryByText(TEST)).toBeTruthy();
  });

  test('Url path changes after link clicked', () => {
    const { history, queryByText } = setUp();
    fireEvent.click(queryByText(TEST));

    expect(history.location.pathname).toEqual(TEST_PATH);
  });

  test('ReactGA event fired after link clicked', () => {
    const { queryByText } = setUp();
    fireEvent.click(queryByText(TEST));

    expect(ReactGA.event).toHaveBeenCalled();
  });
});
