// "use client"

// import {
//   MAKE_CABLE,
//   MAKE_LV_SWITCHGEAR,
//   MAKE_MOTORS,
//   MAKE_PANEL_ENCLOSURE,
//   MAKE_PLC,
//   MAKE_SOFT_STARTER,
//   MAKE_VFD_VSD,
// } from "configs/api-endpoints"

// import { useDropdownOptions } from "hooks/useDropdownOptions"

// export default function useMakeOfComponentDropdowns() {
//   let { dropdownOptions: motorsMakeOptions } = useDropdownOptions(`${MAKE_MOTORS}?fields=["*"]`, "motors")
//   if (motorsMakeOptions.length !== 0) {
//     let NaOptions = motorsMakeOptions.filter((item: any) => item.name === "NA")
//     motorsMakeOptions = motorsMakeOptions.filter((item: any) => item.name !== "NA")
//     motorsMakeOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: cableMakeOptions } = useDropdownOptions(`${MAKE_CABLE}?fields=["*"]`, "cable")
//   if (cableMakeOptions.length !== 0) {
//     let NaOptions = cableMakeOptions.filter((item: any) => item.name === "NA")
//     cableMakeOptions = cableMakeOptions.filter((item: any) => item.name !== "NA")
//     cableMakeOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: lv_switchgearOptions } = useDropdownOptions(
//     `${MAKE_LV_SWITCHGEAR}?fields=["*"]`,
//     "lv_switchgear"
//   )
//   if (lv_switchgearOptions.length !== 0) {
//     let NaOptions = lv_switchgearOptions.filter((item: any) => item.name === "NA")
//     lv_switchgearOptions = lv_switchgearOptions.filter((item: any) => item.name !== "NA")
//     lv_switchgearOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: panel_enclosureOptions } = useDropdownOptions(
//     `${MAKE_PANEL_ENCLOSURE}?fields=["*"]`,
//     "panel_enclosure"
//   )
//   if (panel_enclosureOptions.length !== 0) {
//     let NaOptions = panel_enclosureOptions.filter((item: any) => item.name === "NA")
//     panel_enclosureOptions = panel_enclosureOptions.filter((item: any) => item.name !== "NA")
//     panel_enclosureOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: vfd_vsdOptions } = useDropdownOptions(`${MAKE_VFD_VSD}?fields=["*"]`, "vfd_vsd")
//   if (vfd_vsdOptions.length !== 0) {
//     let NaOptions = vfd_vsdOptions.filter((item: any) => item.name === "NA")
//     vfd_vsdOptions = vfd_vsdOptions.filter((item: any) => item.name !== "NA")
//     vfd_vsdOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: soft_starterOptions } = useDropdownOptions(`${MAKE_SOFT_STARTER}?fields=["*"]`, "soft_starter")
//   if (soft_starterOptions.length !== 0) {
//     let NaOptions = soft_starterOptions.filter((item: any) => item.name === "NA")
//     soft_starterOptions = soft_starterOptions.filter((item: any) => item.name !== "NA")
//     soft_starterOptions.push(NaOptions[0])
//   }

//   let { dropdownOptions: plcMakeOptions } = useDropdownOptions(`${MAKE_PLC}?fields=["*"]`, "plc")
//   if (plcMakeOptions.length !== 0) {
//     let NaOptions = plcMakeOptions.filter((item: any) => item.name === "NA")
//     plcMakeOptions = plcMakeOptions.filter((item: any) => item.name !== "NA")
//     plcMakeOptions.push(NaOptions[0])
//   }

//   return {
//     motorsMakeOptions,
//     cableMakeOptions,
//     lv_switchgearOptions,
//     panel_enclosureOptions,
//     vfd_vsdOptions,
//     soft_starterOptions,
//     plcMakeOptions,
//   }
// }

"use client"

import {
  MAKE_CABLE,
  MAKE_LV_SWITCHGEAR,
  MAKE_MOTORS,
  MAKE_PANEL_ENCLOSURE,
  MAKE_PLC,
  MAKE_SOFT_STARTER,
  MAKE_VFD_VSD,
} from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"

// Define the structure of the dropdown option
interface DropdownOption {
  id: number // or string, depending on your data structure
  name: string
  label: string
  value: string
}

// Function to move "NA" options to the end of the array
const moveNAtoEnd = (options: DropdownOption[]): DropdownOption[] => {
  const naOptions = options.filter((item) => item.name === "NA")
  const filteredOptions = options.filter((item) => item.name !== "NA")

  // If there are NA options, add them to the end
  return naOptions.length > 0 ? [...filteredOptions, ...naOptions] : filteredOptions
}

// Main hook to fetch dropdown options for different components
export default function useMakeOfComponentDropdowns() {
  const endpoints = [
    { endpoint: MAKE_MOTORS, key: "motors", name: "motorsMake" },
    { endpoint: MAKE_CABLE, key: "cable", name: "cableMake" },
    { endpoint: MAKE_LV_SWITCHGEAR, key: "lv_switchgear", name: "lv_switchgear" },
    { endpoint: MAKE_PANEL_ENCLOSURE, key: "panel_enclosure", name: "panel_enclosure" },
    { endpoint: MAKE_VFD_VSD, key: "vfd_vsd", name: "vfd_vsd" },
    { endpoint: MAKE_SOFT_STARTER, key: "soft_starter", name: "soft_starter" },
    { endpoint: MAKE_PLC, key: "plc", name: "plcMake" },
  ]

  // Object to hold dropdown options for each component
  const dropdownOptions: Record<string, DropdownOption[]> = {}

  endpoints.forEach(({ endpoint, key, name }) => {
    const { dropdownOptions: options } = useDropdownOptions(`${endpoint}?fields=["*"]`, key)
    dropdownOptions[`${name}Options`] = moveNAtoEnd(options)
  })

  return dropdownOptions
}
