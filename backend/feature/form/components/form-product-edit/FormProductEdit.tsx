"use client";
import Card from "@/backend/components/card/Card";
import React, { useEffect, useState } from "react";
import FormHeading from "../form-heading/FormHeading";
import { useLocale, useTranslations } from "next-intl";
import FileUpload from "@/backend/components/file-upload/FileUpload";
import { useForm } from "react-hook-form";
import { uploadImage } from "@/lib/cloudinary";
import Button from "@/backend/components/button/Button";
import placeholderIcon from "@/public/placeholder.jpg";
import Input from "@/backend/components/input/Input";
import Select from "@/backend/components/select/Select";
import SpinWithText from "@/backend/components/loading/components/spin-with-text/SpinWithText";
import { getCategory } from "@/app/action/category";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import CheckboxColor from "@/backend/components/checkbox-color/CheckboxColor";
import {
  ALLOWED_HTML_ATTRS,
  ALLOWED_HTML_TAGS,
  TAG_OPTIONS,
} from "@/lib/constans";
import Editor from "react-simple-wysiwyg";
import DOMPurify from "dompurify";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaProductTypeEdit } from "@/types/zod";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";
import { convertTargetLang } from "@/lib/helper";
import { ProductType, updatedProduct } from "@/app/action/product";

export interface Product {
  id: number;
  productName: string;
  images?: string | string[] | null;
  categoryName?: string;
  categoryChildName?: string;
  brand: string;
  size: string;
  weight: number;
  stock: number;
  tag: string;
  colors: string[];
  description: string;
  price: number;
  discount: number;
  tex: number;
}

interface FormData {
  images: File | null;
  [key: string]: any;
}
type ContentEditableEvent = {
  target: {
    name?: string;
    value: string;
  };
};

