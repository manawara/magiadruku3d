"use client";
import Category from "@/components/category/Category";
import Price from "@/components/price/Price";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "./variants";
import { SliderItemType } from "@/types";
import placeholderIcon from "@/public/placeholder.png";
import ButtonLink from "@/backend/components/button/ButtonLink";
import { useTranslations } from "next-intl";
type SliderItemProps = {
  currentSlide: number;
  direction: string;
} & SliderItemType;

const SliderItem = ({
  subTitle,
  title,
  description,
  linkImage,
  linkProduct,
  price,
  currentSlide,
  direction,
}: SliderItemProps) => {
  const t = useTranslations("Banner.Slider");
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title + currentSlide}
        className="grid grid-cols-2 relative max-sm:grid-cols-1 w-full shrink-0 p-9"
        variants={slideVariants}
        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col justify-center max-sm:order-2">
          <Category title={subTitle as string} />
          <h2 className="text-gray-900 text-4xl font-semibold my-2">{title}</h2>
          <p>{description}</p>
          <ButtonLink
            variant="basic"
            colorFill="warn"
            href={linkProduct ?? "#"}
            className="uppercase font-semibold max-w-fit mt-4"
          >
            {t("shop-now")}
          </ButtonLink>
        </div>
        <div className="max-sm:order-1 flex max-sm:justify-center ">
          <Image
            src={linkImage || placeholderIcon}
            alt={title}
            width={350}
            height={380}
            className="max-w-full lg:max-w-72  max-h-[380px] w-full object-cover md:object-contain md:ml-auto"
          />
        </div>

        <Price
          price={price}
          className="absolute top-12  right-12 md:right-10"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SliderItem;
