import React from "react";
import Slider from "../slider/Slider";
import SpecialOffer from "@/components/special-offer/SpecialOffer";
import placeHolder from "@/public/placeholder.png";
import ProductCard from "@/components/product-card/ProductCard";
import { getBannerByOrder } from "@/app/action/mainBanner";
import { getLocale } from "next-intl/server";

const translateSlides = (slides: any[], locale: string) => {
  return slides.map((slide) => ({
    ...slide,
    title: (slide.title as Record<string, string>)[locale],
    subTitle: (slide.subTitle as Record<string, string>)[locale],
  }));
};

const MainBanner = async () => {
  const locale = await getLocale();

  const [slides, specialOffer, productCard] = await Promise.all([
    getBannerByOrder(1),
    getBannerByOrder(2),
    getBannerByOrder(3),
  ]);

  const dataSlides = translateSlides(slides, locale);
  const dataSpecialOffer = translateSlides(specialOffer, locale);
  const dataProductCard = translateSlides(productCard, locale);

  return (
    <section className="container mx-auto my-4">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="lg:w-4/6">
          <Slider
            options={{ dots: true, arrows: true }}
            slides={dataSlides ?? []}
          />
        </div>
        <div className="lg:w-2/6 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
          {specialOffer.length > 0 && (
            <SpecialOffer
              subtitle={dataSpecialOffer[0]?.subTitle || ""}
              title={dataSpecialOffer[0]?.title || ""}
              img={{
                src: dataSpecialOffer[0]?.linkImage || placeHolder,
                alt: dataSpecialOffer[0]?.title || "placeholder img",
              }}
              redirectTo={dataSpecialOffer[0]?.linkProduct || "/#"}
            />
          )}
          {dataProductCard.length > 0 && (
            <ProductCard
              title={dataProductCard[0]?.title || ""}
              price={dataProductCard[0]?.price || ""}
              img={{
                src: dataProductCard[0]?.linkImage ?? placeHolder,
                alt: dataProductCard[0]?.title ?? "",
              }}
              linkProduct={dataProductCard[0]?.linkProduct ?? "#"}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
