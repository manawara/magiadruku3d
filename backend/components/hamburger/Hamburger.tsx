"use client";
import { useContextSidebar } from "@/context/Sidebar";
import { Menu, X } from "lucide-react";

const Hamburger = () => {
  const ctx = useContextSidebar();
  return (
    <>
      {ctx.open ? (
        <X
          className="flex items-center cursor-pointer"
          onClick={ctx.handleOpen}
        />
      ) : (
        <Menu
          className="flex items-center cursor-pointer"
          onClick={ctx.handleOpen}
        />
      )}
    </>
  );
};

export default Hamburger;
