import React from 'react';
import { render, fireEvent } from 'test-utils';

import SocialMediaContainer from '../SocialMediaContainer';
import { SocialMediaIconsDesktopMap } from '../../../assets/SocialMediaIcons/SocialMediaIcons';

describe('Social Media Container Tests', () => {
  test('Initial render', () => {
    const { container } = render(<SocialMediaContainer />);
    expect(container).toBeTruthy();
  });

  test('New window opened after social media icon clicked', () => {
    window.open = jest.fn().mockImplementation();
    const { queryByLabelText } = render(<SocialMediaContainer />);

    fireEvent.click(queryByLabelText(SocialMediaIconsDesktopMap.TWITTER.label));

    expect(window.open).toBeCalledTimes(1);
  });
});
