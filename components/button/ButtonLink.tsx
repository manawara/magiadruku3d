import Link from "next/link";
import React from "react";
import { buttonLink } from "./variants";
import { ArrowRight } from "lucide-react";
import { IntentType } from "@/types";
type ButtonLinkProps = {
  href: string;
  children?: React.ReactNode;
  color: IntentType;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  keyof React.ButtonHTMLAttributes<HTMLButtonElement>
>;
const ButtonLink = ({ href, children, color }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${buttonLink({ color })} flex items-center gap-2`}
    >
      {children}
      <ArrowRight
        size={22}
        className="translate-x-0 group-hover:translate-x-1 duration-300"
      />
    </Link>
  );
};

export default ButtonLink;
