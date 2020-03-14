import React from "react";

import FeatureContainer from "../components/FeatureContainer/FeatureContainer";
import PlaceholderSVG from "../components/Objects/PlaceholderSVG/PlaceholderSVG";
import Placeholder from '../images/placeholders/placeholder-lady.png';

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
          <h1>Tagline</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button>Join our Discord</Button>
        </FeatureContainer>
        <div className='call-to-action-container'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?</p>
        </div>
        <FeatureContainer image={<PlaceholderSVG/>}>
          <h1>Community Feature #1</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<PlaceholderSVG/>} invert>
          <h1>Community Feature #2</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <FeatureLink>Learn More</FeatureLink>
        </FeatureContainer>
        <FeatureContainer image={<PlaceholderSVG/>}>
          <h1>Community Feature #3</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
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
