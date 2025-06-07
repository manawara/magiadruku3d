"use client";
import Button from "@/components/button/Button";
import { SlidersHorizontal } from "lucide-react";
import Modal from "@/components/modal/Modal";
import CategoryFilter from "@/feature/category-filter/components/CategoryFilter";
import Divider from "@/components/divider/Divider";
import { useState } from "react";

type Value = {
  min: number;
  max: number;
};

type FilterMobileItem = {
  label: string;
  value: string | Value;
};

type FilterMobileType = {
  items: FilterMobileItem[];
  items2: FilterMobileItem[];
};

const FilterMobile = ({ items, items2 }: FilterMobileType) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        intent="secondary"
        className="font-semibold max-w-max text-sm mb-4"
        onClick={handleOpenModal}
      >
        <SlidersHorizontal size={20} /> Filter
      </Button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="flex flex-col py-3  gap-5">
            <CategoryFilter items={items} title="Category" />
            <Divider position="horizontal" color="bg-gray-900" />
            <CategoryFilter items={items2} title="Price Range" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default FilterMobile;
