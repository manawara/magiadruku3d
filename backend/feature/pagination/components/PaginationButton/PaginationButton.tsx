import React, { ReactNode } from "react";
import { buttonPagination } from "../../lib/variants";

type PaginationButtonType = {
  children: ReactNode;
  intent: "primary" | "prev" | "next";
  size: "small" | "medium";
  active?: boolean;
  fill?: "primary" | null; // Changed from "primary" | "outline"
  onClick?: () => void;
};

const PaginationButton = ({
  children,
  intent,
  size,
  active,
  fill,
  onClick,
}: PaginationButtonType) => {
  return (
    <div
      className={buttonPagination({ intent, size, active, fill })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default PaginationButton;
