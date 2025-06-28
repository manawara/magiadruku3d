"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import Arrow from "../arrow/Arrow";
import { CategoryType } from "@/types";
import placeholder from "@/public/placeholder.png";

type CarouselType = {
  items: CategoryType[]; //
};

const Carousel = ({ items }: CarouselType) => {
  const sliderRef = useRef<Slider | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

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
    infinite: items.length > 1, // ✅ Wyłącz infinite gdy masz tylko 1 element
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: Math.min(6, items.length), // ✅ Nie pokazuj więcej niż masz elementów
    slidesToScroll: 1,
    autoplay: items.length > 1, // ✅ Wyłącz autoplay dla 1 elementu
    pauseOnHover: true,
    arrows: items.length > 1, // ✅ Wyłącz strzałki dla 1 elementu
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, items.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, items.length),
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
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            title={item.mainCategory || "Bez nazwy"} // ✅ Obsługa null
            images={(item as any).images || placeholder} // ✅ Type assertion jako fallback
          />
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
