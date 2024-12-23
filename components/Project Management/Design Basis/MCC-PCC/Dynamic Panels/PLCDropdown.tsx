"use client"
import { createData } from "actions/crud-actions";
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
import { useEffect, useState } from "react";
import { sortDropdownOptions } from "utils/helpers"

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};


export default function usePLCDropdowns() {

  const [dropdown, setDropdown] = useState<DropdownState>({})

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData("/method/plc_panel.get_plc_panel_dropdown", true, {
        "PLC UPS Scope": "name",
        "PLC UPS Type": "name",
        "PLC UPS Battery Backup Time": "name",
        "PLC Hardware Third Party Communication Protocol": "name",
        "PLC Hardware Client System Communication": "name",
        "PLC CPU Redundancy": "name",
        "PLC Panel Memory": "name",
        "Marshalling Cabinet for PLC and UPS": "name",
        "PLC Control Voltage": "name",
        "Push Button Color Acknowledge": "name",
        "Push Button Color Reset": "name",
        "Indicating Lamp Color for Non-UPS Power Supply": "name",
        "Indicating Lamp Color for UPS Power Supply": "name",
        "DI Modules Density": "name",
        "DI Modules Type Of Input": "name",
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
        "AI Module Density":"name",
      })
      setDropdown(response)
      console.log("plc response", response)
    }
    getDropdown()

  }, [])

  const { dropdownOptions: plc_ups_scope_options } = useDropdownOptions(`${PLC_UPS_SCOPE}?fields=["*"]`, "name")
  //   PLC_UPS_TYPE
  const { dropdownOptions: plc_ups_type_options } = useDropdownOptions(`${PLC_UPS_TYPE}?fields=["*"]`, "name")
  // PLC_UPS_BATTERY_BACKUP_TIME
  const { dropdownOptions: plc_ups_battery_backup_time_options } = useDropdownOptions(
    `${PLC_UPS_BATTERY_BACKUP_TIME}?fields=["*"]`,
    "name"
  )
  // PLC_HARDWARE_COMMUNICATION_PROTOCOL
  const { dropdownOptions: plc_hardware_communication_protocol_options } = useDropdownOptions(
    `${PLC_HARDWARE_COMMUNICATION_PROTOCOL}?fields=["*"]`,
    "name"
  )
  // PLC_CLIENT_SYSTEM_COMMUNICATION
  const { dropdownOptions: plc_client_system_communication_options } = useDropdownOptions(
    `${PLC_CLIENT_SYSTEM_COMMUNICATION}?fields=["*"]`,
    "name"
  )
  // PLC_CPU_REDUNDANCY
  const { dropdownOptions: plc_cpu_redundancy_options } = useDropdownOptions(
    `${PLC_CPU_REDUNDANCY}?fields=["*"]`,
    "name"
  )
  // PLC_PANEL_MEMORY
  const { dropdownOptions: plc_panel_memory_options } = useDropdownOptions(`${PLC_PANEL_MEMORY}?fields=["*"]`, "name")
  // MARSHALLING_CABINET
  const { dropdownOptions: marshalling_cabinet_options } = useDropdownOptions(
    `${MARSHALLING_CABINET}?fields=["*"]`,
    "name"
  )
  // PLC_CONTROL_VOLTAGE
  const { dropdownOptions: plc_control_voltage_options } = useDropdownOptions(
    `${PLC_CONTROL_VOLTAGE}?fields=["*"]`,
    "name"
  )
  // PUSH_BUTTON_COLOR_ACKNOWLEDGE
  const { dropdownOptions: push_button_color_acknowledge_options } = useDropdownOptions(
    `${PUSH_BUTTON_COLOR_ACKNOWLEDGE}?fields=["*"]`,
    "name"
  )
  // PUSH_BUTTON_COLOR_RESET
  const { dropdownOptions: push_button_color_reset_options } = useDropdownOptions(
    `${PUSH_BUTTON_COLOR_RESET}?fields=["*"]`,
    "name"
  )
  // NON_UPS_INDICATING_LAMP_COLOR
  const { dropdownOptions: non_ups_indicating_lamp_color_options } = useDropdownOptions(
    `${NON_UPS_INDICATING_LAMP_COLOR}?fields=["*"]`,
    "name"
  )
  // UPS_INDICATING_LAMP_COLOR
  const { dropdownOptions: ups_indicating_lamp_color_options } = useDropdownOptions(
    `${UPS_INDICATING_LAMP_COLOR}?fields=["*"]`,
    "name"
  )
  // DI_MODULE_DENSITY
  let { dropdownOptions: di_module_density_options } = useDropdownOptions(`${DI_MODULE_DENSITY}?fields=["*"]`, "name")
  di_module_density_options = sortDropdownOptions(di_module_density_options)

  // DI_MODULE_INPUT_TYPE
  const { dropdownOptions: di_module_input_type_options } = useDropdownOptions(
    `${DI_MODULE_INPUT_TYPE}?fields=["*"]`,
    "name"
  )
  // DI_MODULE_INTERROGATION_VOLTAGE
  const { dropdownOptions: di_module_interrogation_voltage_options } = useDropdownOptions(
    `${DI_MODULE_INTERROGATION_VOLTAGE}?fields=["*"]`,
    "name"
  )
  // DO_MODULE_DENSITY
  let { dropdownOptions: do_module_density_options } = useDropdownOptions(`${DO_MODULE_DENSITY}?fields=["*"]`, "name")
  do_module_density_options = sortDropdownOptions(do_module_density_options)
  // DO_MODULE_OUTPUT_TYPE
  const { dropdownOptions: do_module_output_type_options } = useDropdownOptions(
    `${DO_MODULE_OUTPUT_TYPE}?fields=["*"]`,
    "name"
  )
  // DO_CONTACT_NO
  const { dropdownOptions: do_contact_no_options } = useDropdownOptions(`${DO_CONTACT_NO}?fields=["*"]`, "name")
  // AI_MODULE_DENSITY
  let { dropdownOptions: ai_module_density_options } = useDropdownOptions(`${AI_MODULE_DENSITY}?fields=["*"]`, "name")
  ai_module_density_options = sortDropdownOptions(ai_module_density_options)
  // RTD_DENSITY
  let { dropdownOptions: rtd_density_options } = useDropdownOptions(`${RTD_DENSITY}?fields=["*"]`, "name")
  rtd_density_options = sortDropdownOptions(rtd_density_options)
  // RTD_INPUT_TYPE
  const { dropdownOptions: rtd_input_type_options } = useDropdownOptions(`${RTD_INPUT_TYPE}?fields=["*"]`, "name")
  // AO_MODULE_DENSITY
  let { dropdownOptions: ao_module_density_options } = useDropdownOptions(`${AO_MODULE_DENSITY}?fields=["*"]`, "name")
  ao_module_density_options = sortDropdownOptions(ao_module_density_options)
  // AO_MODULE_OUTPUT_TYPE
  const { dropdownOptions: ao_module_output_type_options } = useDropdownOptions(
    `${AO_MODULE_OUTPUT_TYPE}?fields=["*"]`,
    "name"
  )
  // PLC_IO_COUNT
  const { dropdownOptions: plc_io_count_options } = useDropdownOptions(`${PLC_IO_COUNT}?fields=["*"]`, "name")
  // PLC_SPARE_MEMORY
  const { dropdownOptions: plc_spare_memory_options } = useDropdownOptions(`${PLC_PANEL_MEMORY}?fields=["*"]`, "name")
  // PLC_HMI_SIZE
  let { dropdownOptions: plc_hmi_size_options } = useDropdownOptions(`${PLC_HMI_SIZE}?fields=["*"]`, "name")
  plc_hmi_size_options = sortDropdownOptions(plc_hmi_size_options)
  // EO_SYSTEM_HARDWARE
  const { dropdownOptions: eo_system_hardware_options } = useDropdownOptions(
    `${EO_SYSTEM_HARDWARE}?fields=["*"]`,
    "name"
  )
  // EO_MONITOR_SIZE
  let { dropdownOptions: eo_monitor_size_options } = useDropdownOptions(`${EO_MONITOR_SIZE}?fields=["*"]`, "name")
  eo_monitor_size_options = sortDropdownOptions(eo_monitor_size_options)
  // EO_PC_CABLE
  const { dropdownOptions: eo_pc_cable_options } = useDropdownOptions(`${EO_PC_CABLE}?fields=["*"]`, "name")
  // EO_SCADA_FURNITURE
  const { dropdownOptions: eo_scada_furniture_options } = useDropdownOptions(
    `${EO_SCADA_FURNITURE}?fields=["*"]`,
    "name"
  )

  return {
    dropdown
  }
}
