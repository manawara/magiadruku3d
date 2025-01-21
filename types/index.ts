import { type ReactNode } from "react";

export type SupportedLocale = "pl" | "en";

export type ChildrenType = {
  children: ReactNode;
};

// Interface for the nested child category
export interface CategoryChild {
  id?: number;
  name: string;
  children?: CategoryChild[]; // Optional nested children
}

// Interface for the main category
export interface MainCategory {
  id: number;
  [key: string]: string | number | CategoryChild[] | undefined;
  children: CategoryChild[];
}

// Type for the entire categories array
export type Categories = MainCategory[];
