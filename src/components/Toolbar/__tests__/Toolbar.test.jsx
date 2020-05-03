import React from 'react';
import Toolbar from '../Toolbar';
import { useUser } from '../../../contexts/UserContext';
import { renderWithRouter, fireEvent, act } from 'test-utils';

//  TODO: v-2
// jest.mock('../../../contexts/UserContext');
// const { UserProvider } = jest.requireActual('../../../contexts/UserContext');
const MEDIUM_BREAKPOINT = 960;

describe('Toolbar Tests', function() {
  function setup(useUserValue = [null, null]) {
    // TODO: v-2 useUser.mockReturnValue(useUserValue);
    const { queryAllByRole, queryByText, queryByLabelText, getByTestId } = renderWithRouter(
      // TODO: v-2 <UserProvider>
      <Toolbar />
      //  </UserProvider>
    );

    return { queryAllByRole, queryByText, queryByLabelText, getByTestId };
  }

  test('should show navigation links', () => {
    const { queryAllByRole, queryByText } = setup();

    // 4 links (home, contact us, projects, meet the team)
    expect(queryAllByRole('link').length).toBe(4);
    expect(queryByText('Contact Us')).toBeInTheDocument();
    expect(queryByText('Projects')).toBeInTheDocument();
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

  test('Toolbar resized to width over medium screen breakpoint; Mobile Navigation Menu Closed', () => {
    const { queryByLabelText, getByTestId } = setup();
    window.innerWidth = MEDIUM_BREAKPOINT - 10;
    window.dispatchEvent(new Event('resize'));

    fireEvent.click(queryByLabelText('hamburger'));

    expect(getByTestId('nav').getAttribute('class').includes('open')).toBeTruthy();

    act(() => {
      window.innerWidth = MEDIUM_BREAKPOINT + 10;
      window.dispatchEvent(new Event('resize'));
    });

    expect(getByTestId('nav').getAttribute('class').includes('open')).toBeFalsy();
  });

  test('Opening navbar and clicking one of the links', () => {
    const { queryByLabelText, getByTestId, queryByText } = setup();
    
    fireEvent.click(queryByLabelText('hamburger'));
    expect(getByTestId('nav').getAttribute('class').includes('open')).toBeTruthy();

    fireEvent.click(queryByText('Contact Us'));

    expect(getByTestId('nav').getAttribute('class').includes('open')).toBeFalsy();
  });
});
