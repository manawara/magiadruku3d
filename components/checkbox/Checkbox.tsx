"use client";
import React from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (
    label: string,
    value: string | { min: number; max: number }
  ) => void;
  value: string | { min: number; max: number };
  id?: string;
  label: string;
  disabled?: boolean;
};

const Checkbox = ({
  onChange,
  value,
  checked,
  id,
  label,
  disabled = false,
}: CheckboxProps) => {
  const backgroundChecked = checked ? "bg-orange-600" : "";
  const circleFill = checked ? "bg-white" : "";
  const border = !checked ? "border-[1px] border-gray-400" : "";

  const handleChange = () => {
    if (onChange) onChange(label, value);
  };
  return (
    <div className="flex items-center gap-2" onClick={handleChange}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          defaultChecked={checked}
          disabled={disabled}
          className="sr-only peer"
          aria-checked={checked}
        />

        <div
          className={`relative size-5 rounded-full cursor-pointer ${backgroundChecked} ${border}
            peer-focus-visible:ring-2 peer-focus-visible:   ring-offset-2 peer-focus-visible:ring-blue-400
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : checked
                ? ""
                : "hover:bg-gray-100"
            }`}
        >
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              size-2 rounded ${circleFill}`}
          />
        </div>
      </div>

      {label && (
        <label
          htmlFor={id}
          className={`text-sm ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
