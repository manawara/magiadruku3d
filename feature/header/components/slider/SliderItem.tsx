"use client";
import Button from "@/components/button/Button";
import Category from "@/components/category/Category";
import Price from "@/components/price/Price";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "./variants";
import { SliderItemType } from "@/types";
import placeholderIcon from "@/public/placeholder.jpg";
type SliderItemProps = {
  currentSlide: number;
  direction: string;
} & SliderItemType;

const SliderItem = ({
  subTitle,
  title,
  description,
  linkImage,
  price,
  currentSlide,
  direction,
}: SliderItemProps) => {
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
          <Button
            intent="primary"
            icon
            size="medium"
            className="uppercase font-semibold max-w-fit mt-4"
          >
            shop
          </Button>
        </div>
        <div className="max-sm:order-1 flex max-sm:justify-center">
          <Image
            src={linkImage || placeholderIcon}
            alt={title}
            width={350}
            height={380}
            className="max-w-80 max-h-[380px] max-sm:w-full object-contain"
          />
        </div>

        <Price price={price} className="absolute top-12 right-6" />
      </motion.div>
    </AnimatePresence>
  );
};

export default SliderItem;
