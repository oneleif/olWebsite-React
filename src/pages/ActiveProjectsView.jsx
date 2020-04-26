import React from 'react';

import FeatureCopy from '../components/FeatureContainer/FeatureCopy';
import Button from '../components/Objects/Button/Button';
import SocialMediaConstants from '../constants/social-media-constants';
import ActiveProjectsSVG from '../assets/ActiveProjectsSVG/ActiveProjectsSVG';
import FeatureContainer from '../components/FeatureContainer/FeatureContainer';


export default function ActiveProjectsView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="active-projects-view-container">
      <div className="active-projects-view-body">
        <div className="active-projects-view-copy-container">
          <h1>Projects</h1>
          <FeatureContainer image={<ActiveProjectsSVG />}>
            <FeatureCopy>
              Contribute to one of our member-owned projects! Can’t find what you are looking for? Bring in a new project idea or existing project!
            </FeatureCopy>
            <Button handleClick={() => window.open(SocialMediaConstants.DISCORD_LINK, "_blank")}>Join our Discord!</Button>
          </FeatureContainer>
        </div>
      </div>
    </div>
  );
}
