import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import homeLogo from '../../assets/homeLogo.png';

const DEFAULT_CLASSES = ['main-nav', 'user-actions'];

function Toolbar() {
  /************************************
   * State
   ************************************/

  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState(DEFAULT_CLASSES);

  /************************************
   * Functions
   ************************************/

  function handleToggle() {
    isOpen ? setClasses(DEFAULT_CLASSES) : generateOpenClasses();
    setIsOpen(!isOpen);
  }

  function generateOpenClasses() {
    setClasses(
      DEFAULT_CLASSES.map(className => {
        return `${className} open`;
      })
    );
  }

  const closeNav = () =>{ 
    return isOpen? handleToggle: null; 
  }

  /************************************
   * Render
   ************************************/

  return (
    <header>
      <nav className='navbar'>
        <ul className='nav-links'>
          <span className='icons'>
            <Link to='/'>
              <img src={homeLogo}  alt='oneleif logo' onClick={closeNav}/>
            </Link>
            <FaBars className='toggle' onClick={handleToggle} />
          </span>

          {/* Main links  */}
          <span className={classes[0]}>
            <li>
              <NavLink to='/contact-us' activeClassName='active-link' onClick={closeNav}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to='/active-projects' activeClassName='active-link' onClick={closeNav}>
                Active Projects
              </NavLink>
            </li>
            <li>
              <NavLink to='/meet-the-team' activeClassName='active-link' onClick={closeNav}>
                Meet the Team
              </NavLink>
            </li>
          </span>

          {/* TODO: v-2 User links */}
          {/* <span className={classes[1]}>
            <li>
              <NavLink to='/login' activeClassName='active-link'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/signup' activeClassName='active-link'>
                Signup
              </NavLink>
            </li>
          </span> */}
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Toolbar);
