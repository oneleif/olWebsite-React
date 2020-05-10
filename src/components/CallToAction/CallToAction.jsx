import React from 'react';

import TypingEffectWrapper from '../../components/TypingEffectWrapper/TypingEffectWrapper';

import { ReactComponent as WaveTop } from '../../assets/Landing/ol-landing-waves-top.svg';
import { ReactComponent as WaveBottom } from '../../assets/Landing/ol-landing-waves-bottom.svg';

export default function CallToAction() {
  /************************************
   * Render
   ************************************/

  return (
    <>
      <WaveTop />
      <div className='call-to-action-container'>
        <h2>oneleif is a community</h2>
        <TypingEffectWrapper prefix='We'
            textEffected={[' learn together', ' work together', ' grow together', ' create together']} />
      </div>
      <WaveBottom />
    </>
  );
}
