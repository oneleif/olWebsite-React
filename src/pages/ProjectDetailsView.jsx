import React, { useState, useEffect, useCallback } from 'react';

import LinkIcon from '../assets/Icons/LinkIcon/LinkIcon';
import ReactHelmetWrapper from '../components/ReactHelmetWrapper';
import LinkPreviewImage from '../assets/LinkPreview/ol-socialCard_1.png';
import DefaultProjectImage from '../assets/DefaultProjectImage/justoneleif_transparent.png';

export default function ProjectDetailsView() {
  /************************************
   * State
   ************************************/
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [activeTab, setActiveTab] = useState('Description');
  const [tags] = useState(['Development', 'Development', 'Development']);
  const [links] = useState([
    { href: 'https://github.com/oneleif/olWebsite-React', title: 'Project Github' },
    { href: 'https://github.com/oneleif/olWebsite-React', title: 'Project Github' },
    { href: 'https://github.com/oneleif/olWebsite-React', title: 'Project Github' }
  ]);
  const [members] = useState([
    { image: DefaultProjectImage, name: 'Zach Eriksen', title: 'Co-founder, Lead iOS' },
    { image: DefaultProjectImage, name: 'Zach Eriksen', title: 'Co-founder, Lead iOS' },
    { image: DefaultProjectImage, name: 'Zach Eriksen', title: 'Co-founder, Lead iOS' }
  ]);

  const handleTabClick = item => {
    return () => {
      setActiveTab(item);
    };
  };

  /**
   * Callback used by resize eventListener to show tabs in desktop view
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

  /************************************
   * Render
   ************************************/
  return (
    <div className='project-details-container'>
      <ReactHelmetWrapper
        title='Project Details'
        description='Check out our organization and community projects.'
        image={LinkPreviewImage}
        // path={`/project-details/${match.params.projectId}`}
      />

      {/* Breadcrub */}
      <div className='project-details-breadcrumb'>
        <span className='project-details-breadcrumb-item'>Projects</span>
        <span className='project-details-breadcrumb-item active'>SwiftUIKit</span>
      </div>

      {/* Meta */}
      <div className='project-details-meta'>
        <p className='name'>SwiftUIKit</p>
        <p className='type'>Community Project</p>
        <div className='image-container'>
          <img src={DefaultProjectImage} alt='project' />
        </div>
      </div>

      {/* Tabs */}
      {isDesktop && (
        <div className='project-details-tabs'>
          {['Description', 'Tags', 'Links', 'Project Members'].map(item => {
            return (
              <div key={item} className={`tab-item${activeTab === item ? ' active' : ''}`} onClick={handleTabClick(item)}>
                {item}
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      {activeTab === 'Description' && (
        <div className='project-details-description'>
          <h6>Description</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi veritatis amet cupiditate, excepturi nostrum
            consequatur minus quibusdam modi quasi distinctio! Quidem deleniti voluptas, libero accusantium commodi laboriosam?
            Hic, eius ut? Eius maxime a recusandae vitae iste inventore provident, ad delectus cumque magni temporibus. Commodi
            sapiente dignissimos molestiae. Quis, reiciendis consequuntur!
          </p>
        </div>
      )}

      {/* Tags */}
      {(activeTab === 'Description' || activeTab === 'Tags') && (
        <div className='project-details-tags'>
          <h6>Tags</h6>
          {tags.map((tag, index) => {
            return (
              <span key={`${tag}-${index}`} className='tag-item'>
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Links */}
      {(activeTab === 'Description' || activeTab === 'Tags' || activeTab === 'Links') && (
        <div className='project-details-links'>
          <h6>Links</h6>
          {links.map((link, index) => {
            return (
              <div key={index} className='link-item-container'>
                <LinkIcon />
                <a className='link-item' href={link.href} target='_blank' rel='noopener noreferrer'>
                  {link.title}
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Members */}
      {(activeTab === 'Description' || activeTab === 'Tags' || activeTab === 'Links' || activeTab === 'Project Members') && (
        <div className='project-details-members'>
          <h6>Project Members</h6>
          {members.map((member, index) => {
            return (
              <div key={index} className='member-item'>
                <div className='member-item-image'>
                  <img src={member.image} alt='member' />
                </div>
                <div className='member-item-info'>
                  <span className='name'>{member.name}</span>
                  <span className='title'>{member.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
