import React from "react";
import { Link, withRouter } from "react-router-dom";

import homeLogo from "../images/homeLogo.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img className="top-nav-logo" src={homeLogo} alt="one leif logo" />
      </Link>
      <Link className="top-nav-link" to="/Meet-the-team">
        Meet the team
      </Link>
      <Link className="top-nav-link" to="/Dev-Docs">
        DevDocs
      </Link>
      <Link className="top-nav-link" to="/Blogs">
        Blogs
      </Link>
      <Link className="top-nav-link" to="/Resources">
        Resources
      </Link>
      <Link className="top-nav-link" to="/Login">
        Login
      </Link>
    </header>
  );
}

export default withRouter(Header);
