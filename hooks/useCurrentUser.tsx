"use client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { SIGN_IN, SYSTEM_MANAGER } from "configs/constants"

export const useCurrentUser = () => {
  const session = useSession()

  return session.data?.userInfo
}

export const useGetCurrentUserRole = () => {
  const router = useRouter()
  const session = useSession()
  let roles = session.data?.userInfo?.roles
  if (!roles) {
    router.push(SIGN_IN)
  }
  roles = roles?.filter((role: any) => role.role !== SYSTEM_MANAGER)?.map((role: any) => role.role)
  return roles
}

export const useIsUserVerified = () => {
  const { data, status } = useSession()
  return { emailVerified: data?.userInfo?.email_verified, status }
}
