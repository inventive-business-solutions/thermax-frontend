"use client";
import { createData } from "@/actions/crud-actions";
import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

export default function usePLCDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData(
        "/method/plc_panel.get_plc_panel_dropdown",
        true,
        {
          "PLC Control Voltage": "name",
          "PLC UPS Scope": "name",
          "PLC UPS 3 Phase Voltage": "name",
          "PLC UPS 1 Phase Voltage": "name",
          "PLC UPS Type": "name",
          "PLC UPS Battery Type": "name",
          "PLC UPS Battery Backup Time": "name",
          "UPS Redundancy": "name",
          "PLC CPU System": "name",
          "PLC Panel Memory": "name",
          "Marshalling Cabinet for PLC and UPS": "name",
          "Electronic Hooter Acknowledge": "name",
          "Panel Power Supply On": "name",
          "Panel Power Supply Off": "name",
          "Indicating Lamp Color for Non-UPS Power Supply": "name",
          "Indicating Lamp Color for UPS Power Supply": "name",
          "Channel Density": "name",
          "Isolation Dropdown": "name",
          "Interposing Relay": "name",

          "DI Modules Interrogation Voltage": "name",
          "DO Modules Density": "name",
          "DO Modules Type Of Output": "name",
          "DO No Of Contacts": "name",
          "RTD Density": "name",
          "RTD Type Of Input": "name",
          "AO Modules Density": "name",
          "AO Modules Type of Output": "name",
          "Terminal Block Connector Dropdown": "name",
          "PLC IO Count": "name",
          "PLC Spare Memory": "name",
          "PLC HMI Size": "name",
          "HMI Hardware Make": "name",
          "EO System Hardware": "name",
          "EO Monitor Size": "name",
          "EO Printer and Communication Cable": "name",
          "EO Furniture": "name",
          "Printer Type": "name",
          "Printer Size": "name",
          "AI Module Density": "name",
          "Interface Signal and Control Logic": "name",
          "Differential Pressure Flow Linearization": "name",
          "PLC CPU Communication Protocol": "name",
        }
      );
      setDropdown(response);
      console.log("plc response", response);
    };
    getDropdown();
  }, []);

  return dropdown;
}
