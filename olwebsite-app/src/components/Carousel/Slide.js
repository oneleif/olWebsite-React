import React from "react";
import PropTypes from "prop-types";

const Slide = ({ render }) => {
  return <>{render()}</>;
};

Slide.propTypes = {
  render: PropTypes.func.isRequired
};

export default Slide;
