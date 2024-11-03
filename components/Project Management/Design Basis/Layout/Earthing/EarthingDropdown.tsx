"use client"

import { EARTHING_SYSTEM } from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useEarthingDropdowns() {
  const { dropdownOptions: earthing_systemOptions } = useDropdownOptions(
    `${EARTHING_SYSTEM}?fields=["*"]`,
    "earthing_system"
  )
  const { dropdownOptions: earthing_stripOptions } = useDropdownOptions(
    `${EARTHING_SYSTEM}?fields=["*"]`,
    "earthing_system"
  )
  const { dropdownOptions: earthing_pitOptions } = useDropdownOptions(
    `${EARTHING_SYSTEM}?fields=["*"]`,
    "earthing_system"
  )

  return {
    earthing_pitOptions,
    earthing_systemOptions,
    earthing_stripOptions,
  }
}
