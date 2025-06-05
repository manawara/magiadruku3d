import React from "react";

type DividerProps = {
  position?: "vertical" | "horizontal";
  color?: string;
  className?: string;
};

const Divider = ({
  position = "vertical",
  color = "bg-white",
  className,
}: DividerProps) => {
  const positionDivider =
    position === "horizontal" ? "w-full h-[1px]" : "w-[1px] h-full";
  return (
    <div
      className={`opacity-15 ${color} ${positionDivider} ${className}`}
    ></div>
  );
};

export default Divider;
