import React from 'react';
import ReactGA from 'react-ga';

import { Link, withRouter } from 'react-router-dom';

/**
* Component that Displays a header with an unordered list of links.
* Takes in a {@class String} header and an array of objects that contain a label and path
* 
*  For example: [{ label: 'link', path: '/path', internal: true }]
* 
* Also takes in a {@class boolean} internal; it determines whether the intended path is internal to 
* the site or not, and handles it accordingly
*/
function NavLinkList({ header, links }) {
 /************************************
  * Private Methods
  ************************************/

 /**
  * Called when an external link is clicked, used to capture the event of a Nav List
  * Outward link being clicked
  * @param event
  */
  function handleLinkClicked(event) {
    ReactGA.event({ category: 'Nav List Outward Link', action: 'Clicked', label: event.target.href });
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='nav-link-list-container'>
      <h5>{header}</h5>
      <ul>
        {links?.map((link) => (
          <li key={link.label}>
            { link.internal ? 
              <Link to={link.path}>
                {link.label}
              </Link> 
              : 
              <a onClickCapture={handleLinkClicked} 
                href={link.path} 
                target='_blank' 
                rel='noopener noreferrer'>
                {link.label}
              </a>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(NavLinkList);
