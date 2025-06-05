"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import FormHeading from "../form-heading/FormHeading";
import Card from "@/backend/components/card/Card";
import FileUpload from "@/backend/components/file-upload/FileUpload";
import SpinLoader from "@/backend/components/loading/components/spin/Spin";
import DynamicInput from "@/backend/components/dynamic-input/DynamicInput";
import Input from "@/backend/components/input/Input";

import { getCategoryByID, updateCategory } from "@/app/action/category";
import { uploadImage } from "@/lib/cloudinary";
import { convertTargetLang, getLocalizedValue } from "@/lib/helper";
import SpinWithText from "@/backend/components/loading/components/spin-with-text/SpinWithText";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryEditFormType } from "@/types/zod";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";

// Define form data structure
interface CategoryType {
  [key: string]: any; // Allow dynamic fields
  mainCategory: string;
  images: File | null;
  subCategories?: string[];
  metaTitle?: string;
  metaTag?: string;
  metaDescription?: string;
}

// Define the structure needed for the updateCategory function
interface CreateCategoryData {
  mainCategory: { [key: string]: string };
  categoryChildName: { [key: string]: string[] };
  metaTitle: { [key: string]: string };
  metaTag: { [key: string]: string };
  metaDescription: { [key: string]: string };
  imageUrls?: string[];
  subCategories?: Record<string, string[]>;
  id?: number;
}

