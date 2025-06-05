"use client";
import React, { useState } from "react";
import PaginationButton from "./PaginationButton/PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Select from "@/backend/components/select/Select";
import { useTranslations } from "next-intl";
const Pagination = ({
  options = { action: false, elementsPerView: 10 },
  className,
  totalItems,
  onChange,
  onChoosePage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(options.elementsPerView || 10);
  const totalPages = Math.ceil(totalItems / showItem) || 1;
  const t = useTranslations("Backend.pagination");
  const handleChangeShowItem = (id, name, value) => {
    setShowItem(value);
    setCurrentPage(1);
    if (onChange) {
      onChange(id, name, value);
    }
  };

  const handleChangePage = (value) => {
    if (value === "...") return;
    setCurrentPage(value);
    if (onChoosePage) {
      onChoosePage(value);
    }
  };

  const handlePage = (action: string) => {
    if (action === "next" && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onChoosePage(nextPage);
    } else {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onChoosePage(prevPage);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always add page 1
      pageNumbers.push(1);

      // Add ellipsis if current page is far from beginning
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Calculate range of pages to show around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust to show at least 3 pages in the middle
      if (currentPage <= 3) {
        endPage = Math.min(5, totalPages - 1);
      } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 2);
      }

      // Add the calculated range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always add the last page if there's more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={`${className} my-2 flex justify-between items-center`}>
      <Select
        className="text-xs"
        label={t("displayItems")}
        sortOptions={[
          { id: 1, name: `10 ${t("items")}`, value: 10 },
          { id: 2, name: `20 ${t("items")}`, value: 20 },
          { id: 3, name: `30 ${t("items")}`, value: 30 },
          { id: 4, name: `40 ${t("items")}`, value: 40 },
          { id: 5, name: `50 ${t("items")}`, value: 50 },
          { id: 6, name: `100 ${t("items")}`, value: 100 },
        ]}
        placeholder={t("showItems")}
        value={showItem} // kontrolowany komponent
        onChange={handleChangeShowItem}
      />
      {totalPages > 0 && (
        <div className="flex gap-2">
          {getPageNumbers().map((page, index) => (
            <PaginationButton
              key={index}
              size="medium"
              intent="primary"
              active={page === currentPage}
              fill={page === currentPage ? "primary" : "outline"}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </PaginationButton>
          ))}
        </div>
      )}

      {options.action && (
        <div className="flex gap-4">
          {currentPage > 1 && (
            <PaginationButton
              intent="prev"
              size="small"
              fill="primary"
              onClick={() => handlePage("prev")}
            >
              <ChevronLeft size={18} />
              Prev
            </PaginationButton>
          )}
          {currentPage < totalPages && (
            <PaginationButton
              intent="next"
              size="small"
              fill="primary"
              onClick={() => handlePage("next")}
            >
              Next
              <ChevronRight size={18} />
            </PaginationButton>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
