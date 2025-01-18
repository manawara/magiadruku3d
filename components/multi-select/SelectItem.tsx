import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SelectSubMenu from "./SelectSubMenu";
import { cva, VariantProps } from "class-variance-authority";

const selectItem = cva("px-6 py-3 cursor-pointer", {
  variants: {
    intent: {
      primary: "bg-white hover:bg-gray-100",
      secondary: "text-white bg-blue-500", // Add more variants as needed
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface SelectItemProps extends VariantProps<typeof selectItem> {
  category: {
    mainCategory: string;
    children: { name: string }[];
  };
  hoveredCategory: string | null;
  openCategory: string | null;
  onCategoryClick: (category: string) => void;
  onCategoryHover: (category: string | null) => void;
}

const SelectItem = ({
  category,
  hoveredCategory,
  openCategory,
  onCategoryClick,
  onCategoryHover,
  intent,
}: SelectItemProps) => {
  return (
    <motion.li
      className={`px-2 py-1 cursor-pointer relative flex justify-between items-center text-xs lg:text-sm ${selectItem(
        {
          intent,
        }
      )}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onMouseEnter={() => onCategoryHover(category.mainCategory)}
      onClick={() => onCategoryClick(category.mainCategory)}
    >
      {category.mainCategory}
      {category.children.length > 0 && (
        <>
          <ChevronRight size={18} />
          {(openCategory === category.mainCategory ||
            hoveredCategory === category.mainCategory) && (
            <SelectSubMenu>
              {category.children.map((child, index) => (
                <div key={index}>{child.name}</div>
              ))}
            </SelectSubMenu>
          )}
        </>
      )}
    </motion.li>
  );
};

export default SelectItem;
