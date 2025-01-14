import React from "react";

const Divider = ({ position = "vertical", color = "bg-white" }) => {
  const positionDivider =
    position === "horizontal" ? "w-full h-[1px]" : "w-[1px] h-full";
  return <div className={`opacity-15 ${color} ${positionDivider}`}></div>;
};

export default Divider;
