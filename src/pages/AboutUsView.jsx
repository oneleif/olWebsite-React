import React, { useState, useEffect, useCallback } from 'react';

import LandingImg from '../assets/Landing/ol-landing-2_1_1.svg';
import ReactHelmetWrapper from '../components/ReactHelmetWrapper';
import LinkPreviewImage from '../assets/LinkPreview/ol-socialCard_1.png';
import Button from '../components/Objects/Button/Button';
import SocialMediaConstants from '../constants/social-media-constants';

export default function AboutUsView() {
  /************************************
   * State
   ************************************/
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  /**
   * Callback used by resize eventListener to show heading in desktop view
   * @returns {void}
   * @callback
   */
  const handleResize = useCallback(() => {
    return setIsDesktop(window.innerWidth >= 1280);
  }, [setIsDesktop]);

  useEffect(() => {
    // adds event listener for window resizing
    window.addEventListener('resize', handleResize);
    return () => {
      // removes the event listener whenever component unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const olLandingImg = image => {
    return <img src={image} alt='icon' />;
  };

  /************************************
   * Render
   ************************************/
  return (
    <div className='about-us-view-container'>
      <ReactHelmetWrapper
        title='About Us'
        description='Check out our organization and community projects.'
        image={LinkPreviewImage}
        path='/about'
      />

      <div className='about-us-page-header'>
        <div className='image-container'>{olLandingImg(LandingImg)}</div>
        <div className='info-container'>
          <h1>About us</h1>
          <p>oneleif is a nonprofit community that supports tech minded individuals</p>
          <Button handleClick={() => window.open(SocialMediaConstants.DISCORD_LINK, '_blank')}>Join our Discord</Button>
        </div>
      </div>

      <div className='about-us-showcase'>
        {isDesktop && <h2>oneleif is</h2>}

        <div className='cards-container'>
          <div className='card'>
            <h6 className='card-title'>Open Source</h6>
            <p className='card-content'>
              oneleif members collaborate on open source projects without the barriers of cost or location.
            </p>
          </div>
          <div className='card'>
            <h6 className='card-title'>Community</h6>
            <p className='card-content'>
              oneleif is a global community that supports members of all levels, specialities, and backgrounds.
            </p>
          </div>
          <div className='card'>
            <h6 className='card-title'>Experience</h6>
            <p className='card-content'>
              oneleif is an opportunity to gain experience, improve your own skills and mentor others.
            </p>
          </div>
        </div>
      </div>

      <div className='about-us-history'>
        <span className='heading'>History</span>
        <div className='history-item'>
          <h4>Humble Beginings</h4>
          <p>
            In 2018, founders Zach Eriksen, Parshav C, Sabien Jarmin, and Max Schulester were in college. They were all studying
            and specializing in different programing languages and areas but wanted to work on projects together. Thus the idea
            for oneleif was born as a place to collaborate and help others with open source projects.
          </p>
        </div>
        <div className='history-item'>
          <h4>First Commits</h4>
          <p>
            The first oneleif commit on Github was in September 2018. oneleif continues to use Github for their projects. Some
            notable first projects include Dunegon Master, katas, and small swift projects.
          </p>
        </div>
        <div className='history-item'>
          <h4>Growth</h4>
          <p>
            With the help of promotional content on reddit, oneleif grew imenessly. With this growth, oneleif was able to focus on
            larger projects like Jumping Jax (formerly Bunny Hop), and the oneleif website.
          </p>
        </div>
        <div className='history-item'>
          <h4>Non-profit and Gratuity</h4>
          <p>
            oneleif became a nonprofit 501 ©(3) in December 2019. Around this time, oneleif received it’s first grant from Bread
            for the Journey. The team is so grateful for this donation.
          </p>
        </div>
        <div className='history-item'>
          <h4>2020</h4>
          <p>
            The year began with a lot of scheduled YouTube streams including a weekly oneleif stream, and two code-a-long language
            specific streams. The community also started posting a lot of medium articles during the pandemic. Also in this time
            mentoring and apprenticeships grew, giving many members valuable learning experiences. In the summer, the team
            completed V1 of the oneleif website. This team continues to work on the website project (you’re currently viewing V2).
          </p>
        </div>
      </div>

      <div className='about-us-future'>
        <h5>Future</h5>
        <p>We see oneleif becoming a trustworthy place for nonprofits to go for technology solutions.</p>

        <p>We see oneleif scaling up, taking in larger projects in a variety of languages and platforms.</p>

        <p>We see oneleif members benefitting from their experience with our community and acheiveing their career dreams.</p>
      </div>
    </div>
  );
}
