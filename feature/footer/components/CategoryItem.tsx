import React from "react";
import Link from "next/link";
import { ChildrenType } from "@/types";
const CategoryItem = ({ children }: ChildrenType) => {
  return (
    <li className="relative top-0 left-0 overflow-hidden">
      <Link
        href="#"
        className="hover:before:opacity-100 hover:pl-7 before:-translate-x-full hover:before:translate-x-0 before:absolute  before:top-1/2 -translate-y-1/2 before:left-0 before:opacity-0 before:w-6 before:content-[''] before:h-[1px] before:bg-yellow-500  transition-all duration-300 efore:transition-transform before:duration-300"
      >
        {children}
      </Link>
    </li>
  );
};

export default CategoryItem;
