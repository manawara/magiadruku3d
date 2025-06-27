"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Tag from "../tag/Tag";
import Image, { StaticImageData } from "next/image";
import IconWithText from "../icon-with-text/IconWithText";
import Link from "next/link";
import Stars from "../stars/Stars";

type ProductSmallItemCardProps = {
  id: number;
  title: string;
  image: {
    src: StaticImageData | string;
    alt: string;
  };
  price: number;
  discount?: number;
  count?: number;
  isSoldOut?: boolean;
  isHot?: boolean;
  shadow?: boolean;
  rating?: number;
};

const ProductSmallItemCard = ({
  id,
  title,
  image,
  price,
  discount,
  rating,
  count = 0,
  isSoldOut,
  isHot = true,
  shadow = false,
}: ProductSmallItemCardProps) => {
  const t = useTranslations();

  return (
    <article
      className={`relative w-full border border-gray-100 ${
        shadow ? "hover:shadow-xl duration-200 transition-shadow" : ""
      }`}
    >
      {/* Tagi (HOT, Discount, Last pieces) */}
      <div className="flex flex-col gap-2 absolute z-10 p-4">
        {discount && (
          <Tag color="warning" size="small" weight="semiBold">
            {discount} % {t("off")}
          </Tag>
        )}
        {isHot && (
          <Tag color="danger" size="small" weight="semiBold">
            {t("Hot_2")}
          </Tag>
        )}
        {isSoldOut && count < 10 && (
          <Tag color="secondary" size="small" weight="semiBold">
            Last pieces
          </Tag>
        )}
      </div>

      {/* Obrazek z overlayem i ikonami */}
      <div className="relative w-full aspect-[4/3] overflow-hidden group">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />

        <div className="invisible z-10 group-hover:visible group-hover:opacity-100 absolute inset-0 opacity-0 transition-opacity duration-200 bg-black/10">
          <div className="flex justify-center gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconWithText
              icon="Heart"
              colorIcon="text-gray-950"
              colorText="text-gray-950"
              colorIconHover="text-gray-950"
              sizeIcon={20}
              className="bg-white !p-3 rounded-full hover:bg-orange-500"
              animate={false}
              onAction={() => console.log(id)}
            />
            <IconWithText
              icon="ShoppingCart"
              colorIcon="text-gray-900"
              colorIconHover="text-gray-950"
              sizeIcon={20}
              className="bg-white !p-3 rounded-full hover:bg-orange-500"
              animate={false}
            />
            <Link href="#">
              <IconWithText
                icon="Eye"
                colorIcon="text-gray-900"
                colorIconHover="text-gray-950"
                sizeIcon={20}
                className="bg-white !p-3 rounded-full hover:bg-orange-500"
                animate={false}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Treść pod obrazkiem */}
      <div className="mt-4 px-4 pb-4">
        {rating && <Stars rating={rating} count={2} color="yellow" />}
        <h3 className="my-2 line-clamp-2 text-sm">{title}</h3>
        <p className="text-primaryBackend-200 text-md font-thin">
          {!discount ? (
            `${price} ${t("Currency")}`
          ) : (
            <>
              <span className="text-gray-300 line-through">
                {price} {t("Currency")}
              </span>
              <span className="text-blue-500 font-semibold ml-1">
                {(price * (1 - 0.01 * discount)).toFixed(2)} {t("Currency")}
              </span>
            </>
          )}
        </p>
      </div>
    </article>
  );
};

export default ProductSmallItemCard;
