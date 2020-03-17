import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import LandingView from './pages/LandingView';
import ScrollToTop from './components/ScrollToTop';
import PageNotFoundView from './pages/PageNotFoundView';
import ToolbarContainer from './components/Toolbar/ToolbarContainer';
import { UserProvider } from './contexts/UserContext';
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
                <Route exact path='/' component={LandingView} />
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
