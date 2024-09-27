import useSWR, { mutate } from "swr"
import { createData, deleteData, getData, getOrCreateData, updateData } from "actions/crud-actions"
import { useState } from "react"
import { ApiError } from "configs/constants"

// Hook for reading documents
export const useGetData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, getData)

  return { data, error, isLoading }
}

// Custom hook to get or create data
export const useGetOrCreateData = (baseURL: string, id: string, createObject: any) => {
  const url = `${baseURL}/${id}`
  const { data, error, isLoading } = useSWR(url, async () => await getOrCreateData(baseURL, id, createObject))

  return { data, error, isLoading }
}

// Hook for creating a document
export const useCreateData = (url: string) => {
  const [error, setError] = useState<any>()
  const create = async (createObject: any) => {
    try {
      // Optimistically update the cache
      mutate(url, createObject, false)
      // Make the POST request
      await createData(url, createObject)
      // Revalidate the cache
      mutate(url)
    } catch (error: any) {
      setError(JSON.parse(error?.message))
    }
  }

  return { create, error }
}

// Hook for updating a document
export const useUpdateData = (url: string) => {
  const update = async (updateObject: any) => {
    try {
      // Optimistically update the cache
      mutate(url, updateObject, false)
      // Make the PUT request
      await updateData(url, updateObject)
      // Revalidate the cache
      mutate(url)
    } catch (error) {
      throw error
    }
  }

  return { update }
}

// Hook for deleting a document
export const useDeleteData = () => {
  const remove = async (url: string) => {
    try {
      // Make the DELETE request
      await deleteData(url)
      // Revalidate the cache
      mutate(url)
    } catch (error) {
      console.error("Error deleting document:", error)
    }
  }

  return { remove }
}
