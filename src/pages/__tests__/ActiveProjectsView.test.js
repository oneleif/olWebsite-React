import React from 'react';
import { render } from 'test-utils';

import ActiveProjectsView from '../ActiveProjectsView';

const PAGE_HEADER = 'Active Projects';

describe('Active projects view tests', () => {
  test('initial render', () => {
    const { queryByText } = render(<ActiveProjectsView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });
});
