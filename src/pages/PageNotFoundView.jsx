import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PageNotFoundView() {
  const location = useLocation();

  /************************************
   * Render
   ************************************/

  return (
    <div className="page-not-found-view-container">
      <div className="page-not-found-view-body">
        <h1>404</h1>
        <code>{location.pathname}</code>
        <h3>Page Not Found</h3>
        <p>Sorry, the page you are looking for doesn't seem to exist!</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
