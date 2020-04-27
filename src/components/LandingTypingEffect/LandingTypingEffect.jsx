import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

/**
* Component for the landing page, text type effect section.
*
*/
 
export default function LandingTypingEffect() {
  return (
    <h2 className="call-to-action-typer">
      We
      <ReactTypingEffect
        text={[" learn together", " work together", " grow together", " create together"]}
        speed="100"
        eraseDelay="1500"
        typingDelay="500"
      />
    </h2>
  );
};