import React from 'react';

import ReactGA from 'react-ga';

import { Link, withRouter } from 'react-router-dom';
import ArrowRight from '../../../assets/Icons/ArrowRight';

function FeatureLink({ children, path = '/' }) {
 /************************************
  * Private Methods
  ************************************/
 
 /**
  * Called when a feauture link is clicked, used to capture the event for analytics
  * @param event
  */
  function handleLinkClicked(event) {
    ReactGA.event({ category: 'Arrow Link', action: 'Clicked', label: event.target.href });
  }

  /************************************
   * Render
   ************************************/

  return (
    <Link className='copy-link' to={path} onClickCapture={handleLinkClicked} >
        {children}
        <ArrowRight />
    </Link>
  );
}

export default withRouter(FeatureLink);
