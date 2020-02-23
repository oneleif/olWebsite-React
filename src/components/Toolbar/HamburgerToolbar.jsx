import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import SearchBox from '../SearchBox/SearchBox';
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
          {/* <li>
            <FaUser tabIndex="0" />
          </li> */}
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
              <div className='search-box-wrapper'>
                <SearchBox placeholder='Search oneleif...' onSearch={() => {}} />
              </div>
            </li>
            <li>
              <NavLink to='/active-projects'>Active Projects</NavLink>
            </li>
            <li>
              <NavLink to='/about-us'>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to='/posts'>Meet the Team</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default withRouter(HamburgerToolbar);
