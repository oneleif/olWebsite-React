import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import homeLogo from '../../images/homeLogo.png';

function HamburgerToolbar() {
  /************************************
   * State
   ************************************/

  const [showNavigation, setShowNavigation] = useState(false);

  /************************************
   * Render
   ************************************/

  return (
    <header id='hamburgerToolbar'>
      <nav>
        <h1>
          <Link to='/'>
            <img className='top-nav-logo' src={homeLogo} alt='oneleif logo' />
          </Link>
        </h1>
        <ul className='top-nav-icons'>
          <li>
            <FaBars
              aria-label='Hamburger Button'
              tabIndex='0'
              onClick={() => setShowNavigation(!showNavigation)}
              onKeyPress={() => setShowNavigation(!showNavigation)}
            />
          </li>
        </ul>
      </nav>
      {showNavigation && (
        <nav>
          <ul data-testid='link-dropdown' className='link-dropdown'>
            <li>
              <NavLink to='/contact-us'>Active Projects</NavLink>
            </li>
            <li>
              <NavLink to='/active-projects'>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to='/meet-the-team'>Meet the Team</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default withRouter(HamburgerToolbar);
