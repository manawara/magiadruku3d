"use server";
import Divider from "@/components/divider/Divider";
import IconWithText from "@/components/icon-with-text/IconWithText";
import Select from "@/components/multi-select/Select";
import { getTranslations } from "next-intl/server";
import { getCategory } from "@/app/action/category";
import { getLocale } from "next-intl/server";
const ServiceNav = async () => {
  const locale = await getLocale();
  const category = await getCategory(locale);

  const t = await getTranslations("ServiceNav");
  return (
    <section>
      <div className="container mx-auto px-4 flex  gap-2 lg:gap-8 items-center max-md:hidden justify-between lg:justify-start">
        <Select
          intent="primary"
          label={t("select-label")}
          categories={category as any}
        />
        <IconWithText
          sizeIcon={17}
          icon="MapPinned"
          label={t("track-order")}
          link={t("track-order")}
        />
        <IconWithText
          sizeIcon={17}
          icon="Headphones"
          label={t("customer-support")}
          link={t("customer-support")}
        />
        <IconWithText
          sizeIcon={17}
          icon="Info"
          label={t("need-help")}
          link={t("need-help")}
        />
        <IconWithText
          sizeIcon={17}
          icon="Phone"
          mode="tel"
          label="+48 531-770-282"
          className="mx-left text-gray-600"
        />
      </div>
      <div className="hidden md:flex">
        <Divider position="horizontal" color="bg-gray-900" />
      </div>
    </section>
  );
};

export default ServiceNav;