const FormProductEdit = ({ product }: { product: Product }) => {
  const [files, setFiles] = useState<File | undefined>();
  const [editorContent, setEditorContent] = useState("");
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  // Dodaj stan dla kontrolowania powiadomień
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  console.log(product);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(product.categoryName ?? null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    product.categoryChildName ?? null
  );
  const locale = useLocale();

  const {
    productName,
    images,
    brand,
    size,
    weight,
    stock,
    tag,
    colors,
    categoryName,
    description,
    price,
    discount,
    tex,
  } = product;

  useEffect(() => {
    setEditorContent(description);
  }, [description]);

  const t = useTranslations("Backend.formEditProduct");
  const tg = useTranslations("Backend.general");
  const tp = useTranslations("Backend.formProductAdd");
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["categorySelect", locale],
    queryFn: () => getCategory(locale),
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      images: null,
      productName,
      weight,
      size,
      brand,
      stock,
      colors,
      description,
      categoryName,
      price,
      discount,
      tex,
      tag,
    },
    resolver: zodResolver(schemaProductTypeEdit),
  });

  if (categoryLoading) return <SpinWithText text="Loading" />;

  const categories =
    categoryData?.map((el) => ({
      id: el.id,
      name: el.mainCategory ?? "",
      children:
        el.children?.map((child) => ({
          id: child.id,
          name: child.name,
        })) || [],
    })) || [];

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

  const handleFileRemove = (removed: File | string) => {
    if (typeof removed === "string") {
      setRemovedImages((prev) => [...prev, removed]);
    }
    if (removed instanceof File && files === removed) {
      setFiles(undefined);
      setValue("images", null, { shouldValidate: true });
    }
  };

  const handleTagChange = (name: string) => {
    setValue("tag", name, { shouldValidate: true });
  };

  const handleEditorChange = (e: ContentEditableEvent) => {
    const newValue = e.target.value;
    setEditorContent(newValue);
    setValue("description", newValue, { shouldValidate: true });
  };

  const onSubmit = async (formData: FormData) => {
    // Reset wszystkich stanów powiadomień
    setHasError(false);
    setShowSuccess(false);
    setIsUpdating(true);

    try {
      const sanitizedDescription = DOMPurify.sanitize(editorContent, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ALLOWED_HTML_TAGS,
        ALLOWED_ATTR: ALLOWED_HTML_ATTRS,
      });
      console.log(formData);
      let finalImageUrls: string[] = [];
      const placeholderUrl = placeholderIcon.src;

      const currentImages = images
        ? Array.isArray(images)
          ? images
          : [images]
        : [];

      const remainingImages = currentImages.filter(
        (url) => !removedImages.includes(url)
      );

      finalImageUrls = [...remainingImages];

      if (files) {
        const uploadedUrl = await uploadImage(files, "");
        finalImageUrls.push(uploadedUrl);
      }

      if (finalImageUrls.length === 0) {
        finalImageUrls.push(placeholderUrl);
      }

      const convertedDataLang = await convertTargetLang(
        {
          categoryName: selectedMainCategory,
          categoryChildName: selectedSubCategory,
          description: sanitizedDescription,
          productName: formData.productName,
          tag: formData.tag,
        },
        locale
      );

      if (convertedDataLang) {
        const finalData = {
          id: product.id,
          ...formData,
          ...convertedDataLang,
          images: finalImageUrls,
        };

        await updatedProduct(finalData as ProductType);

        // Ustaw sukces tylko po pomyślnej aktualizacji
        setIsUpdating(false); // Zatrzymaj loading
        setShowSuccess(true);

        // Auto-hide success po 3 sekundach
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);

        setTimeout(() => {
          reset(undefined, { keepValues: true });
        }, 0);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setIsUpdating(false); // Zatrzymaj loading
      setHasError(true);

      // Auto-hide error po 3 sekundach
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  const initialUrls = images ? (Array.isArray(images) ? images : [images]) : [];

  if (!product) return <div>Produkt nie został znaleziony</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <FormHeading title={`${t("titleEdit")} ${productName}`} />
          <FileUpload
            label={tg("labelUpload")}
            name="images"
            register={register as any}
            errors={errors as any}
            initialUrls={initialUrls}
            onChange={handleFileChange}
            onRemove={handleFileRemove}
            multiple
            setValue={setValue as any}
          />
        </Card>

        <Card>
          <div className="flex flex-col px-4 py-4">
            <Input label={tp("productName")} {...register("productName")} />
            <div className="flex  gap-4 py-4">
              <Select
                className="w-1/2"
                sortOptions={categories}
                label={tg("category")}
                value={selectedMainCategory ?? ""}
                onChange={(value) => {
                  setSelectedMainCategory(value);
                  setSelectedSubCategory(null); // Resetuj subkategorię
                }}
              />

              <Select
                className="w-1/2"
                sortOptions={
                  categories.find((cat) => cat.name === selectedMainCategory)
                    ?.children ?? []
                }
                label={tg("subCategory")}
                value={selectedSubCategory ?? ""}
                onChange={(value) => {
                  setSelectedSubCategory(value);
                }}
              />
            </div>

            {/* Basic Fields */}
            <div className="flex gap-4 px-4 py-2">
              <div className="w-1/3">
                <Input
                  label={tp("weight")}
                  {...register("weight", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder={tp("weight")}
                />
                {errors.weight && (
                  <ErrorMessage message={errors.weight.message as string} />
                )}
              </div>

              <div className="w-1/3">
                <Input
                  label={tp("size")}
                  {...register("size")}
                  placeholder={tp("size")}
                />
                {errors.size && (
                  <ErrorMessage message={errors.size.message as string} />
                )}
              </div>

              <div className="w-1/3">
                <Input
                  label={tp("brand")}
                  {...register("brand")}
                  placeholder={tp("brandName")}
                />
                {errors.brand && (
                  <ErrorMessage message={errors.brand.message as string} />
                )}
              </div>
            </div>

            {/* Tag, Stock, Colors */}
            <div className="flex items-center gap-4 px-4 mt-4 ">
              <div className="w-1/3 relative top-0 left-0">
                <Select
                  id="product-tag"
                  sortOptions={TAG_OPTIONS[locale]}
                  label={tp("selectTag")}
                  defaultValue={
                    TAG_OPTIONS[locale].find((el) => el.key === tag)?.name
                  }
                  onChange={handleTagChange}
                />
                {errors.tag && (
                  <div>
                    <ErrorMessage message={errors.tag.message as string} />
                  </div>
                )}
              </div>
              <div className="w-1/3">
                <Input
                  label={tp("stock")}
                  {...register("stock", { valueAsNumber: true })}
                  min={1}
                  type="number"
                  placeholder={tp("quantity")}
                />
                {errors.stock && (
                  <ErrorMessage message={errors.stock.message as string} />
                )}
              </div>
              <div className="w-1/3">
                <CheckboxColor
                  {...register("colors")}
                  setValue={setValue}
                  label={tp("color")}
                  defaultValue={colors}
                />
                {errors.colors && (
                  <ErrorMessage message={errors.colors.message as string} />
                )}
              </div>
            </div>
            {/* Description */}
            <div className="mt-4 px-4 pb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {tp("productDescription")}
              </label>
              <Editor
                value={editorContent || description}
                onChange={handleEditorChange}
              />
              {errors.description && (
                <ErrorMessage message={errors.description.message as string} />
              )}
            </div>
          </div>
        </Card>
        {/* Pricing */}
        <Card>
          <FormHeading title={tp("pricingDetails")} />
          <div className="flex gap-6 p-4">
            <div className="w-1/3">
              <Input
                type="number"
                placeholder="0 zł"
                label={tp("price")}
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
                label={tp("discount")}
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
                label={tp("tex")}
                {...register("tex", { valueAsNumber: true })}
              />
              {errors.tex && (
                <ErrorMessage message={errors.tex.message as string} />
              )}
            </div>
          </div>
        </Card>
        <Button
          variant="basic"
          colorFill="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? tg("updating") : tg("update")}
        </Button>
      </form>

      <Notyfi
        isSubmitSuccessful={showSuccess}
        isSubmitting={isUpdating}
        hasError={hasError}
        successMessage={tp("success")}
        pendingMessage={tp("pendingMessage")}
        errorMessage={tp("errorMessage")}
        autoClose={3000}
      />
    </div>
  );
};

export default FormProductEdit;
