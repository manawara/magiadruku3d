import { ChildrenType } from "@/types";
import React from "react";

const Card = ({ children, className }: ChildrenType) => {
  return (
    <div
      className={`rounded-lg bg-grayBackned-10 w-full shadow-sm ${className} my-5`}
    >
      {children}
    </div>
  );
};

export default Card;
