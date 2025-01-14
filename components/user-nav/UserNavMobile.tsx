import {
  HeartIcon,
  HouseIcon,
  ShoppingCartIcon,
  UserRound,
} from "lucide-react";
import React from "react";
import { getTranslations } from "next-intl/server";

const UserNavMobile = async () => {
  const t = await getTranslations("HomePage.Header.Nav-mobile");
  return (
    <>
      <nav
        aria-label="User navigation"
        className="fixed bottom-0 py-2 bg-colors-blue-700 w-full md:hidden"
      >
        <ul className="flex max-sm:justify-around justify-center min-[430px]:gap-8 px-2">
          <li>
            <button className="flex flex-col items-center py-1 px-2 gap-1 group">
              <HouseIcon
                strokeWidth={1}
                size={22}
                className="text-white group-hover:text-gray-200"
              />
              <div className="text-white text-xs group-hover:text-gray-200">
                {t("home")}
              </div>
            </button>
          </li>
          <li>
            <button className="flex flex-col items-center py-1 px-4 relative cursor-pointer group gap-1">
              <ShoppingCartIcon
                size={22}
                strokeWidth={1.5}
                className="text-white group-hover:text-gray-200"
              />
              <span
                aria-label="0 items in cart"
                className="absolute top-0 right-2 size-4 rounded-full bg-red-500 group-hover:bg-red-400 flex justify-center items-center text-xs font-bold text-white"
              >
                0
              </span>
              <div className="text-white text-xs group-hover:text-gray-200">
                {t("shopping")}
              </div>
            </button>
          </li>
          <li>
            <button className="flex flex-col items-center py-1 px-2 gap-1 group">
              <HeartIcon
                strokeWidth={1}
                size={22}
                className=" text-white group-hover:text-gray-200"
              />
              <div className="text-white text-xs group-hover:text-gray-200">
                {t("favorite")}
              </div>
            </button>
          </li>
          <li>
            <button className="flex flex-col items-center py-1 px-2 gap-1 group">
              <UserRound
                strokeWidth={1}
                size={22}
                className="text-white group-hover:text-gray-200"
              />
              <div className="text-white text-xs group-hover:text-gray-200">
                {t("profile")}
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNavMobile;
