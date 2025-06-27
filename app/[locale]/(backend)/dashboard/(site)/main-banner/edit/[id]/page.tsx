import { getBannerByID } from "@/app/action/mainBanner";
import ButtonLink from "@/backend/components/button/ButtonLink";
import FormMainBannerEdit, {
  FormMainBannerFieldsType,
} from "@/backend/feature/form/components/form-main-banner-edit/components/FormMainBannerEdit";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

type MainBannerEditPage = {
  params: {
    id: number;
  };
};

const MainBannerEditPage = async ({ params }: MainBannerEditPage) => {
  const awaitedParams = await params;
  const id = Number(awaitedParams.id);
  const locale = await getLocale();
  const banner = (await getBannerByID(id)) as FormMainBannerFieldsType;
  const tg = await getTranslations("Backend.general");

  const title =
    typeof banner.title === "object" && banner.title !== null
      ? (banner.title as Record<string, string>)[locale]
      : "";

  const subTitle =
    typeof banner.subTitle === "object" && banner.subTitle !== null
      ? (banner.subTitle as Record<string, string>)[locale]
      : "";

  if (!banner) {
    return <div>{tg("notFound")}</div>; // lub inny fallback
  }

  return (
    <div>
      <ButtonLink href="../" variant="basic" colorFill="primary" iconLeft>
        {tg("back")}
      </ButtonLink>
      <FormMainBannerEdit
        id={banner.id}
        locale={locale}
        title={title}
        subTitle={subTitle}
        price={banner.price}
        status={banner.status}
        order={banner.order}
        linkProduct={banner.linkProduct}
        linkImage={banner.linkImage ?? ""}
        discount={banner.discount}
      />
    </div>
  );
};

export default MainBannerEditPage;
