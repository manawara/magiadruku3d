import Divider from "@/components/divider/Divider";
import SocialNav from "../../../../components/social-nav/SocialNav";
import { getTranslations } from "next-intl/server";
import SelectCountry from "@/components/select-country/SelectCountry";
import { country } from "@/lib/data/country";
const AnnouncementBar = async () => {
  const t = await getTranslations("HomePage.Header");

  return (
    <div
      role="banner"
      className="py-3 text-sm leading-5 text-white flex justify-between "
    >
      <p className="text-xs sm:text-sm pr-2">{t("announcement-text")} </p>
      <div className="flex gap-4 items-center">
        <div className="hidden md:flex">
          <SocialNav color="white" />
        </div>
        <Divider />
        <SelectCountry items={country} />
      </div>
    </div>
  );
};

export default AnnouncementBar;
