import Image, { StaticImageData } from "next/image";
import Button from "../button/Button";
import { getTranslations } from "next-intl/server";
interface ProductCardProps {
  title: string;
  price: number;
  img?: {
    src: string | StaticImageData;
    alt: string;
  };
}
const ProductCard = async ({ img, title, price }: ProductCardProps) => {
  const t = await getTranslations("Banner.Slider");
  return (
    <section className="p-6 flex rounded-md bg-gray-50 items-center gap-4">
      {img && <Image src={img.src} alt={img.alt} className="size-28" />}
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-blue-500 mb-2">{price} $</span>
        <Button
          intent="primary"
          size="small"
          className="uppercase max-w-fit"
          icon
        >
          {t("shop-now")}
        </Button>
      </div>
    </section>
  );
};

export default ProductCard;
