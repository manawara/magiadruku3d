"use client";
import Card from "@/backend/components/card/Card";
import React, { useState } from "react";
import FormHeading from "../form-heading/FormHeading";
import { useLocale, useTranslations } from "next-intl";
import FileUpload from "@/backend/components/file-upload/FileUpload";
import { useForm } from "react-hook-form";
import Button from "@/backend/components/button/Button";
import Input from "@/backend/components/input/Input";
import DynamicInput from "@/backend/components/dynamic-input/DynamicInput";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import { convertTargetLang } from "@/lib/helper";
import { createCategory } from "@/app/action/category";
import { uploadImage } from "@/lib/cloudinary";
import placeholderImage from "@/public/placeholder.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryType } from "@/types/zod";
import { z } from "zod";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";

// Define the type based on the zod schema
type CategoryFormValues = z.infer<typeof categoryType>;

const FormCategoryAdd = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const t = useTranslations("Backend.formCategoryAdd");
  const tG = useTranslations("Backend.general");
  const locale = useLocale();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryType),
    defaultValues: {
      images: [],
      mainCategory: "",
      categoryChildName: [], // Changed from subCategories to match the type
      metaTitle: "",
      metaTag: "",
      metaDescription: "",
    },
  });

  const handleFileChange = (uploadedFiles: (string | File | null)[]): void => {
    const onlyFiles = uploadedFiles.filter(
      (file): file is File => file instanceof File
    );
    setFiles(onlyFiles);
    setValue("images", onlyFiles);
  };

  const onSubmit = async (formData: CategoryFormValues) => {
    try {
      const uploadedUrls: string[] = [];
      setIsLoading(true);
      setHasError(false);

      // Process image uploads
      for (const file of files) {
        if (file instanceof File) {
          const url = await uploadImage(file, "magia3d");
          uploadedUrls.push(url);
        }
      }

      const convertedDataLang = await convertTargetLang(
        {
          mainCategory: formData.mainCategory,
          metaTitle: formData.metaTitle || "",
          metaTag: formData.metaTag || "",
          metaDescription: formData.metaDescription || "",
          categoryChildName: formData.categoryChildName || [], // Changed from subCategories to categoryChildName
        },
        locale
      );

      const finalData = {
        ...convertedDataLang,
        images: uploadedUrls.length > 0 ? uploadedUrls : [placeholderImage.src],
      };

      await createCategory(finalData);
    } catch (err) {
      setIsLoading(false);
      setHasError(true);

      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Notyfi
        isSubmitSuccessful={isSubmitSuccessful}
        isSubmitting={isLoading}
        successMessage={t("success")}
        pendingMessage={t("pendingMessage")}
        errorMessage={t("errorMessage")} // Dodaj w tłumaczeniach
        hasError={hasError}
        options={{ position: "center" }}
        autoClose={2000}
        redirectTo="/dashboard/products/category/"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <FormHeading title={t("title")} />
          <div className="px-4">
            <FileUpload
              label={tG("labelUpload")}
              multiple={false}
              register={register}
              name="images"
              setValue={setValue}
              errors={errors}
              onChange={handleFileChange}
            />
          </div>
        </Card>
        <Card>
          <FormHeading title={t("titleCategory")} />
          <div className="px-4">
            <Input
              label={t("nameCategory")}
              {...register("mainCategory")}
              placeholder={t("placeholderNameCategory")}
            />
            <ErrorMessage message={errors.mainCategory?.message as string} />
            <DynamicInput
              reset={false}
              name="categoryChildName" // Changed from subCategories to categoryChildName
              label={t("addSubCategory")}
              setValue={setValue}
              register={register}
              initialValues={[]}
            />
            <ErrorMessage
              message={errors.categoryChildName?.message as string}
            />{" "}
            {/* Updated error reference */}
          </div>
        </Card>
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
        <Button
          variant="basic"
          colorFill="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? tG("adding") : tG("add")}
        </Button>
      </form>
    </div>
  );
};

export default FormCategoryAdd;
