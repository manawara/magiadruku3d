import React from "react";
import NavProduct from "./NavProduct";
import ProductSmallItemCard from "@/components/product-item-card/ProductSmallItemCard";
import iconCard from "@/public/placeholder_productItemCard.png";
const FeaturedProduct = () => {
  return (
    <section className="container mx-auto my-9 flex flex-col">
      <div className="flex items-center justify-between max-lg:flex-col">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
        <NavProduct />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 ">
        <ProductSmallItemCard
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
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />{" "}
        <ProductSmallItemCard
          title="ssss"
          price={22}
          image={{
            src: iconCard,
            alt: "ssss",
          }}
        />
      </div>
    </section>
  );
};

export default FeaturedProduct;
