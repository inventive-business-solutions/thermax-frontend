"use client";

import { createData } from "@/actions/crud-actions";
import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[];
};

export default function useEarthingDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "method/layout_earthing.get_layout_earthing_dropdown",
        true,
        {
          "Earthing System": "name",
          "Earth Strip": "name",
          "Earth Pit": "name",
        }
      );

      console.log("earthing response", response);
      setDropdown(response);
    };
    getDropdown();
  }, []);

  return dropdown;
}
