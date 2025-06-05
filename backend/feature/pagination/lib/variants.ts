import { cva } from "class-variance-authority";

export const buttonPagination = cva("cursor-pointer max-w-max", {
  variants: {
    intent: {
      primary: "",
      prev: "border border-primaryBackend-200 rounded-md flex justify-between pr-4 items-center gap-2",
      next: "border border-primaryBackend-200 rounded-md flex justify-between pl-4 items-center gap-2",
    },
    active: {
      true: "font-semibold rounded-md",
    },
    size: {
      small: "text-xs py-1 px-2",
      medium: "text-sm py-2 px-3",
    },
    fill: {
      primary:
        "bg-primaryBackend-100 text-grayBackned-800 hover:bg-primaryBackend-100 hover:scale-105 duration-100 transition-transform",
    },
  },
  defaultVariants: {
    intent: "primary",
    active: false,
    size: "medium",
  },
});
