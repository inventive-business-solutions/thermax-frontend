import { useState } from "react"
import useSWR, { mutate } from "swr"
import { createData, deleteData, getData, getOrCreateData, updateData } from "actions/crud-actions"

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
