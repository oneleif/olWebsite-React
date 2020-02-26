import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./style-sheets/main.scss";

import ToolbarContainer from "./components/Toolbar/ToolbarContainer";
import Footer from "./components/Footer";
import LandingView from "./pages/LandingView";
import PostsView from "./pages/PostsView";
import RegisterView from "./pages/RegisterView";
import LoginView from "./pages/LoginView";
import PageNotFoundView from "./pages/PageNotFoundView";
import { UserProvider } from "./contexts/UserContext";
import ScrollToTop from "./components/ScrollToTop";

export default function OlWebsiteApp() {
  /************************************
   * Render
   ************************************/

  return (
    <UserProvider>
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <ToolbarContainer />
            <ScrollToTop>
              <div className="app-body">
                <Switch>
                  <Route exact path="/" component={LandingView} />
                  <Route path="/login" component={LoginView} />
                  <Route path="/posts" component={PostsView} />
                  <Route path="/sign-up" component={RegisterView} />
                  <Route path="*" component={PageNotFoundView} />
                </Switch>
              </div>
            </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}
