import React from "react";
import Slider from "react-slick";
import banner1 from "./images/home/banner/images1.jpeg";
import banner2 from "./images/home/banner/images3.jpg";
import banner3 from "./images/home/banner/images7.jpg";
import banner4 from "./images/home/banner/images6.jpg";

function BannerSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 800,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>

        <div>
          <img src={banner3} />
        </div>
        <div>
          <img src={banner4} />
        </div>
      </Slider>
    </div>
  );
}

export default BannerSlider;
