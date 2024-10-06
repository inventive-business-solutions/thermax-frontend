"use server"

import { auth } from "auth"

export const getUserRoles = async () => {
  const session = await auth()
  const roles = session?.userInfo?.roles
  return roles.map((role: any) => role.role)
}
