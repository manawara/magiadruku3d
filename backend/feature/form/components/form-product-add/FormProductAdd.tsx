"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";

import FormHeading from "../form-heading/FormHeading";
import Card from "@/backend/components/card/Card";
import FileUpload from "@/backend/components/file-upload/FileUpload";
import Button from "@/backend/components/button/Button";
import Input from "@/backend/components/input/Input";
import Select from "@/backend/components/select/Select";
import SpinWithText from "@/backend/components/loading/components/spin-with-text/SpinWithText";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import CheckboxColor from "@/backend/components/checkbox-color/CheckboxColor";
import Editor from "react-simple-wysiwyg";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";

import { useLocale, useTranslations } from "next-intl";
import { getCategory } from "@/app/action/category";
import { productNewAdd, ProductType } from "@/app/action/product";
import { uploadImage } from "@/lib/cloudinary";
import { convertTargetLang } from "@/lib/helper";
import {
  ALLOWED_HTML_ATTRS,
  ALLOWED_HTML_TAGS,
  TAG_OPTIONS,
} from "@/lib/constans";
import { schemaProductType } from "@/types/zod";

interface ProductFormDataType {
  productName: string;
  brand: string;
  size: string;
  weight: number;
  images: File[];
  categoryChildName: string | string[];
  categoryName: string;
  description: string;
  tag: string;
  stock: number;
  colors: string[];
  price: number;
  tex: number;
  discount: number;
}

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  children: SubCategory[];
}

type ContentEditableEvent = {
  target: {
    name?: string;
    value: string;
  };
};

