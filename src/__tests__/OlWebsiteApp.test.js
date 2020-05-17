import React from 'react';

import { renderWithRouter } from 'test-utils';
import ReactGA from 'react-ga';

import OlWebsiteApp from '../OlWebsiteApp';

/**
 * Have to Mock React Google Analytics or test breaks
 */
jest.mock('react-ga');

describe('OlWebsiteApp', () => {
  test('renders without crashing', () => {
    const { container } = renderWithRouter(<OlWebsiteApp />);
    expect(container).toBeVisible();
  });

  test('ReactGA is initialized', () => {
    expect(ReactGA.initialize).toBeCalled();
  });
});
