import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '../components/Objects/Button/Button';
import { ReactComponent as OneleifNotFound } from '../assets/OlNotFound/ol404.svg';

export default function PageNotFoundView() {
  const location = useLocation();

  /************************************
   * Render
   ************************************/

  return (
    <div className='page-not-found-view-container'>
      <div className='page-not-found-view-body'>
        <div className='page-not-found-view-image-container'>
          <OneleifNotFound />
        </div>
        <div className='page-not-found-view-text-container'>
          <p>
            404 Page not found, <strong>{location.pathname}</strong>
          </p>
          <p>Let's hurry; there is nothing to fear here</p>
          <Button>
            <Link to='/'>Take me home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
