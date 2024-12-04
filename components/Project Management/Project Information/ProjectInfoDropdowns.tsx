"use client";

import {
  MAIN_SUPPLY_MV_API,
  VOLTAGE_VARIATION_API,
  FREQUENCY_VARIATION_API,
  MAIN_SUPPLY_LV_API,
  MAIN_SUPPLY_PHASE_API,
  CONTROL_UTILITY_PHASE_API,
  CONTROL_SUPPLY_API,
  UTILITY_SUPPLY_API,
  FREQUENCY_API,
  AMBIENT_TEMP_MAX_API,
  FAULT_LEVEL_API,
  SEC_API,
  ELECTRICAL_DESIGN_TEMP_API,
  SEISMIC_ZONE_API,
} from "@/configs/api-endpoints";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";

export default function useProjectInfoDropdowns() {
  const { dropdownOptions: mainSupplyMVOptions } = useDropdownOptions(
    `${MAIN_SUPPLY_MV_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: voltageVariationOptions } = useDropdownOptions(
    `${VOLTAGE_VARIATION_API}?fields=["*"]`,
    "variation"
  );
  const { dropdownOptions: frequencyVariationOptions } = useDropdownOptions(
    `${FREQUENCY_VARIATION_API}?fields=["*"]`,
    "variation"
  );
  const { dropdownOptions: mainSupplyLVOptions } = useDropdownOptions(
    `${MAIN_SUPPLY_LV_API}?fields=["*"]`,
    "voltage"
  );
  const { dropdownOptions: mainSupplyPhaseOptions } = useDropdownOptions(
    `${MAIN_SUPPLY_PHASE_API}?fields=["*"]`,
    "phase"
  );
  const { dropdownOptions: controlUtilityPhaseOptions } = useDropdownOptions(
    `${CONTROL_UTILITY_PHASE_API}?fields=["*"]`,
    "phase"
  );
  const { dropdownOptions: controlSupplyOptions } = useDropdownOptions(
    `${CONTROL_SUPPLY_API}?fields=["*"]`,
    "control_supply"
  );
  const { dropdownOptions: utilitySupplyOptions } = useDropdownOptions(
    `${UTILITY_SUPPLY_API}?fields=["*"]`,
    "utility_supply"
  );
  const { dropdownOptions: frequencyOptions } = useDropdownOptions(
    `${FREQUENCY_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: ambientTempMaxOptions } = useDropdownOptions(
    `${AMBIENT_TEMP_MAX_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: faultLevelOptions } = useDropdownOptions(
    `${FAULT_LEVEL_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: secOptions } = useDropdownOptions(
    `${SEC_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: electricalDesignTempOptions } = useDropdownOptions(
    `${ELECTRICAL_DESIGN_TEMP_API}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: seismicZoneOptions } = useDropdownOptions(
    `${SEISMIC_ZONE_API}?fields=["*"]`,
    "name"
  );

  return {
    mainSupplyMVOptions,
    voltageVariationOptions,
    frequencyVariationOptions,
    mainSupplyLVOptions,
    mainSupplyPhaseOptions,
    controlUtilityPhaseOptions,
    controlSupplyOptions,
    utilitySupplyOptions,
    frequencyOptions,
    ambientTempMaxOptions,
    faultLevelOptions,
    secOptions,
    electricalDesignTempOptions,
    seismicZoneOptions,
  };
}
