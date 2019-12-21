import React from "react";
import { Link, withRouter } from "react-router-dom";

import homeLogo from "../images/homeLogo.png";

import { FaSearch, FaUser } from "react-icons/fa";

function Footer() {
  /************************************
   * Render
   ************************************/

  return (
    <footer>
      <ul className="logo-module">
        <li className="bottom-nav-logo">
          <img src={homeLogo} alt="oneleif logo" />
        </li>
        <li>cool description</li>
        <li>goes here very</li>
        <li>cool text</li>
        <li>More...</li>
      </ul>
      <nav>
        <ul className="middle-module">
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/partners">Partners</Link>
          </li>
        </ul>
        <ul className="right-module">
          <ul className="icon-module">
            <li>
              <FaSearch tabIndex="0" />
            </li>
            <li>
              <Link to="/login">
                <FaUser />
              </Link>
            </li>
          </ul>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
          <li>
            <Link to="/">X X X X X</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default withRouter(Footer);
