import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import ButtonLink from "@/backend/components/button/ButtonLink";
interface ProductCardProps {
  title: string;
  price: number;
  img?: {
    src: string | StaticImageData;
    alt: string;
  };
  linkProduct: string;
}
const ProductCard = async ({
  img,
  title,
  price,
  linkProduct,
}: ProductCardProps) => {
  const t = await getTranslations("Banner.Slider");
  return (
    <section className="p-6 flex rounded-md bg-gray-50 items-center gap-2">
      {img && (
        <Image
          src={img.src}
          alt={img.alt}
          className="max-w-36"
          width={140}
          height={140}
        />
      )}
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <span className="text-blue-500 mb-2">
          {price} {price && t("price")}
        </span>
        <ButtonLink
          colorFill="warn"
          variant="basic"
          href={linkProduct ?? "#"}
          className="uppercase text-xs"
        >
          {t("shop-now")}
        </ButtonLink>
      </div>
    </section>
  );
};

export default ProductCard;
