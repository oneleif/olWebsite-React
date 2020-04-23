import React from 'react';
import { Link,  withRouter } from 'react-router-dom';

import homeLogo from '../../assets/homeLogo.png';
import mobileHomeLogo from "../../assets/justoneleif_transparent.png";

function ToolbarLogo({ closeNavigation }) {
  /************************************
   * Render
   ************************************/

  return (
    <Link to='/'>
        <img className='desktop-logo' src={homeLogo}  alt='oneleif logo' onClick={closeNavigation}/>
        <img className='mobile-logo' src={mobileHomeLogo}  alt='oneleif logo' onClick={closeNavigation}/>
    </Link>
  );
}

export default withRouter(ToolbarLogo);
