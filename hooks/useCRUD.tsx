import useSWR from "swr"
import { getData } from "actions/crud-actions"

// Hook for reading documents
export const useGetData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, getData)

  return { data, error, isLoading }
}
