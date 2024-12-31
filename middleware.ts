// import { NextResponse } from "next/server"
// import { auth } from "auth"
// import {
//   BTG,
//   COMPLETE_PROJECT_PAGE,
//   DASHBOARD_PAGE,
//   PACKAGE_PAGE,
//   PROJECTS_PAGE,
//   USER_MANAGEMENT_PAGE,
// } from "configs/constants"

// export default auth((req) => {
//   if (!req.auth) {
//     return NextResponse.next()
//     // return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }
//   const { userInfo } = req.auth as any
//   const pathname = req.nextUrl.pathname
//   if (userInfo.division === BTG && !pathname.includes(USER_MANAGEMENT_PAGE)) {
//     return NextResponse.redirect(new URL(USER_MANAGEMENT_PAGE, req.url))
//   }

//   if (!userInfo.is_superuser && pathname.includes(USER_MANAGEMENT_PAGE)) {
//     return NextResponse.redirect(new URL(DASHBOARD_PAGE, req.url))
//   }
//   // Define protected routes
//   const protectedRoutes = [DASHBOARD_PAGE, PROJECTS_PAGE, PACKAGE_PAGE, COMPLETE_PROJECT_PAGE, USER_MANAGEMENT_PAGE]

//   // Check if the user is authenticated. If auth is null then the user is not authenticated
//   const isAuthenticated = !!req.auth

//   // Redirect unauthenticated users trying to access protected routes
//   if (protectedRoutes.includes(pathname) && !isAuthenticated) {
//     return NextResponse.redirect(new URL("auth/sign-in", req.url))
//   }

//   // Allow access to public routes
//   return NextResponse.next()
// })

// // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


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
  const pathname = req.nextUrl.pathname

  // Allow unauthenticated access only to sign-in page
  if (pathname === "/auth/sign-in") {
    return NextResponse.next()
  }

  // Require authentication for all other routes
  if (!req.auth) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url))
  }

  const { userInfo } = req.auth as any

  // Handle BTG users
  if (userInfo.division === BTG && !pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(USER_MANAGEMENT_PAGE, req.url))
  }

  // Handle non-superuser access to user management
  if (!userInfo.is_superuser && pathname.includes(USER_MANAGEMENT_PAGE)) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGE, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
