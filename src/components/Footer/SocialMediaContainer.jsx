import React from 'react';

import Icon from '../Objects/Icon/Icon';
import SocialMediaIconsMap from '../../assets/SocialMediaIcons/SocialMediaIcons';

const ICON_ARRAY = [ 
  SocialMediaIconsMap.TWITTER, 
  SocialMediaIconsMap.FACEBOOK,
  SocialMediaIconsMap.LINKEDIN,
  SocialMediaIconsMap.MEDIUM,
  SocialMediaIconsMap.DRIBBBLE,
  SocialMediaIconsMap.GITHUB,
  SocialMediaIconsMap.DISCORD,
  SocialMediaIconsMap.YOUTUBE
];

export default function SocialMediaContainer() {
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
                handleClick={()=> window.open(icon.url, '_blank')}>
            {icon.path}
          </Icon>
        ))}
    </div>
  );
}
