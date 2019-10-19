import React from 'react';
import homeLogo from '../images/homeLogo.png';

function Header() {
  return (
    <header>
      <img src={homeLogo} alt="logo" tabIndex={0} />
      <div tabIndex={0}>Meet the team</div>
      <div tabIndex={0}>DevDocs</div>
      <div tabIndex={0}>Blogs</div>
      <div tabIndex={0}>Resources</div>
      <div tabIndex={0}>Login</div>
    </header>
  )
}

export default Header;