import React from 'react';
import { renderWithRouter } from 'test-utils';
import Toolbar from '../Toolbar';
import { useUser } from '../../../contexts/UserContext';

jest.mock('../../../contexts/UserContext');
const { UserProvider } = jest.requireActual('../../../contexts/UserContext');

describe('Hamburger Toolbar Component Tests', function() {
  test('should show navigation links', () => {
    useUser.mockReturnValue([null, null]);
    const { queryAllByRole, queryByText } = renderWithRouter(
      <UserProvider>
        <Toolbar />
      </UserProvider>
    );

    // 4 links (home, contact us, active projects, meet the team)
    expect(queryAllByRole('link').length).toBe(4);
    expect(queryByText('Contact Us')).toBeInTheDocument();
    expect(queryByText('Active Projects')).toBeInTheDocument();
    expect(queryByText('Meet the Team')).toBeInTheDocument();
  });
});
