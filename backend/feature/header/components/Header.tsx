import Profile from "@/backend/components/profile/Profile";
import SelectCountry from "@/backend/components/select-country/SelectCountry";
import { country } from "@/lib/data/country";
import { LayoutGrid, PanelsTopLeft } from "lucide-react";
import React from "react";
import Notification from "../../notification/components/Notification";
import Hamburger from "@/backend/components/hamburger/Hamburger";

const Header = () => {
  return (
    <header className="pl-6  pr-4 py-4 flex items-center h-full shadow-md relative top-0 left-0 z-10">
      <div className="flex w-[80px] md:w-[280px] justify-between h-full items-center">
        <div className="flex items-center gap-4 mr-4">
          <PanelsTopLeft size={34} strokeWidth={1} className="text-blue-600" />
          <span className="text-blue-600 font-semibold hidden md:block">
            CMS
          </span>
          <div className="ml-0 sm:ml-16">
            <Hamburger />
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-6 ml-auto">
        <SelectCountry items={country} />
        <LayoutGrid strokeWidth={2} size={18} className="text-gray-600" />
        <Notification />
        <Profile />
      </nav>
    </header>
  );
};

export default Header;
