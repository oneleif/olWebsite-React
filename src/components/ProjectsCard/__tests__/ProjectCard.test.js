import React from 'react';
import { renderWithRouter } from 'test-utils';

import ProjectCard from '../ProjectCard';

const TEST_PROJECT = {
  name: 'Project',
  type: 'Test Type',
  details: 'Test Details',
  image: '',
  tags: ['Test tag']
};

describe('Project Card Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<ProjectCard project={TEST_PROJECT} />);
    expect(queryByText(TEST_PROJECT.name)).toBeTruthy();
    expect(queryByText(TEST_PROJECT.type)).toBeTruthy();
    expect(queryByText(TEST_PROJECT.details)).toBeTruthy();
    expect(queryByText(TEST_PROJECT.tags[0])).toBeTruthy();
  });
});
