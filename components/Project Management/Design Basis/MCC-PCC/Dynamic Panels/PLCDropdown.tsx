"use client"
import { createData } from "actions/crud-actions"
import {
  AI_MODULE_DENSITY,
  AO_MODULE_DENSITY,
  AO_MODULE_OUTPUT_TYPE,
  DI_MODULE_DENSITY,
  DI_MODULE_INPUT_TYPE,
  DI_MODULE_INTERROGATION_VOLTAGE,
  DO_CONTACT_NO,
  DO_MODULE_DENSITY,
  DO_MODULE_OUTPUT_TYPE,
  EO_MONITOR_SIZE,
  EO_PC_CABLE,
  EO_SCADA_FURNITURE,
  EO_SYSTEM_HARDWARE,
  MARSHALLING_CABINET,
  NON_UPS_INDICATING_LAMP_COLOR,
  PLC_CLIENT_SYSTEM_COMMUNICATION,
  PLC_CONTROL_VOLTAGE,
  PLC_CPU_REDUNDANCY,
  PLC_HARDWARE_COMMUNICATION_PROTOCOL,
  PLC_HMI_SIZE,
  PLC_IO_COUNT,
  PLC_PANEL_MEMORY,
  PLC_UPS_BATTERY_BACKUP_TIME,
  PLC_UPS_SCOPE,
  PLC_UPS_TYPE,
  PUSH_BUTTON_COLOR_ACKNOWLEDGE,
  PUSH_BUTTON_COLOR_RESET,
  RTD_DENSITY,
  RTD_INPUT_TYPE,
  UPS_INDICATING_LAMP_COLOR,
} from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useEffect, useState } from "react"
import { sortDropdownOptions } from "utils/helpers"

type DropdownState = {
  [key: string]: any[] // Each key is a string and the value is an array of any type
}

export default function usePLCDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({})

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData("/method/plc_panel.get_plc_panel_dropdown", true, {
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
        "PLC IO Count": "name",
        "PLC Spare Memory": "name",
        "PLC HMI Size": "name",
        "EO System Hardware": "name",
        "EO Monitor Size": "name",
        "EO Printer and Communication Cable": "name",
        "EO Furniture": "name",
        "AI Module Density": "name",
      })
      setDropdown(response)
      console.log("plc response", response)
    }
    getDropdown()
  }, [])

  return dropdown
}
