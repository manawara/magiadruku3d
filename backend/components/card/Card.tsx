import { ChildrenType } from "@/types";
import React from "react";
type CardType = {
  className?: string;
} & ChildrenType;

const Card = ({ children, className }: CardType) => {
  return (
    <div
      className={`rounded-lg bg-grayBackned-10 w-full shadow-sm ${className} my-5`}
    >
      {children}
    </div>
  );
};

export default Card;
