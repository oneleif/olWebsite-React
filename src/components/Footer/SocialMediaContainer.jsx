import React from 'react';

import Icon from '../Objects/Icon/Icon';
import { SocialMediaIconsDesktopMap, SocialMediaIconsMobileMap } from '../../assets/SocialMediaIcons/SocialMediaIcons';
import useResponsive from '../../hooks/useResponsive';

export default function SocialMediaContainer() {
  const { isMedium } = useResponsive();

  const ICON_ARRAY = isMedium ? [ 
    SocialMediaIconsDesktopMap.TWITTER, 
    SocialMediaIconsDesktopMap.FACEBOOK,
    SocialMediaIconsDesktopMap.LINKEDIN,
    SocialMediaIconsDesktopMap.MEDIUM,
    SocialMediaIconsDesktopMap.DRIBBBLE,
    SocialMediaIconsDesktopMap.GITHUB,
    SocialMediaIconsDesktopMap.DISCORD,
    SocialMediaIconsDesktopMap.YOUTUBE
  ] : [ 
    SocialMediaIconsMobileMap.TWITTER, 
    SocialMediaIconsMobileMap.FACEBOOK,
    SocialMediaIconsMobileMap.LINKEDIN,
    SocialMediaIconsMobileMap.MEDIUM,
    SocialMediaIconsMobileMap.DRIBBBLE,
    SocialMediaIconsMobileMap.GITHUB,
    SocialMediaIconsMobileMap.DISCORD,
    SocialMediaIconsMobileMap.YOUTUBE
  ];

  /************************************
   * Render
   ************************************/

  return (
    <div className='social-media-icon-module'>
      {ICON_ARRAY.map((icon) => (
        <Icon key={icon.label}
          label={icon.label}
          width={icon.width}
          height={icon.height}
          handleClick={()=> window.open(icon.url, '_blank')}
          >
          {icon.path}
        </Icon>
      ))}
    </div>
  );
}