const FormProductAdd = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const locale = useLocale();
  const t = useTranslations("Backend.formProductAdd");
  const tG = useTranslations("Backend.general");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ProductFormDataType>({
    defaultValues: {
      brand: "magiadruku3d",
      images: [],
      weight: 0,
      categoryName: "",
      categoryChildName: "",
      stock: 1,
      tex: 23,
      price: 0,
      discount: 0,
    },
    resolver: zodResolver(schemaProductType),
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["categorySelect", locale],
    queryFn: () => getCategory(locale),
  });

  if (categoryLoading) return <SpinWithText text="Loading" />;

  const categories: Category[] =
    categoryData?.map((el) => ({
      id: el.id,
      name: el.mainCategory ?? "",
      children:
        el.children
          ?.filter((child) => child.name !== undefined)
          .map((child) => ({
            id: child.id,
            name: child.name as string,
          })) || [],
    })) || [];

  const handleFileChange = (uploadedFiles: (string | File | null)[]) => {
    const onlyFiles = uploadedFiles.filter(
      (file): file is File => file instanceof File
    );
    setFiles(onlyFiles);
    setValue("images", onlyFiles);
  };

  const handleTagChange = (name: string) => {
    const tagSelect = TAG_OPTIONS[locale].find((el) => el.name === name);

    setValue("tag", tagSelect?.key || "no_tag", { shouldValidate: true });
  };

  const handleCategoryChange = (name: string) => {
    setSelectedSubCategory("");
    setValue("categoryChildName", "");
    setSubCategories([]);
    setValue("categoryName", name);

    const category = categories.find((el) => el.name === name);
    setSubCategories(category?.children || []);
  };

  const handleSubCategoryChange = (
    _name: string,
    _id: number,
    value: string | number
  ) => {
    const subCatName = value as string;
    setSelectedSubCategory(subCatName);
    setValue("categoryChildName", subCatName, { shouldValidate: true });
  };

  const handleEditorChange = (e: ContentEditableEvent) => {
    const newValue = e.target.value;
    setEditorContent(newValue);
    setValue("description", newValue, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<ProductFormDataType> = async (formData) => {
    const sanitizedDescription = DOMPurify.sanitize(editorContent, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: ALLOWED_HTML_TAGS,
      ALLOWED_ATTR: ALLOWED_HTML_ATTRS,
    });
    setIsLoading(true);
    setHasError(false);

    const uploadedUrls: string[] = [];

    try {
      // Upload images
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadImage(file, "magia3d");
          uploadedUrls.push(url);
        }
      }

      const subcategoryValue =
        formData.categoryChildName || selectedSubCategory || "";

      // Convert text to target language
      const convertedData = await convertTargetLang(
        {
          categoryName: formData.categoryName,
          productName: formData.productName,
          categoryChildName: subcategoryValue,
          description: sanitizedDescription,
        },
        locale
      );

      // Prepare product data with proper types
      const productData = {
        brand: formData.brand,
        size: formData.size,
        weight: formData.weight,
        stock: formData.stock,
        colors: formData.colors || [""],
        price: formData.price,
        tex: formData.tex,
        discount: formData.discount,
        images: uploadedUrls,
        categoryName: convertedData.categoryName,
        productName: convertedData.productName,
        categoryChildName: convertedData.categoryChildName || subcategoryValue,
        tag: formData.tag,
        description: convertedData.description,
      };

      await productNewAdd(productData as ProductType);
    } catch (error) {
      console.error("Submit error:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Photo Upload */}
        <Card>
          <FormHeading title={t("titlePhoto")} />
          <div className="px-4">
            <FileUpload
              label={tG("labelUpload")}
              multiple
              register={register}
              name="images"
              setValue={setValue}
              errors={errors}
              onChange={handleFileChange}
            />
          </div>
        </Card>

        {/* Product Details */}
        <Card>
          <div className="flex flex-col gap-1 px-4">
            <Input
              label={t("productName")}
              {...register("productName")}
              name="productName"
              placeholder={t("itemsName")}
            />
            {errors.productName && (
              <ErrorMessage message={errors.productName.message as string} />
            )}
          </div>

          {/* Category & Subcategory */}
          <div className="px-4 mt-4">
            <Select
              label="Kategoria"
              sortOptions={categories}
              onChange={handleCategoryChange}
              defaultValue=""
            />
            {errors.categoryName && (
              <ErrorMessage message={errors.categoryName.message as string} />
            )}

            {subCategories.length > 0 && (
              <div className="mt-4">
                <Select
                  sortOptions={subCategories}
                  label="Subkategoria"
                  {...register("categoryChildName")}
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                />
                {errors.categoryChildName && (
                  <ErrorMessage
                    message={errors.categoryChildName.message as string}
                  />
                )}
              </div>
            )}
          </div>

          {/* Basic Fields */}
          <div className="flex gap-4 px-4 py-2">
            <div className="w-1/3">
              <Input
                label={t("weight")}
                {...register("weight", { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder={t("weight")}
              />
              {errors.weight && (
                <ErrorMessage message={errors.weight.message as string} />
              )}
            </div>

            <div className="w-1/3">
              <Input
                label={t("size")}
                {...register("size")}
                placeholder={t("size")}
              />
              {errors.size && (
                <ErrorMessage message={errors.size.message as string} />
              )}
            </div>

            <div className="w-1/3">
              <Input
                label={t("brand")}
                {...register("brand")}
                placeholder={t("brandName")}
              />
              {errors.brand && (
                <ErrorMessage message={errors.brand.message as string} />
              )}
            </div>
          </div>

          {/* Tag, Stock, Colors */}
          <div className="flex items-center gap-4 px-4 mt-4">
            <div className="w-1/3">
              <Select
                id="product-tag"
                sortOptions={TAG_OPTIONS[locale]}
                label={t("selectTag")}
                defaultValue="no_tag"
                onChange={handleTagChange}
              />
              {errors.tag && (
                <ErrorMessage message={errors.tag.message as string} />
              )}
            </div>
            <div className="w-1/3">
              <Input
                label={t("stock")}
                {...register("stock", { valueAsNumber: true })}
                min={1}
                type="number"
                placeholder={t("quantity")}
              />
              {errors.stock && (
                <ErrorMessage message={errors.stock.message as string} />
              )}
            </div>
            <div className="w-1/3">
              <CheckboxColor
                {...register("colors")}
                setValue={setValue}
                label={t("color")}
              />
              {errors.colors && (
                <ErrorMessage message={errors.colors.message as string} />
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 px-4 pb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t("productDescription")}
            </label>
            <Editor value={editorContent} onChange={handleEditorChange} />
            {errors.description && (
              <ErrorMessage message={errors.description.message as string} />
            )}
          </div>
        </Card>

        {/* Pricing */}
        <Card>
          <FormHeading title={t("pricingDetails")} />
          <div className="flex gap-6 p-4">
            <div className="w-1/3">
              <Input
                type="number"
                placeholder="0 zł"
                label={t("price")}
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <ErrorMessage message={errors.price.message as string} />
              )}
            </div>
            <div className="w-1/3">
              <Input
                type="number"
                placeholder="0%"
                label={t("discount")}
                {...register("discount", { valueAsNumber: true })}
              />
              {errors.discount && (
                <ErrorMessage message={errors.discount.message as string} />
              )}
            </div>
            <div className="w-1/3">
              <Input
                type="number"
                placeholder="0%"
                label={t("tex")}
                {...register("tex", { valueAsNumber: true })}
              />
              {errors.tex && (
                <ErrorMessage message={errors.tex.message as string} />
              )}
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="px-4 py-4">
          <Button variant="basic" colorFill="primary" disabled={isSubmitting}>
            {isSubmitting ? tG("adding") : tG("add")}
          </Button>
        </div>
      </form>

      <Notyfi
        isSubmitSuccessful={isSubmitSuccessful}
        isSubmitting={isLoading}
        hasError={hasError}
        successMessage={t("success")}
        pendingMessage={t("pendingMessage")}
        errorMessage={t("errorMessage")}
        redirectTo="/dashboard/products/list"
        autoClose={3000}
      />
    </div>
  );
};

export default FormProductAdd;
