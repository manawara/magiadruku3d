import ButtonLink from "@/backend/components/button/ButtonLink";
import Card from "@/backend/components/card/Card";
import Heading from "@/backend/components/heading/Heading";
import TableProduct from "@/backend/feature/table/components/TableProduct";
import { getTranslations } from "next-intl/server";
import React from "react";

const ProductPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params;
  const t = await getTranslations("Backend.general");
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center justify-between px-4">
          <Heading tag="h2" size="md" weight="bold">
            {t("allProducts")}
          </Heading>
          <div>
            <ButtonLink
              variant="basic"
              colorFill="primary"
              href="/dashboard/products/create"
            >
              {t("addProduct")}
            </ButtonLink>
          </div>
        </div>
        <TableProduct locale={locale} />
      </Card>
    </div>
  );
};

export default ProductPage;
