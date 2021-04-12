import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactUsView from '../../pages/ContactUsView';
import LandingView from '../../pages/LandingView';
import LoginView from '../../pages/LoginView';
import MeetTheTeamView from '../../pages/MeetTheTeamView';
import PageNotFoundView from '../../pages/PageNotFoundView';
import ProjectsView from '../../pages/ProjectsView';
import SignUpView from '../../pages/SignUpView';
import AboutUsView from '../../pages/AboutUsView';
import ProjectDetailsView from '../../pages/ProjectDetailsView';

export default function Routes() {
  /************************************
   * Render
   ************************************/

  return (
    <Switch>
      <Route path='/contact' component={ContactUsView} />
      <Route path='/login' component={LoginView} />
      <Route path='/projects' component={ProjectsView} />
      <Route path='/sign-up' component={SignUpView} />
      <Route path='/team' component={MeetTheTeamView} />
      <Route path='/about' component={AboutUsView} />
      <Route exact path='/details/:projectId' component={ProjectDetailsView} />
      <Route exact path='/' component={LandingView} />
      <Route component={PageNotFoundView} />
    </Switch>
  );
}
