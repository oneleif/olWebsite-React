import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

/**
* Wrapper for text type effect section.
*
*/

export default function TypingEffectWrapper({ prefix, textEffected, speed = '100', eraseDelay = '1500', typingDelay = '500' }) {
  return (
    <h2 className='typing-effect-wrapper'>
      {prefix}
      <ReactTypingEffect
        text={textEffected}
        speed={speed}
        eraseDelay={eraseDelay}
        typingDelay={typingDelay}
      />
    </h2>
  );
};
