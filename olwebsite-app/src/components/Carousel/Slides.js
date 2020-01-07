/**
 * This file is basically a playground for testing
 * different types of slides.
 */

import React from "react";

import homeLogo from "../../images/homeLogo.png";

const ol = <img alt="logo" src={homeLogo} className="slide" />;
const randomJsx = (
  <div className="slide">
    <h1>Hello, world!</h1>
  </div>
);

export default [ol, randomJsx];
