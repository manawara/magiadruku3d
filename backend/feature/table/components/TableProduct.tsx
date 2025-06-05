"use client";
import React, { useState, useEffect } from "react";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Table from "./Table";
import { useTranslations } from "next-intl";
import { parseField } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@/backend/components/modal/Modal";
import Button from "@/backend/components/button/Button";
import { Loader2 } from "lucide-react";
import {
  deleteProduct,
  getProductPagination,
  ProductType,
} from "@/app/action/product";
import Pagination from "../../pagination/components/Pagination";

interface Product {
  id: number;
  productName: Record<string, string>;
  price: number;
  stock: number;
  categoryName: string;
  size: string;
  images: string[];
  productDetails?: Record<string, React.ReactNode>;
}

interface TableProductProps {
  locale: string;
}

const TableProduct: React.FC<TableProductProps> = ({ locale }) => {
  const [open, setOpen] = useState(false);
  const [limitItemsShow, setLimitItemsShow] = useState(50);
  const [page, setPage] = useState(1);
  const [skipPage, setSkipPage] = useState(1);
  const [productID, setProductID] = useState<{
    name: string;
    id: number | null;
  }>({ name: "", id: -1 });
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("Backend.general");
  const sort = "asc";
  useEffect(() => {
    const skip = (page - 1) * limitItemsShow;
    setSkipPage(skip);
  }, [page, limitItemsShow]);

  const { data, isLoading }: UseQueryResult<any, Error> = useQuery({
    queryKey: ["product", sort, limitItemsShow, page, skipPage],
    queryFn: () => getProductPagination(sort, limitItemsShow, skipPage),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });

  const handleShowItemPerPage = (_: unknown, __: unknown, value: number) => {
    setLimitItemsShow(value);
    setPage(1);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  const headingColumn: { title: string; key: keyof Product }[] = [
    { key: "id", title: "ID" },
    { key: "productDetails", title: t("productName") },
    { key: "price", title: t("price") },
    { key: "stock", title: t("stock") },
    { key: "categoryName", title: t("category") },
  ];

  const handleOpenModal = () => {
    setOpen((prev) => !prev);
  };

  const handleView = (id: string | number) => {
    router.push(`category/${id}`);
  };

  const handleEdit = (item: Product) => {
    router.push(`../products/edit/${item.id}`);
  };

  const handleDelete = ({
    id,
    productName,
  }: {
    id: number;
    productName: Record<string, string>;
  }) => {
    setProductID({ name: productName[locale], id });
    handleOpenModal();
  };
  const handleConfirm = () => {
    mutation.mutate(productID.id as number);
  };

  const formattedData: Product[] | undefined = data?.products.map(
    (item: ProductType) => {
      return {
        ...item,
        price: item.price + " zl",
        stock: item.stock + " items left",
        productDetails: {
          [locale]: (
            <div className="flex items-center gap-2">
              <Image
                width={50}
                height={50}
                className="size-12 rounded-md object-cover"
                src={item.images[0]}
                alt={parseField(item.productName as string, locale)}
              />
              <div className="flex flex-col min-w-[360px]">
                <div className="truncate max-w-[200px] sm:max-w-xs">
                  {parseField(item.productName as string, locale)}
                </div>
                <div className="text-xs mt-1">Size: {item.size}</div>
              </div>
            </div>
          ),
        },
      };
    }
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <>
        <Table<Product>
          headingContent={headingColumn}
          items={formattedData || []}
          isLoading={isLoading}
          onView={(id) => handleView(id)}
          onEdit={(item) => handleEdit(item)}
          onDelete={({ id, productName }) => handleDelete({ id, productName })}
        />
        <Pagination
          options={{ action: true, elementsPerView: limitItemsShow }}
          className="mt-4"
          totalItems={data?.pagination.total || 0}
          onChange={handleShowItemPerPage}
          onChoosePage={handleChangePage}
        />
      </>

      {open && (
        <Modal onClose={handleOpenModal} isClose>
          <div className="flex flex-col items-center gap-3 p-4">
            <p>
              {t("deleteInfo")}
              <span className="font-semibold">{productID.name}</span>?
            </p>
            <div className="flex gap-2">
              {!mutation.isPending && (
                <>
                  <Button
                    variant="basic"
                    colorFill="primary"
                    onClick={handleConfirm}
                  >
                    {t("yes")}
                  </Button>
                  <Button
                    variant="basic"
                    colorFill="danger"
                    onClick={handleOpenModal}
                  >
                    {t("no")}
                  </Button>
                </>
              )}
              {mutation.isPending && (
                <div>
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  {t("deleting")}...
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TableProduct;
