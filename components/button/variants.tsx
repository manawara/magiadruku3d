import { cva } from "class-variance-authority";

export const button = cva("rounded border-2 cursor-pointer", {
  variants: {
    intent: {
      primary:
        "text-white bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600",
      info: "bg-blue-500 hover:bg-blue-600 text-white",
      success:
        "bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 text-white ",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 text-black",
      danger:
        "bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white",
    },
    outline: {
      primary:
        "bg-transparent text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:!border-orange-600",
      info: "bg-transparent hover:bg-blue-100 hover:!border-blue-600 border-blue-500 !text-blue-500 hover:!text-blue-600",
      success:
        "bg-transparent hover:bg-green-50 hover:blue-green-600 hover:!border-green-600 border-green-500 !text-green-500 hover:!text-green-600",
      warning:
        "bg-transparent text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 hover:!border-yellow-600 border-yellow-500 ",
      danger:
        "bg-transparent text-red-500 hover:bg-red-50 hover:text-red-600 hover:!border-red-600 border-red-500",
    },
    soft: {
      true: "",
    },
    color: {
      gray: {},
    },
    size: {
      small: "px-5 py-2 text-[14px]",
      medium: "px-5 py-2 text-[16px]",
      large: "px-8 py-5 text-[16px]",
    },
    disabled: {
      false: null,
      true: "!cursor-not-allowed",
    },
  },

  compoundVariants: [
    {
      intent: "primary",
      disabled: true,
      class:
        "!bg-orange-200 !border-orange-200 hover:!border-orange-200 hover:!bg-orange-200 ",
    },
    {
      outline: "primary",
      disabled: true,
      class:
        "!bg-orange-50 !border-orange-200 !text-orange-200 hover:!border-orange-200",
    },
    {
      outline: "primary",
      soft: true,
      class:
        "!border-orange-200 hover:border-orange-600 hover:bg-orange-50 !text-orange-500",
    },

    {
      intent: "info",
      disabled: true,
      class:
        "!bg-blue-200 !border-blue-200 hover:!border-blue-200 hover:!bg-blue-200 ",
    },
    {
      outline: "info",
      disabled: true,
      class:
        "!bg-blue-50 !border-blue-200 !text-blue-200 hover:!border-blue-200 ",
    },
    {
      outline: "info",
      soft: true,
      class:
        "!border-blue-200 hover:border-blue-600 hover:bg-blue-50 !text-blue-500",
    },

    {
      intent: "info",
      disabled: true,
      class:
        "!bg-blue-200 !border-blue-200 hover:!border-blue-200 hover:!bg-blue-200 ",
    },
    {
      outline: "info",
      disabled: true,
      class:
        "!bg-blue-50 !border-blue-200 !text-blue-200 hover:!border-blue-200 ",
    },
    {
      outline: "info",
      soft: true,
      class:
        "!border-blue-200 hover:border-blue-600 hover:bg-blue-50 !text-blue-500",
    },

    {
      intent: "success",
      disabled: true,
      class:
        "!bg-green-200 !border-green-200 hover:!border-green-200 hover:!bg-green-200 ",
    },
    {
      outline: "success",
      disabled: true,
      class:
        "!bg-green-50 !border-green-200 !text-green-200 hover:!border-green-200 ",
    },
    {
      outline: "success",
      soft: true,
      class:
        "!border-green-200 hover:border-green-600 hover:bg-green-50 !text-green-500",
    },

    {
      intent: "warning",
      disabled: true,
      class:
        "!bg-yellow-200 !border-yellow-200 hover:!border-yellow-200 hover:!bg-yellow-200 text-yellow-600",
    },
    {
      outline: "warning",
      disabled: true,
      class:
        "!bg-yellow-50 !border-yellow-200 !text-yellow-200 hover:!border-yellow-200 ",
    },
    {
      outline: "warning",
      soft: true,
      class:
        "!border-yellow-200 hover:border-yellow-600 hover:bg-yellow-50 !text-yellow-500",
    },

    {
      intent: "danger",
      disabled: true,
      class:
        "!bg-red-200 !border-red-200 hover:!border-red-200 hover:!bg-red-200 text-white",
    },
    {
      outline: "danger",
      disabled: true,
      class: "!bg-red-50 !border-red-200 !text-red-200 hover:!border-red-200 ",
    },
    {
      outline: "danger",
      soft: true,
      class:
        "!border-red-200 hover:border-red-600 hover:bg-red-50 !text-red-500",
    },
  ],

  defaultVariants: {
    size: "medium",
  },
});

export const buttonLink = cva(
  "text-[16px] group font-semibold capitalize py-2 relative bottom-0 hover:before:w-full before:top-[100%] before:content-[''] before:block before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:duration-300",
  {
    variants: {
      color: {
        primary: "text-orange-500  before:bg-orange-500",
        info: "text-blue-600 before:bg-blue-600",
        success: "bg-green-500 before:bg-green-500 ",
        warning: "bg-yellow-300 before:bg-yellow-300",
        danger: "bg-red-500 before:bg-red-500",
      },
    },

    defaultVariants: {
      color: "primary",
    },
  }
);
