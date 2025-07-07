"use client";

import ButtonHighlight from "@/components/button/ButtonHighlight";
import { Prisma } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

type CategoryType = {
  id: number;
  mainCategory: any;
  imageUrlMain: string;
  metaDescription: Prisma.JsonValue;
  metaTag: Prisma.JsonValue;
  metaTitle: Prisma.JsonValue;
};
const NavProduct = ({
  categories,
  onAction,
  isActive,
}: {
  categories: CategoryType[];
  onAction: (id: number, name: string) => void;
  isActive: number;
}) => {
  const t = useTranslations("NavProduct");
  const locale = useLocale();

  const handleClickCategory = (id: number, name: string) => {
    onAction(id, name);
  };
  return (
    <nav>
      <ul className="flex items-center gap-2 max-sm:gap-1 text-sm max-sm:flex-col">
        <li onClick={() => handleClickCategory(0, "all")}>
          <ButtonHighlight color="primary" isActive={isActive === 0}>
            {t("allProduct")}
          </ButtonHighlight>
        </li>

        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() =>
              handleClickCategory(category.id, category.mainCategory?.[locale])
            }
          >
            <ButtonHighlight
              color="primary"
              isActive={isActive === category.id}
            >
              {(category.mainCategory?.[locale] as string) ?? ""}
            </ButtonHighlight>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default React.memo(NavProduct);
