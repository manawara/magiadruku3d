import { cva } from "class-variance-authority";

export const button = cva(
  "m-1 max-w-max text-sm duration-300 relative top-0 left-0",
  {
    variants: {
      variant: {
        basic: "py-3 px-6 rounded-full ",
      },
      colorFill: {
        primary:
          "bg-primaryBackend-500 hover:bg-primaryBackend-600 text-gray-50",
        danger: "bg-dangerBackend-500 hover:bg-dangerBackend-600 text-gray-50",
        dark: "hover:scale-95 duration-200 transition-all bg-grayBackned-900 before:content-[''] hover:bg-gray-800 transition-transform text-gray-50",
      },
      size: {
        full: "!max-w-full flex justify-center",
      },
      icon: {
        true: "",
      },
    },
    compoundVariants: [],
  }
);
