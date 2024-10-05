"use server"
import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import { NEXT_PUBLIC_BASE_URL } from "configs/constants"
import { convertToFrappeDatetime } from "utils/helpers"
import { adminApiClient } from "./axios-clients"
import { NEXT_AUTH_USER_API } from "configs/api-endpoints"

export const verifyEmailandGenerateToken = async (email: string) => {
  try {
    const response = await adminApiClient.get(`/document/User/${email}`)
    if (response.status !== 200) {
      return { status: "error", message: "User not found" }
    }
    const token = uuid()
    // Token will expire in 1 hour
    const expiresDatetime = new Date(Date.now() + 3600 * 1000)
    const expires = convertToFrappeDatetime(expiresDatetime)
    const updateResponse = await adminApiClient.patch(`/document/NextAuthUser/${email}`, {
      password_reset_token: token,
      expires_on: expires,
      is_valid: true,
    })
    if (updateResponse.status !== 200) {
      return { status: "error", message: "Failed to send verification email" }
    }
    const sendEmailResponse = await adminApiClient.post(
      "/method/nextintegration.next_integration.doctype.nextauthuser.api.trigger_next_reset_password",
      {
        email: email,
        reset_link: `${NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}`,
        sent_by: "Admin Team",
      }
    )
    if (sendEmailResponse.status !== 200) {
      return { status: "error", message: "Failed to send verification email" }
    }
    return { status: "success", message: "Token generated successfully", token }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { status: "error", message: "User not found" }
    }
    return { status: "error", message: "Something went wrong!" }
  }
}

export const verifyToken = async (token: string) => {
  const response = await adminApiClient.get(
    `/document/NextAuthUser?fields=["name","expires_on"]&filters=[["password_reset_token", "=", "${token}"]]`
  )
  if (response.status !== 200) {
    return { valid: false, email: "" }
  }
  const users = response.data.data
  if (users.length !== 1) {
    return { valid: false, email: "" }
  }
  const user = users[0]
  if (new Date(user.expires_on) < new Date()) {
    return { valid: false, email: "" }
  }
  return { valid: true, email: user.name }
}

export const verifyAccount = async (token: string) => {
  try {
    const response = await adminApiClient.get(
      `${NEXT_AUTH_USER_API}?fields=["name"]&filters=[["email_verification_token", "=", "${token}"]]`
    )

    const users = response.data.data
    if (users.length !== 1) {
      return { valid: false, email: "" }
    }
    const user = users[0]
    
    return { valid: true, email: user.name }
  } catch (error: any) {
    return { valid: false, email: "" }
  }
}

export const resetPassword = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const response = await adminApiClient.patch(`/document/NextAuthUser/${email}`, {
    hashed_password: hashedPassword,
    is_valid: false,
  })
  if (response.status !== 200) {
    return { status: "error", message: "Failed to reset password" }
  }
  return { status: "success", message: "Password reset successfully" }
}

export const isUserVerified = async (email: string) => {
  const response = await adminApiClient.get(`/document/NextAuthUser/${email}`)
  if (response.status !== 200) {
    return false
  }
  return Boolean(response.data.data.email_verified)
}
