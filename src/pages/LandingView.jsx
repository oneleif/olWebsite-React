import React from 'react';

import FeatureContainer from '../components/FeatureContainer/FeatureContainer';
import Fabrice from '../assets/Members/Fabrice_MET.png';

import Button from '../components/Objects/Button/Button';
import FeatureLink from '../components/Objects/FeatureLink/FeatureLink';
import TestimonialContainer from '../components/TestimonialContainer/TestimonialContainer';
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
          <div className='feature-copy-container'>
            <h1>oneleif</h1>
            <p className='title'>Grow and create together.</p>
          </div>
          <Button handleClick={()=> window.open(SocialMediaConstants.DISCORD_LINK, '_blank')}>Join our Discord</Button>
        </FeatureContainer>
        <CallToAction title='oneleif is a community' subtitle='We'
          textArray={[' learn together', ' work together', ' grow together', ' create together']} />
        <FeatureContainer image={olLandingImg(TeamImg)}>
          <div className='feature-copy-container'>
            <h2>Diverse Community</h2>
            <p>Our members have broad skills sets, and we love to find innovative ways to collaborate and learn together.</p>
          </div>
          <FeatureLink path='/team'>Join the community</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<ProjectsSVG />} invert>
          <div className='feature-copy-container'>
            <h2>Projects</h2>
            <p>Our projects are as diverse as our members. From open source initiatitves to personal experiments, we’ve got it all.</p>
          </div>
          <FeatureLink path='/projects'>Check out our Projects</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={olLandingImg(ResourcesImg)}>
          <div className='feature-copy-container'>
            <h2>Resources</h2>
            <p>We take pride in sharing knowledge and resources within the community. At oneleif, there are countless members to learn from and mentor.</p>
          </div>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <TestimonialContainer name='Fabrice' location='Port-de-Paix, HT' image={Fabrice}>
          “I appreciate you guys looking out for each other. It's one of the qualities I respect the most about this group.”
        </TestimonialContainer>
      </div>
  );
}
