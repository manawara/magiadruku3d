"use server";

import db from "@/lib/db";
export type ProductType = {
  id?: number;
  brand: string;
  categoryChildName: string | Record<string, any>;
  categoryName: string | Record<string, any>;
  colors: string[];
  description: string | Record<string, any>;
  discount: number;
  images: string[] | string;
  price: number;
  productName: string | Record<string, any>;
  size: string;
  stock: number;
  tex: number;
  weight: number;
  tag: string | Record<string, any>;
};
export const productNewAdd = async (data: ProductType) => {
  try {
    await db.product.create({
      data: {
        ...data,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const getProductPagination = async (
  sortBy: "asc" | "desc" = "asc",
  limit = 10,
  page = 1
) => {
  try {
    const result = await db.product.findMany({
      skip: page,
      take: limit,
      orderBy: {
        id: sortBy,
      },
    });

    const total = await db.product.count();

    const serializedProducts = result.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return {
      products: serializedProducts,
      pagination: {
        total,
      },
    };
  } catch (error) {
    console.error("Error loading products:", error);
    throw new Error("Backend.errorLoadingProducts");
  }
};

export const getProductByID = async (id: number) => {
  try {
    const product = await db.product.findFirst({
      where: { id },
    });

    if (!product) return null;

    return {
      ...product,
      price: parseFloat(product.price.toFixed(2)), // Decimal -> number
      // Dodaj inne pola typu Decimal, jeśli istnieją
    };
  } catch (err) {
    console.error("Error loading product:", err);
    throw new Error("Backend.errorLoadingProduct");
  }
};

export const updatedProduct = async (data: ProductType) => {
  console.log(data);
  const {
    id,
    productName,
    categoryName,
    brand,
    categoryChildName,
    colors,
    description,
    discount,
    images,
    size,
    stock,
    tex,
    weight,
    price,
    tag,
  } = data;
  await db.product.update({
    where: { id: id },
    data: {
      productName,
      categoryName,
      brand,
      categoryChildName,
      colors,
      description,
      discount,
      images,
      size,
      stock,
      tex,
      weight,
      price,
      tag,
    },
  });
};

export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: { id },
  });
};
