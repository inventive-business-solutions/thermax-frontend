export const createDropdownOptions = (data: any) => {
  if (!data) return []
  return data.map((item: any) => {
    return {
      ...item,
      value: item.name,
      label: item.name,
    }
  })
}
