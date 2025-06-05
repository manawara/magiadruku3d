"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/backend/components/button/Button";
import Heading from "@/backend/components/heading/Heading";
import Input from "@/backend/components/input/Input";
import { schemaFormRegister } from "@/types/zod";
import { createUser } from "@/app/action/user";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";
import SuccessMessage from "@/backend/components/success-message/SuccessMessage";

type FormRegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const FormRegister = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schemaFormRegister),
  });
  const onSubmit = async (data: FormRegisterType) => {
    setLoading(true);
    const user = await createUser(data);
    if (user?.success) {
      setError("");
      setSuccess(user.success);
      reset();
    } else {
      setSuccess("");

      setError(user?.error as string);
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col p-8 gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h2" size="xxl" weight="semi" className="text-center mb-4">
        Create account in dashboard
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                placeholder="Full Name"
                label="Name"
                {...field}
                type="text"
              />
            )}
          />
          {errors.name?.message && (
            <ErrorMessage
              message={errors.name.message}
              className="absolute -bottom-4"
            />
          )}
        </div>

        <div className="relative">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                placeholder="Email"
                label="Email Address"
                {...field}
                type="text"
              />
            )}
          />
          {errors.email?.message && (
            <ErrorMessage
              message={errors.email.message}
              className="absolute -bottom-4"
            />
          )}
        </div>
      </div>
      <div className="relative">
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Current Password"
              label="Password"
              {...field}
              type="password"
            />
          )}
        />
        {errors.password?.message && (
          <ErrorMessage
            message={errors.password.message}
            className="absolute -bottom-4"
          />
        )}
      </div>

      <div className="relative">
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Confirm Password"
              label="Confirm Password"
              {...field}
              type="password"
            />
          )}
        />
        {errors.confirmPassword?.message && (
          <ErrorMessage
            message={errors.confirmPassword.message}
            className="absolute -bottom-4"
          />
        )}
        {error && (
          <ErrorMessage message={error} className="absolute -bottom-6" />
        )}
        {success && (
          <SuccessMessage message={success} className="absolute -bottom-6" />
        )}
      </div>

      <Button
        variant="basic"
        colorFill="primary"
        size="full"
        className="mt-6"
        icon
      >
        {loading ? "Registering" : "Register"}
      </Button>
    </form>
  );
};

export default FormRegister;
