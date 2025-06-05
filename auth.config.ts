import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./app/action/user";
import { schemaFormLogin } from "./types/zod";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const { email, password } = await schemaFormLogin.parseAsync(
            credentials
          );

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return {
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
          } else {
            console.error("Authorization error:", error);
          }
          return null;
        }
      },
    }),
    {
      id: "furgonetka",
      name: "Furgonetka",
      type: "oauth",
      clientId: process.env.FURGONETKA_CLIENT_ID,
      clientSecret: process.env.FURGONETKA_CLIENT_SECRET,
      authorization: {
        url: "https://api.furgonetka.pl/oauth/authorize",
        params: {
          redirect_uri: process.env.FURGONETKA_REDIRECT_URI,
          scope: "offline_access packages",
          response_type: "code",
        },
      },
      token: {
        url: "https://api.furgonetka.pl/oauth/token",
      },
      userinfo: {
        url: "https://api.furgonetka.pl/v1/user",
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
};
