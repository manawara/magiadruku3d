import React from "react";
import { buttonPagination } from "../../lib/variants";

const PaginationButton = ({
  children,
  intent,
  size,
  active,
  fill,
  onClick,
}) => {
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
