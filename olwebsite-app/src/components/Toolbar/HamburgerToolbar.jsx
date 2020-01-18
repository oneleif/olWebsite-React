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
        <div className="top-nav-icons">
            <FaSearch tabIndex="0" />
            <FaUser tabIndex="0"/>
            <FaBars tabIndex="0" 
              onClick={(() => toggleNavigvation())} 
              onKeyPress={(() => toggleNavigvation())}/>
        </div>
      </nav>
      <nav>
        <div id="myLinks" ref={myRef}>
          <NavLink to="/join">Join</NavLink>
          <NavLink to="/about-us">About</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/partners">Partners</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default withRouter(HamburgerToolbar);
