import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Arrow from "./Arrow";
import Slide from "./Slide";
import DotIndicatorOverlay from "./DotIndicatorOverlay";

const Carousel = ({ slides, interval }) => {
  /************************************
   * Constants
   ************************************/
  const RIGHT = "right";
  const FIRST_INDEX = 0;
  const LAST_INDEX = slides.length - 1;

  const [autoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(FIRST_INDEX);

  const handleImageNavigation = useCallback(
    direction => {
      let index;
      if (direction === RIGHT) {
        currentIndex === LAST_INDEX
          ? (index = FIRST_INDEX)
          : (index = currentIndex + 1);
      } else {
        currentIndex === FIRST_INDEX
          ? (index = LAST_INDEX)
          : (index = currentIndex - 1);
      }
      setCurrentIndex(index);
    },
    [currentIndex, LAST_INDEX]
  );

  const handleRouteToSlide = index => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let msInterval;
    function startSlideShow() {
      msInterval = setInterval(() => {
        handleImageNavigation(RIGHT);
      }, interval);
    }

    if (autoPlay) {
      startSlideShow();
    }

    return function cleanup() {
      clearInterval(msInterval);
    };
  }, [interval, autoPlay, handleImageNavigation]);

  /************************************
   * Render
   ************************************/

  return (
    <div className="carousel_container">
      <div className="carousel_items">
        <Arrow onClick={handleImageNavigation} />
        <Slide render={() => slides[currentIndex]} />
        <Arrow direction={RIGHT} onClick={handleImageNavigation} />
        <DotIndicatorOverlay
          slides={slides}
          currentIndex={currentIndex}
          onClick={handleRouteToSlide}
        />
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  slides: [],
  interval: 6000
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any),
  interval: PropTypes.number
};

export default Carousel;
