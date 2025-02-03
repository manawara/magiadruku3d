"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import Arrow from "../arrow/Arrow";

const Carousel = () => {
  const sliderRef = useRef<Slider | null>(null); // ✅ Określenie typu referencji
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,

          initialSlide: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    "Computer & Laptop",
    "SmartPhone",
    "Headphones",
    "Accessories",
    "Camera",
    "TV & Home",
    "Consoles",
  ];

  return (
    <div className="w-full flex justify-center mb-10 relative top-0 left-0">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/3 z-10">
        <Arrow
          intent="primary"
          direction="left"
          onClick={handlePrev}
          rounded
          isVisible={settings.arrows}
        />
      </div>
      <Slider
        {...settings}
        className="w-full relative"
        ref={(slider) => {
          sliderRef.current = slider;
        }}
      >
        {items.map((title, index) => (
          <CarouselItem key={index} title={title} />
        ))}
      </Slider>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/3 z-10">
        <Arrow
          intent="primary"
          direction="right"
          onClick={handleNext}
          rounded
          isVisible={settings.arrows}
        />
      </div>
    </div>
  );
};

export default Carousel;
