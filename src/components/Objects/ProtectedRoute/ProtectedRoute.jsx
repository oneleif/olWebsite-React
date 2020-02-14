import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useUser } from '../../../contexts/UserContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [user] = useUser();

  /************************************
   * Helper Functions
   ************************************/

  function getRenderedComponent(props) {
    if (user) {
      return <Component {...props} />;
    }

    const { location } = props;
    return <Redirect to={{ pathname: '/login', state: { referer: location } }} />;
  }

  /************************************
   * Render
   ************************************/

  return <Route {...rest} render={getRenderedComponent} />;
}
