import React from "react";
import PropTypes from "prop-types";

export default function Slide ({ image, alt }) {
  /************************************
   * Render
   ************************************/

  return <img src={image} alt={alt} />;
};

Slide.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};
