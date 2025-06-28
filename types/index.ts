import { type ReactNode } from "react";
import { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
export type SupportedLocale = "pl" | "en";

export type ChildrenType = {
  children: ReactNode;
};

// Interface for the nested child category
export interface CategoryChild {
  id?: number;
  name: string[];
  children?: CategoryChild[]; // Optional nested children
}

// Interface for the main category
export interface MainCategory {
  id: number;
  name: string | undefined;
  [key: string]: string | number | CategoryChild[] | undefined | null;
  children: CategoryChild[];
}

// Type for the entire categories array
export type Categories = MainCategory[];

export type IntentType = "primary" | "info" | "success" | "warning" | "danger";

export type SliderItemType = {
  id?: number;
  subTitle?: string;
  title: string;
  description?: string;
  linkImage: string | null | StaticImport;
  linkProduct: string;
  price: number;
};

export type CreateCategoryData = {
  mainCategory?: {
    [key: string]: string;
  };
  imageUrlMain?: string[] | StaticImageData;
  images?: string[] | string;
  categoryChildName?: {
    [key: string]: string[];
  };
  metaTitle?: {
    [key: string]: string;
  };
  metaTag?: {
    [key: string]: string;
  };
  metaDescription?: {
    [key: string]: string;
  };
};
interface SubCategory {
  id: number;
  name?: string;
}
export type CategoryType = {
  id: number;
  images?: File[];

  mainCategory: string | null; // Ensure this matches the transformed data
  metaTitle?: string | null;
  metaTag?: string | null;
  metaDescription?: string | null;
  children: SubCategory[];
};
export type FormDataCategory = {
  name: string;
  images?: File[];
  categoryName: string;
  metaTitle: string;
  metaTag: string;
  metaDescription: string;
  categoryChildName?: string[];
};
