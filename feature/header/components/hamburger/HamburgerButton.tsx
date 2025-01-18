import { motion } from "framer-motion";
import { topVariant, middleVariant, bottomVariant } from "../../lib/variants";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

const HamburgerButton = ({ open, onClick }: HamburgerButtonProps) => {
  return (
    <motion.button
      className="w-11 h-[34px] relative flex items-center justify-center md:hidden"
      onClick={onClick}
      animate={open ? "open" : "close"}
    >
      <div className="relative w-8 h-6">
        <motion.div
          variants={topVariant}
          className="h-[3px] w-8 bg-colors-gray-50 rounded-sm absolute top-0 left-0 right-0"
        />
        <motion.div
          variants={middleVariant}
          className="h-[3px] w-8 bg-colors-gray-50 rounded-sm absolute top-[10px] left-0 right-0"
        />
        <motion.div
          variants={bottomVariant}
          className="h-[3px] w-8 bg-colors-gray-50 rounded-sm absolute top-[20px] left-0 right-0"
        />
      </div>
    </motion.button>
  );
};

export default HamburgerButton;
