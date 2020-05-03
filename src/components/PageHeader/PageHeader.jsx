import React from 'react';

import Button from '../Objects/Button/Button';
import SocialMediaConstants from "../../constants/social-media-constants";

/**
 * This is a Header component to be used by large page views (see Projects/Meet the team) 
 * This Component shows a title, image, children (prefer this to be <p>copy</p>) and a button
 * @param {String} title - title of the page
 * @param {JSX} img - image component
 * @param {JSX} children - copy wrapped in <p>
 */
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
