import { HeartIcon, ShoppingCartIcon, UserRound } from "lucide-react";
import React from "react";

const UserNav = () => {
  return (
    <nav aria-label="User navigation" className="hidden md:flex gap-5 ">
      <div className="relative cursor-pointer group" aria-label="Shopping cart">
        <ShoppingCartIcon
          size={28}
          strokeWidth={1.5}
          className="text-white group-hover:text-gray-200"
        />
        <span
          aria-label="0 items in cart"
          className="absolute -top-1 -right-1 size-4 rounded-full bg-red-500 group-hover:bg-red-400 flex justify-center items-center text-xs font-bold text-white"
        >
          0
        </span>
      </div>
      <HeartIcon
        size={28}
        className="text-white hover:text-gray-200 cursor-pointer"
      />
      <UserRound
        size={28}
        className="text-white hover:text-gray-200 cursor-pointer"
      />
    </nav>
  );
};

export default UserNav;
