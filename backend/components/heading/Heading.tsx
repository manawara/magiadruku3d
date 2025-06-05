import React from "react";
import { heading } from "./variants";

type SizeType = {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
};
type WeightType = {
  weight?: "light" | "medium" | "semi" | "bold";
};

type BasicHeadingType = SizeType & WeightType;

type HeadingProps = {
  tag?: React.ElementType;
  children: React.ReactNode;
  className?: string;
} & BasicHeadingType;
const Heading = ({
  tag: Tag = "h1",
  children,
  className,
  size,
  weight = "medium",
}: HeadingProps) => {
  return (
    <Tag className={`${className} ${heading({ size, weight })}`}>
      {children}
    </Tag>
  );
};

export default Heading;
