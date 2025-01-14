import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import SocialNav from "../../../../components/social-nav/SocialNav";
import { menuVariants, childVariants } from "../../lib/variants";
import Divider from "@/components/divider/Divider";

interface MenuProps {
  onClose: () => void;
}

const Menu = ({ onClose }: MenuProps) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      className="fixed top-0 right-0 bottom-0 w-80 bg-colors-gray-100 shadow-lg z-50"
    >
      <button className="flex justify-self-end m-2" onClick={onClose}>
        <X size={28} />
      </button>

      <motion.nav className="p-4 h-full">
        <motion.ul className="font-semibold">
          <motion.li variants={childVariants} className="py-2">
            <Link
              href="#"
              className="text-colors-gray-900 ml-2 hover:text-colors-gray-600"
            >
              Home
            </Link>
          </motion.li>
          <Divider position="horizontal" color="bg-gray-900" />
          <motion.li variants={childVariants} className="py-2">
            <Link
              href="#"
              className="text-colors-gray-900 ml-2 hover:text-colors-gray-600"
            >
              About
            </Link>
          </motion.li>
          <Divider position="horizontal" color="bg-gray-900" />
          <motion.li variants={childVariants} className="py-2">
            <Link
              href="#"
              className="text-colors-gray-900 ml-2 hover:text-colors-gray-600"
            >
              Contact
            </Link>
          </motion.li>
        </motion.ul>
        <div className="absolute bottom-5 flex justify-center w-full">
          <SocialNav color="text-gary-300" />
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Menu;
