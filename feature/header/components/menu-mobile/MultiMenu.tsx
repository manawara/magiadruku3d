"use client";
import useToggle from "@/hooks/useToogle";
import { slugify } from "@/lib/helper";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Categories } from "@/types";
import { containerVariants, childVariants, itemVariants } from "./variants";
type MultiMenu = {
  label: string;
  categories?: Categories | undefined;
};

const MultiMenu = ({ label, categories }: MultiMenu) => {
  const [open, setOpen] = useToggle();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between hover:text-gray-600 rounded-md">
        <Link href={slugify(label)} tabIndex={0} role="button">
          {label}
        </Link>

        <ChevronDown
          onClick={() => setOpen()}
          size={18}
          className={`transition-transform duration-200 outline-none cursor-pointer ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden mt-2"
          >
            {categories &&
              categories.map((category) => (
                <motion.li
                  key={category.id}
                  variants={itemVariants}
                  className="py-2"
                >
                  <Link
                    href={slugify(category.mainCategory as string)}
                    className="font-medium hover:text-gray-600"
                  >
                    {category.mainCategory as string}
                  </Link>
                  {category.children.length > 0 && (
                    <motion.ul className="ml-4 mt-2 space-y-1">
                      {category.children.map((child) => (
                        <motion.li
                          key={child.id + child.name}
                          variants={childVariants}
                          className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer py-1"
                        >
                          {child.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiMenu;
