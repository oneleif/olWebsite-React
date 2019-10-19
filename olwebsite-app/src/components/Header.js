import React from 'react';
import homeLogo from '../images/homeLogo.png';

function Header() {
  return (
    <header>
      <img src={homeLogo} className="app-logo-header" alt="logo" />
    </header>
  )
}

export default Header;