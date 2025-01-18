"use client";

import { useState, useRef } from "react";
import useToogle from "@/hooks/useToogle";
import useCloseOutside from "@/hooks/useCloseOutside";
import SelectLabel from "./SelectLabel";
import SelectDropdown from "./SelectDropdown";

const categories = [
  {
    mainCategory: "Dla dzieci",
    children: [
      {
        name: "Kredki dla dzieci",
      },
      {
        name: "Breloki",
      },
    ],
  },
  {
    mainCategory: "Dla dzieci 2",
    children: [],
  },
];

interface SelectProps {
  label: string;
  intent?: "primary";
}

const Select = ({ label, intent = "primary" }: SelectProps) => {
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
        onClick={() => setOpen()}
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
