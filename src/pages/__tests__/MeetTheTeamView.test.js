import React from 'react';
import { render } from '@testing-library/react';

import MeetTheTeamView from '../MeetTheTeamView';

const TITLE = 'Meet the Team';

describe('Meet the Team Tests', () => {
  test('Initial Render', () => {
    const { queryByText } = render(<MeetTheTeamView />);
    expect(queryByText(TITLE)).toBeTruthy();
  });
});
