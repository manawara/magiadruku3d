import Header from "@/backend/feature/header/components/Header";
import SidebarMenu from "@/backend/feature/sidebar-menu/components/SidebarMenu";
import SidebarProvider from "@/context/Sidebar";
import { ChildrenType } from "@/types";
import { Poppins } from "next/font/google";

import React from "react";
export const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins-sans",
});
const BackendLayout = ({ children }: ChildrenType) => {
  return (
    <SidebarProvider>
      <Header />
      <main className={`${poppinsSans.className} `}>
        <div className="flex bg-grayBackned-50 min-h-screen">
          <SidebarMenu />
          <div className="p-6 w-full">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default BackendLayout;
