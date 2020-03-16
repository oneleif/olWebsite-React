import React from 'react';
import { render } from '@testing-library/react';

import FeatureCopy from '../FeatureCopy';
const TEST = 'test';

describe('Feature Copy Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = render(<FeatureCopy>{TEST}</FeatureCopy>);
    expect(queryByText(TEST)).toBeTruthy();
  });
});
