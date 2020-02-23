import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import homeLogo from '../../images/homeLogo.png';
import { FaUser } from 'react-icons/fa';
import SearchBox from '../SearchBox/SearchBox';
import { useUser } from '../../contexts/UserContext';

function Toolbar() {
  /************************************
   * State
   ************************************/

  const [user] = useUser();

  /************************************
   * Render
   ************************************/

  return (
    <header id='toolBar'>
      <nav>
        <ul>
          <li className='top-nav-logo'>
            <h1>
              <Link to='/'>
                <img src={homeLogo} alt='oneleif logo' />
              </Link>
            </h1>
          </li>
          <li>
            <NavLink to='/active-projects' activeClassName='active-link'>
              Active Projects
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact-us' activeClassName='active-link'>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/meet-the-team' activeClassName='active-link'>
              Meet the Team
            </NavLink>
          </li>
        </ul>
      </nav>
      <ul className='icon-module'>
        <li>
          <SearchBox onSearch={() => {}} placeholder='Search oneleif...' isCollapsible={true} />
        </li>
        <li>
          {user ? (
            <Link to='/profile'>
              <FaUser />
            </Link>
          ) : (
            <NavLink to='/sign-up' activeClassName='active-link'>
              Sign Up
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}

export default withRouter(Toolbar);
