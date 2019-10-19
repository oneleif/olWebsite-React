import React from 'react';

import homeLogo from '../images/homeLogo.png';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselWrapper() {
  return (
    <div className="carousel-custom">
        <Carousel showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={6000}
        width={"75%"}
        showStatus={false}>
                <div><img src={homeLogo} alt="logo"/></div>
                <div><img src={homeLogo} alt="logo"/></div>
                <div><img src={homeLogo} alt="logo"/></div>
        </Carousel>
    </div>
  )
}

export default CarouselWrapper;