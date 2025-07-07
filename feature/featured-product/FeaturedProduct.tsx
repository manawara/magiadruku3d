"use client";
import React, { useState, useCallback } from "react";
import NavProduct from "./NavProduct";
import ProductSmallItemCard from "@/components/product-item-card/ProductSmallItemCard";
import iconCard from "@/public/placeholder_productItemCard.png";

import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getCategoryByID } from "@/app/action/category";
import { getProductByCategory } from "@/app/action/product";
import { getLocalizedValue } from "@/lib/helper";
import SpinLoader from "@/backend/components/loading/components/spin/Spin";

const FeaturedProduct = () => {
  const [selectID, setSelectID] = useState({ id: 0, name: "all" });
  const locale = useLocale();
  const t = useTranslations();

  const { data: dbCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryByID(0),
    staleTime: 1000 * 60 * 5, // 5 minut cache
  });

  const { data: dbProduct, isLoading } = useQuery({
    queryKey: ["products", selectID.name],
    queryFn: () => getProductByCategory(locale, selectID.name),
    staleTime: 1000 * 60 * 5,
  });

  const handleClickCategory = useCallback(
    (id: number, name: string) => {
      if (selectID.id !== id) {
        setSelectID({ id, name });
      }
    },
    [selectID.id]
  );

  const getFirstImage = (images: unknown): string => {
    if (Array.isArray(images) && images.length > 0) {
      const firstImage = images[0];
      return typeof firstImage === "string" ? firstImage : iconCard.src;
    }
    return iconCard.src;
  };

  return (
    <section className="container mx-auto my-9 flex flex-col">
      <div className="flex items-center justify-between max-lg:flex-col">
        <h2 className="text-2xl font-semibold">{t("FeaturedProducts")}</h2>
        {Array.isArray(dbCategory) && !isLoadingCategory && (
          <NavProduct
            categories={dbCategory}
            onAction={handleClickCategory}
            isActive={selectID.id}
          />
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <SpinLoader />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4">
          {dbProduct?.map((product) => {
            const productName = getLocalizedValue(product.productName, locale);
            const imageSrc = getFirstImage(product.images);

            return (
              <ProductSmallItemCard
                key={product.id}
                id={product.id}
                title={productName}
                price={product.price}
                rating={2}
                shadow
                image={{
                  src: imageSrc,
                  alt: productName,
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProduct;
