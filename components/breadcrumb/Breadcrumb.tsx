"use client";
import { usePathname } from "@/i18n/routing";
import { ChevronRight, HomeIcon } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { slugify } from "@/lib/helper";

const Breadcrumb = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean); // usuń puste segmenty

  const crumbs = [
    { label: t("Home"), href: "/" },
    ...segments.map((seg, i) => {
      const href =
        "/" +
        segments
          .slice(0, i + 1)
          .map(slugify)
          .join("/");
      return { label: seg, href };
    }),
  ];

  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 p-5 flex">
      <ol className="container mx-auto flex items-center text-sm">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2 capitalize">
            {index === 0 ? (
              <HomeIcon className="text-gray-600 size-5 mr-1" />
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
            )}
            <Link href={crumb.href} className="text-blue-500 hover:underline">
              {crumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
