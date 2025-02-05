import React from "react";
import showItem from "@/public/showcase.png";
import ProductListCard from "./ProductListCard";
import { getTranslations } from "next-intl/server";
const products = [
  {
    id: 1,
    image: {
      src: showItem,
      alt: "sss",
    },
    title: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
    price: 1500,
  },
  {
    id: 2,
    image: {
      src: showItem,
      alt: "sss",
    },
    title: "Simple Mobile 4G LTE Prepaid Smartphone",
    price: 1500,
  },
  {
    id: 3,
    image: {
      src: showItem,
      alt: "sss",
    },
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 222,
  },
  {
    id: 4,
    image: {
      src: showItem,
      alt: "sss",
    },
    title: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 23,
  },
];
const ProductShowCase = async () => {
  const t = await getTranslations("ProductListCard");
  return (
    <section className="container mx-auto my-8">
      <ul className="py-4 grid max-md:grid-cols-1 max-xl:grid-cols-2 max-xl:gap-10 grid-cols-4 gap-4">
        <ProductListCard
          products={products}
          titleList={t("flash-sale-today")}
        />
        <ProductListCard products={products} titleList={t("best-sellers")} />
        <ProductListCard products={products} titleList={t("top-rated")} />
        <ProductListCard products={products} titleList={t("new-arrival")} />
      </ul>
    </section>
  );
};

export default ProductShowCase;
