import React from "react";
import { button } from "./variants";
import { ArrowRight } from "lucide-react";
import { ChildrenType } from "@/types";

type ButtonType = {
  variant: "basic";
  colorFill: "primary" | "danger";
  size?: "full";
  type?: "reset" | "submit" | "button";
  onClick?: () => void;
  icon?: boolean;
  disabled?: boolean;
  className?: string;
} & ChildrenType;

const Button = ({
  children,
  variant,
  colorFill,
  type,
  size,
  icon,
  disabled,
  onClick,
  className,
}: ButtonType) => {
  return (
    <button
      className={`${button({
        variant,
        colorFill,
        size,
        icon,
      })} ${className} flex items-center gap-2 capitalize`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
      {icon && <ArrowRight size={17} />}
    </button>
  );
};

export default Button;
