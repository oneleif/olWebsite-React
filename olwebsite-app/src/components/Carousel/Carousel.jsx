import React, { useEffect, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

import DotIndicator from "../DotIndicator/DotIndicator";

/************************************
 * Constants
 ************************************/

const SLIDE_SIZE = 100;
const INITIAL_POSITION = 0;

export default function Carousel ({slides, interval }) {

  /************************************
   * State
   ************************************/
  const [position, setPosition] = useState(INITIAL_POSITION);

  /************************************
   * Callbacks
   ************************************/

  const handleNext = useCallback(() => {
    const lastSlide = -SLIDE_SIZE * (slides.length - 1);

    position ===  lastSlide
      ? setPosition(INITIAL_POSITION)
      : setPosition(position - SLIDE_SIZE);
  }, [position, slides.length]); 

  /************************************
   * Lifecycle Hooks
   ************************************/

  useEffect(() => {
    const msInterval = setInterval(() => {
      handleNext();
    }, interval);

    return function cleanup() {
      clearInterval(msInterval);
    };
  }, [handleNext, interval]);
 
  /************************************
   * Functions
   ************************************/

  function handlePrevious() {
    const lastSlide = -SLIDE_SIZE * (slides.length - 1);

    position === INITIAL_POSITION
      ? setPosition(lastSlide)
      : setPosition(position + SLIDE_SIZE);
  }

  /************************************
   * Render
   ************************************/
  
  const carouselSlides = slides.map((slide, index) => (
      <div 
        key={index} 
        className="slide"
        style={{transform:`translateX(${position}%)`}}
      >
       {slide}
      </div>  
  ));

  return (
    <div className="carousel">
        {carouselSlides}
        <FaChevronLeft className="arrow-left" onClick={handlePrevious} />
        <FaChevronRight className="arrow-right" onClick={handleNext} />
        <DotIndicator 
          slides={slides}
          onDotClicked={index => setPosition(index * -SLIDE_SIZE)}
          currentIndex={Math.abs(position) / 100}
        />
    </div>
  );
};

Carousel.defaultProps = {
  interval: 5000
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any).isRequired,
  interval: PropTypes.number
};