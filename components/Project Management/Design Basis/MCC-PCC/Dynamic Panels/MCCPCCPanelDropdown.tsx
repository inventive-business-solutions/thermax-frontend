"use client";

import { createData } from "@/actions/crud-actions";

import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

export default function useMCCPCCPanelDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "method/pcc_panel.get_pcc_panel_dropdown",
        true,
        {
          "SD Incomer Ampere": "name",
          "Current Transformer Coating": "name",
          "Current Transformer Number": "name",
          "Current Transformer Configuration": "name",
          "Control Transformer Configuration": "name",
          "SD Incomer Pole": "name",
          "SD Incomer Type": "name",
          "SD Incomer Above Ampere": "name",
          "SD Incomer Above Pole": "name",
          "SD Incomer Above Type": "name",
          "MI Analog": "name",
          "MI Digital": "name",
          "MI Communication Protocol": "name",
          "GA MOC": "name",
          "GA MOC Thickness Door": "name",
          "GA MOC Thickness Covers": "name",
          "GA MCC Compartmental": "name",
          "GA MCC Construction Front Type": "name",
          "GA MCC Construction Draw Out Type": "name",
          "GA MCC Construction Type": "name",
          "GA Current Density": "name",
          "GA Panel Mounting Frame": "name",
          "GA Panel Mounting Height": "name",
          "GA Gland Plate 3mm Drill Type": "name",
          "GA Busbar Chamber Position": "name",
          "GA Power and Control Busbar Separation": "name",
          "GA Enclosure Protection Degree": "name",
          "GA Cable Entry Position": "name",
          "PPC Painting Standards": "name",
          "PPC Interior and Exterior Paint Shade": "name",
          "PPC Component Mounting Plate Paint Shade": "name",
          "PPC Base Frame Paint Shade": "name",
          "PPC Minimum Coating Thickness": "name",
          "PPC Pretreatment Panel Standard": "name",
          "ON Indication Lamp": "name",
          "OFF Indication Lamp": "name",
          "Trip Indication Lamp": "name",
          "ACB Service Indication lamp": "name",
          "ACB Spring Charge Indication lamp": "name",
          "Trip Circuit Healthy Indication lamp": "name",
          "Analog Meters": "name",
          "Digital Meters": "name",
          "Communication Protocol": "name",
        }
      );

      console.log("PCC response", response);
      setDropdown(response);
    };

    getDropdown();
  }, []);

  return {
    dropdown,
  };
}
