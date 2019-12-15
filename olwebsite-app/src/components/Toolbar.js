import React from "react";
import { Link, withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

import homeLogo from "../images/homeLogo.png";

import { FaSearch, FaUser } from "react-icons/fa";

function Header() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="tool-bar">
      <Link to="/">
        <img className="top-nav-logo" src={homeLogo} alt="oneleif logo" />
      </Link>
      <NavLink
        to="/Meet-the-team"
        className="top-nav top-nav-link"
        activeClassName="top-nav-link-active"
      >
        Meet the team
      </NavLink>
      <NavLink
        to="/Dev-Docs"
        className="top-nav top-nav-link"
        activeClassName="top-nav-link-active"
      >
        DevDocs
      </NavLink>
      <NavLink
        to="/Blogs"
        className="top-nav top-nav-link"
        activeClassName="top-nav-link-active"
      >
        Blogs
      </NavLink>
      <NavLink
        to="/Resources"
        className="top-nav top-nav-link"
        activeClassName="top-nav-link-active"
      >
        Resources
      </NavLink>
      <div className="icon-container">
        <FaSearch tabIndex="0" className="top-nav top-nav-icon" />
        <Link to="/Login" className="top-nav top-nav-icon">
          <FaUser />
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Header);
