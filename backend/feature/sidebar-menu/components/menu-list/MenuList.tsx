import React from "react";
import MenuItem from "../menu-item/MenuItem";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ChildType = {
  name: string;
  link?: string;
};

export type ItemType = {
  icon: keyof typeof LucideIcons;
  name: string;
  link?: string;
  children?: ChildType[];
};

type MenuListProps = {
  items: ItemType[];
  expandedItem: string | null;
  activeItem: string | null;
  onMenuClick: (name: string, hasChildren: boolean) => void;
};

const renderIcon = (iconName: keyof typeof LucideIcons) => {
  const Icon = LucideIcons[iconName] as LucideIcon;
  return Icon ? (
    <Icon size={20} className="group-hover:text-primaryBackend-500" />
  ) : null;
};

const submenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const submenuItemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const MenuList = ({
  items,
  expandedItem,
  activeItem,
  onMenuClick,
}: MenuListProps) => {
  return (
    <ul className="w-full">
      {items.map((item) => (
        <li key={item.name}>
          <MenuItem
            onAction={() => onMenuClick(item.name, !!item.children)}
            isExpanded={expandedItem === item.name}
            name={item.name}
            icon={renderIcon(item.icon)}
            isActive={activeItem === item.name}
            className="group"
            hasChildren={!!item.children}
            link={item.link}
          />
          <AnimatePresence>
            {expandedItem === item.name && item.children && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={submenuVariants}
                className="flex flex-col pl-4 overflow-hidden"
              >
                {item.children.map((child) => (
                  <motion.li key={child.name} variants={submenuItemVariants}>
                    <MenuItem
                      onAction={() => onMenuClick(child.name, false)}
                      name={child.name}
                      link={child.link}
                      isActive={activeItem === child.name}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
