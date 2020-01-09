import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Footer from "./components/Footer";
import Toolbar from "./components/Toolbar";
import PostsView from "./pages/PostsView";
import LandingView from "./pages/LandingView";
import NotFoundView from "./pages/NotFoundView";
import PartnersView from "./pages/PartnersView";
import "./style-sheets/main.scss";

export default function OlWebsiteApp() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="app">
      <Router basename={process.env.PUBLIC_URL}>
        <Toolbar />
        <div className="app-body">
          <Switch>
            <Route path="/about-us" exact component={LandingView} />
            <Route path="/not-found" component={NotFoundView} />
            <Route path="/partners" component={PartnersView} />
            <Route path="/posts" component={PostsView} />
            <Redirect from="/" exact to="/about-us" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
