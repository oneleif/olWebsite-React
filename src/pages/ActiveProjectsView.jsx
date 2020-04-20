import React from 'react';

import FeatureContainer from '../components/FeatureContainer/FeatureContainer';
import FeatureCopy from '../components/FeatureContainer/FeatureCopy';
import Button from '../components/Objects/Button/Button';
import SocialMediaConstants from '../constants/social-media-constants';
import ActiveProjectsSVG from '../assets/ActiveProjectsSVG/ActiveProjectsSVG';


export default function ActiveProjectsView() {
  /************************************
   * Render
   ************************************/

  return (
    <div>
      <FeatureContainer image={<ActiveProjectsSVG/>}>
        <FeatureCopy header='Active Projects'>
          Find a project that interests you, and join the team to start learning. Don’t see an interesting project? We will help you start one!
        </FeatureCopy>
        <Button handleClick = {() => window.open(SocialMediaConstants.DISCORD_LINK,"_blank")}>Join our Discord!</Button>
      </FeatureContainer>
    </div>
  )
}
