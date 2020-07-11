import React from "react";

import { Link, withRouter } from 'react-router-dom';

function Tag({ children, target='/' }) {
  /************************************
   * Render
   ************************************/

   // TODO: Implement Google Analytics once we make tags clickable
  return (
    <Link className='tag-module' to={target} >
      {children}
    </Link>
  );
}

export default withRouter(Tag);
