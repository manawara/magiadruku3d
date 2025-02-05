import { useTranslations } from "next-intl";

type PriceProps = {
  price: number;
  className: string;
};

const Price = ({ price, className }: PriceProps) => {
  const t = useTranslations("Banner.Slider");
  return (
    <div
      className={`flex justify-center items-center text-lg rounded-full  bg-blue-400 text-gray-50  size-20 ${className}`}
    >
      {price + " "} {t("price")}
    </div>
  );
};

export default Price;
