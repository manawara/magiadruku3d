import React from "react";
import Slider from "../slider/Slider";
import SpecialOffer from "@/components/special-offer/SpecialOffer";
import placeHolder from "@/public/placeholder_sidedeal_1.png";
import ProductCard from "@/components/product-card/ProductCard";
import { getBannerByOrder } from "@/app/action/mainBanner";
import { getLocale } from "next-intl/server";

const MainBanner = async () => {
  const locale = await getLocale();
  const slides = await getBannerByOrder(1);
  const dataSlides = slides.map((slide) => {
    return {
      ...slide,
      title: (slide.title as Record<string, string>)[locale],
      subTitle: (slide.subTitle as Record<string, string>)[locale],
    };
  });
  console.log(dataSlides);
  return (
    <section className="container mx-auto my-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="lg:w-4/6">
          <Slider
            options={{
              dots: true,
              arrows: true,
            }}
            slides={dataSlides ?? []}
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
