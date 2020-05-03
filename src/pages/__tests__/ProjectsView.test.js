import React from 'react';
import { render } from 'test-utils';

import ProjectsView from '../ProjectsView';

const PAGE_HEADER = 'Projects';

describe('Projects view tests', () => {
  test('initial render', () => {
    const { queryByText } = render(<ProjectsView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });
});
