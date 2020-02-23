import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import PostsView from './pages/PostsView';
import LoginView from './pages/LoginView';
import ProjectView from './pages/ProjectView';
import LandingView from './pages/LandingView';
import ScrollToTop from './components/ScrollToTop';
import RegisterView from './pages/RegisterView';
import ContactUsView from './pages/ContactUsView';
import MeetTheTeamView from './pages/MeetTheTeamView';
import ToolbarContainer from './components/Toolbar/ToolbarContainer';
import { UserProvider } from './contexts/UserContext';
import ActiveProjectsView from './pages/ActiveProjectsView';
import './style-sheets/main.scss';

export default function OlWebsiteApp() {
  /************************************
   * Render
   ************************************/

  return (
    <UserProvider>
      <div className='app'>
        <Router basename={process.env.PUBLIC_URL}>
          <ToolbarContainer />
          <ScrollToTop>
            <div className='app-body'>
              <Switch>
                <Route path='/active-projects/:projectName' component={ProjectView} />
                <Route path='/active-projects' component={ActiveProjectsView} />
                <Route path='/meet-the-team' component={MeetTheTeamView} />
                <Route path='/contact-us' component={ContactUsView} />
                <Route path='/sign-up' component={RegisterView} />
                <Route path='/login' component={LoginView} />
                <Route path='/posts' component={PostsView} />
                <Route path='/' component={LandingView} />
              </Switch>
            </div>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}
