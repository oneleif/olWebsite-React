import React from 'react';

import FeatureContainer from '../components/FeatureContainer/FeatureContainer';
import FeatureCopy from '../components/FeatureContainer/FeatureCopy';
import PlaceholderSVG from '../components/Objects/PlaceholderSVG/PlaceholderSVG';
import Placeholder from '../assets/placeholders/placeholder-lady.png';

import Button from '../components/Objects/Button/Button';
import FeatureLink from '../components/Objects/FeatureLink/FeatureLink';
import TestimonialContainer from '../components/TestimonialContainer/TestimonialContainer';
import SupportersContainer from '../components/SupportersContainer/SupportersContainer';
import SocialMediaConstants from '../constants/social-media-constants';
import CallToAction from '../components/CallToAction/CallToAction';

import LandingImg from '../assets/Landing/ol-landing-2_1_1.svg';
import TeamImg from '../assets/Landing/ol-team_1_1.svg';
import ProjectsSVG from '../assets/ProjectsSVG/ProjectsSVG';
import ResourcesImg from '../assets/Landing/ol-resources_1.svg';

export default function LandingView() {
  /************************************
   * Render
   ************************************/

  const olLandingImg = (image) => { return (<img src={image} alt="icon" />)};
  
  return (
      <div className='landing-view-container'>
        <FeatureContainer image={olLandingImg(LandingImg)}>
          <FeatureCopy header='oneleif'>
            Grow and create together.
          </FeatureCopy>
          <Button handleClick={()=> window.open(SocialMediaConstants.DISCORD_LINK, '_blank')}>Join our Discord</Button>
        </FeatureContainer>
        <CallToAction title='oneleif is a community' subtitle='We'
          textArray={[' learn together', ' work together', ' grow together', ' create together']} />
        <FeatureContainer image={olLandingImg(TeamImg)}>
          <FeatureCopy header='Diverse Community'>
            Our members have broad skills sets, and we love to find innovative ways to collaborate and learn together.
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<ProjectsSVG />} invert>
          <FeatureCopy header='Projects'>
            Our projects are as diverse as our members. From open source initiatitves to personal experiments, we’ve got it all. 
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={olLandingImg(ResourcesImg)}>
          <FeatureCopy header='Resources'>
            We take pride in sharing knowledge and resources within the community. At oneleif, there are countless members to learn from and mentor.
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <TestimonialContainer name='Fabrice' location='Haiti' image={Placeholder}>
          “I appreciate you guys looking out for each other. It's one of the qualities I respect the most about this group.”
        </TestimonialContainer>
      </div>
  );
}
