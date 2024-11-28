"use client"

import {
  HAZARDOUS_BEARING_RTD,
  HAZARDOUS_BODY_MATERIAL,
  HAZARDOUS_CERTIFICATION,
  HAZARDOUS_EFFICIENCY_LEVEL,
  HAZARDOUS_ENCLOSURE_IP_RATING,
  HAZARDOUS_INSULATION_CLASS,
  HAZARDOUS_SPACE_HEATER,
  HAZARDOUS_TEMPERATURE_RISE,
  HAZARDOUS_TERMINAL_BOX_IP_RATING,
  HAZARDOUS_TERMINAL_BOX_MATERIAL,
  HAZARDOUS_WINDING_RTD,
  SAFE_BEARING_RTD,
  SAFE_BODY_MATERIAL,
  SAFE_EFFICIENCY_LEVEL,
  SAFE_ENCLOSURE_IP_RATING,
  SAFE_INSULATION_CLASS,
  SAFE_SPACE_HEATER,
  SAFE_TEMPERATURE_RISE,
  SAFE_TERMINAL_BOX_IP_RATING,
  SAFE_TERMINAL_BOX_MATERIAL,
  SAFE_THERMISTOR,
  SAFE_WINDING_RTD,
} from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"
import { sortDropdownOptions } from "utils/helpers"

export default function useMotorParametersDropdowns() {
  const { dropdownOptions: safeEfficiencyLevelOptions } = useDropdownOptions(
    `${SAFE_EFFICIENCY_LEVEL}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousEfficiencyLevelOptions } = useDropdownOptions(
    `${HAZARDOUS_EFFICIENCY_LEVEL}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeInsulationClassOptions } = useDropdownOptions(
    `${SAFE_INSULATION_CLASS}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousInsulationClassOptions } = useDropdownOptions(
    `${HAZARDOUS_INSULATION_CLASS}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeTempRiseOptions } = useDropdownOptions(`${SAFE_TEMPERATURE_RISE}?fields=["*"]`, "name")

  const { dropdownOptions: hazardousTempRiseOptions } = useDropdownOptions(
    `${HAZARDOUS_TEMPERATURE_RISE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeEnclosureIpRatingOptions } = useDropdownOptions(
    `${SAFE_ENCLOSURE_IP_RATING}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousEnclosureIpRatingOptions } = useDropdownOptions(
    `${HAZARDOUS_ENCLOSURE_IP_RATING}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeTerminalBoxIpRatingOptions } = useDropdownOptions(
    `${SAFE_TERMINAL_BOX_IP_RATING}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousTerminalBoxIpRatingOptions } = useDropdownOptions(
    `${HAZARDOUS_TERMINAL_BOX_IP_RATING}?fields=["*"]`,
    "name"
  )
  let { dropdownOptions: safeThermistorOptions } = useDropdownOptions(
    `${SAFE_THERMISTOR}?limit=100&fields=["*"]`,
    "name"
  )
  safeThermistorOptions = sortDropdownOptions(safeThermistorOptions)
  let { dropdownOptions: hazardousThermistorOptions } = useDropdownOptions(
    `/document/Thermister Hazardous?limit=100&fields=["*"]`,
    "name"
  )
  hazardousThermistorOptions = sortDropdownOptions(hazardousThermistorOptions)

  let { dropdownOptions: safeSpaceHeaterOptions } = useDropdownOptions(
    `${SAFE_SPACE_HEATER}?limit=100&fields=["*"]`,
    "name"
  )
  safeSpaceHeaterOptions = sortDropdownOptions(safeSpaceHeaterOptions)
  

  let { dropdownOptions: hazardousSpaceHeaterOptions } = useDropdownOptions(
    `${HAZARDOUS_SPACE_HEATER}?limit=100&fields=["*"]`,
    "name"
  )
  hazardousSpaceHeaterOptions = sortDropdownOptions(hazardousSpaceHeaterOptions)

  const { dropdownOptions: hazardousCertificationOptions } = useDropdownOptions(
    `${HAZARDOUS_CERTIFICATION}?limit=100&fields=["*"]`,
    "name"
  )
  let { dropdownOptions: safeBearingRTDOptions } = useDropdownOptions(
    `${SAFE_BEARING_RTD}?limit=100&fields=["*"]`,
    "name"
  )
  safeBearingRTDOptions = sortDropdownOptions(safeBearingRTDOptions)
  let { dropdownOptions: hazardousBearingRTDOptions } = useDropdownOptions(
    `${HAZARDOUS_BEARING_RTD}?limit=100&fields=["*"]`,
    "name"
  )
  hazardousBearingRTDOptions = sortDropdownOptions(hazardousBearingRTDOptions)
  let { dropdownOptions: safeWindingRTDOptions } = useDropdownOptions(
    `${SAFE_WINDING_RTD}?limit=100&fields=["*"]`,
    "name"
  )
  safeWindingRTDOptions = sortDropdownOptions(safeWindingRTDOptions)
  
  let { dropdownOptions: hazardousWindingRTDOptions } = useDropdownOptions(
    `${HAZARDOUS_WINDING_RTD}?limit=100&fields=["*"]`,
    "name"
  )
  hazardousWindingRTDOptions = sortDropdownOptions(hazardousWindingRTDOptions)
  
  const { dropdownOptions: safeBodyMaterialOptions } = useDropdownOptions(
    `${SAFE_BODY_MATERIAL}?limit=100&fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousBodyMaterialOptions } = useDropdownOptions(
    `${HAZARDOUS_BODY_MATERIAL}?limit=100&fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeTerminalBoxOptions } = useDropdownOptions(
    `${SAFE_TERMINAL_BOX_MATERIAL}?limit=100&fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousTerminalBoxOptions } = useDropdownOptions(
    `${HAZARDOUS_TERMINAL_BOX_MATERIAL}?limit=100&fields=["*"]`,
    "name"
  )

  return {
    safeEfficiencyLevelOptions,
    hazardousEfficiencyLevelOptions,
    safeInsulationClassOptions,
    hazardousInsulationClassOptions,
    safeTempRiseOptions,
    hazardousTempRiseOptions,
    safeEnclosureIpRatingOptions,
    hazardousEnclosureIpRatingOptions,
    safeTerminalBoxIpRatingOptions,
    hazardousTerminalBoxIpRatingOptions,
    safeThermistorOptions,
    hazardousThermistorOptions,
    safeSpaceHeaterOptions,
    hazardousSpaceHeaterOptions,
    hazardousCertificationOptions,
    safeBearingRTDOptions,
    hazardousBearingRTDOptions,
    safeWindingRTDOptions,
    hazardousWindingRTDOptions,
    safeBodyMaterialOptions,
    hazardousBodyMaterialOptions,
    safeTerminalBoxOptions,
    hazardousTerminalBoxOptions,
  }
}
