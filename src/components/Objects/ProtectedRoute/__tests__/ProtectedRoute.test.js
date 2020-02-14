import React from 'react';
import { renderWithRouter } from 'test-utils';

import ProtectedRoute from '../ProtectedRoute';
import { useUser } from '../../../../contexts/UserContext';

jest.mock('../../../../contexts/UserContext.jsx');
const mockComponent = jest.fn().mockReturnValue(<h1>Protected Component</h1>);
const props = { path: '/protectedPath', component: mockComponent };

describe('Protected Route', () => {
  function setup(user = null) {
    useUser.mockReturnValue([user]);
    const { queryByRole, history } = renderWithRouter(<ProtectedRoute {...props} />, { route: props.path });
    return { queryByRole, history };
  }

  test('should redirect to login with referer path when unauthenticated user attempts to access protected route', () => {
    const { queryByRole, history } = setup();

    expect(history.location.pathname).toBe('/login');
    expect(history.location.state.referer.pathname).toBe(props.path);
    expect(queryByRole('heading')).not.toBeInTheDocument();
  });

  test('should display protected route component when user is logged in', () => {
    const user = {}; // A user object indicates that user is logged in
    const { queryByRole, history } = setup(user);

    expect(history.location.pathname).toBe(props.path);
    expect(queryByRole('heading')).toBeInTheDocument();
  });
});
