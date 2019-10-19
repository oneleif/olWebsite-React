import React from 'react';
import homeLogo from '../images/homeLogo.png';

function Header() {
  return (
    <header>
      <img src={homeLogo} alt="logo" />
      <div>Meet the team</div>
      <div>DevDocs</div>
      <div>Blogs</div>
      <div>Resources</div>
      <div>Login</div>
    </header>
  )
}

export default Header;