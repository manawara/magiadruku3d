import ButtonLink from "@/components/button/ButtonLink";
import React from "react";
import CategoryItem from "./CategoryItem";

type CategoryListType = {
  title: string;
  isAllProductLink?: boolean;
};
const CategoryList = ({
  title,
  isAllProductLink = false,
}: CategoryListType) => {
  return (
    <div>
      <h3 className="uppercase text-lg text-gray-50 font-semibold mt-5 mb-4">
        {title}
      </h3>
      <ul className="text-gray-400 flex flex-col text-sm gap-3">
        <CategoryItem>Computer & Laptop</CategoryItem>
        <CategoryItem>SmartPhone</CategoryItem>
        <CategoryItem>Headphone</CategoryItem>
        <CategoryItem>Accessories</CategoryItem>
        {isAllProductLink && (
          <li className="-mt-2 max-w-max">
            <ButtonLink href="ssss" color="warning" size={12}>
              Browse All Product
            </ButtonLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
