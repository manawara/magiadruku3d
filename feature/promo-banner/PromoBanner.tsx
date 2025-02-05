import React from "react";
import ProductBanner from "@/components/product-banner/ProductBanner";
import placeHolder from "@/public/placeholder_sidedeal_1.png";
const PromoBanner = () => {
  return (
    <aside className="container mx-auto grid gap-5 grid-col-1 xl:grid-cols-2">
      <ProductBanner
        className="bg-gray-50 text-gray-950"
        label="INTRODUCING"
        tagColor="info"
        title="New Apple
Homepod Mini"
        description="Jam-packed with innovation, HomePod mini delivers unexpectedly."
        image={{
          src: placeHolder,
          alt: "terst",
        }}
      />
      <ProductBanner
        className="bg-gray-950 text-gray-50"
        label="INTRODUCING"
        tagColor="info"
        title="New Apple
Homepod Mini"
        description="Jam-packed with innovation, HomePod mini delivers unexpectedly."
        image={{
          src: placeHolder,
          alt: "terst",
        }}
        price={22}
      />
    </aside>
  );
};

export default PromoBanner;
