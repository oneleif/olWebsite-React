import React from "react";
import { Link, withRouter } from "react-router-dom";

import homeLogo from "../images/homeLogo.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img className="logo" src={homeLogo} alt="one leif logo" />
      </Link>
      <Link className="link" to="/Meet-the-team">
        Meet the team
      </Link>
      <Link className="link" to="/Dev-Docs">
        DevDocs
      </Link>
      <Link className="link" to="/Blogs">
        Blogs
      </Link>
      <Link className="link" to="/Resources">
        Resources
      </Link>
      <div className="link">Login</div>
    </header>
  );
}

export default withRouter(Header);
