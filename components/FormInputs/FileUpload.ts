import axios from "axios"

import FormData from "form-data"
import { getFrappeAdminToken, getFrappeBaseUrl } from "../../actions/frappe-key-secret"

export const uploadFile = async (file: File) => {
  const frappeToken = await getFrappeAdminToken()
  const frappeBaseUrl = await getFrappeBaseUrl()
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axios.post(`${frappeBaseUrl}/method/upload_file`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: frappeToken,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error // Optionally rethrow the error for handling upstream
  }
}
