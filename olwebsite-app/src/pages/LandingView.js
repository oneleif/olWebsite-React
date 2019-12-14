import React from "react";

import CarouselWrapper from "../components/CarouselWrapper";

export default function LandingView() {
  /************************************
   * Render
   ************************************/

  return (
    <>
      <CarouselWrapper />
      <div className="landing-view-container about-us-container">
        <h1 className="landing-view-header">About oneleif</h1>
        <div className="img-place-holder"></div>
        <span>
          oneleif is a community of developers that want to be the best at what
          they do and have fun while doing it.
        </span>
        <br />
        <span>
          To be a member all you need is to be interested in learning and a
          passion for sharing your knowledge.
        </span>
      </div>
      <div className="landing-view-container join-us-container">
        <h1 className="landing-view-header">Join Us Today!</h1>
        <span>Click on the link below to join the Discord server.</span>
        <br />
        <span>
          You will start with limited permissions, in a text channel that only
          moderators will see.
        </span>
        <br />
        <span>
          To get full access: read the rules, make an introduction in
          #introductions, and add an appropriate username.
        </span>
        <br />
        <span>
          When you’re done with the above, shoot a message to the #start channel
          to let us know, and we will give you full access.
        </span>
      </div>
    </>
  );
}
