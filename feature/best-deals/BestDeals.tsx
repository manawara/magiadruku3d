import React from "react";
import DealsHeader from "./DealsHeader";
import ProductGrid from "./ProductsGrid";
import { getTranslations } from "next-intl/server";

const BestDeals = async () => {
  const t = await getTranslations("BestDeal");
  return (
    <section className="container mx-auto my-4  min-h-[592px]">
      <DealsHeader title={t("title")} />
      <ProductGrid tag="popular" />
    </section>
  );
};

export default BestDeals;
