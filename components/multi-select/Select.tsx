"use client";

import { useState, useRef } from "react";
import useToogle from "@/hooks/useToogle";
import useCloseOutside from "@/hooks/useCloseOutside";
import SelectLabel from "./SelectLabel";
import SelectDropdown from "./SelectDropdown";
import { Categories } from "@/types";

interface SelectProps {
  label: string;
  intent?: "primary";
  categories: Categories;
}

const Select = ({ label, intent = "primary", categories }: SelectProps) => {
  const [open, setOpen] = useToogle();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const selectRef = useRef(null);
  useCloseOutside(selectRef, () => {
    setOpen(false);
    setOpenCategory(null);
  });

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="relative top-0" ref={selectRef}>
      <SelectLabel
        open={open}
        label={label}
        onAction={setOpen}
        intent={intent}
      />
      <SelectDropdown
        open={open}
        categories={categories}
        hoveredCategory={hoveredCategory}
        openCategory={openCategory}
        onCategoryClick={handleCategoryClick}
        onCategoryHover={setHoveredCategory}
      />
    </div>
  );
};

export default Select;
