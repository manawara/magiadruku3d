"use client";
import React from "react";
import Card from "@/backend/components/card/Card";
import { useLocale, useTranslations } from "next-intl";
import Input from "@/backend/components/input/Input";
import Select from "@/backend/components/select/Select";
import { useForm } from "react-hook-form";
import Button from "@/backend/components/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMainSchema } from "@/types/zod";
import { z } from "zod";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import { convertTargetLang } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBannerMain, AddBannerMainType } from "@/app/action/mainBanner";
import { Notyfi } from "@/backend/feature/notyfi/components/Notyfi/Notyfi";

const FormMainBannerAdd = () => {
  const locale = useLocale();
  const t = useTranslations("Backend.mainBanner");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isValid,
      isSubmitted,
    },
  } = useForm({
    resolver: zodResolver(formMainSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      price: 0,
      status: "",
      order: 0,
      linkProduct: "",
      linkImage: "",
      discount: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formMainSchema>) =>
      addBannerMain(data as AddBannerMainType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
  const onSubmit = async (formData: z.infer<typeof formMainSchema>) => {
    const toTranslate = {
      title: formData.title,
      subTitle: formData.subTitle,
    };

    const dataConverted = await convertTargetLang(toTranslate, locale);

    const dataToSent = {
      ...formData,
      ...dataConverted,
    };
    mutation.mutate(dataToSent);
  };

  return (
    <div>
      <Card className="p-4">
        <h1>{t("titleHeadingAdd")}</h1>
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
              {!isSubmitting ? t("add") : t("adding")}
            </Button>
          </div>
        </form>
      </Card>
      <Notyfi
        isSubmitting={isSubmitting && isValid}
        isSubmitSuccessful={isSubmitSuccessful && !isSubmitting && isValid}
        hasError={isSubmitted && !isValid}
        successMessage={t("addedBanner")}
        errorMessage={t("errorAddedBanner")}
        pendingMessage={t("pendingMessageBanner")}
      />
    </div>
  );
};

export default FormMainBannerAdd;
