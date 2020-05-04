import React from 'react';

import FeatureCopy from '../components/FeatureContainer/FeatureCopy';
import Button from '../components/Objects/Button/Button';
import SocialMediaConstants from '../constants/social-media-constants';
import ProjectsSVG from '../assets/ProjectsSVG/ProjectsSVG';
import FeatureContainer from '../components/FeatureContainer/FeatureContainer';


export default function ProjectsView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="projects-view-container">
      <div className="projects-view-body">
        <div className="projects-view-copy-container">
          <h1>Projects</h1>
          <FeatureContainer image={<ProjectsSVG />}>
            <FeatureCopy>
              Contribute to one of our member-owned projects! Can’t find what you are looking for? Bring in a new project idea or existing project!
            </FeatureCopy>
            <Button handleClick={() => window.open(SocialMediaConstants.DISCORD_LINK, "_blank")}>Join our Discord</Button>
          </FeatureContainer>
        </div>
      </div>
    </div>
  );
}
