"use client";
import React, { useState } from "react";
import MenuList from "./menu-list/MenuList";
import { ItemType } from "./menu-list/MenuList";
import { motion } from "motion/react";
import { useContextSidebar } from "@/context/Sidebar";

const SidebarMenu = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { open } = useContextSidebar();
  const handleMenuClick = (name: string, hasChildren: boolean) => {
    if (hasChildren) {
      setExpandedItem((prev) => (prev === name ? null : name));
    }
    setActiveItem(name);
  };

  const mainData: ItemType[] = [
    {
      icon: "Grip",
      name: "App",
      children: [
        {
          name: "-- Chat",
          link: "/dashboard/chat",
        },
        {
          name: "-- Calendar",
          link: "/dashboard/calendar",
        },
        {
          name: "-- File manager",
          link: "/dashboard/file-manager",
        },
        {
          name: "-- Contact list",
          link: "/dashboard/contact-list",
        },
      ],
    },
    {
      icon: "Repeat",
      name: "User Interface (UI)",
      children: [
        {
          name: "-- Button",
          link: "/dashboard/components/button",
        },
        {
          name: "-- Divider",
          link: "/dashboard/components/divider",
        },
      ],
    },
    {
      icon: "BookOpen",
      name: "Pages",
      link: "./dashboard/pages",
      children: [
        {
          name: "-- List",
          link: "./dashboard/page/list",
        },
        {
          name: "-- Create",
          link: "./dashboard/page/create",
        },
      ],
    },
  ];
  const dashboardData: ItemType[] = [
    {
      icon: "LayoutDashboard",
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: "Package",
      name: "Products",
      link: "/dashboard/products",
      children: [
        {
          name: "-- List",
          link: "/dashboard/products/list",
        },
        {
          name: "-- Create",
          link: "/dashboard/products/create",
        },
        {
          name: "-- Category",
          link: "/dashboard/products/category",
        },
      ],
    },
    {
      icon: "ShoppingCart",
      name: "Orders",
      children: [
        {
          name: "-- List",
          link: "./dashboard/orders/list",
        },
        {
          name: "-- Create",
          link: "./dashboard/orders/create",
        },
      ],
    },

    {
      icon: "Ticket",
      name: "Coupons",
      children: [
        {
          name: "-- List",
          link: "./dashboard/coupon/list",
        },
        {
          name: "-- Create",
          link: "./dashboard/coupon/create",
        },
      ],
    },
    {
      icon: "List",
      name: "Invoices",
      children: [
        {
          name: "-- List",
          link: "./dashboard/invoices/list",
        },
        {
          name: "-- Create",
          link: "./dashboard/invoices/create",
        },
      ],
    },

    {
      icon: "Users",
      name: "Customers",
      children: [
        {
          name: "-- List",
          link: "./dashboard/customer/list",
        },
        {
          name: "-- Create",
          link: "./dashboard/customer/create",
        },
      ],
    },
  ];

  const submenuVariants = {
    hidden: {
      x: "-100%",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.aside
      className={` ${
        open ? "lg:relative" : "absolute"
      } max-lg:absolute bg-white shadow-md z-50`}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      exit="hidden"
      variants={submenuVariants}
    >
      <nav
        className={`w-full ${
          open ? "lg:w-64" : "w-full"
        } bg-white h-screen space-y-2`}
      >
        <div className="text-sm text-gray-400 ml-4 mt-6">-- Main</div>
        <MenuList
          items={mainData}
          expandedItem={expandedItem}
          activeItem={activeItem}
          onMenuClick={handleMenuClick}
        />
        <div className="text-sm text-gray-400 ml-4 mt-6">-- Ecommerce</div>

        <MenuList
          items={dashboardData}
          expandedItem={expandedItem}
          activeItem={activeItem}
          onMenuClick={handleMenuClick}
        />
      </nav>
    </motion.aside>
  );
};

export default SidebarMenu;
