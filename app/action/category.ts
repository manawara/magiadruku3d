"use server";

import db from "@/lib/db";
import { CreateCategoryData, CategoryType } from "@/types";
import placeholderImage from "@/public/placeholder.png";
// Function to delete a Category by ID
export const deletedCategory = async (id: number) => {
  try {
    // First, delete any related CategoryChild records to avoid foreign key constraints
    await db.categoryChild.deleteMany({
      where: {
        categoryId: id,
      },
    });

    // Finally delete the Category
    const deletedCategory = await db.category.delete({
      where: {
        id: id,
      },
    });

    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getCategory = async (locale: string): Promise<CategoryType[]> => {
  const category = await db.category.findMany({
    include: {
      children: true,
    },
  });

  const mappedCategory = category.map(
    ({ id, mainCategory, imageUrlMain, children }) => {
      const parsedMainCategory =
        typeof mainCategory === "string"
          ? JSON.parse(mainCategory)
          : mainCategory;

      const mappedChildren = children.map((child) => {
        const parsedName =
          typeof child.name === "string" ? JSON.parse(child.name) : child.name;
        return {
          id: child.id,
          name: parsedName[locale],
        };
      });

      return {
        id,
        mainCategory: parsedMainCategory[locale],
        images: imageUrlMain,
        children: mappedChildren,
      };
    }
  );

  return mappedCategory;
};

export const createCategory = async (
  data: CreateCategoryData
): Promise<void> => {
  const {
    mainCategory = "",
    images = "",
    categoryChildName,
    metaTitle,
    metaTag,
    metaDescription,
  } = data;

  // Parse categoryName into a JSON object
  await db.category.create({
    data: {
      mainCategory, // Pass the parsed JSON object
      imageUrlMain: Array.isArray(images) ? images[0] : images, // Pass the stringified array
      metaTitle: metaTitle,
      metaTag: metaTag,
      metaDescription: metaDescription,
      children: {
        create: [
          {
            name: categoryChildName ?? { pl: [""], en: [""] }, // Łączymy subkategorie w jeden obiekt JSON
          },
        ],
      },
    },
  });
};

export const getCategoryPagination = async (sortBy: "asc" | "desc" = "asc") => {
  const result = await db.category.findMany({
    take: 10,
    orderBy: {
      mainCategory: sortBy,
    },
  });

  return result;
};

export const getCategoryByID = async (id: number) => {
  return await db.category.findFirst({
    include: {
      children: true,
    },
    where: {
      id: id,
    },
  });
};

interface UpdateCategoryData {
  id?: number;
  mainCategory: { [key: string]: string };

  imageUrls?: string[];
  subCategories?: Record<string, string[]>; // Change type to Record<string, string[]>
  categoryChildName?: Record<string, string[]>;
  metaTitle?: { [key: string]: string };
  metaTag?: { [key: string]: string };
  metaDescription?: { [key: string]: string };
}
export async function updateCategory(data: UpdateCategoryData) {
  try {
    const updatedCategory = await db.category.update({
      where: { id: data.id },
      data: {
        mainCategory: data.mainCategory,
        imageUrlMain:
          data.imageUrls?.[data.imageUrls.length - 1] || placeholderImage.src,
        metaTitle: data.metaTitle || undefined,
        metaTag: data.metaTag || undefined,
        metaDescription: data.metaDescription || undefined,
        children: {
          deleteMany: {}, // Usuń istniejące dzieci
          create: [
            {
              name: data.categoryChildName ?? {}, // Łączymy subkategorie w jeden obiekt JSON
            },
          ],
        },
      },
      include: { children: true },
    });

    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}
