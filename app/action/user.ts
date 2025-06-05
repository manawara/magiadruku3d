"use server";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DASHBOARD_REDIRECT } from "@/routes";
import db from "@/lib/db";
import { schemaFormLogin, schemaFormRegister } from "@/types/zod";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const loginUser = async (values: z.infer<typeof schemaFormLogin>) => {
  const t = await getTranslations("login");
  const validatedFields = schemaFormLogin.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: t("invalidFields"),
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: t("wrongCredentials"),
    };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DASHBOARD_REDIRECT,
    });
    return { success: t("success") };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: t("wrongCredentials") };
        default:
          return { error: t("somethingWentWrong") };
      }
    }
    throw error;
  }
};
export const addNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  const addUser = db.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return addUser;
};

export const createUser = async (
  values: z.infer<typeof schemaFormRegister>
) => {
  const t = await getTranslations("register");

  const validatedFields = schemaFormRegister.safeParse(values);
  if (validatedFields.success) {
    const { email, name, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: t("accountExists") };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await addNewUser(name, email, hashedPassword);
    return { success: t("success") };
  }
  return null;
};
