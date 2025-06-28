// CarouselItem.js
import React from "react";
import Image from "next/image";
import carouselIcon from "@/public/placeholder.png";
import { StaticImageData } from "next/image"; // ✅ Import typu StaticImageData

type CarouselItemProps = {
  title: string;
  images: string | StaticImageData; // Dodaj to pole
};

const CarouselItem = ({ title, images }: CarouselItemProps) => {
  return (
    <div className="text-center p-4 border border-solid border-gray-100 mx-2">
      <Image
        src={images || carouselIcon}
        alt={title}
        width={148}
        height={148}
        className="mx-auto"
      />
      <h3 className="mt-2 text-sm font-semibold line-clamp-1">
        {title || "sss"}
      </h3>
    </div>
  );
};

export default CarouselItem;
