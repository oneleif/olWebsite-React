import  React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import '../styles/App.css';
import AppConstants from '../constants/appConstants';

import Header from './Header';
import Footer from './Footer';
import LandingView from './LandingView';

function App() {
  /**
   *  Used for page routing, changes view of page when this value is changed
   * 
   * @type {String}
   * @default "HOME"
   */
  const [pageView] = useState(AppConstants.RoutingConstants.HOME);

  /**
   * Switch case the returns Redirect to certain page based on pageView value
   * passed in
   * 
   * @private
   * @param {String} pageView - default pageView is "HOME"
   * @returns {JSX} - Returns a Redirect component based on case
   */
  function _getPageRoute(pageView) {
    switch(pageView) {
      case AppConstants.RoutingConstants.HOME:
      default:
        return (<Redirect from="/*" to="/" exact/>);
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className="App-header">
        <Router basename={process.env.PUBLIC_URL}>
              <Route exact path='/' component={() => <LandingView/>}/>
              {_getPageRoute(pageView)}
        </Router>        
      </div>
      <Footer/>
    </div>
  );
}

export default App;
