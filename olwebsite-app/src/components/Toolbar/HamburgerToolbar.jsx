import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import homeLogo from "../../images/homeLogo.png";

import { FaSearch, FaUser, FaBars } from "react-icons/fa";

function HamburgerToolbar() {
  /************************************
   * Hooks
  ************************************/

  const myRef = useRef(null);

  /************************************
   * Helper Functions
  ************************************/

  /*
  * Used to toggle the horizontal navigation dropdown when the
  * user is viewing from mobile
  */
  function toggleNavigvation() {
    let navigation = myRef.current;
    if (navigation.style.display === "block") {
      navigation.style.display = "none";
    } else {
      navigation.style.display = "block";
    }
  }

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
            <FaBars tabIndex="0" 
              onClick={(() => toggleNavigvation())} 
              onKeyPress={(() => toggleNavigvation())}/>
          </li>
        </ul>
      </nav>
      <nav>
        <ul id="myLinks" ref={myRef}>
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
          < NavLink to="/partners">Partners</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(HamburgerToolbar);
