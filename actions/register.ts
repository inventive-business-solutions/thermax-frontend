"use server"

import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid"
import {
  CREDENTIALS_EMAIL_API,
  DIVISION_API,
  EMAIL_VERIFICATION_API,
  NEXT_AUTH_USER_API,
  THERMAX_USER_API,
  USER_API,
} from "configs/api-endpoints"
import { NEXT_PUBLIC_BASE_URL } from "configs/constants"
import { adminApiClient } from "./axios-clients"
import { createData, getData, updateData } from "./crud-actions"

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
    const user = await getData(`${USER_API}/${email}`, true)
    return !!user.data
  } catch (error: any) {
    throw error
  }
}

export const checkNextAuthUserExists = async (email: string): Promise<boolean> => {
  try {
    const user = await getData(`${NEXT_AUTH_USER_API}/${email}`, true)
    return !!user.data
  } catch (error: any) {
    throw error
  }
}

export const createFrappeUser = async (email: string, first_name: string, last_name: string, role: string) => {
  try {
    await createData(USER_API, true, {
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
  } catch (error) {
    throw error
  }
}

export const createNextAuthUser = async (email: string, hashedPassword: string, token: string) => {
  try {
    await createData(NEXT_AUTH_USER_API, true, {
      linked_user: email,
      hashed_password: hashedPassword,
      email_verification_token: token,
      email_verified: false,
    })
  } catch (error) {
    throw error
  }
}

export const createThermaxExtendedUser = async (email: string, division: string) => {
  try {
    await createData(THERMAX_USER_API, true, {
      email,
      division,
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
    await createData(EMAIL_VERIFICATION_API, true, {
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
  try {
    const { data } = await adminApiClient.post(`/method/frappe.core.doctype.user.user.generate_keys?user=${email}`)
    const { api_secret } = data?.data
    return api_secret
  } catch (error) {
    handleAPIError(error)
  }
}

export const registerSuperuser = async (
  values: { email: string; first_name: string; last_name: string },
  superuser_role: string,
  division_name: string
) => {
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
      try {
        await createFrappeUser(email, first_name, last_name, superuser_role)
        await createFrappeApiKeys(email)
        const token = uuid()
        const hashedPassword = await bcrypt.hash("Admin", 10)
        await createNextAuthUser(email, hashedPassword, token)
        await createThermaxExtendedUser(email, division_name)
        await updateData(`${DIVISION_API}/${division_name}`, true, {
          division_superuser: email,
        })
        await sendUserVerificationEmail(email, division_name, `Team ${division_name}`, token)
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
    await updateData(`${NEXT_AUTH_USER_API}/${email}`, true, {
      email_verified: true,
      hashed_password,
    })
    await createData(CREDENTIALS_EMAIL_API, true, {
      email,
      password: system_generated_password,
      sent_by,
    })
  } catch (error) {
    throw error
  }
}
