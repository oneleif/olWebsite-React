import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import LandingView from './pages/LandingView';
import ContactUsView from './pages/ContactUsView';
import MeetTheTeamView from './pages/MeetTheTeamView';
import ScrollToTop from './components/ScrollToTop';
import PageNotFoundView from './pages/PageNotFoundView';
import Toolbar from './components/Toolbar/Toolbar';
import { UserProvider } from './contexts/UserContext';
import './style-sheets/main.scss';
import ProjectsView from './pages/ProjectsView';

export default function OlWebsiteApp() {
  /************************************
   * Render
   ************************************/

  return (
    <UserProvider>
      <div className='app'>
        <Router basename={process.env.PUBLIC_URL}>
          <Toolbar />
          <ScrollToTop>
            <div className='app-body'>
              <Switch>
                <Route path='/contact' component={ContactUsView} />
                <Route path='/team' component={MeetTheTeamView} />
                <Route exact path='/' component={LandingView} />
                <Route exact path= '/projects' component={ProjectsView}/>
                <Route component={PageNotFoundView} />
              </Switch>
            </div>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}
