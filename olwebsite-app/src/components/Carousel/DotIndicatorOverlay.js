import React from "react";
import PropTypes from "prop-types";

const DotIndicatorOverlay = ({ slides, currentIndex, onClick }) => {
  /************************************
   * Render
   ************************************/

  return (
    <div className="dot_indicators_container">
      {slides.map((_, index) => (
        <div
          key={index}
          className={`dot_indicator ${
            index === currentIndex ? "white" : "gray"
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

DotIndicatorOverlay.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired
};

export default DotIndicatorOverlay;
