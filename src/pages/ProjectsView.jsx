import React from 'react';

import ProjectsCard from '../components/ProjectsCard/ProjectsCard'
import Projects from './js/projects';
import PageHeader from '../components/PageHeader/PageHeader';
import ProjectsSVG from '../assets/ProjectsSVG/ProjectsSVG';

export default function ProjectsView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="projects-view-container">
      <PageHeader title='Projects' img={<ProjectsSVG />}>
      <p>
        Contribute to one of our member-owned projects!
        Can’t find what you are looking for? Bring in a new project idea or existing project!
      </p>
    </PageHeader>
      <div className="cards-container">
          {Projects.map((card,index) => (
            <ProjectsCard card= {card} key={index}/>
          ))}
      </div>
    </div>
  );
}
