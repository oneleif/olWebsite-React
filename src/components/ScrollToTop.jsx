import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
  /************************************
   * Life Cycle Hooks
   ************************************/

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  /************************************
   * Render
   ************************************/

  return <>{children}</>;
}

export default withRouter(ScrollToTop);