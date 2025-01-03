"use client";

import { createData } from "@/actions/crud-actions";

import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

export default function useMotorParametersDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "method/design_basis_make_of_component.get_make_of_component_dropdowns",
        true,
        {
          "Efficiency Level Safe Area": "name",
          "Efficiency Level Hazardous Area": "name",
          "Insulation Class Safe Area": "name",
          "Insulation Class Hazardous Area": "name",
          "Safe Temperature Rise": "name",
          "Hazardous Temperature Rise": "name",
          "Enclosure IP Rating Safe": "name",
          "Enclosure IP Rating Hazardous": "name",
          "IP rating for Terminal Box Safe": "name",
          "IP rating for Terminal Box Hazardous": "name",
          "Thermister Safe": "name",
          "Thermister Hazardous": "name",
          "Space Heater Hazardous": "name",
          "Space Heater Safe": "name",
          "Hazardous Area Certification": "name",
          "Bearing RTD Safe": "name",
          "Bearing RTD Hazardous": "name",
          "Winding RTD Safe": "name",
          "Winding RTD Hazardous": "name",
          "Body Material Safe": "name",
          "Body Material Hazardous": "name",
          "Material of Terminal Box Safe": "name",
          "Material of Terminal Box Hazardous": "name",
        }
      );
      console.log("Motor response", response);
      setDropdown(response);
    };

    getDropdown();
  }, []);

  // const { dropdownOptions: safeEfficiencyLevelOptions } = useDropdownOptions(
  //   `${SAFE_EFFICIENCY_LEVEL}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousEfficiencyLevelOptions } = useDropdownOptions(
  //   `${HAZARDOUS_EFFICIENCY_LEVEL}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: safeInsulationClassOptions } = useDropdownOptions(
  //   `${SAFE_INSULATION_CLASS}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousInsulationClassOptions } = useDropdownOptions(
  //   `${HAZARDOUS_INSULATION_CLASS}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: safeTempRiseOptions } = useDropdownOptions(`${SAFE_TEMPERATURE_RISE}?fields=["*"]`, "name")

  // const { dropdownOptions: hazardousTempRiseOptions } = useDropdownOptions(
  //   `${HAZARDOUS_TEMPERATURE_RISE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: safeEnclosureIpRatingOptions } = useDropdownOptions(
  //   `${SAFE_ENCLOSURE_IP_RATING}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousEnclosureIpRatingOptions } = useDropdownOptions(
  //   `${HAZARDOUS_ENCLOSURE_IP_RATING}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: safeTerminalBoxIpRatingOptions } = useDropdownOptions(
  //   `${SAFE_TERMINAL_BOX_IP_RATING}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousTerminalBoxIpRatingOptions } = useDropdownOptions(
  //   `${HAZARDOUS_TERMINAL_BOX_IP_RATING}?fields=["*"]`,
  //   "name"
  // )
  // let { dropdownOptions: safeThermistorOptions } = useDropdownOptions(
  //   `${SAFE_THERMISTOR}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // safeThermistorOptions = sortDropdownOptions(safeThermistorOptions)
  // let { dropdownOptions: hazardousThermistorOptions } = useDropdownOptions(
  //   `/document/Thermister Hazardous?limit=100&fields=["*"]`,
  //   "name"
  // )
  // hazardousThermistorOptions = sortDropdownOptions(hazardousThermistorOptions)

  // let { dropdownOptions: safeSpaceHeaterOptions } = useDropdownOptions(
  //   `${SAFE_SPACE_HEATER}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // safeSpaceHeaterOptions = sortDropdownOptions(safeSpaceHeaterOptions)

  // let { dropdownOptions: hazardousSpaceHeaterOptions } = useDropdownOptions(
  //   `${HAZARDOUS_SPACE_HEATER}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // hazardousSpaceHeaterOptions = sortDropdownOptions(hazardousSpaceHeaterOptions)

  // const { dropdownOptions: hazardousCertificationOptions } = useDropdownOptions(
  //   `${HAZARDOUS_CERTIFICATION}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // let { dropdownOptions: safeBearingRTDOptions } = useDropdownOptions(
  //   `${SAFE_BEARING_RTD}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // safeBearingRTDOptions = sortDropdownOptions(safeBearingRTDOptions)
  // let { dropdownOptions: hazardousBearingRTDOptions } = useDropdownOptions(
  //   `${HAZARDOUS_BEARING_RTD}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // hazardousBearingRTDOptions = sortDropdownOptions(hazardousBearingRTDOptions)
  // let { dropdownOptions: safeWindingRTDOptions } = useDropdownOptions(
  //   `${SAFE_WINDING_RTD}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // safeWindingRTDOptions = sortDropdownOptions(safeWindingRTDOptions)

  // let { dropdownOptions: hazardousWindingRTDOptions } = useDropdownOptions(
  //   `${HAZARDOUS_WINDING_RTD}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // hazardousWindingRTDOptions = sortDropdownOptions(hazardousWindingRTDOptions)

  // const { dropdownOptions: safeBodyMaterialOptions } = useDropdownOptions(
  //   `${SAFE_BODY_MATERIAL}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousBodyMaterialOptions } = useDropdownOptions(
  //   `${HAZARDOUS_BODY_MATERIAL}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: safeTerminalBoxOptions } = useDropdownOptions(
  //   `${SAFE_TERMINAL_BOX_MATERIAL}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: hazardousTerminalBoxOptions } = useDropdownOptions(
  //   `${HAZARDOUS_TERMINAL_BOX_MATERIAL}?limit=100&fields=["*"]`,
  //   "name"
  // )

  return {
    dropdown,
  };
}
