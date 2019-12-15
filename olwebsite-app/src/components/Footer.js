import React from "react";
import { Link, withRouter } from "react-router-dom";

import homeLogo from "../images/homeLogo.png";

import { FaSearch, FaUser, FaLeaf } from "react-icons/fa";

function Footer() {
  /************************************
   * Render
   ************************************/

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-column footer-column-left">
          <Link to="/">
            <img
              className="site-footer-logo"
              src={homeLogo}
              alt="oneleif logo"
            />
          </Link>
          <Link to="/" className="site-footer-leaf-icon site-footer-icon">
            <FaLeaf />
          </Link>

          <p className="site-footer-text site-footer-text-left">
            cool description
            <br />
            goes here very
            <br />
            cool text
            <br />
            More...
          </p>
        </div>
        <div className="footer-column footer-column-center">
          <div className="footer-column-link-container">
            <Link to="/Meet-the-team" className="site-footer-nav-link">
              Meet the team
            </Link>
            <Link to="/Dev-Docs" className="site-footer-nav-link">
              DevDocs
            </Link>
            <Link to="/Blogs" className="site-footer-nav-link">
              Blogs
            </Link>
            <Link to="/Resources" className="site-footer-nav-link">
              Resources
            </Link>
          </div>
        </div>
        <div className="footer-column footer-column-right">
          <div className="footer-column-icon-container">
            <FaSearch className="site-footer-icon" />
            <Link
              to="/Login"
              className="site-footer-icon site-footer-icon-link"
            >
              <FaUser />
            </Link>
          </div>
          <p className="site-footer-text site-footer-text-right">Contact</p>
          <p className="site-footer-text site-footer-text-right">Terms</p>
          <p className="site-footer-text site-footer-text-right">X X X X X</p>
        </div>
      </div>
    </footer>
  );
}

export default withRouter(Footer);
