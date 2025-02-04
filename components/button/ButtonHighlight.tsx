import React from "react";
import { buttonHighlight } from "./variants";
import { IntentType } from "@/types";

type ButtonHighlight = {
  color: IntentType;
  children: string;
  isActive?: boolean;
};
const ButtonHighlight = ({ color, children, isActive }: ButtonHighlight) => {
  return (
    <button
      className={`${buttonHighlight({ color, isActive })} ${
        isActive ? "pb-1" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonHighlight;
