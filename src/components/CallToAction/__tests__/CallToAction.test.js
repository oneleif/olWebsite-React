import React from 'react';
import { render } from 'test-utils';

import CallToAction from '../CallToAction';

const TEST = 'test';

describe('Call To Action Tests', () => {
  test('Initial render', () => {
    const { queryByText } = render(<CallToAction title={TEST} />);
    expect(queryByText(TEST)).toBeTruthy();
  });
});
