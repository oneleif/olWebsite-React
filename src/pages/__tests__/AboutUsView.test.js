import React from 'react';
import { renderWithRouter, fireEvent } from 'test-utils';

import AboutUsView from '../AboutUsView';

const PAGE_HEADER = 'About us';
const DISCORD_BUTTON = 'Join our Discord';
const CARD_TITLES = ['Open Source', 'Community', 'Experience'];
const FUTURE = 'Future';

describe('About Us View Tests', () => {
  test('Initial render', () => {
    const { queryByText } = renderWithRouter(<AboutUsView />);
    expect(queryByText(PAGE_HEADER)).toBeTruthy();
    expect(queryByText(PAGE_HEADER)).toBeInTheDocument();
  });

  test('should open new window when button is clicked', () => {
    window.open = jest.fn().mockImplementation();
    const { queryByText } = renderWithRouter(<AboutUsView />);

    fireEvent.click(queryByText(DISCORD_BUTTON));

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  test('should render about us cards', () => {
    const { queryByText } = renderWithRouter(<AboutUsView />);

    CARD_TITLES.map(TITLE => {
      expect(queryByText(TITLE)).toBeTruthy();
      expect(queryByText(TITLE)).toBeInTheDocument();
    });
  });

  test('should render future section', () => {
    const { queryByText } = renderWithRouter(<AboutUsView />);

    expect(queryByText(FUTURE)).toBeTruthy();
    expect(queryByText(FUTURE)).toBeInTheDocument();
  });
});
