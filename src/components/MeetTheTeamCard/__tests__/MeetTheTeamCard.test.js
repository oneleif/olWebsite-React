import React from 'react';
import { renderWithRouter } from 'test-utils';

import MeetTheTeamCard from '../MeetTheTeamCard';

const TEST_MEMBER = {
  name: 'Test Name',
  role: 'Test Role',
  location: 'Test Location',
  image: ' ',
  tags: ['Test tag']
};

describe('Meet The Team Card Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<MeetTheTeamCard member={TEST_MEMBER} />);
    expect(queryByText(TEST_MEMBER.name)).toBeTruthy();
    expect(queryByText(TEST_MEMBER.role)).toBeTruthy();
    expect(queryByText(TEST_MEMBER.location)).toBeTruthy();
    expect(queryByText(TEST_MEMBER.tags[0])).toBeTruthy();
  });
});
