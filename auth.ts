import NextAuth, { DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    id?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, // Ensure authConfig is fully initialized before spreading
  session: { strategy: "jwt", maxAge: 86400 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role;
        session.user.id = token.id || "";
      }
      return session;
    },
  },
});
