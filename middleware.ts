import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, protectedRoute, authRoutes } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  //   const isLoggedIn = !!req.auth;
  //   console.log("ROUTE: ", req.nextUrl.pathname);
  //   console.log("IS LOGGEDIN: ", isLoggedIn);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(protectedRoute, nextUrl));
    }
  }

  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
