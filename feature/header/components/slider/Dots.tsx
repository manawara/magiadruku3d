import React from "react";

type DotsProps = {
  isActive: boolean;
};

const Dots = ({ isActive }: DotsProps) => {
  return (
    <div
      className={`size-[10px]  rounded-full ${
        isActive ? "bg-black" : "bg-gray-300"
      }`}
    ></div>
  );
};

export default Dots;
