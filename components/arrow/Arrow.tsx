import { IntentType } from "@/types";
import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import React from "react";

const arrow = cva("p-2", {
  variants: {
    intent: {
      primary: "bg-orange-500 text-white hover:bg-orange-600 duration-200",
      secondary: "bg-gray-900 text-white hover:bg-gray-700",
      danger: "bg-red-500 text-white hover:bg-red-600",
      warning: "bg-yellow-500 text-gray-900 hover:bg-yellow-400",
      info: "bg-blue-500 text-white hover:bg-blue-600",
      success: "bg-green-500 text-white hover:bg-green-600",
    },
    rounded: {
      true: "rounded-full",
    },

    outline: {
      true: "!bg-white",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class:
        "border-orange-500 border-solid border-[1px] !text-orange-500 hover:!border-orange-600 hover:!bg-orange-50",
    },
    {
      intent: "secondary",
      outline: true,
      class:
        "border-gray-900 border-solid border-[1px] !text-gray-900  hover:!bg-gray-50",
    },
    {
      intent: "danger",
      outline: true,
      class:
        "border-red-500 border-solid border-[1px] !text-red-500 hover:!border-red-600 hover:!text-red-600 hover:!bg-red-50",
    },
    {
      intent: "warning",
      outline: true,
      class:
        "border-yellow-500 border-solid border-[1px] !text-yellow-500 hover:!border-yellow-600 hover:!text-yellow-600 hover:!bg-yellow-50",
    },
    {
      intent: "info",
      outline: true,
      class:
        "border-blue-500 border-solid border-[1px] !text-blue-500 hover:!border-blue-600 hover:!text-blue-600 hover:!bg-blue-50",
    },
    {
      intent: "success",
      outline: true,
      class:
        "border-green-500 border-solid border-[1px] !text-green-500 hover:!border-green-600 hover:!text-green-600 hover:!bg-success-50",
    },
  ],
});

type ArrowProps = {
  intent: IntentType;
  direction: "left" | "right";
  rounded?: boolean;
  onClick?: () => void;
  isVisible?: boolean;
  outline?: boolean;
};

const Arrow = ({
  intent,
  direction,
  rounded,
  onClick,
  isVisible,
  outline,
}: ArrowProps) => {
  const directionArrow = direction === "left" ? "rotate-180" : "rotate-0";
  return (
    <>
      {isVisible && (
        <button
          className={arrow({ intent, rounded, outline })}
          onClick={onClick}
        >
          <ArrowRight className={`color-inherit ${directionArrow}`} />
        </button>
      )}
    </>
  );
};

export default Arrow;