const FormCategoryEdit = () => {
  const [files, setFiles] = useState<File>();
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [convertedData, setConvertedData] = useState<any>();
  const [categoryChildOptions, setCategoryChildOptions] = useState<
    { name: string; id: number; value: number }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const params = useParams();
  const id = parseInt(params.id as string);
  const locale = useLocale();
  const t = useTranslations("Backend.formCategoryEdit");

  // Placeholder image URL
  const placeholderUrl = "/placeholder.jpg"; // Adjust if necessary to the correct path

  // Fetch single category by ID
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categoryID", id],
    queryFn: () => getCategoryByID(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(categoryEditFormType),
    defaultValues: {
      metaDescription: "",
    },
  });

  // Handle file upload
  const handleFileChange = (uploadedFiles: (string | File | null)[]): void => {
    const firstFile = uploadedFiles.find((f): f is File => f instanceof File);
    if (firstFile) {
      setFiles(firstFile);
      setValue("images", firstFile, { shouldValidate: true });
    } else {
      setFiles(undefined);
      setValue("images", null, { shouldValidate: true });
    }
  };

  // Handle file removal (mark image URLs for deletion)
  const handleFileRemove = (removed: File | string) => {
    if (typeof removed === "string") {
      setRemovedImages((prev) => [...prev, removed]);
    }
  };

  // Populate form when data is fetched
  useEffect(() => {
    if (data) {
      const { children, ...rest } = data;

      // Localize main category data
      const localizedData = Object.entries(rest).reduce((acc, [key, value]) => {
        acc[key] = getLocalizedValue(value, locale);
        return acc;
      }, {} as Record<string, any>);

      // Prepare child categories for select & DynamicInput
      if (children && children.length > 0) {
        const childOptions = children.map((child) => ({
          name: getLocalizedValue(child.name, locale),
          id: child.id,
          value: child.id,
        }));

        const childNames = children.map((child) =>
          getLocalizedValue(child.name, locale)
        );

        setCategoryChildOptions(childOptions);
        setValue("subCategories", childNames);
      }

      setConvertedData(localizedData);
      reset({ ...localizedData });
    }
  }, [data, reset, locale, setValue]);

  // Submit handler
  const onSubmit = async (formData: CategoryType) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      let finalImageUrls: string[] = [];

      // Keep existing images not marked for removal
      const currentImages = convertedData?.imageUrlMain
        ? [convertedData.imageUrlMain]
        : [];

      const remainingImages = currentImages.filter(
        (url) => !removedImages.includes(url)
      );

      finalImageUrls = [...remainingImages];

      // If no new image added and images were removed, use placeholder
      if (remainingImages.length === 0 && files === undefined) {
        finalImageUrls.push(placeholderUrl);
      }

      // Upload new image if provided
      if (files) {
        const uploadedUrl = await uploadImage(files, "");
        finalImageUrls.push(uploadedUrl);
      }

      // Prepare subcategories for update
      const currentSubCategories = getValues("subCategories") || [];

      // Create language-specific object for each field
      const finalData: CreateCategoryData = {
        id: id, // Add the ID to the payload
        mainCategory: { [locale]: formData.mainCategory || "" },
        categoryChildName: { [locale]: currentSubCategories }, // Use subcategories here
        metaTitle: { [locale]: formData.metaTitle || "" },
        metaTag: { [locale]: formData.metaTag || "" },
        metaDescription: { [locale]: formData.metaDescription || "" },
      };

      // Add image URLs to final data
      finalData.imageUrls =
        finalImageUrls.length > 0 ? finalImageUrls : [placeholderUrl];

      try {
        // Get translated data for all fields
        const convertedDataLang = await convertTargetLang(
          {
            mainCategory: formData.mainCategory || "",
            metaTitle: formData.metaTitle || "",
            metaTag: formData.metaTag || "",
            metaDescription: formData.metaDescription || "",
            subCategories: currentSubCategories,
          },
          locale
        );

        // Merge translated data with the final data
        if (convertedDataLang.mainCategory) {
          finalData.mainCategory = convertedDataLang.mainCategory;
        }
        if (convertedDataLang.metaTitle) {
          finalData.metaTitle = convertedDataLang.metaTitle;
        }
        if (convertedDataLang.metaTag) {
          finalData.metaTag = convertedDataLang.metaTag;
        }
        if (convertedDataLang.metaDescription) {
          finalData.metaDescription = convertedDataLang.metaDescription;
        }
        if (convertedDataLang.subCategories) {
          finalData.categoryChildName = convertedDataLang.subCategories;
        }
      } catch (translationError) {
        console.error("Translation error:", translationError);
        // Continue with submission using only source language data
        console.log("Continuing with source language data only");
      }

      // Submit data to database
      console.log("Final data to update:", finalData);

      // Update category
      await updateCategory(finalData);

      // Refetch data to sync UI
      await refetch();

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating category:", err);
      setSubmitError("Error updating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <SpinLoader />;

  const subcategoryNames = categoryChildOptions.map((option) => option.name);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image upload */}
        <Card>
          <FormHeading
            title={`${t("title")} ${
              !isLoading ? getLocalizedValue(data?.mainCategory, locale) : ""
            }`}
          />
          <div className="px-4 pb-4">
            <FileUpload
              label="Upload Images"
              name="images"
              register={register as any}
              setValue={setValue as any}
              errors={errors as any}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
              multiple={false}
              initialUrls={data?.imageUrlMain ? [data.imageUrlMain] : []}
            />
          </div>
        </Card>
        {/* Main category & subcategories */}
        <Card>
          <FormHeading title={t("titleCategory")} />
          <div className="px-4 py-4">
            <Input
              label={t("categoryName")}
              {...register("mainCategory")}
              defaultValue={convertedData?.mainCategory}
            />
            <ErrorMessage message={errors.mainCategory?.message as string} />

            <DynamicInput
              reset={false}
              name="subCategories"
              label={t("addCategory")}
              setValue={setValue}
              register={register}
              initialValues={subcategoryNames}
            />
          </div>
        </Card>
        {/* Meta information */}
        <Card>
          <FormHeading title={t("metaOptionsTitle")} />
          <div className="px-4 py-4">
            <div className="pb-2">
              <Input {...register("metaTitle")} label={t("metaTitle")} />
              <ErrorMessage message={errors.metaTitle?.message as string} />
            </div>
            <div className="pb-2">
              <Input {...register("metaTag")} label="Meta tag" />
              <ErrorMessage message={errors.metaTag?.message as string} />
            </div>
            <div>
              <Input
                {...register("metaDescription")}
                label={t("metaDescription")}
              />
              <ErrorMessage
                message={errors.metaDescription?.message as string}
              />
            </div>
          </div>
        </Card>
        {/* Success notification */}
        <Notyfi
          isSubmitSuccessful={submitSuccess}
          isSubmitting={isSubmitting}
          successMessage={t("updateSuccess")}
          pendingMessage={t("pendingMessage")}
          hasError={!!submitError}
          errorMessage={submitError || ""}
          options={{ position: "center" }}
        />
        {/* Submit button */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded`}
          >
            {isSubmitting ? (
              <SpinWithText text={t("updating")} />
            ) : (
              t("updateButton")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCategoryEdit;
