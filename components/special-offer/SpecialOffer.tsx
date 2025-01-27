import React from "react";
import Button from "../button/Button";
import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";

interface SpecialOffer {
  subtitle?: string;
  title: string;
  img?: {
    src: string | StaticImageData;
    alt: string;
  };
}
const SpecialOffer = async ({ subtitle, title, img }: SpecialOffer) => {
  const t = await getTranslations("Banner.Slider");
  return (
    <section
      className={`bg-gray-950 relative rounded-md p-8 flex flex-col gap-2`}
    >
      <span className="text-yellow-300 uppercase">{subtitle}</span>
      <h3 className="text-gray-50 z-10 text-xl">{title}</h3>
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          className="absolute -bottom-2 -right-3 max-w-32 w-full"
        />
      )}
      <Button
        intent="primary"
        icon
        size="small"
        className="uppercase font-semibol mt-auto w-max"
      >
        {t("shop-now")}
      </Button>
    </section>
  );
};

export default SpecialOffer;
