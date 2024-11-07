import useSWR from "swr"
import { getData } from "actions/crud-actions"
import { useEffect } from "react"

// Hook for reading documents
export const useGetData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, () => getData(url), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  })

  useEffect(() => {
    if (error) {
      console.error(`Error fetching data from ${url}:`, error)
    }
  }, [error, url])

  return { data, error, isLoading }
}
