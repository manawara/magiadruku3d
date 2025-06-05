import { z } from "zod";

export const schemaFormLogin = z.object({
  email: z
    .string()
    .min(1, { message: "Required" })
    .email({ message: "This is not a valid email." }),
  password: z.string().min(1, { message: "Required" }),
});

export const schemaFormRegister = z
  .object({
    name: z.string().min(1, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .email({ message: "This is not a valid email." }),
    password: z.string().min(1, { message: "Required" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const categoryType = z.object({
  images: z
    .array(z.instanceof(File))
    .max(1, "Maximum 1 image allowed")
    .optional(),
  mainCategory: z.string().min(1, "Category name is required"),
  metaTitle: z.string().min(1, { message: "Meta Title is reqired" }),
  metaTag: z.string().min(1, { message: "Meta Tag is reqired" }),
  metaDescription: z
    .string()
    .min(3, { message: "Meta Description  is reqired" }),
  categoryChildName: z
    .array(
      z.string().min(3, {
        message: "Each category child name must be at least 3 letters",
      })
    )
    .optional(),
});

export const schemaProductType = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  categoryName: z.string().min(1, "Category name is required"),
  productName: z.string().min(1, "Product name is required"),
  tag: z.string().min(1, "Tag is required"),
  categoryChildName: z.string().min(1, "Product name is required"),
  colors: z.array(z.string()).optional().default([]),
  brand: z.string().optional(),
  weight: z.number().default(0),
  size: z.string().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),

  discount: z
    .number()
    .min(0)
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  tex: z.number().min(0, "Tex cannot be negative"),
});

export const categoryEditFormType = z
  .object({
    // Nazwa głównej kategorii - wymagana
    mainCategory: z.string().min(1, { message: "Category name is required." }),

    // Obrazy - albo plik, albo null/undefined (ale nie tablica)
    // Wykorzystujemy refine aby sprawdzić czy to dokładnie jeden plik
    images: z.any().optional(),

    // Podkategorie - tablica niepustych stringów
    subCategories: z
      .array(
        z.string().min(1, { message: "Subcategory name cannot be empty." })
      )
      .optional()
      .nullable()
      .default([])
      .refine(
        (arr) => {
          // Jeśli tablica nie istnieje, jest OK
          if (!arr) return true;
          // Sprawdź czy każdy element jest niepustym stringiem
          return arr.every(
            (item) => typeof item === "string" && item.trim().length > 0
          );
        },
        { message: "Subcategories cannot be empty" }
      ),

    metaTitle: z
      .string()
      .max(60, { message: "Meta title must be at most 60 characters." })
      .optional()
      .nullable()
      .default(""),

    metaTag: z
      .string()
      .max(160, { message: "Meta tag must be at most 160 characters." })
      .optional()
      .nullable()
      .default(""),

    metaDescription: z
      .string()
      .max(160, { message: "Meta description must be at most 160 characters." })
      .optional()
      .nullable()
      .default(""),
  })
  .passthrough();

export const schemaProductTypeEdit = z.object({
  images: z.any().optional(),

  categoryName: z.string().min(1, "Category name is required"),
  productName: z.string().min(1, "Product name is required"),
  tag: z.string().min(1, "Tag is required"),
  categoryChildName: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  brand: z.string().optional(),
  weight: z.number().default(0),
  size: z.string().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be greater than 0"),

  discount: z
    .number()
    .min(0)
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  tex: z.number().min(0, "Tex cannot be negative"),
});
