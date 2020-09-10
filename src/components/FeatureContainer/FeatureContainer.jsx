import React from "react";

/**
* Component that displays a container with text children passed in aligned opposite from an image
* Takes in a {@class JSX} image and a (@class boolean) invert, that indicates with side to position the text/
* Invert being false has the text on the left, true it is positioned on the
* 
*/
export default function FeatureContainer({ children, image, invert, className = '' }) {
  /************************************
   * Render
   ************************************/

  return (
      <div className={`feature-container ${invert ? 'inverted' : 'normal'}`}>
        <div className={className}>
            {children}
        </div>
        <div className="feature-image-container">
            {image}
        </div>
      </div>
  );
}
