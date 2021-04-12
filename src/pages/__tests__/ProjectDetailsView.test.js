import React from 'react';
import { renderWithRouter } from 'test-utils';

import ProjectDetailsView from '../ProjectDetailsView';

const TABS = ['Description', 'Tags', 'Links', 'Project Members'];

describe('Project Details View Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = renderWithRouter(<ProjectDetailsView />);

    TABS.map(TAB_NAME => {
      expect(queryByText(TAB_NAME)).toBeTruthy();
    });
  });
});
