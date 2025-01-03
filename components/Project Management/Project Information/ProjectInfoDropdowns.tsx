"use client";

import { createData } from "@/actions/crud-actions";
import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

export default function useProjectInfoDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "method/project_information.get_project_info_dropdown_data",
        true,
        {
          "Main Supply MV": "name",
          "Voltage Variation": "variation",
          "Main Supply LV": "name",
          "Frequency Variation": "variation",
          Frequency: "name",
          "Main Supply Phase": "phase",
          "Control and Utility Supply Phase": "phase",
          "Control Supply": "control_supply",
          "Utility Supply": "utility_supply",
          "Ambient Temperature Max": "name",
          "Fault Level": "name",
          Sec: "name",
          "Electrical Design Temp": "name",
          "Seismic zone": "name",
        }
      );
      console.log(response, "response");
      setDropdown(response);
    };

    getDropdown();
  }, []);
  return {
    dropdown,
  };
}
