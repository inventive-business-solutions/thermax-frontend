import { NextResponse } from "next/server"
import { auth } from "auth"
import {
  BTG,
  COMPLETE_PROJECT_PAGE,
  DASHBOARD_PAGE,
  PACKAGE_PAGE,
  PROJECTS_PAGE,
  USER_MANAGEMENT_PAGE,
} from "configs/constants"

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.next()
  }
  const { userInfo } = req.auth as any
  const pathname = req.nextUrl.pathname
  if (userInfo.division === BTG && !pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(USER_MANAGEMENT_PAGE, req.url))
  }
  // Define protected routes
  const protectedRoutes = [DASHBOARD_PAGE, PROJECTS_PAGE, PACKAGE_PAGE, COMPLETE_PROJECT_PAGE, USER_MANAGEMENT_PAGE]

  // Check if the user is authenticated. If auth is null then the user is not authenticated
  const isAuthenticated = !!req.auth

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("auth/sign-in", req.url))
  }

  // Allow access to public routes
  return NextResponse.next()
})

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
