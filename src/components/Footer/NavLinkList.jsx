import React from 'react';
import { Link, withRouter } from 'react-router-dom';


/**
* Component that Displays a header with an unordered list of links.
* Takes in a {@class String} header and an array of objects that contain a label and path
* 
*  For example: [{ link: 'link', path: '/path', internal: true}]
* 
* Also takes in a {@class boolean} internal; it determines whether the intended path is internal to 
* the site or not, and handles it accordingly
*/
function NavLinkList({ header, links, internal }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='nav-link-list-container'>
        <h5>{header}</h5>
        <ul>
            {links?.map((link) => (
                <li key={link.label}>
                  {link.internal ? <Link to={link.path}>{link.label}</Link> : <a href={link.path} target='_blank' rel='noopener noreferrer'>{link.label}</a>}
                </li>
            ))}
        </ul>
    </div>
  );
}

export default withRouter(NavLinkList);
