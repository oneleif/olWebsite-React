import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useUser } from '../../../contexts/UserContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [user] = useUser();

  /************************************
   * Render
   ************************************/

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
      }
    />
  );
}
