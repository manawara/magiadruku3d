"use client";
import { ChildrenType } from "@/types";
import React from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type MenuItemProps = {
  variants: Variants;
  className?: string;
} & ChildrenType;

const MenuItem = ({
  children,
  variants,
  className,
  ...rest
}: MenuItemProps) => {
  return (
    <motion.li {...rest} variants={variants} className={`px-4 ${className}`}>
      {children}
    </motion.li>
  );
};

export default MenuItem;
