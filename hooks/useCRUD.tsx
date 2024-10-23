import useSWR from "swr"
import { getData } from "actions/crud-actions"

// Hook for reading documents
export const useGetData = (url: string, useAdminClient: boolean) => {
  const { data, error, isLoading } = useSWR(url, () => getData(url, useAdminClient), {
    refreshInterval: 5000
  })

  return { data, error, isLoading }
}
