import React from "react";
import { Link, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import homeLogo from "../../images/homeLogo.png";

import { FaSearch } from "react-icons/fa";

function Toolbar() {
  /************************************
   * Render
   ************************************/

  return (
    <header id="toolBar">
      <nav>
        <ul>
          <li className="top-nav-logo">
            <h1>
              <Link to="/">
                <img src={homeLogo} alt="oneleif logo" />
              </Link>
            </h1>
          </li>
          <li>
            <NavLink to="/about-us">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/partners">Partners</NavLink>
          </li>
        </ul>
      </nav>
      <ul className="icon-module">
        <li>
          <FaSearch tabIndex="0" />
        </li>
        <li>
          <NavLink to="/sign-up">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default withRouter(Toolbar);
