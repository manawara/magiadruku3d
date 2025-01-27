import { useTranslations } from "next-intl";

const Price = ({ price, className }) => {
  const t = useTranslations("Banner.Slider");
  return (
    <div
      className={`flex justify-center items-center text-lg border-2 border-solid border-white rounded-full  bg-blue-400 text-gray-50  size-20 ${className}`}
    >
      {price + " "} {t("price")}
    </div>
  );
};

export default Price;
