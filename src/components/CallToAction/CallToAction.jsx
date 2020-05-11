import React from 'react';

import TypingEffectWrapper from '../../components/TypingEffectWrapper/TypingEffectWrapper';

import { ReactComponent as WaveTop } from '../../assets/Landing/ol-landing-waves-top.svg';
import { ReactComponent as WaveBottom } from '../../assets/Landing/ol-landing-waves-bottom.svg';

export default function CallToAction({ title, subtitle, textArray }) {
  /************************************
   * Render
   ************************************/

  return (
    <>
      <WaveTop />
      <div className='call-to-action-container'>
        <h2>{title}</h2>
        <TypingEffectWrapper prefix={subtitle}
            textEffected={textArray} />
      </div>
      <WaveBottom />
    </>
  );
}
