"use client";
import { usePathname } from "@/i18n/routing";
import { ChevronRight, HomeIcon } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { slugify } from "@/lib/helper";

const Breadcrumb = () => {
  const t = useTranslations();
  const path = usePathname();
  const links = [
    ...new Set(path.split("/").map((el) => (el === "" ? t("Home") : el))),
  ];

  return (
    links.length > 1 && (
      <nav aria-label="Breadcrumb" className="bg-gray-50 p-5 flex">
        <ol className="container mx-auto flex items-center">
          <HomeIcon className="text-gray-600 size-5 mr-2" />

          {links.map((item, index) => (
            <li key={item + index} className="flex items-center gap-0">
              <span className="text-gray-600 flex items-center capitalize">
                {index === 0 ? (
                  <Link href="/">{item}</Link>
                ) : (
                  <Link href={slugify(item)} className="text-blue-500">
                    {item}
                  </Link>
                )}
                <span className={`${index === links.length - 1 && "hidden"}`}>
                  <ChevronRight size={20} />
                </span>
              </span>
            </li>
          ))}
        </ol>
      </nav>
    )
  );
};

export default Breadcrumb;
