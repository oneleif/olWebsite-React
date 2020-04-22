import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import homeLogo from '../../assets/homeLogo.png';
import mobileHomeLogo from "../../assets/justoneleif_transparent.png";
import {useMediaQuery} from "react-responsive";



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
  const isMobile = useMediaQuery({query: `(max-width: ${MEDIUM_BREAKPOINT}px)`})

  /************************************
   * Hooks
   ************************************/

  /**
   * Handles opening/closing of mobile navigation toolbar
   * @returns {void}
   * @callback
   */
  const handleToggle = useCallback(() => {
    //if closing (open == true) then resetting classNames
    isOpen ? setClasses(DEFAULT_CLASSES) : generateOpenClasses();
    setIsOpen(!isOpen);
  }, [isOpen]);

  /**
   * Callback used by resize eventListener to close mobile nav bar in desktop view
   * @returns {void}
   * @callback
   */ 
  const memoNavCleanUp = useCallback(() => {
    //if mobile bar is open and screen width is greater than medium breakpoint (see _screens.scss)
    return (isOpen && window.innerWidth > MEDIUM_BREAKPOINT) ? handleToggle() : null;
  }, [isOpen, handleToggle]);

  useEffect(() => {
    //adds event listener for window resizing
    window.addEventListener('resize', memoNavCleanUp);
    return () => {
      //removes the event listener whenever component unmounted
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
            <Link to='/'>
              <img src={isMobile ? mobileHomeLogo : homeLogo}  alt='oneleif logo' onClick={closeNav}/>
            </Link>
            <FaBars aria-label='hamburger' size={24} className='toggle' onClick={handleToggle} />
          </div>

          {/* Main links  */}
          <div data-testid='nav' className={classes[0]}>
            <li>
              <NavLink to='/contact' activeClassName='active-link' onClick={closeNav}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to='/projects' activeClassName='active-link' onClick={closeNav}>
                Active Projects
              </NavLink>
            </li>
            <li>
              <NavLink to='/team' activeClassName='active-link' onClick={closeNav}>
                Meet the Team
              </NavLink>
            </li>
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
