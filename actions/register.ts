"use server"

import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import * as z from "zod"
import { BTG_SUPERUSER, NEXT_PUBLIC_BASE_URL } from "configs/constants"
import { SignUpSchema } from "configs/schemas"
import { adminApiClient } from "./axios-clients"
import { CREDENTIALS_EMAIL_API, EMAIL_VERIFICATION_API, NEXT_AUTH_USER_API, USER_API } from "configs/api-endpoints"

interface ErrorResponse {
  message: string
  type: string
  status: number
}

export const generateSimplePassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let password = ""

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

  return password
}

const handleAPIError = (error: any) => {
  if (error.isAxiosError) {
    throw new Error(
      JSON.stringify({
        message: error.response?.data?.errors[0]?.message || "Not able to catch error",
        type: error.response?.data?.errors[0]?.type || "Unknown error type",
        status: error.response?.status,
      })
    )
  } else {
    throw new Error(
      JSON.stringify({
        message: "Error is not related to axios",
        type: "Non-Axios error",
        status: "500",
      })
    )
  }
}

export const checkUserExists = async (email: string) => {
  try {
    const user = await adminApiClient.get(`${USER_API}/${email}`)
    return !!user.data
  } catch (error: any) {
    return handleAPIError(error)
  }
}

export const checkNextAuthUserExists = async (email: string): Promise<boolean> => {
  try {
    const user = await adminApiClient.get(`${NEXT_AUTH_USER_API}/${email}`)
    return !!user.data
  } catch (error: any) {
    return handleAPIError(error)
  }
}

export const createFrappeUser = async (email: string, first_name: string, last_name: string, role: string) => {
  await adminApiClient.post(USER_API, {
    email,
    first_name,
    last_name,
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

export const createNextAuthUser = async (email: string, hashedPassword: string, token: string) => {
  try {
    await adminApiClient.post(NEXT_AUTH_USER_API, {
      linked_user: email,
      hashed_password: hashedPassword,
      email_verification_token: token,
      email_verified: false,
    })
  } catch (error) {
    throw error
  }
}

export const sendUserVerificationEmail = async (
  email: string,
  division_name: string,
  sent_by: string,
  token: string
) => {
  try {
    await adminApiClient.post(EMAIL_VERIFICATION_API, {
      email,
      division_name,
      verification_link: `${NEXT_PUBLIC_BASE_URL}/auth/verify-account?token=${token}`,
      sent_by,
    })
  } catch (error) {
    throw error
  }
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

export const registerBTGUser = async (values: any) => {
  const { email, first_name, last_name } = values

  try {
    const userExists = await checkUserExists(email)
    if (userExists) {
      return {
        message: "User already exists",
        type: "UserExistsError",
        status: 409,
      }
    }
  } catch (error: any) {
    const errObj: any = JSON.parse(error.message)
    if (errObj.type === "DoesNotExistError" && errObj.status === 404) {
      await createFrappeUser(email, first_name, last_name, BTG_SUPERUSER)
      await createFrappeApiKeys(email)
      const token = uuid()
      try {
        const hashedPassword = await bcrypt.hash("Admin", 10)
        await createNextAuthUser(email, hashedPassword, token)
      } catch (error) {
        throw error
      }
      try {
        await sendUserVerificationEmail(email, "BTG", "Team BTG", token)
      } catch (error) {
        throw error
      }
      return {
        message: "User created successfully",
        type: "UserCreated",
        status: 201,
      }
    }
  }
}

export const sendCredentialsEmail = async (email: string, sent_by: string) => {
  try {
    const system_generated_password = await generateSimplePassword()
    const hashed_password = await bcrypt.hash(system_generated_password, 10)
    await adminApiClient.patch(`${NEXT_AUTH_USER_API}/${email}`, {
      email_verified: true,
      hashed_password,
    })
    await adminApiClient.post(CREDENTIALS_EMAIL_API, {
      email,
      password: system_generated_password,
      sent_by,
    })
  } catch (error) {
    throw error
  }
}
