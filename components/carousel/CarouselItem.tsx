import React from "react";
import Image from "next/image";
import carouselIcon from "@/public/placeholder.png";
import { StaticImageData } from "next/image";
import Link from "next/link";
import slugify from "slugify";

type CarouselItemProps = {
  title: string;
  images: string | StaticImageData;
  category?: string;
};

const CarouselItem = ({ title, images, category }: CarouselItemProps) => {
  const slugyTitle = slugify(title, { lower: true });
  const content = (
    <>
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
    </>
  );

  return (
    <div className="text-center p-4 border border-solid border-gray-100 mx-2">
      {category ? (
        <Link href={`/${category}/${slugyTitle}`}>{content}</Link>
      ) : (
        content
      )}
    </div>
  );
};

export default CarouselItem;
