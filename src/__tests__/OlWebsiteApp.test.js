import React from 'react';

import { renderWithRouter } from 'test-utils';

import OlWebsiteApp from '../OlWebsiteApp';

describe('OlWebsiteApp', () => {
  test('renders without crashing', () => {
    const { container } = renderWithRouter(<OlWebsiteApp />);
    expect(container).toBeVisible();
  });
});
