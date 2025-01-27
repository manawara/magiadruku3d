import Input from "@/components/input/Input";
import Logo from "@/components/logo/Logo";
import { Search } from "lucide-react";
import UserNav from "../../../../components/user-nav/UserNav";
import { getTranslations } from "next-intl/server";
import Hamburger from "../hamburger/Hamburger";
import UserNavMobile from "../../../../components/user-nav/UserNavMobile";
const MainHeader = async () => {
  const t = await getTranslations("Header");

  return (
    <div className="container mx-auto inline-flex items-center justify-between flex-col md:flex-row px-2">
      <div className="flex max-md:w-full items-center   justify-between py-2 ">
        <Logo />
        <Hamburger />
      </div>

      <div className="w-full max-md:pt-2 max-md:pb-4 md:w-1/2">
        <Input placeholder={t("search-placeholder")}>
          <Search size={16} />
        </Input>
      </div>
      <UserNav />
      <UserNavMobile />
    </div>
  );
};

export default MainHeader;
