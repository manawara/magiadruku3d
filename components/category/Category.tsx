import React from "react";

type CategoryProps = {
  title: string;
  colorText?: string;
  isDivider?: boolean;
};

const Category = ({
  title,
  colorText = "text-blue-600",
  isDivider = true,
}: CategoryProps) => {
  const divider = isDivider
    ? `before:content-['']  before:h-[2px] before:w-6 before:flex   before:bg-blue-600`
    : ``;

  return (
    <p
      className={`flex gap-2  items-center uppercase   text-sm font-semibold ${colorText} ${divider}`}
    >
      {title}
    </p>
  );
};

export default Category;
