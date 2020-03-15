import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import SocialMediaContainer from './SocialMediaContainer';
import BottomNavLinks from './BottomNavLinks';
import footerLinks from './js/footerLinks';

function Footer() {
  /************************************
   * Render
   ************************************/

  return (
    <footer>
      <div className='footer-nav-module'>
        <div className='left-navigation'>
          <h4>oneleif</h4>
          <SocialMediaContainer />
        </div>
        <div className='right-navigation'>
          {
            footerLinks.map((object, index) => (
              <BottomNavLinks key={index} header={object.header} links={object.links} />
            ))
          }
        </div>
      </div>
      <hr/> 
      <div className='bottom-navigation'>
        <div>
          <p>&copy; Oneleif 2020, All Rights Reserved.</p>
        </div>
        <ul>
          <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
          <li><Link to='/terms-and-conditions'>Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default withRouter(Footer);