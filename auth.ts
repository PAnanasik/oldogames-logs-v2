import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/app/libs/prismadb";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
