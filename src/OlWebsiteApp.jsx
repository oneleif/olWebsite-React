import React from 'react';

import { Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import Routes from './components/Routes/Routes';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import Toolbar from './components/Toolbar/Toolbar';
import { UserProvider } from './contexts/UserContext';
import './style-sheets/main.scss';

export default function OlWebsiteApp() {
  const history = createBrowserHistory();
  const TRACKING_ID = "UA-157178354-2";
  ReactGA.initialize(TRACKING_ID);

  // Initialize google analytics page view tracking
  history.listen(location => {
    // Updates the user's current page
    ReactGA.set({ page: location.pathname }); 

    // Records a pageview for the given page
    ReactGA.pageview(location.pathname); 
  });

  /************************************
   * Render
   ************************************/

  return (
    <UserProvider>
      <div className='app'>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <Toolbar />
          <ScrollToTop>
            <div className='app-body'>
              <Routes />
            </div>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}
