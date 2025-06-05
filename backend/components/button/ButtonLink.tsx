import React from "react";
import Link from "next/link";
import { button } from "./variants";
import { ArrowRight } from "lucide-react";
import { ChildrenType } from "@/types";

type ButtonLinkType = {
  variant: "basic";
  colorFill: "primary";
  size?: "full";
  icon?: boolean;
  className?: string;
  href: string; // Changed from 'to' to 'href' to match Next.js Link API
} & ChildrenType;

const ButtonLink = ({
  children,
  variant,
  colorFill,
  size,
  icon,
  className,
  href,
}: ButtonLinkType) => {
  return (
    <Link
      href={href}
      className={`${button({
        variant,
        colorFill,
        size,
        icon,
      })} ${className} flex items-center gap-2`}
    >
      {children}
      {icon && <ArrowRight size={17} />}
    </Link>
  );
};

export default ButtonLink;
