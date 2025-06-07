"use client";
import useCloseOutside from "@/hooks/useCloseOutside";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

type sortOptionsType = {
  name: string | string[];
  id: number;
  value?: string | number;
};

type SelectProps = {
  sortOptions: sortOptionsType[];
  label: string;
  id?: string;
  defaultValue?: string | number;
  value?: number | string;
  className?: string;
  ariaLabel?: string;
  placeholder?: string;
  onChange?: (name: string, id: number, value: number | string) => void;
};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const Select = ({
  sortOptions = [],
  label,
  id = "sort-select",
  defaultValue = "",
  ariaLabel = "Sort by",
  onChange,
  className,
  value,
  placeholder = "Select an option",
}: SelectProps) => {
  const [sort, setSort] = useState<{
    name: string;
    id: number;
    value: string | number;
  }>({
    name: "",
    id: 0,
    value: "",
  });

  const defaultValueSet = useRef(false);

  const findOption = useCallback(
    (searchValue: string | number) => {
      return sortOptions.find((option) => {
        if (option.value !== undefined && option.value === searchValue)
          return true;
        if (Array.isArray(option.name)) {
          if (option.name.includes(searchValue as string)) return true;
        } else {
          if (option.name === searchValue) return true;
        }
        if (option.id === searchValue) return true;

        return false;
      });
    },
    [sortOptions]
  );

  const setSelectedOption = useCallback(
    (option: sortOptionsType, selectedName?: string) => {
      const nameToUse = selectedName
        ? selectedName
        : Array.isArray(option.name)
        ? option.name[0]
        : option.name;
      const selectedValue = option.value ?? nameToUse;
      setSort({
        name: nameToUse,
        id: option.id,
        value: selectedValue,
      });
    },
    []
  );

  useEffect(() => {
    if (value !== undefined) {
      if (value === "") {
        setSort({ name: "", id: 0, value: "" });
        return;
      }
      const matched = findOption(value);
      if (matched) {
        let selectedName = "";
        if (Array.isArray(matched.name)) {
          if (typeof value === "string" && matched.name.includes(value)) {
            selectedName = value;
          } else {
            selectedName = matched.name[0];
          }
        } else {
          selectedName = matched.name;
        }
        setSelectedOption(matched, selectedName);
      }
    } else if (!defaultValueSet.current && defaultValue) {
      const matched = findOption(defaultValue);
      if (matched) {
        let selectedName = "";
        if (Array.isArray(matched.name)) {
          if (
            typeof defaultValue === "string" &&
            matched.name.includes(defaultValue)
          ) {
            selectedName = defaultValue;
          } else {
            selectedName = matched.name[0];
          }
        } else {
          selectedName = matched.name;
        }
        setSelectedOption(matched, selectedName);
        defaultValueSet.current = true;
      }
    }
  }, [value, defaultValue, findOption, setSelectedOption]);

  const [open, setOpen] = useState(false);
  const SelectRef = useRef(null);
  useCloseOutside(SelectRef, () => setOpen(false));

  const handleOpenSelect = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeSort = (
    name: string,
    id: number,
    value: number | string
  ) => {
    setSort({ name, id, value });
    setOpen(false);

    if (onChange) {
      onChange(name, id, value);
    }
  };

  const isControlled = value !== undefined;

  return (
    <div className={`flex flex-col min-w-64 justify-start ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm min-w-28 mb-1">
          {label}
        </label>
      )}

      <select
        id={id}
        {...(isControlled
          ? {
              value: value,
              onChange: (e) => {
                const selectedValue = e.target.value;
                const matched = findOption(selectedValue);
                if (matched) {
                  const selectedName = Array.isArray(matched.name)
                    ? matched.name.includes(selectedValue)
                      ? selectedValue
                      : matched.name[0]
                    : matched.name;
                  const finalValue = matched.value ?? selectedName;
                  handleChangeSort(selectedName, matched.id, finalValue);
                }
              },
            }
          : { defaultValue: defaultValue })}
        aria-label={!label ? ariaLabel : undefined}
        className="p-2 border rounded-md bg-white hidden"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {sortOptions.map(({ name, id, value }) => {
          const names = Array.isArray(name) ? name : [name];
          return names.map((n, index) => (
            <option key={id + n + index} value={value ?? n}>
              {n}
            </option>
          ));
        })}
      </select>

      <div className="relative top-0 left-0 w-full" ref={SelectRef}>
        <div
          className="flex items-center w-full py-2 px-3 rounded-sm border font-semibold border-gray-100 text-gray-700 text-xs justify-between gap-8 cursor-pointer"
          tabIndex={0}
          onClick={handleOpenSelect}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="w-full">{sort.name || placeholder}</span>
          <ChevronDown
            size={18}
            className={`${
              open ? "rotate-180" : "rotate-0"
            } duration-200 transition-transform`}
          />
        </div>

        {open && (
          <ul
            className="absolute z-10 top-full border bg-white border-gray-100 left-0 mt-1 rounded-md w-full"
            role="listbox"
          >
            {sortOptions.map(({ name, id, value }) => {
              const names = Array.isArray(name) ? name : [name];
              return names.map((n, index) => (
                <li
                  key={id + n + index}
                  className={`py-2 px-3 bg-white hover:bg-gray-50 cursor-pointer text-sm ${
                    n === sort.name && id === sort.id ? "font-semibold" : ""
                  }`}
                  onClick={() => handleChangeSort(n, id, value ?? n)}
                  role="option"
                  aria-selected={n === sort.name && id === sort.id}
                >
                  {n}
                </li>
              ));
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
