import React from "react";
import Tag from "../tag/Tag";
import Button from "../button/Button";
import Image, { StaticImageData } from "next/image";
import Price from "../price/Price";
import { IntentType } from "@/types";

type ProductBannerProps = {
  className?: string;
  label?: string;
  tagColor?: IntentType;
  title: string;
  description: string;
  image: {
    src: StaticImageData | string;
    alt: string;
  };
  price?: number;
};

const ProductBanner = ({
  className,
  label,
  tagColor,
  title,
  description,
  image,
  price,
}: ProductBannerProps) => {
  return (
    <div
      className={`${className} rounded p-6 lg:p-10 relative top-0 left-0 flex flex-col sm:grid sm:grid-cols-2 `}
    >
      <div className="absolute top-10 left-6 lg:left-10">
        {label && <Tag color={tagColor}>{label}</Tag>}
      </div>
      {price && <Price price={price} className="absolute top-8 right-4" />}
      <div className="flex flex-col order-2 sm:order-1 sm:mt-16">
        <h3 className="mt-3 text-3xl font-semibold">{title}</h3>
        <p className="text-inherit py-4">{description}</p>
        <Button
          type="button"
          intent="primary"
          className="uppercase max-w-max font-semibold"
          size="medium"
          icon
        >
          shop now
        </Button>
      </div>
      <div className="flex justify-center sm:justify-end order-1 sm:order-2 mt-16 sm:mt-0">
        <Image
          src={image.src}
          alt={image.alt}
          className="object-contain max-w-[230px]"
        />
      </div>
    </div>
  );
};

export default ProductBanner;
