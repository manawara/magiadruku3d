import Divider from "@/components/divider/Divider";
import FeatureCard from "@/components/feature-card/FeatureCard";
import { getTranslations } from "next-intl/server";
const FeaturesBar = async () => {
  const t = await getTranslations("FeaturesBar");
  return (
    <section
      className="max-[510px]:grid-cols-[auto] max-[510px]:grid-cols-1 max-[510px]:justify-center max-lg:grid max-lg:grid-cols-[auto,auto] max-lg:justify-around max-lg:auto-cols-auto
 flex container mx-auto justify-around h-full items-center border border-gray-100 rounded-md my-4"
    >
      <FeatureCard
        icon="Package"
        title={t("fasted-deliver")}
        description={t("fasted-deliver-desc")}
      />
      <div className="max-lg:hidden flex h-14 justify-center items-center">
        <Divider color="bg-gray-800" />
      </div>
      <FeatureCard
        icon="CreditCard"
        title={t("secure-payment")}
        description={t("secure-payment-desc")}
      />
      <div className="max-lg:hidden flex h-14 justify-center items-center">
        <Divider color="bg-gray-800" />
      </div>
      <FeatureCard
        icon="Truck"
        title={t("free-shipping")}
        description={t("free-shipping-desc")}
      />
      <div className="max-lg:hidden flex h-14 justify-center items-center">
        <Divider color="bg-gray-800" />
      </div>
      <FeatureCard
        icon="Headphones"
        title={t("support")}
        description={t("support-desc")}
      />
    </section>
  );
};
export default FeaturesBar;
