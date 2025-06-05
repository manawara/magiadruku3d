"use client";
import React, { useState, useEffect } from "react";
import Pagination from "../../pagination/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import TableProduct from "./TableProduct";
import { getProductPagination } from "@/app/action/product";

const TableWrapperProduct = ({ locale }) => {
  const [limitItemsShow, setLimitItemsShow] = useState(1); // Start with 10 items per page
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0); // Start with 0 offsets
  // Calculate skip value whenever page or limitItemsShow changes
  useEffect(() => {
    setSkip((page - 1) * limitItemsShow);
  }, [page, limitItemsShow]);

  const sort = "asc";

  const { data, isLoading, error }: UseQueryResult<ProductData, Error> =
    useQuery({
      queryKey: ["product", sort, limitItemsShow, page, skip],
      queryFn: () => getProductPagination(sort, limitItemsShow, skip),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  return (
    <div>
      <TableProduct locale={locale} data={data} isLoading={isLoading} />
      {data?.pagination && (
        <Pagination
          options={{ action: true, elementsPerView: limitItemsShow }}
          className="mt-4"
          totalItems={data.pagination.total || 0}
          onChange={handleShowItemPerPage}
          onChoosePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default TableWrapperProduct;
