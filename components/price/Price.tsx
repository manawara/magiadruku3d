import { useTranslations } from "next-intl";

type PriceProps = {
  price: number;
  className: string;
};

const Price = ({ price, className }: PriceProps) => {
  const t = useTranslations("Banner.Slider");
  return (
    <div
      className={`flex justify-center items-center text-sm font-semibold rounded-full  bg-blue-400 text-gray-50  size-14 ${className}`}
    >
      {price + " "} {t("price")}
    </div>
  );
};

export default Price;
