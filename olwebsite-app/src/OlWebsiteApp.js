import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/main.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingView from "./components/LandingView";

export default function OlWebsiteApp() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <div className="App-header">
          <Switch>
            <Route path="/" component={LandingView} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
