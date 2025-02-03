// CarouselItem.js
import React from "react";
import Image from "next/image";
import carouselIcon from "@/public/carousel.png";

type CarouselItemProps = {
  title: string;
};

const CarouselItem = ({ title }: CarouselItemProps) => {
  return (
    <div className="text-center p-4 border border-solid border-gray-100 mx-2">
      <Image
        src={carouselIcon}
        alt={title}
        width={148}
        height={148}
        className="mx-auto"
      />
      <h3 className="mt-2 text-sm font-semibold line-clamp-1">{title}</h3>
    </div>
  );
};

export default CarouselItem;
