"use client";
import React, { useState } from "react";
import Table from "./Table";
import { useLocale, useTranslations } from "next-intl";
import Card from "@/backend/components/card/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBanner, getBanners } from "@/app/action/mainBanner";
import SpinLoader from "@/backend/components/loading/components/spin/Spin";
import { Circle, Loader2 } from "lucide-react";
import Modal from "@/backend/components/modal/Modal";
import Button from "@/backend/components/button/Button"; // Upewnij się, że ten komponent istnieje
import { useRouter } from "next/navigation";

type MainBannerType = {
  title: string;
  subTitle: string;
  price: number; // number, nie string
  status: React.ReactNode; // JSX.Element lub string
  order: number; // number, nie string
};

type HeadigColumnType = {
  id: number;
} & MainBannerType;

const TableMainBanner = () => {
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<
    (MainBannerType & { id: number }) | null
  >(null);
  const locale = useLocale();
  const queryClient = useQueryClient();
  const router = useRouter();
  const tGeneral = useTranslations("Backend.general");
  const t = useTranslations("Backend.mainBanner");

  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteBanner(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      setOpen(false);
    },
  });

  const handleDelete = (banner: MainBannerType & { id: number }) => {
    setSelectedBanner(banner);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBanner) {
      deleteMutation.mutate(selectedBanner.id);
    }
  };

  const convertedData = dataBanner?.map((item) => {
    const titleObj = item.title as Record<string, string> | null;
    const subTitleObj = item.subTitle as Record<string, string> | null;

    return {
      ...item,
      id: item.id, // zachowujemy number, nie toString()
      status:
        item.status === "active" ? (
          <div className="text-green-400 flex items-center gap-2">
            <Circle />
          </div>
        ) : (
          <div className="text-dangerBackend-500 flex items-center gap-2">
            <Circle />
          </div>
        ),
      title: titleObj?.[locale] ?? "",
      subTitle: subTitleObj?.[locale] ?? "",
    };
  });

  const headingColumn: { title: string; key: keyof HeadigColumnType }[] = [
    { key: "id", title: "ID" },
    { key: "title", title: t("title") },
    { key: "subTitle", title: t("subTitle") },
    { key: "price", title: t("price") },
    { key: "status", title: t("status") },
    { key: "order", title: t("order") },
  ];

  if (isLoading) return <SpinLoader />;

  return (
    <>
      <Card className="p-4">
        <h1 className="pb-4 px-4 text-xl font-semibold">{t("heading")}</h1>

        <Table
          headingContent={headingColumn}
          items={convertedData ?? []}
          onEdit={({ id }) => router.push(`./main-banner/edit/${id}`)}
          onDelete={handleDelete}
        />
      </Card>

      {open && selectedBanner && (
        <Modal onClose={() => setOpen(false)} isClose>
          <div className="flex flex-col items-center gap-3 p-4">
            <p>
              {tGeneral("deleteInfo")}{" "}
              <span className="font-semibold">{selectedBanner.title}</span>?
            </p>
            <div className="flex gap-2">
              {!deleteMutation.isPending ? (
                <>
                  <Button
                    variant="basic"
                    colorFill="primary"
                    onClick={handleConfirmDelete}
                  >
                    {tGeneral("yes")}
                  </Button>
                  <Button
                    variant="basic"
                    colorFill="danger"
                    onClick={() => setOpen(false)}
                  >
                    {tGeneral("no")}
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {tGeneral("deleting")}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TableMainBanner;
