"use server";
import db from "../db";

export const getCategory = async (locale: string) => {
  const category = await db.category.findMany({
    include: {
      children: true, // Pobierz także podkategorie
    },
  });

  const mappedCategory = category.map(({ id, mainCategory, children }) => {
    // Ensure mainCategory is parsed correctly
    const parsedMainCategory =
      typeof mainCategory === "string"
        ? JSON.parse(mainCategory)
        : mainCategory;

    // Map children and ensure their names are parsed correctly
    const mappedChildren = children.map((child) => {
      const parsedName =
        typeof child.name === "string" ? JSON.parse(child.name) : child.name;
      return { name: parsedName[locale] };
    });

    return {
      id,
      mainCategory: parsedMainCategory[locale], // Use the correct locale
      children: mappedChildren,
    };
  });

  return mappedCategory;
};
