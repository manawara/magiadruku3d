import React from "react";
import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import ButtonLink from "@/backend/components/button/ButtonLink";

interface SpecialOffer {
  subtitle?: string;
  title: string;
  img?: {
    src: string | StaticImageData;
    alt: string;
  };
  redirectTo?: string;
}
const SpecialOffer = async ({
  subtitle,
  title,
  img,
  redirectTo,
}: SpecialOffer) => {
  const t = await getTranslations("Banner.Slider");
  return (
    <section
      className={`bg-gray-950 relative rounded-md p-8 flex flex-col gap-2`}
    >
      <span className="text-yellow-300 uppercase line-clamp-1">{subtitle}</span>
      <h3 className="text-gray-50 z-10 text-xl line-clamp-1">{title}</h3>
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          className="absolute -bottom-0 -right-0 max-w-44 w-full max-h-[168px]"
          width={140}
          height={48}
        />
      )}
      <ButtonLink
        icon
        className="uppercase font-semibol mt-auto w-max"
        href={redirectTo ?? "#"}
        variant="basic"
        size="full"
        colorFill="warn"
      >
        {t("shop-now")}
      </ButtonLink>
    </section>
  );
};

export default SpecialOffer;
