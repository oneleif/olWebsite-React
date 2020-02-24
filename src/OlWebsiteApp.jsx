import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from './components/Objects/ProtectedRoute/ProtectedRoute';

import "./style-sheets/main.scss";

import ToolbarContainer from "./components/Toolbar/ToolbarContainer";
import Footer from "./components/Footer";
import LandingView from "./pages/LandingView";
import LoginView from "./pages/LoginView";
import PostsView from "./pages/PostsView";
import ProfileView from "./pages/ProfileView";
import RegisterView from "./pages/RegisterView";
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
                <Route path="/login" component={LoginView} />
                <Route path="/posts" component={PostsView} />
                <ProtectedRoute path="/profile" component={ProfileView} />
                <Route path="/sign-up" component={RegisterView} />
                <Route path="/" component={LandingView} />
              </Switch>
            </div>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}
