import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, protectedRoute, authRoutes } from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthRoute = authRoutes.includes(request.url);

  // if (!isAuthRoute) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
