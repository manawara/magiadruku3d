import Link from "next/link";
import React from "react";
import { buttonLink } from "./variants";
import { ArrowRight } from "lucide-react";
import { IntentType } from "@/types";
type ButtonLinkProps = {
  href: string;
  children?: React.ReactNode;
  color: IntentType;
  size?: number;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  keyof React.ButtonHTMLAttributes<HTMLButtonElement>
>;
const ButtonLink = ({ href, children, color, size = 16 }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${buttonLink({
        color,
      })} flex items-center gap-2 text-[${size}px]`}
    >
      {children}
      <ArrowRight
        size={size + 4}
        className="translate-x-0 group-hover:translate-x-1 duration-300"
      />
    </Link>
  );
};

export default ButtonLink;
