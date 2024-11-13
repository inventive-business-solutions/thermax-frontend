export const getFrappeDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getFrappeTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const convertToFrappeDatetime = (datetime: Date): string => {
  const expiresDate = getFrappeDate(datetime)
  const expiresTime = getFrappeTime(datetime)
  const expires = `${expiresDate} ${expiresTime}`
  return expires
}

export const mergeLists = (lists: any[][], relations: any[]) => {
  // Start with the first list as the base
  return lists.reduce((mergedList, currentList, index) => {
    if (index === 0) {
      return currentList // Start with the first list
    }

    const relation = relations[index - 1]
    const { fromKey, toKey } = relation

    // Create a Map from the current list for faster lookups
    const currentListMap = new Map(currentList?.map((item) => [item[toKey], item]))

    // Merge the current list with the accumulated merged list
    return mergedList
      ?.map((prevItem) => {
        const matchedItem = currentListMap.get(prevItem[fromKey])
        return matchedItem ? { ...prevItem, ...matchedItem } : null
      })
      .filter(Boolean) // Remove unmatched elements
  }, [])
}

export const changeNameToKey = (projectList: any[]) => {
  if (!projectList) return []
  projectList.forEach((project) => {
    project.key = project.name
  })
  return projectList
}

// to sort Numerically
export function sortDropdownOptions(options: any[]): any[] {
  return options.sort((a, b) => {
    if (!isNaN(a.name) && !isNaN(b.name)) {
      return Number(a.name) - Number(b.name)
    }
    return 0
  })
}

// to sort DateWise

export function sortDatewise(data: any[]): any[] {
  if (data && data.length !== 0) {
    data.sort((a: any, b: any) => {
      const dateA = new Date(a.creation)
      const dateB = new Date(b.creation)
      return dateB.getTime() - dateA.getTime()
    })
  }

  return data
}

// to place "NA" at the bottom
export function moveNAtoEnd(options: any[]): any[] {
  if (options?.length !== 0) {
    let NaOptions = options.filter((item: any) => item.name === "NA")
    options = options.filter((item: any) => item.name !== "NA")
    options.push(NaOptions[0])
  }

  return options
}
