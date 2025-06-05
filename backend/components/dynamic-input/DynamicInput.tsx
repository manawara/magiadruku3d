"use client";
import React, { useEffect, useState } from "react";
import Input from "@/backend/components/input/Input";
import {
  UseFormSetValue,
  UseFormRegister,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type DynamicInputProps<T extends FieldValues> = {
  reset: boolean;
  name: Path<T>;
  label?: string;
  setValue: UseFormSetValue<T>;
  register: UseFormRegister<T>;
  initialValues?: string[];
};

const DynamicInput = <T extends FieldValues>({
  reset,
  name,
  label,
  setValue,
  initialValues = [],
}: DynamicInputProps<T>) => {
  const [inputs, setInputs] = useState<string[]>([""]);

  const t = useTranslations("Backend.dynamicInput");
  const addInput = () => setInputs([...inputs, ""]);

  const removeInput = (indexToRemove: number) => {
    if (inputs.length === 1) return; // Nie pozwól usunąć ostatniego inputa

    const newInputs = inputs.filter((_, index) => index !== indexToRemove);
    setInputs(newInputs);
    setValue(
      name,
      newInputs.filter((value) => value !== "") as PathValue<T, Path<T>>
    );
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = inputs.map((item, i) => (i === index ? value : item));
    setInputs(newInputs);
    setValue(
      name,
      newInputs.filter((value) => value !== "") as PathValue<T, Path<T>>
    );
  };

  useEffect(() => {
    if (reset) {
      setInputs([""]);
      setValue(name, [] as PathValue<T, Path<T>>);
    }
  }, [reset, name, setValue]);

  useEffect(() => {
    if (
      initialValues &&
      Object.values(initialValues).some(
        (arr) => Array.isArray(arr) && arr.some((val) => val.trim() !== "")
      ) &&
      inputs.length === 1 &&
      inputs[0] === ""
    ) {
      const flattened = Object.values(initialValues).flat();
      setInputs(flattened);
    }
  }, [initialValues, inputs]);

  return (
    <div>
      <div className="text-sm mt-2 mb-1">
        {label && (
          <>
            {label} <span className="text-xs">({t("optional")})</span>
          </>
        )}
      </div>
      <div className="flex flex-col">
        {inputs.map((value, index) => (
          <div key={index}>
            <div className="text-xs mb-1 mt-2">
              {t("subCategory")} {index + 1}
            </div>
            <div className="flex items-center gap-4">
              <Input
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`Subcategory ${index + 1} ...`}
              />

              {index === inputs.length - 1 ? (
                <PlusCircle onClick={addInput} className="cursor-pointer" />
              ) : (
                <MinusCircle
                  onClick={() => removeInput(index)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicInput;
