import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  BTG,
  COMPLETE_PROJECT_PAGE,
  DASHBOARD_PAGE,
  PACKAGE_PAGE,
  PROJECTS_PAGE,
  SIGN_IN,
  USER_MANAGEMENT_PAGE,
} from "@/configs/constants";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const publicRoutes = ["/auth"];
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!req.auth) {
    return NextResponse.redirect(new URL(SIGN_IN, req.url));
  }

  const { userInfo } = req.auth as any;

  if (userInfo.division === BTG && !pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(USER_MANAGEMENT_PAGE, req.url));
  }

  if (!userInfo.is_superuser && pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGE, req.url));
  }

  // Define protected routes
  const protectedRoutes = [
    DASHBOARD_PAGE,
    PROJECTS_PAGE,
    PACKAGE_PAGE,
    COMPLETE_PROJECT_PAGE,
    USER_MANAGEMENT_PAGE,
  ];

  // Check if the pathname includes any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route)
  );

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !req.auth) {
    return NextResponse.redirect(new URL(SIGN_IN, req.url));
  }

  // Allow access to public routes
  return NextResponse.next();
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
