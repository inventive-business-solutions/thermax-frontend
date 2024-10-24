"use client"

import {
  HAZARDOUS_ALTITUDE,
  HAZARDOUS_BEARING_RTD,
  HAZARDOUS_BODY_MATERIAL,
  HAZARDOUS_CERTIFICATION,
  HAZARDOUS_DUTY,
  HAZARDOUS_EFFICIENCY_LEVEL,
  HAZARDOUS_ENCLOSURE_IP_RATING,
  HAZARDOUS_INSULATION_CLASS,
  HAZARDOUS_MAXIMUM_TEMPERATURE,
  HAZARDOUS_MINIMUM_TEMPERATURE,
  HAZARDOUS_SPACE_HEATER,
  HAZARDOUS_TEMPERATURE_RISE,
  HAZARDOUS_TERMINAL_BOX_IP_RATING,
  HAZARDOUS_TERMINAL_BOX_MATERIAL,
  HAZARDOUS_THERMISTOR,
  HAZARDOUS_WINDING_RTD,
  SAFE_ALTITUDE,
  SAFE_BEARING_RTD,
  SAFE_BODY_MATERIAL,
  SAFE_DUTY,
  SAFE_EFFICIENCY_LEVEL,
  SAFE_ENCLOSURE_IP_RATING,
  SAFE_INSULATION_CLASS,
  SAFE_MAXIMUM_TEMPERATURE,
  SAFE_MINIMUM_TEMPERATURE,
  SAFE_SPACE_HEATER,
  SAFE_TEMPERATURE_RISE,
  SAFE_TERMINAL_BOX_IP_RATING,
  SAFE_TERMINAL_BOX_MATERIAL,
  SAFE_THERMISTOR,
  SAFE_WINDING_RTD,
} from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"

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
  const { dropdownOptions: safeThermistorOptions } = useDropdownOptions(`${SAFE_THERMISTOR}?fields=["*"]`, "name")
  const { dropdownOptions: hazardousThermistorOptions } = useDropdownOptions(
    `${HAZARDOUS_THERMISTOR}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeSpaceHeaterOptions } = useDropdownOptions(`${SAFE_SPACE_HEATER}?fields=["*"]`, "name")
  const { dropdownOptions: hazardousSpaceHeaterOptions } = useDropdownOptions(
    `${HAZARDOUS_SPACE_HEATER}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousCertificationOptions } = useDropdownOptions(
    `${HAZARDOUS_CERTIFICATION}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeBearingRTDOptions } = useDropdownOptions(`${SAFE_BEARING_RTD}?fields=["*"]`, "name")
  const { dropdownOptions: hazardousBearingRTDOptions } = useDropdownOptions(
    `${HAZARDOUS_BEARING_RTD}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeWindingRTDOptions } = useDropdownOptions(`${SAFE_WINDING_RTD}?fields=["*"]`, "name")
  const { dropdownOptions: hazardousWindingRTDOptions } = useDropdownOptions(
    `${HAZARDOUS_WINDING_RTD}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeBodyMaterialOptions } = useDropdownOptions(`${SAFE_BODY_MATERIAL}?fields=["*"]`, "name")
  const { dropdownOptions: hazardousBodyMaterialOptions } = useDropdownOptions(
    `${HAZARDOUS_BODY_MATERIAL}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: safeTerminalBoxOptions } = useDropdownOptions(
    `${SAFE_TERMINAL_BOX_MATERIAL}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: hazardousTerminalBoxOptions } = useDropdownOptions(
    `${HAZARDOUS_TERMINAL_BOX_MATERIAL}?fields=["*"]`,
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
