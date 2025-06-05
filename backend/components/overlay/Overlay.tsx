import { motion, Variants } from "framer-motion";

interface OverlayProps {
  onClose: () => void;
}
const overlayVariants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};
const Overlay = ({ onClose }: OverlayProps) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={overlayVariants}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 "
      onClick={onClose}
    />
  );
};

export default Overlay;
