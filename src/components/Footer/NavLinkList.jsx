import React from 'react';
import { Link, withRouter } from 'react-router-dom';


/**
* Component that Displays a header with an unordered list of links.
* Takes in a {@code String} header and an array of objects that contain a label and path
*
*  For example: [{ link: 'link', path: '/path'}]
*/
function NavLinkList({ header, links }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='nav-link-list-container'>
        <h5>{header}</h5>
        <ul>
            {links?.map((link) => (
                <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
            ))}
        </ul>
    </div>
  );
}

export default withRouter(NavLinkList);
