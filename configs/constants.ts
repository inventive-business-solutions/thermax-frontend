export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const SIGN_IN = "/auth/sign-in"
export const SIGN_UP = "/auth/sign-up"
export const RESET_PASSWORD = "/auth/reset-password"
export const UNAUTHORIZED = "/unauthorized"
export const UNVERIFIED = "/unverified"

export const HOME_PAGE = "/"
export const PROJECTS_PAGE = "/project"
export const PACKAGE_PAGE = "/package-management"
export const COMPLETE_PROJECT_PAGE = "/complete_project"
export const USER_MANAGEMENT_PAGE = "/user-management"

export class ApiError extends Error {
  statusCode: number
  errorType: string

  constructor(message: string, errorType: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.errorType = errorType
    this.name = "ApiError"
  }
}
