import React from 'react';

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
    </div>
  );
}
