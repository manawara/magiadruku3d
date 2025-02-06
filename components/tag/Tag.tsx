import React, { ReactNode } from "react";
import { tag } from "./variants";
import { IntentType } from "@/types";
type TagProps = {
  children: ReactNode;
  color?: IntentType | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  weight?: "regular" | "semiBold" | "bold";
};

const Tag = ({ children, color, size, weight }: TagProps) => {
  return (
    <div className={`${tag({ color, size, weight })} z-10 max-w-max`}>
      {children}
    </div>
  );
};

export default Tag;
