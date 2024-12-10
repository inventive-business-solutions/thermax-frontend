"use server"
import { adminApiClient, getApiClient } from "./axios-clients"

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

// Fetch documents
export const getData = async (url: string) => {
  try {
    const response = await adminApiClient.get(url)
    return response.data.data
  } catch (error: any) {
    handleAPIError(error)
  }
}

// Create a new document
export const createData = async (url: string, useAdminClient: boolean, data: any) => {
  let apiClient = await getApiClient()
  if (useAdminClient) {
    apiClient = adminApiClient
  }
  try {
    const response = await apiClient.post(url, data)
    return response.data.data
  } catch (error: any) {
    handleAPIError(error)
  }
}

// Update an existing document
export const updateData = async (url: string, useAdminClient: boolean, data: any) => {
  let apiClient = await getApiClient()
  if (useAdminClient) {
    apiClient = adminApiClient
  }
  try {
    const response = await apiClient.put(url, data)
    return response.data.data
  } catch (error: any) {
    handleAPIError(error)
  }
}

// Delete a document
export const deleteData = async (url: string, useAdminClient: boolean) => {
  let apiClient = await getApiClient()
  if (useAdminClient) {
    apiClient = adminApiClient
  }
  try {
    await apiClient.delete(url)
  } catch (error: any) {
    if (error.response?.status === 404) {
      return
    }
    handleAPIError(error)
  }
}

export const downloadFile = async (url: string, useAdminClient: boolean, data: any) => {
  let apiClient = await getApiClient()
  if (useAdminClient) {
    apiClient = adminApiClient
  }

  try {
    const response = await apiClient.post(url, data, {
      responseType: "arraybuffer", // Expect binary data
    })

    // Return binary data and headers
    return {
      data: response.data, // Binary content
      headers: response.headers, // Response headers
    }
  } catch (error: any) {
    handleAPIError(error)
  }
}


export const downloadFrappeCloudFile = async (url: string) => {
  try {
    const response = await adminApiClient.get(url, {
      responseType: "arraybuffer",
    })
 
    // Return binary data and headers
    return {
      data: response.data, // Binary content
      headers: response.headers, // Response headers
    }
  } catch (error: any) {
    handleAPIError(error)
  }
}