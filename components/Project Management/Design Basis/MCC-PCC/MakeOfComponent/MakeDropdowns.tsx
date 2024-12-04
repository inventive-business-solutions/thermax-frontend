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

// // Define the structure of the dropdown option
// interface DropdownOption {
//   id: number // or string, depending on your data structure
//   name: string
//   label: string
//   value: string
// }

// // Function to move "NA" options to the end of the array
// const moveNAtoEnd = (options: DropdownOption[]): DropdownOption[] => {
//   const naOptions = options.filter((item) => item.name === "NA")
//   const filteredOptions = options.filter((item) => item.name !== "NA")

//   // If there are NA options, add them to the end
//   return naOptions.length > 0 ? [...filteredOptions, ...naOptions] : filteredOptions
// }

// // Main hook to fetch dropdown options for different components
// export default function useMakeOfComponentDropdowns() {
//   const endpoints = [
//     { endpoint: MAKE_MOTORS, key: "motors", name: "motors_make_options" },
//     { endpoint: MAKE_CABLE, key: "cable", name: "cable_make_options" },
//     { endpoint: MAKE_LV_SWITCHGEAR, key: "lv_switchgear", name: "lv_switchgear_options" },
//     { endpoint: MAKE_PANEL_ENCLOSURE, key: "panel_enclosure", name: "panel_enclosure_options" },
//     { endpoint: MAKE_VFD_VSD, key: "vfd_vsd", name: "vfd_vsd_options" },
//     { endpoint: MAKE_SOFT_STARTER, key: "soft_starter", name: "soft_starter_options" },
//     { endpoint: MAKE_PLC, key: "plc", name: "plc_make_options" },
//   ]

//   // Object to hold dropdown options for each component
//   const dropdownOptions: Record<string, DropdownOption[]> = {}

//   endpoints.forEach(({ endpoint, key, name }) => {
//     const { dropdownOptions: options } = useDropdownOptions(`${endpoint}?fields=["*"]`, key)
//     dropdownOptions[`${name}`] = moveNAtoEnd(options)
//   })

//   return dropdownOptions
// }
"use client";

import {
  MAKE_MOTORS,
  MAKE_CABLE,
  MAKE_LV_SWITCHGEAR,
  MAKE_PANEL_ENCLOSURE,
  MAKE_VFD_VSD,
  MAKE_SOFT_STARTER,
  MAKE_PLC,
} from "@/configs/api-endpoints";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";

// Define the structure of the dropdown option
interface DropdownOption {
  id: number; // or string, depending on your data structure
  name: string;
  label: string;
  value: string;
}

// Function to move "NA" options to the end of the array
const moveNAtoEnd = (options: DropdownOption[]): DropdownOption[] => {
  const naOptions = options.filter((item) => item.name === "NA");
  const filteredOptions = options.filter((item) => item.name !== "NA");

  // If there are NA options, add them to the end
  return naOptions.length > 0
    ? [...filteredOptions, ...naOptions]
    : filteredOptions;
};

// Main hook to fetch dropdown options for different components
export default function useMakeOfComponentDropdowns() {
  // Fetch dropdown options for each component manually
  const motorsOptions = useDropdownOptions(
    `${MAKE_MOTORS}?fields=["*"]`,
    "motors"
  );
  const cableOptions = useDropdownOptions(
    `${MAKE_CABLE}?fields=["*"]`,
    "cable"
  );
  const lvSwitchgearOptions = useDropdownOptions(
    `${MAKE_LV_SWITCHGEAR}?fields=["*"]`,
    "lv_switchgear"
  );
  const panelEnclosureOptions = useDropdownOptions(
    `${MAKE_PANEL_ENCLOSURE}?fields=["*"]`,
    "panel_enclosure"
  );
  const vfdVsdOptions = useDropdownOptions(
    `${MAKE_VFD_VSD}?fields=["*"]`,
    "vfd_vsd"
  );
  const softStarterOptions = useDropdownOptions(
    `${MAKE_SOFT_STARTER}?fields=["*"]`,
    "soft_starter"
  );
  const plcOptions = useDropdownOptions(`${MAKE_PLC}?fields=["*"]`, "plc");

  // Object to hold dropdown options for each component
  const dropdownOptions: Record<string, DropdownOption[]> = {
    motors_make_options: moveNAtoEnd(motorsOptions.dropdownOptions),
    cable_make_options: moveNAtoEnd(cableOptions.dropdownOptions),
    lv_switchgear_options: moveNAtoEnd(lvSwitchgearOptions.dropdownOptions),
    panel_enclosure_options: moveNAtoEnd(panelEnclosureOptions.dropdownOptions),
    vfd_vsd_options: moveNAtoEnd(vfdVsdOptions.dropdownOptions),
    soft_starter_options: moveNAtoEnd(softStarterOptions.dropdownOptions),
    plc_make_options: moveNAtoEnd(plcOptions.dropdownOptions),
  };

  return dropdownOptions;
}
