import React from "react";

import { Link, withRouter } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function FeatureLink({ children, path = '/' }) {
  /************************************
   * Render
   ************************************/

  return (
    <Link className="copy-link" to={path} >
        {children}
        <FaArrowRight className='copy-icon'/>
    </Link>
  );
}

export default withRouter(FeatureLink);
