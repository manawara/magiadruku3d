"use client";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/helper";
type IconWithTextProps = {
  onAction?: () => void;
  icon: keyof typeof LucideIcons;
  label?: string;
  sizeIcon?: number | string;
  colorIcon?: string;
  colorIconHover?: string;
  sizeText?: string;
  colorText?: string;
  mode?: "tel" | "mail";
  link?: string;
  className?: string;
  animate?: boolean;
};

const IconWithText = ({
  onAction,
  icon,
  label,
  sizeIcon = "text-sm",
  colorIcon = "text-gray-500",
  colorIconHover = "text-orange-500",
  sizeText = "text-sm",
  colorText = "text-gray-600",
  mode,
  link,
  className,
  animate = false,
}: IconWithTextProps) => {
  const IconComponent = LucideIcons[icon] as ForwardRefExoticComponent<
    Omit<LucideProps, "ref">
  >;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <motion.div
      className={`flex items-center gap-2  py-4 cursor-pointer max-w-fit ${className} group border-[1px] transition-all duration-300 border-transparent border-solid`}
      whileHover="hover"
      onClick={onAction}
    >
      <motion.div
        variants={
          animate
            ? {
                hover: {
                  scale: [1, 1.2, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 1,
                  },
                },
              }
            : {}
        }
      >
        <IconComponent
          className={`${colorIcon} self-center group-hover:${colorIconHover} transition-colors duration-100 ease-linear`}
          strokeWidth={1.5}
          size={sizeIcon}
        />
      </motion.div>
      {label && (
        <p
          className={`${colorText} max-lg:text-[11px] ${sizeText} font-extralight `}
        >
          {!mode &&
            (link ? (
              <Link
                href={`${slugify(link)}`}
                className="group-hover:text-orange-500  transition-colors duration-100 ease-linear"
              >
                {label}
              </Link>
            ) : (
              label
            ))}
          {mode && (
            <Link
              href={`${mode === "tel" ? "tel:" : "mailto:"}${label}`}
              className="currentColor font-semibold  group-hover:text-orange-500 transition-colors duration-100 ease-linear "
            >
              {label}
            </Link>
          )}
        </p>
      )}
    </motion.div>
  );
};

export default IconWithText;
