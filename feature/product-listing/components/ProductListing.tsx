import React from "react";
import iconCard from "@/public/placeholder_productItemCard.png";
import ProductSmallItemCard from "@/components/product-item-card/ProductSmallItemCard";

const ProductListing = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProductSmallItemCard
        id={1}
        title="ssss"
        price={22}
        rating={2}
        shadow
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={2}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={3}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={4}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={5}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={6}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={7}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
      <ProductSmallItemCard
        id={8}
        title="ssss"
        price={22}
        image={{
          src: iconCard,
          alt: "ssss",
        }}
      />
    </div>
  );
};

export default ProductListing;
