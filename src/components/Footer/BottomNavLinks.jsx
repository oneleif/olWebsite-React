import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function BottomNavLinks({ header, links }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='bottom-nav-container'>
        <h5>{header}</h5>
        <ul>
            {links?.map((link) => (
                <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
            ))}
        </ul>
    </div>
  );
}

export default withRouter(BottomNavLinks);
