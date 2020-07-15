import React, { useEffect, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

import DotIndicator from "../DotIndicator/DotIndicator";

/************************************
 * Constants
 ************************************/

const SLIDE_SIZE = 100;

export default function Carousel({
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
  const [position, setPosition] = useState(() => {
    return initialPosition >= 0 && initialPosition < slides.length
      ? initialPosition * -SLIDE_SIZE
      : 0;
  });

  /************************************
   * Callbacks
   ************************************/

  const getLastSlide = useCallback(() => {
    return -SLIDE_SIZE * (slides.length - 1);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    const lastSlide = getLastSlide();

    position === lastSlide
      ? setPosition(initialPosition)
      : setPosition(position - SLIDE_SIZE);
  }, [getLastSlide, initialPosition, position]);

  /************************************
   * Life Cycle Hooks
   ************************************/

  useEffect(() => {
    if (autoRun) {
      const id = setInterval(handleNext, interval);
      return () => clearInterval(id);
    }
  }, [handleNext, interval, autoRun]);

  /************************************
   * Functions
   ************************************/

  function handlePrevious() {
    const lastSlide = getLastSlide();

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
  };

  const currentIndex = Math.abs(position) / SLIDE_SIZE;
  const carouselSlides = slides.map((slide, index) => (
    <div
      key={index}
      current_slide={currentIndex === index ? "true" : undefined}
      className="slide"
      data-testid="slide"
      style={{ transform: `translateX(${position}%)` }}>
      {slide}
    </div>
  ));

  return (
    <div className="carousel" data-testid="carousel">
      {carouselSlides}
      {includeNavigationArrows && (
        <>
          <button
            className="arrow-left"
            onClick={handlePrevious}
            onBlur={() => setAutoRun(true)}
            onFocus={() => setAutoRun(false)}
            data-testid="arrow-left"
            onMouseLeave={() => setAutoRun(true)}
            onMouseEnter={() => setAutoRun(false)}>
            <FaChevronLeft {...arrowStyles} />
          </button>
          <button
            className="arrow-right"
            onClick={handleNext}
            onBlur={() => setAutoRun(true)}
            onFocus={() => setAutoRun(false)}
            data-testid="arrow-right"
            onMouseLeave={() => setAutoRun(true)}
            onMouseEnter={() => setAutoRun(false)}>
            <FaChevronRight {...arrowStyles} />
          </button>
        </>
      )}
      {includeDotIndicators && (
        <DotIndicator
          slides={slides}
          onDotClicked={index => setPosition(index * -SLIDE_SIZE)}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
}

Carousel.defaultProps = {
  slides: [],
  interval: 6000,
  arrowSize: 20,
  arrowColor: "white",
  isAutomatic: true,
  initialPosition: 0,
  includeDotIndicators: true,
  includeNavigationArrows: true
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.any),
  interval: PropTypes.number,
  arrowSize: PropTypes.number,
  arrowColor: PropTypes.string,
  isAutomatic: PropTypes.bool,
  initialPosition: PropTypes.number,
  includeDotIndicators: PropTypes.bool,
  includeNavigationArrows: PropTypes.bool
};
