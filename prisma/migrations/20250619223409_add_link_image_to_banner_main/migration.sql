-- CreateEnum
CREATE TYPE "Status" AS ENUM ('inactive', 'active');

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Carrier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerMain" (
    "id" SERIAL NOT NULL,
    "title" JSONB NOT NULL,
    "subTitle" JSONB NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "linkProduct" TEXT NOT NULL,
    "linkImage" TEXT,
    "discount" INTEGER NOT NULL,
    "images" TEXT NOT NULL,

    CONSTRAINT "BannerMain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_name_key" ON "Carrier"("name");
