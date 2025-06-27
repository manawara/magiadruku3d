"use client";
import { updateBannerByID } from "@/app/action/mainBanner";
import Button from "@/backend/components/button/Button";
import Card from "@/backend/components/card/Card";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import Input from "@/backend/components/input/Input";
import Select from "@/backend/components/select/Select";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";
import { convertTargetLang } from "@/lib/helper";
import { formMainSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormMainBannerFieldsType = {
  id: number; // <-- dodaj
  title: string;
  subTitle: string;
  price: number;
  status: string;
  order: number;
  linkProduct: string;
  linkImage: string;
  discount: number;
};
type FormMainBannerEditType = FormMainBannerFieldsType & {
  locale: string;
};
const FormMainBannerEdit = ({
  id,
  title,
  subTitle,
  locale,
  price,
  status,
  order,
  linkProduct,
  linkImage,
  discount,
}: FormMainBannerEditType) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<FormMainBannerFieldsType>({
    defaultValues: {
      id,
      title,
      subTitle,
      price,
      status,
      order,
      linkProduct,
      linkImage,
      discount,
    },
    resolver: zodResolver(formMainSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formMainSchema>) =>
      updateBannerByID(data as FormMainBannerFieldsType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
  const t = useTranslations("Backend.mainBanner");

  const onSubmit = async (FormData: FormMainBannerFieldsType) => {
    if (!FormData) return;
    const convertLang = await convertTargetLang(
      { title: FormData.title, subTitle: FormData.subTitle },
      locale
    );
    const dataForm = {
      ...FormData,
      ...convertLang,
      id,
    };
    mutation.mutate(dataForm);
  };
  return (
    <Card className="p-4">
      <h1 className="text-lg ">
        {t("titleHeadingEdit")} <span className="font-semibold">{title}</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
          <div className="relative">
            <Input
              label={t("titleForm")}
              placeholder={t("placeholderTitle")}
              {...register("title")}
            />
            {errors.title && (
              <ErrorMessage
                message={errors.title.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={t("subTitleForm")}
              placeholder={t("placeholderSubTitle")}
              {...register("subTitle")}
            />
            {errors.subTitle && (
              <ErrorMessage
                message={errors.status?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={t("priceForm")}
              placeholder={t("placeholderPrice")}
              type="number"
              {...register("price")}
            />
            {errors.price && (
              <ErrorMessage
                message={errors.price?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Select
              defaultValue={status}
              sortOptions={[
                { id: 1, name: t("active"), value: "active" },
                { id: 1, name: t("inactive"), value: "inactive" },
              ]}
              label="Wybierz status"
              onChange={(_, __, value) =>
                setValue("status", value as string, { shouldValidate: true })
              }
            />
            {errors.status && (
              <ErrorMessage
                message={errors.status?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Select
              defaultValue={order}
              sortOptions={[
                { id: 1, name: "1", value: 1 },
                { id: 2, name: "2", value: 2 },
                { id: 3, name: "3", value: 3 },
              ]}
              onChange={(_, __, value) =>
                setValue("order", value as number, { shouldValidate: true })
              }
              label={t("orderForm")}
            />
            {errors.order && (
              <ErrorMessage
                message={errors.order?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={t("linkForm")}
              placeholder={t("placeholderLink")}
              {...register("linkProduct")}
            />
            {errors.linkProduct && (
              <ErrorMessage
                message={errors.linkProduct?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={t("linkImageForm")}
              placeholder={t("placeholderLinkImage")}
              {...register("linkImage")}
            />
            {errors.linkImage && (
              <ErrorMessage
                message={errors.linkImage?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={t("discountForm")}
              placeholder={t("placeholderDiscount")}
              {...register("discount")}
            />
            {errors.discount && (
              <ErrorMessage
                message={errors.discount?.message as string}
                className="absolute -bottom-5"
              />
            )}
          </div>
        </div>
        <div className="mt-7">
          <Button variant="basic" colorFill="primary">
            {!isSubmitting ? t("update") : t("updating")}
          </Button>
        </div>
      </form>

      <Notyfi
        isSubmitting={isSubmitting && isValid}
        isSubmitSuccessful={isSubmitSuccessful && !isSubmitting && isValid}
        hasError={isSubmitted && !isValid}
        successMessage={t("updatedBanner")}
        errorMessage={t("errorAddedBanner")}
        pendingMessage={t("pendingMessageBannerEdit")}
      />
    </Card>
  );
};

export default FormMainBannerEdit;
