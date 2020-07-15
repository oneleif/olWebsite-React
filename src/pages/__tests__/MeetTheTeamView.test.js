import React from 'react';
import { renderWithRouter } from 'test-utils';

import MeetTheTeamView from '../MeetTheTeamView';

const TITLE = 'Meet the Team';

describe('Meet the Team Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = renderWithRouter(<MeetTheTeamView />);
    expect(queryByText(TITLE)).toBeTruthy();
  });
});
