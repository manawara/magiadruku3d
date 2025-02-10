import Divider from "@/components/divider/Divider";
import Input from "@/components/input/Input";
import Select from "@/components/select/Select";
import CategoryFilter from "@/feature/category-filter/components/CategoryFilter";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

const items = [
  {
    label: "Electronics Devices",
    value: "electronics-devices",
  },
  {
    label: "Computer & Laptop",
    value: "computer-Laptop",
  },
];
const items2 = [
  {
    label: "All Price",
    value: "",
  },
  {
    label: "Under $20",
    value: { min: 0, max: 20 },
  },
];
const ShopPage = async () => {
  const t = await getTranslations("Header");
  return (
    <div className="grid grid-cols-[25%,1fr] container mx-auto py-10 ">
      <div className="flex flex-col  gap-5">
        <CategoryFilter items={items} title="Category" />
        <Divider position="horizontal" color="bg-gray-900" />
        <CategoryFilter items={items2} title="Price Range" />
      </div>
      <div className="flex gap-4 justify-between max-md:flex-col max-md:justify-start  max-md:items-center">
        <div className="max:md:w-full w-1/2">
          <Input placeholder={t("search-placeholder")}>
            <Search size={16} />
          </Input>
        </div>
        <div>
          <Select
            label="Sort by"
            sortOptions={[
              {
                id: 1,
                name: "Most Popular",
              },
              {
                id: 2,
                name: "Most Popular",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
