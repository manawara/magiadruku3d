import ButtonLink from "@/backend/components/button/ButtonLink";
import Card from "@/backend/components/card/Card";
import Heading from "@/backend/components/heading/Heading";
import TableCategory from "@/backend/feature/table/components/TableCategory";
import React from "react";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { locale } = await params; // Await the params promise
  const t = await getTranslations("Backend.general");

  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center justify-between px-4">
          <Heading tag="h2" size="md" weight="bold">
            {t("allCategories")}
          </Heading>
          <div>
            <ButtonLink
              variant="basic"
              colorFill="primary"
              href="/dashboard/products/category/create"
              className="m-4"
            >
              {t("addCategory")}
            </ButtonLink>
          </div>
        </div>
        <TableCategory locale={locale} />
      </Card>
    </div>
  );
};

export default CategoryPage;
