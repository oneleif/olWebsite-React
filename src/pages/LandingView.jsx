import React from "react";

import FeatureContainer from "../components/FeatureContainer/FeatureContainer";
import FeatureCopy from "../components/FeatureContainer/FeatureCopy";
import PlaceholderSVG from "../components/Objects/PlaceholderSVG/PlaceholderSVG";
import Placeholder from '../assets/placeholders/placeholder-lady.png';

import Button from '../components/Objects/Button/Button';
import FeatureLink from '../components/Objects/FeatureLink/FeatureLink';
import TestimonialContainer from "../components/TestimonialContainer/TestimonialContainer";
import SupportersContainer from "../components/SupportersContainer/SupportersContainer";

export default function LandingView() {
  /************************************
   * Render
   ************************************/

  return (
      <div className="landing-view-container">
        <FeatureContainer image={<PlaceholderSVG/>}>
          <FeatureCopy header='Tagline'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </FeatureCopy>
          <Button handleClick={()=> window.open("https://discord.gg/2jepA3", "_blank")}>Join our Discord</Button>
        </FeatureContainer>
        <div className='call-to-action-container'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?</p>
        </div>
        <FeatureContainer image={<PlaceholderSVG/>}>
          <FeatureCopy header='Community Feature #1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<PlaceholderSVG/>} invert>
          <FeatureCopy header='Community Feature #2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<PlaceholderSVG/>}>
          <FeatureCopy header='Community Feature #3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </FeatureCopy>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <TestimonialContainer name='NAME' location='Country' image={Placeholder}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        </TestimonialContainer>
        <SupportersContainer />
      </div>
  );
}
