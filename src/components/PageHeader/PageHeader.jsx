import React from 'react';

import Button from '../Objects/Button/Button';
import SocialMediaConstants from "../../constants/social-media-constants";

export default function PageHeader({ title, img, children }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='page-header-container'>
        <h1>{title}</h1>
        {img} 
        {children}
        <Button handleClick={()=> window.open(SocialMediaConstants.DISCORD_LINK, "_blank")}>Join our Discord</Button>
    </div>
  );
}
