import React from 'react';
import { renderWithRouter } from 'test-utils';
import Toolbar from '../Toolbar';
import { useUser } from '../../../contexts/UserContext';

jest.mock('../../../contexts/UserContext');
const { UserProvider } = jest.requireActual('../../../contexts/UserContext');

describe('Toolbar Component Tests', function() {
  function setup(useUserValue = [null, null]) {
    useUser.mockReturnValue(useUserValue);
    const { queryAllByRole, queryByText, queryByTestId, debug } = renderWithRouter(
      <UserProvider>
        <Toolbar />
      </UserProvider>
    );

    return { queryAllByRole, queryByText, queryByTestId, debug };
  }

  test('should show navigation links', () => {
    const { queryAllByRole, queryByText } = setup();

    // 4 links (home, contact us, active projects, meet the team)
    expect(queryAllByRole('link').length).toBe(4);
    expect(queryByText('Contact Us')).toBeInTheDocument();
    expect(queryByText('Active Projects')).toBeInTheDocument();
    expect(queryByText('Meet the Team')).toBeInTheDocument();
  });

  test.skip('initial render, without a user, sign up should be shown', () => {
    const { queryAllByRole, queryByText } = setup();

    // 5 links (home, about us, posts, partners, sign up)
    expect(queryAllByRole('link').length).toBe(5);
    expect(queryByText('About Us')).toBeInTheDocument();
    expect(queryByText('Posts')).toBeInTheDocument();
    expect(queryByText('Partners')).toBeInTheDocument();
    expect(queryByText('Sign Up')).toBeInTheDocument();
  });

  test.skip('Show profile link and not sign up when a user exists in the context', () => {
    useUser.mockReturnValue([{ something: 'anything' }]);
    const { queryAllByRole, queryByText } = renderWithRouter(
      <UserProvider>
        <Toolbar />
      </UserProvider>
    );

    // 5 links (home, about us, posts, partners, profile)
    expect(queryAllByRole('link').length).toBe(5);
    expect(queryByText('About Us')).toBeInTheDocument();
    expect(queryByText('Posts')).toBeInTheDocument();
    expect(queryByText('Partners')).toBeInTheDocument();
    expect(queryByText('Sign Up')).not.toBeInTheDocument();
  });
});
