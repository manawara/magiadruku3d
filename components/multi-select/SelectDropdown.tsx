import { AnimatePresence, motion } from "framer-motion";
import SelectItem from "./SelectItem";
import { Categories } from "@/types";

interface SelectDropdownProps {
  open: boolean;
  categories: Categories;
  hoveredCategory: string | null;
  openCategory: string | null;
  onCategoryClick: (category: string) => void;
  onCategoryHover: (category: string | null) => void;
}

const SelectDropdown = ({
  open,
  categories,
  hoveredCategory,
  openCategory,
  onCategoryClick,
  onCategoryHover,
}: SelectDropdownProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          className="absolute py-2 bg-white z-30 min-w-60 shadow-md border border-gray-200"
          key="dropdown"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 15, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              category={category}
              hoveredCategory={hoveredCategory}
              openCategory={openCategory}
              onCategoryClick={onCategoryClick}
              onCategoryHover={onCategoryHover}
            />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default SelectDropdown;
