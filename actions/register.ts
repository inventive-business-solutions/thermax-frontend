"use server"

import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import * as z from "zod"
import { NEXT_PUBLIC_BASE_URL } from "configs/constants"
import { SignUpSchema } from "configs/schemas"
import { adminApiClient } from "./axios-clients"

export const checkUserExists = async (email: string): Promise<boolean> => {
  try {
    const user = await adminApiClient.get(`/document/User/${email}`)
    return !!user.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false // User does not exist
    } else {
      throw error // Other errors are rethrown
    }
  }
}

export const checkNextAuthUserExists = async (email: string): Promise<boolean> => {
  try {
    const user = await adminApiClient.get(`/document/NextAuthUser/${email}`)
    return !!user.data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false // User does not exist
    } else {
      throw error // Other errors are rethrown
    }
  }
}

export const createFrappeUser = async (email: string, firstName: string, lastName: string, role: string) => {
  await adminApiClient.post("/document/User", {
    email,
    first_name: firstName,
    last_name: lastName,
    enabled: 1,
    roles: [
      {
        role: role,
      },
      {
        role: "System Manager",
      },
    ],
    send_welcome_email: 0,
  })
}

export const createNextAuthUser = async (email: string, hashedPassword: string) => {
  const token = uuid()
  await adminApiClient.post("/document/NextAuthUser", {
    linked_user: email,
    hashed_password: hashedPassword,
    email_verification_token: token,
    email_verified: false,
  })
  await adminApiClient.post(
    "/method/nextintegration.next_integration.doctype.nextauthuser.api.trigger_next_user_verification",
    {
      email: email,
      verification_link: `${NEXT_PUBLIC_BASE_URL}/auth/verify-account?token=${token}`,
      sent_by: "GCEK Placement Team",
    }
  )
}

export const createFrappeApiKeys = async (email: string) => {
  const { data } = await adminApiClient.post(`/method/frappe.core.doctype.user.user.generate_keys?user=${email}`)
  const { api_secret } = data?.data
  return api_secret
}

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const { email, password, firstName, lastName, role } = values

  try {
    // Check if the user exists
    const userExists = await checkUserExists(email)
    const nextAuthUserExists = await checkNextAuthUserExists(email)

    if (userExists && nextAuthUserExists) {
      return {
        status: "error",
        message: "ExistingUser",
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    if (userExists && !nextAuthUserExists && password) {
      await createNextAuthUser(email, hashedPassword)
    }

    if (!userExists) {
      await createFrappeUser(email, firstName, lastName, role)
      await createFrappeApiKeys(email)
      await createNextAuthUser(email, hashedPassword)
    }

    return {
      status: "success",
      message: "User created successfully",
    }

    // TODO: Send verification token email
  } catch (error: any) {
    console.error("Error during registration:", error.message)
    return {
      status: "error",
      message: "An error occurred during the registration process. Please try again later.",
    }
  }
}
