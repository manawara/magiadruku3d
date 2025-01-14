import { motion } from "framer-motion";
import { overlayVariants } from "../../lib/variants";

interface OverlayProps {
  onClose: () => void;
}

const Overlay = ({ onClose }: OverlayProps) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={overlayVariants}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
      onClick={onClose}
    />
  );
};

export default Overlay;
