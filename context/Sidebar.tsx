"use client";
import { ChildrenType } from "@/types";
import React, { createContext, useState, useContext } from "react";

interface SidebarContextType {
  open: boolean;
  handleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useContextSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error(
      "useContextSidebar has to be used within <SidebarContext.Provider>"
    );
  }
  return ctx;
};
const SidebarProvider = ({ children }: ChildrenType) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <SidebarContext.Provider value={{ open, handleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
