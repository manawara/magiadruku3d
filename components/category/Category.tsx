import React from "react";

type CategoryProps = {
  title: string;
  colorText: string;
};

const Category = ({ title, colorText = "text-blue-600" }: CategoryProps) => {
  return (
    <p
      className={`flex gap-2  items-center before:content-['']  before:h-[2px] before:w-6 before:flex uppercase  before:bg-blue-600 text-sm font-semibold  ${colorText}`}
    >
      {title}
    </p>
  );
};

export default Category;
