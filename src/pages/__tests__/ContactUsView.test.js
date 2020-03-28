import React from 'react';
import { render } from 'test-utils';

import ContactUsView from '../ContactUsView';

const PAGE_HEADER = 'Contact Us';

describe('Contact Us View Tests', () => {
  test('Initial render', () => {
    const { queryByText } = render(<ContactUsView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });
});
