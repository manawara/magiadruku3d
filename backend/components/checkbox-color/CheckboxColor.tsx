import React, { useState, useEffect } from "react";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

// Define color type with name and Tailwind color class
type ColorOption = {
  name: string;
  tailwindClass: string;
};

// Define props for the component
type CheckboxColorProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  defaultValue?: string[];
};

const CheckboxColor = <T extends FieldValues>({
  label = "Product Colors",
  name,
  setValue,
  defaultValue = [],
}: CheckboxColorProps<T>) => {
  // Predefined color options using Tailwind classes
  const colorOptions: ColorOption[] = [
    { name: "Red", tailwindClass: "bg-red-500" },
    { name: "Blue", tailwindClass: "bg-blue-500" },
    { name: "Green", tailwindClass: "bg-green-500" },
    { name: "Yellow", tailwindClass: "bg-yellow-500" },
    { name: "Purple", tailwindClass: "bg-purple-500" },
    { name: "Orange", tailwindClass: "bg-orange-500" },
  ];

  // State to track selected colors
  const [selectedColors, setSelectedColors] = useState<string[]>(defaultValue);

  // Effect to update form values when component mounts or selectedColors changes
  useEffect(() => {
    setValue(name, selectedColors as any);
  }, [selectedColors, name, setValue]);

  // Handle color selection toggle
  const handleColorToggle = (colorClass: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(colorClass)
        ? prevColors.filter((color) => color !== colorClass)
        : [...prevColors, colorClass]
    );
  };

  return (
    <div className="text-sm gap-2 flex flex-col">
      <span className="font-medium">{label}</span>
      <div className="flex gap-2">
        {colorOptions.map((color) => (
          <label
            key={color.tailwindClass}
            className={`
              relative 
              size-6
              rounded-full 
              cursor-pointer 
              border-1
              transition-all 
              duration-200
              ${color.tailwindClass}
              ${
                selectedColors.includes(color.tailwindClass)
                  ? "ring-2 ring-blue-500 scale-110"
                  : "hover:opacity-70"
              }
            `}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedColors.includes(color.tailwindClass)}
              onChange={() => handleColorToggle(color.tailwindClass)}
            />
            {selectedColors.includes(color.tailwindClass) && (
              <span
                className="
                  absolute 
                  top-1/2 
                  left-1/2 
                  transform 
                  -translate-x-1/2 
                  -translate-y-1/2 
                  text-white 
                  text-xs 
                  font-bold
                  "
              >
                ✓
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxColor;
