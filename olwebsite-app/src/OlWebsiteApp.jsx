import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style-sheets/main.scss";

import ToolbarContainer from "./components/Toolbar/ToolbarContainer";
import Footer from "./components/Footer";
import LandingView from "./pages/LandingView";
import PostsView from "./pages/PostsView";

export default function OlWebsiteApp() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="app">
      <Router basename={process.env.PUBLIC_URL}>
        <ToolbarContainer />
        <div className="app-body">
          <Switch>
            <Route path="/posts" component={PostsView} />
            <Route path="/" component={LandingView} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
