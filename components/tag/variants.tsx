import { cva } from "class-variance-authority";
export const tag = cva(
  "rounded-sm py-2 px-3 text-[16px] uppercase text-center",
  {
    variants: {
      color: {
        primary: "bg-orange-400 text-gray-950",
        secondary: "bg-gray-400 text-white",
        tertiary:
          "bg-transparent border-[1px] border-gray-800 text-gray-50 hover:border-gray-50 hover:bg-gray-900",
        info: "bg-blue-500 text-white",
        success: "bg-green-500 text-white ",
        warning: "bg-yellow-300 text-gray-950",
        danger: "bg-red-500 text-white",
      },
      size: {
        small: "text-xs",
        medium: "text-sm",
        large: "text-md",
      },
      weight: {
        regular: "font-normal",
        semiBold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "medium",
      weight: "regular",
    },
  }
);
