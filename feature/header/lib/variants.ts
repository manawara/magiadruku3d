import { Variants } from "framer-motion";

export const topVariant: Variants = {
  open: {
    rotate: 45,
    y: 10,
    transition: {
      y: { duration: 0.1, ease: "easeOut" },
      rotate: { duration: 0.1, ease: "easeOut", delay: 0.1 },
    },
  },
  close: {
    rotate: 0,
    y: 0,
    transition: {
      rotate: { duration: 0.2, ease: "easeOut" },
      y: { duration: 0.2, ease: "easeOut", delay: 0.2 },
    },
  },
};

export const middleVariant: Variants = {
  open: { opacity: 0 },
  close: { opacity: 1 },
};

export const bottomVariant: Variants = {
  open: {
    rotate: -45,
    y: -10,
    transition: {
      y: { duration: 0.1, ease: "easeOut" },
      rotate: { duration: 0.1, ease: "easeOut", delay: 0.1 },
    },
  },
  close: {
    rotate: 0,
    y: 0,
    transition: {
      rotate: { duration: 0.2, ease: "easeOut" },
      y: { duration: 0.2, ease: "easeOut", delay: 0.2 },
    },
  },
};

export const menuVariants: Variants = {
  open: {
    clipPath: "circle(150% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 50,
      delay: 0.2,
    },
  },
  closed: {
    clipPath: "circle(0% at 100% 0%)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40,
    },
  },
};

export const overlayVariants: Variants = {
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

export const childVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      delay: 0.3,
    },
  },
  closed: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};
