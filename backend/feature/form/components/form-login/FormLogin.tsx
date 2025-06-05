"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/backend/components/button/Button";
import Heading from "@/backend/components/heading/Heading";
import Input from "@/backend/components/input/Input";
import Link from "next/link";
import { schemaFormLogin } from "@/types/zod";
import { loginUser } from "@/app/action/user";
import ErrorMessage from "@/backend/components/error-message/ErrorMessage";

type FormLoginType = {
  email: string;
  password: string;
};
const FormLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaFormLogin),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FormLoginType) => {
    setLoading(true);
    const user = await loginUser(data);

    if (user) {
      setError(user.error || "");
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col p-8" onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h2" size="xxl" weight="semi" className="text-center mb-4">
        Login to your account
      </Heading>
      <div className="relative">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Email address"
              label="Email"
              {...field}
              type="email"
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
      <Link
        href="./forgot-password"
        className="text-sm text-primaryBackend-500 ml-auto mt-2"
      >
        Forgot Password
      </Link>
      <div className="relative">
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder="Password"
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

        {error && (
          <ErrorMessage message={error} className="absolute -bottom-5" />
        )}
      </div>
      <Button
        variant="basic"
        colorFill="primary"
        size="full"
        className="mt-6"
        icon
      >
        {loading ? "Logging ..." : "Login in"}
      </Button>
    </form>
  );
};

export default FormLogin;
