"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import SocialNav from "../../../../components/social-nav/SocialNav";
import { menuVariants, childVariants } from "../../lib/variants";
import Divider from "@/components/divider/Divider";
import MultiMenu from "./MultiMenu";
import MenuItem from "./MenuItem";
import { getCategory } from "@/lib/action/category";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
interface MenuProps {
  onClose: () => void;
}

const Menu = ({ onClose }: MenuProps) => {
  const locale = useLocale();
  const t = useTranslations("HomePage.Header.MenuMobile");
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(locale),
  });

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="fixed top-0 right-0 bottom-0 w-80 bg-colors-gray-100 shadow-lg z-50 md:hidden"
    >
      <button className="flex justify-self-end m-2" onClick={onClose}>
        <X size={28} />
      </button>

      <motion.nav className="py-4 h-full">
        <motion.ul className="font-semibold">
          <MenuItem variants={childVariants} className="py-4">
            <MultiMenu label={t("shop")} categories={data} />
          </MenuItem>
          <Divider position="horizontal" color="bg-gray-900" />

          <MenuItem variants={childVariants} className="py-4">
            <Link href="#">{t("contact")}</Link>
          </MenuItem>
          <Divider position="horizontal" color="bg-gray-900" />
        </motion.ul>
        <div className="absolute bottom-5 flex justify-center w-full">
          <SocialNav color="text-gary-300" />
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Menu;
