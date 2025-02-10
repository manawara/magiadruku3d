"use client";
import { ChildrenType } from "@/types";
import React, { createContext, useContext, useState } from "react";

type FilterState = {
  [key: string]: {
    [key: string]: {
      value: string | { min: number; max: number };
      checked: boolean;
    };
  };
};

type ContextFilterType = {
  filter: FilterState;
  handleChangeFilter: (
    listTitle: string,
    name: string,
    value: string | { min: number; max: number }
  ) => void;
};

const initialState: ContextFilterType = {
  filter: {},
  handleChangeFilter: () => {},
};

const ContextFilter = createContext<ContextFilterType>(initialState);

export const useContextFilter = () => {
  const ctx = useContext(ContextFilter);
  if (!ctx) {
    throw new Error(
      "useContextFilter has to be used within <ContextFilter.Provider>"
    );
  }
  return ctx;
};

const FilterContextProvider: React.FC<ChildrenType> = ({ children }) => {
  const [filter, setFilter] = useState<FilterState>({});

  const handleChangeFilter = (
    listTitle: string,
    name: string,
    value: string | { min: number; max: number }
  ) => {
    setFilter((prevFilter) => {
      const updatedFilter = { ...prevFilter };

      if (!updatedFilter[listTitle]) {
        updatedFilter[listTitle] = {};
      }

      Object.keys(updatedFilter[listTitle]).forEach((key) => {
        updatedFilter[listTitle][key].checked = false;
      });

      updatedFilter[listTitle][name] = { value, checked: true };

      return updatedFilter;
    });
  };

  const ctx: ContextFilterType = {
    filter,
    handleChangeFilter,
  };

  return (
    <ContextFilter.Provider value={ctx}>{children}</ContextFilter.Provider>
  );
};

export default FilterContextProvider;
