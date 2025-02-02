import React from "react";
import DealsHeader from "./DealsHeader";
import ProductGrid from "./ProductsGrid";

const BestDeals = () => {
  return (
    <section className="container mx-auto my-4  min-h-[592px]">
      <DealsHeader title="Best deals" />
      <ProductGrid />
    </section>
  );
};

export default BestDeals;
