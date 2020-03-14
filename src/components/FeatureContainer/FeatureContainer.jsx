import React from "react";

export default function FeatureContainer({ children, image, invert }) {
  /************************************
   * Render
   ************************************/

  return (
      <div className={'feature-container ' + (invert ? 'inverted' : 'normal')}>
        <div>
            {children}
        </div>
        <div className="feature-image-container">
            {image}
        </div>
      </div>
  );
}
