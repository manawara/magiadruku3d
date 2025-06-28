"use client";
import useToggle from "@/hooks/useToogle";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Categories } from "@/types";
import { containerVariants, itemVariants } from "./variants";
import slugify from "slugify";
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
                    href={
                      "sklep/" +
                      slugify(category.mainCategory as string) +
                      "-" +
                      category.id
                    }
                    className="font-medium hover:text-gray-600"
                  >
                    {category.mainCategory as string}
                  </Link>
                  {Array.isArray(category.children) &&
                    category.children.length > 0 &&
                    !category.children[0].name.includes("") && (
                      <motion.ul className="ml-4 mt-2 space-y-1">
                        {category.children.map(
                          (child) =>
                            child &&
                            child.name.map((childName: string) => (
                              <li
                                key={childName}
                                className="px-6 py-3 text-xs hover:bg-gray-50 lg:text-sm cursor-pointer block w-full"
                              >
                                <Link
                                  href={`/sklep/${slugify(
                                    category.mainCategory as string,
                                    { lower: true }
                                  )}-${category.id}/${slugify(childName, {
                                    lower: true,
                                  })}`}
                                >
                                  {childName}
                                </Link>
                              </li>
                            ))
                        )}
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
