import React from 'react';
import { Link,  withRouter } from 'react-router-dom';

import DesktopLogo from '../../assets/homeLogo.png';
import MobileLogo from "../../assets/justoneleif_transparent.png";

function ToolbarLogo({ closeNavigation }) {
  /************************************
   * Render
   ************************************/

  return (
    <Link to='/' onClick={closeNavigation}>
      <img className='desktop-logo' src={DesktopLogo}  alt='oneleif logo' />
      <img className='mobile-logo' src={MobileLogo}  alt='oneleif logo'/>
    </Link>
  );
}

export default withRouter(ToolbarLogo);
