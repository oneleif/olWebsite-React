import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import homeLogo from "../../images/homeLogo.png";

import { FaSearch, FaUser, FaBars } from "react-icons/fa";

function HamburgerToolbar() {
  /************************************
   * State
   ************************************/
  
   const [showNavigation, setShowNavigation] = useState(false);

  /************************************
   * Render
   ************************************/

  return (
    <header id="hamburgerToolbar">
      <nav>
        <h1>
          <Link to="/">
            <img className="top-nav-logo" src={homeLogo} alt="oneleif logo" />
          </Link>
        </h1>
        <ul className="top-nav-icons">
          <li>
            <FaSearch tabIndex="0" />
          </li>
          <li>
            <FaUser tabIndex="0"/>
          </li>
          <li>
            <FaBars aria-label="Hamburger Button" tabIndex="0" 
              onClick={(() => setShowNavigation(!showNavigation))} 
              onKeyPress={(() => setShowNavigation(!showNavigation))}/>
          </li>
        </ul>
      </nav>
      { showNavigation && 
      <nav>
        <ul data-testid='link-dropdown' className="link-dropdown">
          <li>
            <NavLink to="/join">Join</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">About</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/partners">Partners</NavLink>
          </li>
        </ul>
      </nav>
    }
    </header>
  );
}

export default withRouter(HamburgerToolbar);
