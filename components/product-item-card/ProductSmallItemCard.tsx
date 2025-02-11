import React from "react";
import Tag from "../tag/Tag";
import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import IconWithText from "../icon-with-text/IconWithText";
import Link from "next/link";
import Stars from "../stars/Stars";

type ProductSmallItemCardProps = {
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

const ProductSmallItemCard = async ({
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
  const t = await getTranslations();
  return (
    <article
      className={`relative w-full  border border-gray-100 p-4 ${
        shadow ? "hover:shadow-xl duration-200 transition-shadow" : ""
      }`}
    >
      <div
        className="flex justify-start flex-col gap-2 absolute"
        color="secondary"
      >
        {discount && (
          <Tag
            color="warning"
            size="small"
            weight="semiBold"
            aria-label={`Discount ${discount} off`}
          >
            {discount} % OFF
          </Tag>
        )}
        {isHot && (
          <Tag
            color="danger"
            size="small"
            weight="semiBold"
            aria-label="Hot item"
          >
            HOT
          </Tag>
        )}
        {isSoldOut && count < 10 && (
          <Tag
            color="secondary"
            size="small"
            weight="semiBold"
            aria-label="Product sold out"
          >
            Last pieces
          </Tag>
        )}
      </div>
      <div className="flex justify-center relative group hover:before:opacity-30  before:absolute before:content-[''] before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gray-500 before:opacity-0 before:duration-200 before:transition-opacity">
        <Image
          src={image.src}
          alt={image.alt}
          className="max-w-64 object-cover flex"
        />

        <div className="invisible group-hover:visible group-hover:opacity-100 absolute top-0 bottom-0 left-0 right-0 opacity-0 transition-opacity duration-200">
          <div className="flex justify-center gap-2 items-center  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <IconWithText
              icon="Heart"
              colorIcon="text-gray-950"
              colorText="text-gray-950"
              colorIconHover="text-gray-950"
              sizeIcon={20}
              className="bg-white !p-3 opacity-100 rounded-full hover:bg-orange-500"
              animate={false}
            />
            <IconWithText
              icon="ShoppingCart"
              colorIcon="text-gray-900"
              colorIconHover="text-gray-950"
              sizeIcon={20}
              className="bg-white !p-3 opacity-100 rounded-full hover:bg-orange-500"
              animate={false}
            />
            <Link href="#">
              <IconWithText
                icon="Eye"
                colorIcon="text-gray-900"
                colorIconHover="text-gray-950"
                sizeIcon={20}
                className="bg-white !p-3 opacity-100 rounded-full hover:bg-orange-500"
                animate={false}
              />
            </Link>
          </div>
        </div>
      </div>
      {rating && <Stars rating={rating} count={2} color="yellow" />}
      <h3 className="my-3 line-clamp-2 text-sm">{title}</h3>
      <p className="text-blue-500 font-semibold">
        {!discount ? (
          `${price} ${t("Currency")}`
        ) : (
          <>
            <span className="text-gray-300 line-through">
              {price} {t("Currency")}
            </span>
            <span className="text-blue-500 font-semibold ml-1">
              {price * (1 - 0.01 * discount)}
            </span>
            {t("Currency")}
          </>
        )}
      </p>
    </article>
  );
};

export default ProductSmallItemCard;
