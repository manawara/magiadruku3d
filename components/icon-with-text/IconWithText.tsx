"use client";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/helper";
type IconWithTextProps = {
  icon: keyof typeof LucideIcons;
  label: string;
  sizeIcon?: number | string;
  color?: string;
  sizeText?: string;
  colorText?: string;
  mode?: "tel" | "mail";
  link?: string;
  className?: string;
};

const IconWithText = ({
  icon,
  label,
  sizeIcon = "text-sm",
  color = "text-gray-500",
  sizeText = "text-sm",
  colorText = "text-gray-600",
  mode,
  link,
  className,
}: IconWithTextProps) => {
  const IconComponent = LucideIcons[icon] as ForwardRefExoticComponent<
    Omit<LucideProps, "ref">
  >;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <motion.section
      className={`flex items-center gap-2  py-4 cursor-pointer max-w-fit ${className} group`}
      whileHover="hover"
    >
      <motion.div
        variants={{
          hover: {
            scale: [1, 1.2, 1],
            transition: {
              repeat: Infinity,
              duration: 1,
            },
          },
        }}
      >
        <IconComponent
          className={`${color} ${sizeIcon} group-hover:text-orange-500 transition-colors duration-100 ease-linear`}
          strokeWidth={1.5}
        />
      </motion.div>
      <p
        className={`${colorText} ${sizeText} font-extralight max-lg:!text-[11px]`}
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
    </motion.section>
  );
};

export default IconWithText;
