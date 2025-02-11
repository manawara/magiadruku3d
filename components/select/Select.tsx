"use client";
import useCloseOutside from "@/hooks/useCloseOutside";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef } from "react";

type sortOptionsType = {
  name: string;
  id: number;
  value?: string;
};

type SelectProps = {
  sortOptions: sortOptionsType[];
  label: string;
  id?: string;
  defaultValue?: string;
  ariaLabel?: string;
};
const Select = ({
  sortOptions = [],
  label,
  id = "sort-select",
  defaultValue = "",
  ariaLabel = "Sort by",
}: SelectProps) => {
  const [sort, setSort] = useState({ name: "", id: 0 });
  const [open, setOpen] = useState(false);
  const SelectRef = useRef(null);
  useCloseOutside(SelectRef, () => setOpen(false));
  const handleOpenSelect = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeSort = (name: string, id: number) => {
    setSort(() => ({
      name,
      id,
    }));
    handleOpenSelect();
  };
  return (
    <div className="flex items-center gap-4">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}:
        </label>
      )}
      <select
        id={id}
        defaultValue={defaultValue}
        aria-label={!label ? ariaLabel : undefined}
        className="p-2 border rounded-md bg-white hidden"
      >
        <option value="" disabled>
          Select an option
        </option>
        {sortOptions.map(({ name, id, value }) => (
          <option key={id} value={value || name}>
            {name}
          </option>
        ))}
      </select>

      <div className="relative top-0 left-0" ref={SelectRef}>
        <span
          className="flex items-center py-2 px-3 rounded-sm border font-semibold border-gray-100 text-gray-700 text-sm justify-between gap-8 cursor-pointer"
          tabIndex={0}
          onClick={handleOpenSelect}
        >
          {sort.name || "Select an option"}
          <ChevronDown
            size={18}
            className={`${
              open ? "rotate-180" : "rotate-0"
            } duration-200 transition-transform`}
          />
        </span>
        {open && (
          <ul className="absolutz z-10 top-full border bg-white border-gray-100 left-0 mt-1 rounded-md w-full">
            {sortOptions.map(({ name, id, value }) => (
              <li
                key={id}
                value={value || name}
                className={`py-2 px-3 bg-white hover:bg-gray-50 cursor-pointer text-sm  ${
                  name === sort.name && id === sort.id && "font-semibold "
                }`}
                onClick={() => handleChangeSort(name, id)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
