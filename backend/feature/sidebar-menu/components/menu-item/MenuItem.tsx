import { ChevronDown } from "lucide-react";
import React from "react";
import Link from "next/link";

type MenuItemProps = {
  onAction?: () => void;
  name: string;
  isExpanded?: boolean;
  link?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  hasChildren?: boolean;
};

const MenuItem = ({
  onAction,
  name,
  isExpanded,
  link,
  icon,
  isActive,
  className,
  hasChildren,
}: MenuItemProps) => {
  const activeClass = isActive
    ? "bg-primaryBackend-50 text-grayBackend-900 font-semibold"
    : "";
  const hoverClass = "hover:text-grayBackend-900";

  return (
    <div className={className}>
      {hasChildren ? (
        <button
          className={`flex p-3 gap-3 text-gray-700 text-sm w-full ${activeClass} ${hoverClass}`}
          onClick={onAction}
        >
          {icon} <span>{name}</span>
          <ChevronDown
            size={18}
            className={`text-gray-700 ml-auto transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : link ? (
        <Link
          href={link}
          className={`flex p-3 gap-3 text-gray-700 text-sm w-full ${activeClass} ${hoverClass}`}
          onClick={onAction}
        >
          {icon} <span>{name}</span>
        </Link>
      ) : (
        <div
          className={`ml-11 text-sm my-1 block ${activeClass} ${hoverClass}`}
          onClick={onAction}
        >
          {icon} <span>{name}</span>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
