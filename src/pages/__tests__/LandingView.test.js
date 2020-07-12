import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import LandingView from '../LandingView';

const DISCORD_BUTTON = 'Join our Discord';
const PAGE_HEADER = 'oneleif';

describe('Landing View Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<LandingView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
  });

  test('New window opened after Discord Button clicked', () => {
    window.open = jest.fn().mockImplementation();
    const { queryByText } = renderWithRouter(<LandingView />);

    fireEvent.click(queryByText(DISCORD_BUTTON));

    expect(window.open).toBeCalledTimes(1);
  });
});
