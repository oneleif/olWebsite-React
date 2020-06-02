import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactUsView from '../../pages/ContactUsView';
import LandingView from '../../pages/LandingView';
import MeetTheTeamView from '../../pages/MeetTheTeamView';
import PageNotFoundView from '../../pages/PageNotFoundView';
import ProjectsView from '../../pages/ProjectsView';

export default function Routes() {
  /************************************
   * Render
   ************************************/

  return (
    <Switch>
      <Route path='/contact' component={ContactUsView} />
      <Route path='/team' component={MeetTheTeamView} />
      <Route path= '/projects' component={ProjectsView} />
      <Route exact path='/' component={LandingView} />
      <Route component={PageNotFoundView} />
    </Switch>
  );
}
