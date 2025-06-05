import { cva } from "class-variance-authority";

export const heading = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      xxxl: "text-3xl",
      xxxxl: "text-4xl",
    },
    weight: {
      light: "font-light",
      medium: "font-normal",
      semi: "font-semibold",
      bold: "font-bold",
    },
  },
});
