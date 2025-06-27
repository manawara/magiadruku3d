import ProductBigItemCard from "@/components/product-item-card/ProductBigItemCard";
import React from "react";
import productImage from "@/public/placeholder_productItemCard.png";
import ProductSmallItemCard from "@/components/product-item-card/ProductSmallItemCard";
import { getProductTag } from "@/app/action/product";
import { getLocale } from "next-intl/server";
import DOMPurify from "isomorphic-dompurify";

interface ProductGridProps {
  tag: string;
}
type Locale = "en" | "pl";

const ProductGrid = async ({ tag }: ProductGridProps) => {
  const locale = (await getLocale()) as Locale;
  const products = await getProductTag(tag, 9);

  if (!products || products.length === 0) {
    return <div>Brak produktów dla tagu: {tag}</div>;
  }
  const [bigProduct, ...smallProducts] = products;
  const sanitizedDescription = DOMPurify.sanitize(
    bigProduct.description[locale]
  );

  return (
    <div className="flex lg:flex-row flex-col my-6 gap-4 h-full">
      <ProductBigItemCard
        id={bigProduct.id}
        discount={bigProduct.discount}
        price={Number(bigProduct.price)}
        count={bigProduct.stock}
        title={bigProduct.productName[locale]}
        isHot={bigProduct.tag === "popular"} // lub inne warunki
        isSoldOut={bigProduct.sold === 0}
        description={sanitizedDescription}
        image={{
          src: bigProduct.images?.[0] || productImage.src,
          alt: bigProduct.productName[locale],
        }}
      />
      <div className="grid min-[460px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-4 gap-4 h-max">
        {smallProducts.map((product) => (
          <ProductSmallItemCard
            id={product.id}
            key={product.id}
            image={{
              src: product.images?.[0] || productImage.src,
              alt: product.productName[locale],
            }}
            price={Number(product.price)}
            title={product.productName[locale]}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
