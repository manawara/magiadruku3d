"use client";
import Category from "@/components/category/Category";
import Checkbox from "@/components/checkbox/Checkbox";
import { useContextFilter } from "@/context/FilterContext";
import React from "react";

type CategoryFilterType = {
  label: string;
  value: string | { min: number; max: number };
};
type CategoryFilterProps = {
  items: CategoryFilterType[];
  title: string;
};

const CategoryFilter = ({ items, title }: CategoryFilterProps) => {
  const { filter, handleChangeFilter } = useContextFilter();
  return (
    <div className="flex flex-col gap-4">
      <Category title={title} colorText="text-gray-900" isDivider={false} />
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Checkbox
              {...item}
              onChange={(name, value) => handleChangeFilter(title, name, value)}
              checked={filter[title]?.[item.label]?.checked || false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
