export const createDropdownOptions = (data: any, dropdownKey: string) => {
  console.log("dropdownKey", dropdownKey, data)
  if (!data) return []
  return data.map((item: any) => {
    return {
      ...item,
      value: item[dropdownKey],
      label: item[dropdownKey],
    }
  })
}
