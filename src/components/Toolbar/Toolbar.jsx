import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import Logo from '../../assets/Logo.png';
import NavArrow from '../../assets/Icons/NavArrow';
import { mobileLinks, navLinks } from './js/toolbar-nav-links';

/************************************
 * Constants
 ************************************/

const DEFAULT_CLASSES = ['main-nav', 'user-actions'];
const MEDIUM_BREAKPOINT = 960;

function Toolbar() {
  /************************************
   * State
   ************************************/

  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState(DEFAULT_CLASSES);

  /************************************
   * Hooks
   ************************************/

  /**
   * Handles opening/closing of mobile navigation toolbar
   * @returns {void}
   * @callback
   */
  const handleToggle = useCallback(() => {
    // if closing (open == true) then resetting classNames
    isOpen ? setClasses(DEFAULT_CLASSES) : generateOpenClasses();
    setIsOpen(!isOpen);
  }, [isOpen]);

  /**
   * Callback used by resize eventListener to close mobile nav bar in desktop view
   * @returns {void}
   * @callback
   */
  const memoNavCleanUp = useCallback(() => {
    // if mobile bar is open and screen width is greater than medium breakpoint (see _screens.scss)
    return isOpen && window.innerWidth > MEDIUM_BREAKPOINT ? handleToggle() : null;
  }, [isOpen, handleToggle]);

  useEffect(() => {
    // adds event listener for window resizing
    window.addEventListener('resize', memoNavCleanUp);
    return () => {
      // removes the event listener whenever component unmounted
      window.removeEventListener('resize', memoNavCleanUp);
    };
  }, [memoNavCleanUp]);

  /************************************
   * Functions
   ************************************/

  /**
   * Applies open rule to className to add open attributes to parts of navbar
   * @returns {void}
   */
  function generateOpenClasses() {
    setClasses(
      DEFAULT_CLASSES.map(className => {
        return `${className} open`;
      })
    );
  };

  /**
   * Function to make sure handle toggle is called only if navbar is open when clicking a link.
   * @returns {(Function|null)}
   */
  function closeNav() {
    return isOpen ? handleToggle() : null;
  };

  /************************************
   * Render
   ************************************/

  return (
    <header>
      <nav className='navbar'>
        <ul className='nav-links'>
          <div className='icons'>
            <Link to='/' onClick={closeNav}>
              <img className='toolbar-logo' src={Logo} alt='oneleif logo' />
            </Link>
            <HamburgerMenu
              className='toggle'
              menuClicked={handleToggle}
              isOpen={isOpen}
              width={22}
              height={19}
              strokeWidth={1}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.5}
            />
          </div>

          {/* Main links  */}
          <div data-testid='nav' className={classes[0]}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path} activeClassName='active-link' onClick={closeNav}>
                  {link.copy} <NavArrow />
                </NavLink>
              </li>
            ))}
            {mobileLinks.map((link, index) => (
              <li className='mobile-link' key={index}>
                <NavLink to={link.path} activeClassName='active-link' onClick={closeNav}>
                  {link.copy}
                </NavLink>
              </li>
            ))}
          </div>

          {/* TODO: v-2 User links */}
          {/* <div className={classes[1]}>
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
          </div> */}
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Toolbar);
