"use client";
import React, { useState, isValidElement } from "react";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Table from "./Table";
import { getCategoryPagination } from "@/app/action/category";
import { useTranslations } from "next-intl";
import { parseField } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@/backend/components/modal/Modal";
import Button from "@/backend/components/button/Button";
import { deletedCategory } from "@/app/action/category";
import { Loader2 } from "lucide-react";

interface Category {
  id: number;
  imageUrlMain: string;
  mainCategory: string | React.ReactNode; // Allow both string and JSX
  children: [React.ReactElement, string]; // Specifically an array with a React element at index 0 and a string at index 1
}
interface MainCategoryChildrenProps {
  children: [React.ReactElement, string]; // Specifically an array with a React element at index 0 and a string at index 1
}
interface TableCategoryProps {
  locale: string;
}

const TableCategory: React.FC<TableCategoryProps> = ({ locale }) => {
  const [category, setCategory] = useState({ id: -1, name: "" });
  const [open, setOpen] = useState(false);

  const t = useTranslations("Backend");
  const router = useRouter();
  const queryClient = useQueryClient();

  const sort = "asc";

  const { data, isLoading, error }: UseQueryResult<Category[], Error> =
    useQuery({
      queryKey: ["category", sort],
      queryFn: () => getCategoryPagination(sort),
    });
  const mutation = useMutation({
    mutationFn: (id: number) => deletedCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      // Optionally add error handling UI here
    },
  });

  const headingColumn: { title: string; key: keyof Category }[] = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "mainCategory",
      title: t("category"),
    },
  ];

  const handleOpenModal = () => {
    setOpen((prev) => !prev);
  };

  const handleView = (id: string | number) => {
    router.push(`category/${id}`);
  };

  const handleEdit = (item: Category) => {
    router.push(`category/edit/${item.id}`);
  };

  const handleDelete = (item: Category) => {
    handleOpenModal();

    let categoryName = "";

    if (isValidElement<MainCategoryChildrenProps>(item.mainCategory)) {
      // Now TypeScript knows the structure of props
      categoryName = item.mainCategory.props.children[1];
    }

    setCategory({ id: item.id, name: categoryName });
  };

  const handleConfirm = () => {
    mutation.mutate(category.id);
  };

  const formattedData: Category[] | undefined = data?.map((item) => {
    return {
      ...item,
      mainCategory: (
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={item.imageUrlMain}
            alt={parseField(item.mainCategory as string, locale)}
          />
          {parseField(item.mainCategory as string, locale)}
        </div>
      ),
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{t("errorLoading")}</div>
      ) : (
        <Table<Category>
          headingContent={headingColumn}
          items={formattedData || []}
          onView={(id) => handleView(id)}
          onEdit={(item) => handleEdit(item)}
          onDelete={(item) => handleDelete(item)}
        />
      )}

      {open && (
        <Modal onClose={handleOpenModal} isClose>
          <div className="flex flex-col items-center gap-3 p-4">
            <p>
              {t("general.deleteInfo")}{" "}
              <span className="font-semibold">{category?.name || ""}</span> ?
            </p>
            <div className="flex gap-2">
              {!mutation.isPending && (
                <>
                  <Button
                    variant="basic"
                    colorFill="primary"
                    onClick={handleConfirm}
                  >
                    {t("general.yes")}
                  </Button>
                  <Button
                    variant="basic"
                    colorFill="danger"
                    onClick={handleOpenModal}
                  >
                    {t("general.no")}
                  </Button>
                </>
              )}
              {mutation.isPending && (
                <div>
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  Deleting...
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TableCategory;
