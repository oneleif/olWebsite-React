import React, { Fragment } from 'react';

import SocialMediaIconsMap from '../../assets/SocialMediaIcons/SocialMediaIcons';

const ICON_ARRAY = [ 
  SocialMediaIconsMap.TWITTER, 
  SocialMediaIconsMap.FACEBOOK,
  SocialMediaIconsMap.LINKEDIN,
  SocialMediaIconsMap.MEDIUM,
  SocialMediaIconsMap.DRIBBLE,
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
        {ICON_ARRAY.map((icon, index) => (
            <Fragment key={index}>
                {icon}
            </Fragment>
        ))}
    </div>
  );
}
