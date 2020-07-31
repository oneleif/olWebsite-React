import React, { useEffect, useState } from 'react';

import ProjectCard from '../components/ProjectsCard/ProjectCard';
import projectCards from './js/projects';
import PageHeader from '../components/PageHeader/PageHeader';
import ProjectsSVG from '../assets/ProjectsSVG/ProjectsSVG';
import ReactHelmetWrapper from '../components/ReactHelmetWrapper/ReactHelmetWrapper';
import LinkPreviewImage from '../assets/LinkPreview/ol-socialCard_1.png';

export default function ProjectsView() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadedProjects = loadProjects();
    setProjects(loadedProjects);
  }, []);

  function loadProjects() {
    //TODO: In V2 once the projects are dynamic, will be loading them here
    return projectCards;
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='projects-view-container'>
      <ReactHelmetWrapper
        title='Projects'
        description='Check out our organization and community projects.'
        image={LinkPreviewImage}
      />
      <PageHeader title='Projects' img={<ProjectsSVG />}>
        <p>
          Contribute to one of our member-owned projects! Can’t find what you are looking for? Bring in a new project idea or
          existing project!
        </p>
      </PageHeader>
      <div className='projects-card-container'>
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </div>
  );
}
