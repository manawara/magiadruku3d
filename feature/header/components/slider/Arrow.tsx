"use client";
import * as LucideIcons from "lucide-react";
import React, { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";
import { arrow } from "./variants";
import { IntentType } from "@/types";

type Arrow = {
  icon: keyof typeof LucideIcons;
  intent: IntentType | "secondary";
  type: "round";
  onAction?: () => void;
};
export const Arrow = ({ icon, intent, type, onAction }: Arrow) => {
  const IconComponent = LucideIcons[icon] as ForwardRefExoticComponent<
    Omit<LucideProps, "ref">
  >;
  return (
    <div className={arrow({ intent, type })} onClick={onAction}>
      <IconComponent
        className="text-inherit group-hover:text-white"
        size={22}
      />
    </div>
  );
};
