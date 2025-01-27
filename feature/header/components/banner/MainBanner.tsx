import React from "react";
import Slider from "../slider/Slider";
import SpecialOffer from "@/components/special-offer/SpecialOffer";
import placeHolder from "@/public/placeholder_sidedeal_1.png";
import ProductCard from "@/components/product-card/ProductCard";
import placeholderSlider from "@/public/placeholder_slider_1.png";
import placeholderSlider_2 from "@/public/placeholder_sidedeal_1.png";
const slides = [
  {
    id: 1,
    subtitle: "the best place to play",
    title: "Xbox Consoles",
    description:
      "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    image: {
      src: placeholderSlider,
      alt: "test",
    },
    price: 100,
  },
  {
    id: 2,
    subtitle: "the best place to play",
    title: "Xbox Consoles",
    description:
      "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    image: {
      src: placeholderSlider_2,
      alt: "test",
    },
    price: 100,
  },
];
const MainBanner = () => {
  return (
    <section className="container mx-auto my-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="lg:w-4/6">
          <Slider
            options={{
              dots: true,
              arrows: true,
            }}
            slides={slides}
          />
        </div>
        <div className="lg:w-2/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
          <SpecialOffer
            subtitle="Summer Sales"
            title="New Google Pixel 6 Pro"
            img={{
              src: placeHolder,
              alt: "google pixel",
            }}
          />
          <ProductCard
            title="Xiaomi FlipBuds Pro"
            price={299}
            img={{
              src: placeHolder,
              alt: "google pixel",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
