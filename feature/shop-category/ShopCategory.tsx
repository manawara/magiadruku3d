import { getCategory } from "@/app/action/category";
import Carousel from "@/components/carousel/Carousel";
import { getLocale, getTranslations } from "next-intl/server";

import React from "react";

const ShopCategory = async () => {
  const locale = await getLocale();
  const categories = await getCategory(locale);

  const t = await getTranslations("ShopCategory");
  return (
    <section className="container mx-auto my-12">
      <h2 className="text-3xl font-semibold text-center mb-6">{t("title")}</h2>
      <Carousel items={categories} />
    </section>
  );
};

export default ShopCategory;
