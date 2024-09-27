"use client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { SIGN_IN } from "configs/constants"

export const useCurrentUser = () => {
  const session = useSession()

  return session.data?.userInfo
}

export const useGetCurrentUserRole = () => {
  const router = useRouter()
  const session = useSession()
  const roles = session.data?.userInfo?.roles
  if (!roles) {
    router.push(SIGN_IN)
  }
  return roles.map((role: any) => role.role)
}

export const useIsUserVerified = () => {
  const { data, status } = useSession()
  return { emailVerified: data?.userInfo?.email_verified, status }
}
