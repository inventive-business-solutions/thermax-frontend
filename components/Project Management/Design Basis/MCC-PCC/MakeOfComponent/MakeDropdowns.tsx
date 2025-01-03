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

import { createData } from "@/actions/crud-actions";

import { useEffect, useState } from "react";

// Define the structure of the dropdown option
// interface DropdownOption {
//   id: number; // or string, depending on your data structure
//   name: string;
//   label: string;
//   value: string;
// }

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

// Function to move "NA" options to the end of the array
// const moveNAtoEnd = (options: DropdownOption[]): DropdownOption[] => {
//   const naOptions = options.filter((item) => item.name === "NA");
//   const filteredOptions = options.filter((item) => item.name !== "NA");

//   // If there are NA options, add them to the end
//   return naOptions.length > 0
//     ? [...filteredOptions, ...naOptions]
//     : filteredOptions;
// };

// Main hook to fetch dropdown options for different components
export default function useMakeOfComponentDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "method/design_basis_make_of_component.get_make_of_component_dropdowns",
        true,
        {
          "Gland Make": "name",
          "Motors Make": "name",
          "Cables Make": "name",
          "LV Switchgear Make": "name",
          "Panel Enclosure Make": "name",
          "VFD VSD Make": "name",
          "Soft Starter Make": "name",
          "PLC Make": "name",
        }
      );
      console.log(response, "make response");
      setDropdown(response);
    };
    getDropdown();
  }, []);

  return dropdown;
}
