"use client";
import React from "react";
import Tag from "../tag/Tag";
import Image, { StaticImageData } from "next/image";
import Stars from "../stars/Stars";
import IconWithText from "../icon-with-text/IconWithText";
import { useTranslations } from "next-intl";

type ProductBigItemCardProps = {
  id?: number;
  discount?: number;
  raiting?: number;
  isHot: boolean;
  isSoldOut?: boolean;
  image: {
    src: string | StaticImageData;
    alt: string;
  };
  count: number;
  title: string;
  price: number;
  description: string;
};

const ProductItemCard = ({
  id,
  discount,
  isHot,
  isSoldOut,
  image,
  count = 0,
  title,
  description,
  price = 0,
  raiting = 0,
}: ProductBigItemCardProps) => {
  const t = useTranslations("");

  return (
    <article className="relative lg:max-w-xs w-full border border-gray-100">
      <div
        className="absolute top-4 flex flex-col gap-2 px-5"
        role="complementary"
        aria-label="Product badges"
      >
        {discount && (
          <Tag
            color="warning"
            size="small"
            weight="semiBold"
            aria-label={`Discount ${discount} ${t("off")}`}
          >
            {discount} % {t("off")}
          </Tag>
        )}
        {isHot && (
          <Tag
            color="danger"
            size="small"
            weight="semiBold"
            aria-label="Hot item"
          >
            {t("Hot")}
          </Tag>
        )}
        {isSoldOut && count < 10 && (
          <Tag
            color="secondary"
            size="small"
            weight="semiBold"
            aria-label="Product sold out"
          >
            {count === 0 ? "Sold out" : "Last pieces"}
          </Tag>
        )}
      </div>
      <div>
        <figure className="mb-4 relative w-full aspect-square max-h-96">
          <Image
            src={image.src}
            alt={image.alt}
            className="w-full object-cover"
            fill
          />
        </figure>
        <div className="px-5">
          <div role="complementary" aria-label="Product rating">
            <Stars rating={raiting} />
          </div>
          <h3 className="line-clamp-2 text-gray-900 text-sm my-2">{title}</h3>
          <div>
            {!discount ? (
              <>
                {price} {t("Currency")}
              </>
            ) : (
              <>
                <span className="text-gray-300 line-through">
                  {price} {t("Currency")}
                </span>{" "}
                <span className="text-blue-400 font-semibold ml-1">
                  {price * (1 - 0.01 * discount)} {t("Currency")}
                </span>
              </>
            )}
          </div>
          <div
            className="text-sm mt-2 text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="flex justify-around gap-4 mt-4 max-lg:justify-self-center px-5 pb-5">
          <IconWithText
            icon="Heart"
            colorText="text-gray-900"
            colorIcon="text-gray-900"
            colorIconHover="text-orange-500"
            sizeIcon={18}
            onAction={() => console.log(id)}
            className="bg-orange-100 !p-4 text-center gap-0 hover:border-orange-500 hover:border"
          />
          <IconWithText
            icon="ShoppingCart"
            label={t("AddToCart")}
            sizeIcon={18}
            colorText="text-white"
            sizeText="!text-xs !font-semibold"
            colorIconHover="text-black"
            colorIcon="text-white"
            className="bg-orange-500 flex !px-2 flex-grow  justify-center max-w-full uppercase rounded-sm "
          />
          <IconWithText
            icon="Eye"
            colorText="text-gray-900"
            colorIcon="text-gray-900"
            sizeIcon={18}
            colorIconHover="text-orange-500"
            className="bg-orange-100 !p-4 text-center gap-0 hover:border-orange-500 hover:border round-md"
          />
        </div>
      </div>
    </article>
  );
};

export default ProductItemCard;
