import { cva } from "class-variance-authority";

export const arrow = cva(
  "size-8 flex justify-center items-center cursor-pointer transition-all duration-200",
  {
    variants: {
      intent: {
        primary: "text-white bg-orange-500 hover:bg-orange-600",
        secondary: "text-white bg-gray-900 hover:bg-gray-700",
        info: "bg-blue-500 hover:bg-blue-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white ",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
        danger: "bg-red-500 hover:bg-red-600 text-white",
      },
      type: {
        round: "rounded-full",
      },
    },
  }
);

export const slideVariants = {
  hiddenRight: {
    x: "100%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
