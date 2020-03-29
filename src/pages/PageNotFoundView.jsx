import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '../components/Objects/Button/Button';
import oneleif404 from '../assets/oneleif404.png';

export default function PageNotFoundView() {
  const location = useLocation();

  /************************************
   * Render
   ************************************/

  return (
    <div className='page-not-found-view-container'>
      <div className='page-not-found-view-body'>
        <div className='page-not-found-view-image-container'>
          <img src={oneleif404} alt='404 page not found' />
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
