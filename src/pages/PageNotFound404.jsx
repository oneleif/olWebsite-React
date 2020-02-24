import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PageNotFound404() {
  /************************************
   * Render
   ************************************/
  let location = useLocation();

  return (
    <div className="container-404">
      <div className="body-404">
        <h1>404</h1>
        <code>{location.pathname}</code>
        <h3>Page Not Found</h3>
        <p>Sorry, the page you are looking for doesn't seem to exist!</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
