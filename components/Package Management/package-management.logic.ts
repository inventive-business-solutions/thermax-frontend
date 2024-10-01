export const createDropdownOptions = (data: any, dropdownKey: string) => {
  if (!data) return []
  return data.map((item: any) => {
    return {
      ...item,
      value: item[dropdownKey],
      label: item[dropdownKey],
    }
  })
}
