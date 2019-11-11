import React from "react";

import homeLogo from "../images/homeLogo.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselWrapper() {
  const SHOW_THUMBS = false;
  const INFINITE_LOOP = true;
  const AUTO_PLAY = true;
  const SHOW_STATUS = false;
  const INTERVAL = 6000;
  const WIDTH = "75%";

  return (
    <div className="carousel-custom">
      <Carousel
        showThumbs={SHOW_THUMBS}
        infiniteLoop={INFINITE_LOOP}
        autoPlay={AUTO_PLAY}
        interval={INTERVAL}
        width={WIDTH}
        showStatus={SHOW_STATUS}
      >
        <div>
          <img src={homeLogo} alt="logo" />
        </div>
        <div>
          <img src={homeLogo} alt="logo" />
        </div>
        <div>
          <img src={homeLogo} alt="logo" />
        </div>
      </Carousel>
    </div>
  );
}
