import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as NotFoundLogo } from '../assets/OlNotFound/OlNotFound.svg';
import ButtonLink from '../components/Objects/ButtonLink/ButtonLink';

export default function PageNotFoundView() {
  const location = useLocation();

  /************************************
   * Render
   ************************************/

  return (
    <div className='page-not-found-view-container'>
      <div className='page-not-found-view-body'>
        <div className='page-not-found-view-image-container'>
          <NotFoundLogo />
        </div>
        <div className='page-not-found-view-text-container'>
          <p>
            404 Page not found, <strong>{location.pathname}</strong>.
          </p>
          <p>Let's hurry; there is nothing to fear here.</p>
          <ButtonLink theme='primary round' path='/'>Take me home</ButtonLink>
        </div>
      </div>
    </div>
  );
}
