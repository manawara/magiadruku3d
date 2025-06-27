"use server";

import db from "@/lib/db";

type LocalizedString = {
  pl: string;
  en: string;
};

export type AddBannerMainType = {
  title: LocalizedString | string;
  subTitle: LocalizedString | string;
  price: number;
  status: string;
  order: number;
  linkProduct: string;
  linkImage: string;
  discount: number;
};
export const addBannerMain = async (data: AddBannerMainType) => {
  const result = await db.bannerMain.create({
    data,
  });

  // Prisma zwraca Decimal — trzeba to zamienić na plain object
  return {
    ...result,
  };
};

export const getBanners = async () => {
  const result = await db.bannerMain.findMany();
  return result;
};

export const deleteBanner = async (id: number) => {
  const deleteItem = await db.bannerMain.delete({
    where: { id },
  });

  return deleteItem;
};

export const getBannerByID = async (id: number) => {
  return await db.bannerMain.findUnique({
    where: { id },
  });
};

export const getBannerByOrder = async (order: number) => {
  return await db.bannerMain.findMany({
    where: {
      order,
      status: "active",
    },
    orderBy: {
      id: "asc", // lub inne sortowanie
    },
  });
};

export const updateBannerByID = async (data: any) => {
  return await db.bannerMain.update({
    data,
    where: { id: data.id },
  });
};
