import React from "react";
import ProductItemCard from "./ProductItemCard";
import { StaticImageData } from "next/image";
export type ProductItemCardType = {
  id?: number;
  image: {
    src: StaticImageData | string;
    alt: string;
  };
  title: string;
  price: number;
};

type ProductListCardType = {
  products: ProductItemCardType[];
  titleList: string;
};
const ProductListCard = ({ products, titleList }: ProductListCardType) => {
  return (
    <li className="gap-4 flex flex-col">
      <h3 className="font-semibold uppercase">{titleList}</h3>
      {products.map((product) => (
        <ProductItemCard key={product.id} {...product} />
      ))}
    </li>
  );
};

export default ProductListCard;
