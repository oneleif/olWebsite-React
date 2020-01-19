import React, { useEffect, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

import DotIndicator from "../DotIndicator/DotIndicator";

/************************************
 * Constants
 ************************************/

const SLIDE_SIZE = 100;

export default function Carousel ({
  slides,
  interval,
  arrowSize,
  arrowColor,
  isAutomatic, 
  initialPosition,
  includeDotIndicators,
  includeNavigationArrows 
}) {

  /************************************
   * State
   ************************************/
  const [autoRun, setAutoRun] = useState(isAutomatic);
  const [position, setPosition] = useState(initialPosition);

  /************************************
   * Callbacks
   ************************************/

  const handleNext = useCallback(() => {
    const lastSlide = -SLIDE_SIZE * (slides.length - 1);

    position ===  lastSlide
      ? setPosition(initialPosition)
      : setPosition(position - SLIDE_SIZE);
  }, [initialPosition, position, slides.length]); 

  /************************************
   * Life Cycle Hooks
   ************************************/

  useEffect(() => {
    if(autoRun) {
      const id = setInterval(handleNext, interval);
      return () => clearInterval(id);
    }
  }, [handleNext, interval, autoRun]);
 
  /************************************
   * Functions
   ************************************/

  function handlePrevious() {
    const lastSlide = -SLIDE_SIZE * (slides.length - 1);

    position === initialPosition
      ? setPosition(lastSlide)
      : setPosition(position + SLIDE_SIZE);
  }

  /************************************
   * Render
   ************************************/
  const arrowStyles = {
    size: arrowSize,
    color: arrowColor
  }

  const carouselSlides = slides.map((slide, index) => (
    <div 
      key={index} 
      className="slide"
      style={{transform:`translateX(${position}%)`}}>
      {slide}
    </div> 
  ));

  return (
    <div className="carousel">
      {carouselSlides}
      {includeNavigationArrows &&
        <>
          <button 
            className="arrow-left"
            onClick={handlePrevious}
            onBlur={() => setAutoRun(true)}
            onFocus={() => setAutoRun(false)}
            onMouseLeave={() => setAutoRun(true)}
            onMouseEnter={() => setAutoRun(false)}>
            <FaChevronLeft {...arrowStyles}/>
          </button>
          <button 
            className="arrow-right"
            onClick={handleNext}
            onBlur={() => setAutoRun(true)}
            onFocus={() => setAutoRun(false)}
            onMouseLeave={() => setAutoRun(true)}
            onMouseEnter={() => setAutoRun(false)}>
            <FaChevronRight {...arrowStyles}/>
          </button>
        </> 
      }
      {includeDotIndicators && 
        <DotIndicator 
          slides={slides}
          onDotClicked={index => setPosition(index * -SLIDE_SIZE)}
          currentIndex={Math.abs(position) / 100}/>
      }
    </div>
  );
};

Carousel.defaultProps = {
  slides: [],
  interval: 6000,
  arrowSize: 20,
  arrowColor: "white",
  isAutomatic: true,
  initialPosition: 0,
  includeDotIndicators: true,
  includeNavigationArrows: true,
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any),
  interval: PropTypes.number,
  arrowSize: PropTypes.number,
  arrowColor: PropTypes.string,
  isAutomatic: PropTypes.bool,
  initialPosition: PropTypes.number,
  includeDotIndicators: PropTypes.bool,
  includeNavigationArrows: PropTypes.bool,
};