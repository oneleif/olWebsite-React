import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';
import ReactGA from 'react-ga';

import FeatureLink from '../FeatureLink';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

const TEST = 'test';
const TEST_PATH = '/test';

describe('Feature Link Tests', () => {
  function setUp() {
    const { history, queryAllByText } = renderWithRouter(<FeatureLink path={TEST_PATH}>{TEST}</FeatureLink>);
    return { history, queryAllByText };
  }

  test('Initial render', () => {
    const { queryAllByText } = setUp();
    expect(queryAllByText(TEST)).toBeTruthy();
  });

  test('Url path changes after link clicked', () => {
    const { history, queryAllByText } = setUp();
    const links = queryAllByText(TEST);
    fireEvent.click(links[0]);

    expect(history.location.pathname).toEqual(TEST_PATH);
  });

  test('ReactGA event fired after link clicked', () => {
    const { queryAllByText } = setUp();
    const links = queryAllByText(TEST);

    fireEvent.click(links[0]);
    expect(ReactGA.event).toHaveBeenCalled();
  });
});
