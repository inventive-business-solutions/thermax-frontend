"use client"
import { createDropdownOptions } from "components/Package Management/package-management.logic"
import { useGetData } from "./useCRUD"

export const useDropdownOptions = (url: string, dropdownKey: string) => {
  const { data, error, isLoading } = useGetData(url)
  const dropdownOptions = createDropdownOptions(data, dropdownKey)

  return { dropdownOptions, error, isLoading }
}