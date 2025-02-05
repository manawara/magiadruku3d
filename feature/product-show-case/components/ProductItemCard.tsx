import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { slugify } from "@/lib/helper";
import Link from "next/link";
import { ProductItemCardType } from "./ProductListCard";

const ProductItemCard = async ({
  image,
  title,
  price,
}: ProductItemCardType) => {
  const t = await getTranslations();
  return (
    <Link href={slugify(title)} className="hover:shadow-lg">
      <div className="rounded-[3px] border-[1px] border-solid border-gray-100 p-3 flex items-center gap-2">
        <Image
          src={image.src}
          alt={image.alt}
          className="max-w-20 object-contain object-center"
        />
        <div>
          <h4 className="text-gray-900 line-clamp-2">{title}</h4>
          <span className="text-blue-500 font-semibold">{`${price} ${t(
            "Currency"
          )}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItemCard;
