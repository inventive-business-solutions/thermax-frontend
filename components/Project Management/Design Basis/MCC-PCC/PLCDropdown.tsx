"use client"
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

export default function usePLCDropdowns() {
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
  const { dropdownOptions: di_module_density_options } = useDropdownOptions(`${DI_MODULE_DENSITY}?fields=["*"]`, "name")
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
  const { dropdownOptions: do_module_density_options } = useDropdownOptions(`${DO_MODULE_DENSITY}?fields=["*"]`, "name")
  // DO_MODULE_OUTPUT_TYPE
  const { dropdownOptions: do_module_output_type_options } = useDropdownOptions(
    `${DO_MODULE_OUTPUT_TYPE}?fields=["*"]`,
    "name"
  )
  // DO_CONTACT_NO
  const { dropdownOptions: do_contact_no_options } = useDropdownOptions(`${DO_CONTACT_NO}?fields=["*"]`, "name")
  // AI_MODULE_DENSITY
  const { dropdownOptions: ai_module_density_options } = useDropdownOptions(`${AI_MODULE_DENSITY}?fields=["*"]`, "name")
  // RTD_DENSITY
  const { dropdownOptions: rtd_density_options } = useDropdownOptions(`${RTD_DENSITY}?fields=["*"]`, "name")
  // RTD_INPUT_TYPE
  const { dropdownOptions: rtd_input_type_options } = useDropdownOptions(`${RTD_INPUT_TYPE}?fields=["*"]`, "name")
  // AO_MODULE_DENSITY
  const { dropdownOptions: ao_module_density_options } = useDropdownOptions(`${AO_MODULE_DENSITY}?fields=["*"]`, "name")
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
  const { dropdownOptions: plc_hmi_size_options } = useDropdownOptions(`${PLC_HMI_SIZE}?fields=["*"]`, "name")
  // EO_SYSTEM_HARDWARE
  const { dropdownOptions: eo_system_hardware_options } = useDropdownOptions(
    `${EO_SYSTEM_HARDWARE}?fields=["*"]`,
    "name"
  )
  // EO_MONITOR_SIZE
  const { dropdownOptions: eo_monitor_size_options } = useDropdownOptions(`${EO_MONITOR_SIZE}?fields=["*"]`, "name")
  // EO_PC_CABLE
  const { dropdownOptions: eo_pc_cable_options } = useDropdownOptions(`${EO_PC_CABLE}?fields=["*"]`, "name")
  // EO_SCADA_FURNITURE
  const { dropdownOptions: eo_scada_furniture_options } = useDropdownOptions(
    `${EO_SCADA_FURNITURE}?fields=["*"]`,
    "name"
  )

  return {
    plc_ups_scope_options,
    plc_ups_type_options,
    plc_ups_battery_backup_time_options,
    plc_hardware_communication_protocol_options,
    plc_client_system_communication_options,
    plc_cpu_redundancy_options,
    plc_panel_memory_options,
    marshalling_cabinet_options,
    plc_control_voltage_options,
    push_button_color_acknowledge_options,
    push_button_color_reset_options,
    non_ups_indicating_lamp_color_options,
    ups_indicating_lamp_color_options,
    di_module_density_options,
    di_module_input_type_options,
    di_module_interrogation_voltage_options,
    do_module_density_options,
    do_module_output_type_options,
    do_contact_no_options,
    ai_module_density_options,
    rtd_density_options,
    rtd_input_type_options,
    ao_module_density_options,
    ao_module_output_type_options,
    plc_io_count_options,
    plc_spare_memory_options,
    plc_hmi_size_options,
    eo_system_hardware_options,
    eo_monitor_size_options,
    eo_pc_cable_options,
    eo_scada_furniture_options,
  }
}
