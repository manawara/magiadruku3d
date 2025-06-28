import FilterContextProvider from "@/context/FilterContext";
import { ChildrenType } from "@/types";
import React from "react";

const ShopLayout = ({ children }: ChildrenType) => {
  return (
    <FilterContextProvider>
      <div className="px-5">{children}</div>
    </FilterContextProvider>
  );
};

export default ShopLayout;
