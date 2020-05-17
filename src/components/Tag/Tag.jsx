import React from "react";
import { Link, withRouter } from 'react-router-dom';

function Tag({ children, target='/' }) {
  /************************************
   * Render
   ************************************/

  return (
    <Link className='tag-module' to={target} >
      {children}
    </Link>
  );
}

export default withRouter(Tag);
