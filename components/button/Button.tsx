import React from "react";
import { button } from "./variants";
import { ChildrenType } from "@/types";
import { ArrowRight } from "lucide-react"; // Changed from 'lucide' to 'lucide-react'
import { IntentType } from "@/types";

type BaseButtonProps = {
  soft?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  icon?: boolean;
  fill?: boolean;
  className?: string;
} & ChildrenType;

type IntentButtonProps = BaseButtonProps & {
  intent: IntentType;
  outline?: never;
};

type OutlineButtonProps = BaseButtonProps & {
  outline: IntentType;
  intent?: never;
};

type PlainButtonProps = BaseButtonProps & {
  intent?: never;
  outline?: never;
};
type ButtonProps = IntentButtonProps | OutlineButtonProps | PlainButtonProps;

const Button = ({
  children,
  intent,
  size,
  disabled,
  outline,
  soft,
  icon,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex gap-2 items-center group ${className} ${button({
        intent,
        size,
        disabled,
        outline,
        soft,
      })}`}
    >
      {children}
      {icon && (
        <ArrowRight
          size={20}
          className="text-inherit group-hover:translate-x-1 duration-200 transition-all"
        />
      )}
    </button>
  );
};

export default Button;
