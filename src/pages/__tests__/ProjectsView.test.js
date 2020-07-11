import React from 'react';
import { renderWithRouter } from 'test-utils';

import ProjectsView from '../ProjectsView';

const PAGE_HEADER = 'Projects';

describe('Projects view tests', () => {
  test('initial render', () => {
    const { queryByText } = renderWithRouter(<ProjectsView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });
});
