import { NextResponse } from "next/server"
import { auth } from "auth"
import {
  BTG,
  COMPLETE_PROJECT_PAGE,
  DASHBOARD_PAGE,
  HOME_PAGE,
  PACKAGE_PAGE,
  PROJECTS_PAGE,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  UNAUTHORIZED,
  UNVERIFIED,
  USER_MANAGEMENT_PAGE,
} from "configs/constants"

export default auth((req) => {
  const pathname = req?.nextUrl?.pathname
  const signInURL = new URL(SIGN_IN, req?.url)

  // Define public routes
  const publicRoutes = [SIGN_IN, SIGN_UP, RESET_PASSWORD, UNAUTHORIZED, UNVERIFIED, HOME_PAGE]

  // Allow access to public routes without further checks
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if req is undefined or req.auth is null
  if (!req || !req.auth) {
    return NextResponse.redirect(signInURL)
  }

  const { userInfo } = req.auth as any
  if (userInfo.division === BTG && !pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(USER_MANAGEMENT_PAGE, req.url))
  }

  if (!userInfo.is_superuser && pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGE, req.url))
  }
  // Define protected routes
  const protectedRoutes = [DASHBOARD_PAGE, PROJECTS_PAGE, PACKAGE_PAGE, COMPLETE_PROJECT_PAGE, USER_MANAGEMENT_PAGE]

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname) && !req.auth) {
    return NextResponse.redirect(signInURL)
  }

  // Allow access to public routes
  return NextResponse.next()
})

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
