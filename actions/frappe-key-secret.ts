"use server"
import { auth } from "auth"

export const getFrappeToken = async () => {
  const session = await auth()
  if (session && session.userInfo) {
    return `token ${session.userInfo.api_key}:${session.userInfo.api_secret}`
  }
  return ""
}
