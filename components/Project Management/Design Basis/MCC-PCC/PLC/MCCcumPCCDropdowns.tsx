"use client"

import {
  AI_MODULE_DENSITY,
  AI_MODULE_TYPE_OF_OUTPUT,
  AO_MODULE_DENSITY,
  AO_MODULE_TYPE_OF_OUTPUT,
  CLIENT_SYSTEM_COMMUNICATION,
  CPU_REDUNDANCY,
  // MCCcumPCC MCC DROPDOWN
  CURRENT_TRANSFORMER_A,
  CURRENT_TRANSFORMER_B,
  DI_MODULE_DENSITY,
  DI_MODULE_INTERROGATION_VOLTAGE,
  DI_MODULE_TYPE_OF_INPUT,
  DO_MODULE_DENSITY,
  DO_MODULE_NO_OF_CONTACTS,
  DO_MODULE_TYPE_OF_OUTPUT,
  EO_COMMERCIAL_GRADE_PC,
  EO_COMMUNICATION_CABLE,
  EO_COMMUNICATION_CABLE_2,
  EO_FURNITURE_CONSOLE,
  EO_MANDATORY_SPARES,
  EO_MONITOR_SIZE,
  EO_PRINTER_CC,
  EO_PRINTER_QTY,
  EO_PRINTER_TABLE,
  EO_SYSTEM_HARDWARE,
  EO_WINDOW_OS,
  ESNOS,
  GA_BUSBAR_CHAMBER_POSITION,
  GA_CABLE_ENTRY_POSITION,
  GA_CURRENT_DENSITY,
  GA_DEGREE_OF_ENCLOSURE_PROTECTION,
  GA_GLAND_PLATE_A,
  GA_GLAND_PLATE_B,
  GA_MOC,
  GA_MOC_THICKNESS_COVERS,
  GA_MOC_THICKNESS_DOOR,
  GA_PANEL_MOUNTING_FRAME,
  GA_PANEL_MOUNTING_HEIGHT,
  GA_PCC_CONSTRUCTION_A,
  GA_PCC_CONSTRUCTION_B,
  GA_PCC_CONSTRUCTION_C,
  GA_PCC_CONSTRUCTION_D,
  GA_SEPARATION_POWER_CHAMBER,
  HMI_DEVELOPMENT_LIC,
  HMI_SIZE_IN_INCH,
  HMINOS,
  INDICATING_LAMP_NON_UPS,
  INDICATING_LAMP_UPS,
  IO_COUNT,
  MARSHALLING_CABINET_FOR_PLC,
  MI_ANALOG,
  MI_COMMUNICATION_PROTOCOL,
  MI_DIGITAL,
  OSNOS,
  PC_MIN_COATING_THICKNESS,
  PC_PAINT_SHADE_FOR_BASE_FRAME,
  PC_PAINT_SHADE_FOR_COMPONENT,
  PC_PAINT_SHADE_FOR_INTERIOR_EXTERIOR,
  PC_PAINTING_STANDARDS,
  PC_STANDARD_FOR_PRETREATMENT_PANEL,
  PLC_COMMUNICAION_BETWEEN_CPU_AND_IO_CARD,
  PLC_CPU_MODULE,
  PLC_PANEL_CONTROL_VOLTAGE,
  PLC_PANEL_MEMORY,
  PLC_PANEL_MOUNTED_AC,
  PLC_PROGRAMMING_LIC,
  PLC_SPARE_MEMORY,
  PUSH_BUTTON_COLOR_ACKNOWLEDGE,
  PUSH_BUTTON_COLOR_RESET,
  RTD_DENSITY,
  RTD_TYPE_OF_INPUT,
  SCADA_DEVELOPMENT_LIC,
  SCADA_RUNTIME_LIC,
  SD_INCOMER_ABOVE_AMPERE,
  SD_INCOMER_ABOVE_LSI,
  SD_INCOMER_ABOVE_LSIG,
  SD_INCOMER_ABOVE_NEURAL_LINK,
  SD_INCOMER_ABOVE_POLE,
  SD_INCOMER_ABOVE_TYPE,
  SD_INCOMER_ABOVE_UNDER_OVER_VOLTAGE,
  SD_INCOMER_AMPERE,
  SD_INCOMER_POLE,
  SD_INCOMER_TYPE,
  SD_INDICATION_ALARM_ANNUNCIATOR,
  THIRD_PARTY_COMMUNICATION_PROTOCOL,
  UPS_BATTERY_BACKUP_TIME,
  UPS_BATTERY_TYPE,
  UPS_SCOPE,
  UPS_TYPE,
  VFD_AUTO_MANUAL_SELECTION,

  // MCCcumPCC PLC DROPDOWN
} from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useMCCcumPCCDropdowns() {
  const { dropdownOptions: sd_incomer_ampereOptions } = useDropdownOptions(
    `${SD_INCOMER_AMPERE}?fields=["*"]`,
    "incomer"
  )
  const { dropdownOptions: sd_incomer_poleOptions } = useDropdownOptions(`${SD_INCOMER_POLE}?fields=["*"]`, "pole")
  const { dropdownOptions: sd_incomer_typeOptions } = useDropdownOptions(`${SD_INCOMER_TYPE}?fields=["*"]`, "type")
  const { dropdownOptions: sd_incomer_above_ampereOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_AMPERE}?fields=["*"]`,
    "ampere"
  )
  const { dropdownOptions: sd_incomer_above_poleOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_POLE}?fields=["*"]`,
    "pole"
  )
  const { dropdownOptions: sd_incomer_above_typeOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_TYPE}?fields=["*"]`,
    "type"
  )
  const { dropdownOptions: sd_incomer_above_under_over_voltageOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_UNDER_OVER_VOLTAGE}?fields=["*"]`,
    "under_over_voltage"
  )
  const { dropdownOptions: sd_incomer_above_lsigOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_LSIG}?fields=["*"]`,
    "lsig"
  )
  const { dropdownOptions: sd_incomer_above_lsiOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_LSI}?fields=["*"]`,
    "lsi"
  )
  const { dropdownOptions: sd_incomer_above_neural_linkOptions } = useDropdownOptions(
    `${SD_INCOMER_ABOVE_NEURAL_LINK}?fields=["*"]`,
    "neural_link"
  )
  const { dropdownOptions: current_transformer_A_Options } = useDropdownOptions(
    `${CURRENT_TRANSFORMER_A}?fields=["*"]`,
    "current_transformer"
  )
  const { dropdownOptions: current_transformer_B_Options } = useDropdownOptions(
    `${CURRENT_TRANSFORMER_B}?fields=["*"]`,
    "current_transformer"
  )
  const { dropdownOptions: alarm_annunciatorOptions } = useDropdownOptions(
    `${SD_INDICATION_ALARM_ANNUNCIATOR}?fields=["*"]`,
    "alarm_annunciator"
  )
  // MI
  const { dropdownOptions: mi_analogOptions } = useDropdownOptions(`${MI_ANALOG}?fields=["*"]`, "analog")
  const { dropdownOptions: mi_digitalOptions } = useDropdownOptions(`${MI_DIGITAL}?fields=["*"]`, "digital")
  const { dropdownOptions: mi_communication_protocolOptions } = useDropdownOptions(
    `${MI_COMMUNICATION_PROTOCOL}?fields=["*"]`,
    "communication_protocol"
  )

  // GENERAL ARRANGEMENT
  const { dropdownOptions: ga_mocOptions } = useDropdownOptions(`${GA_MOC}?fields=["*"]`, "moc")
  const { dropdownOptions: ga_moc_thickness_DoorOptions } = useDropdownOptions(
    `${GA_MOC_THICKNESS_DOOR}?fields=["*"]`,
    "door_and_component"
  )
  const { dropdownOptions: ga_moc_thickness_CoversOptions } = useDropdownOptions(
    `${GA_MOC_THICKNESS_COVERS}?fields=["*"]`,
    "top_and_side"
  )
  const { dropdownOptions: ga_pcc_construction_AOptions } = useDropdownOptions(
    `${GA_PCC_CONSTRUCTION_A}?fields=["*"]`,
    "a"
  )
  const { dropdownOptions: ga_pcc_construction_BOptions } = useDropdownOptions(
    `${GA_PCC_CONSTRUCTION_B}?fields=["*"]`,
    "b"
  )
  const { dropdownOptions: ga_pcc_construction_COptions } = useDropdownOptions(
    `${GA_PCC_CONSTRUCTION_C}?fields=["*"]`,
    "c"
  )
  const { dropdownOptions: ga_pcc_construction_DOptions } = useDropdownOptions(
    `${GA_PCC_CONSTRUCTION_D}?fields=["*"]`,
    "d"
  )
  const { dropdownOptions: ga_current_densityOptions } = useDropdownOptions(
    `${GA_CURRENT_DENSITY}?fields=["*"]`,
    "current_density"
  )
  const { dropdownOptions: ga_panel_mounting_frameOptions } = useDropdownOptions(
    `${GA_PANEL_MOUNTING_FRAME}?fields=["*"]`,
    "frame"
  )
  const { dropdownOptions: ga_panel_mounting_heightOptions } = useDropdownOptions(
    `${GA_PANEL_MOUNTING_HEIGHT}?fields=["*"]`,
    "height"
  )
  const { dropdownOptions: ga_gland_plate_aOptions } = useDropdownOptions(
    `${GA_GLAND_PLATE_A}?fields=["*"]`,
    "detachable"
  )
  const { dropdownOptions: ga_gland_plate_bOptions } = useDropdownOptions(`${GA_GLAND_PLATE_B}?fields=["*"]`, "drilled")
  const { dropdownOptions: ga_busbar_chamber_positionOptions } = useDropdownOptions(
    `${GA_BUSBAR_CHAMBER_POSITION}?fields=["*"]`,
    "position"
  )
  const { dropdownOptions: ga_separation_power_chamberOptions } = useDropdownOptions(
    `${GA_SEPARATION_POWER_CHAMBER}?fields=["*"]`,
    "separation_between_power_and_control_busbar"
  )
  const { dropdownOptions: ga_degree_of_enclosure_protectionOptions } = useDropdownOptions(
    `${GA_DEGREE_OF_ENCLOSURE_PROTECTION}?fields=["*"]`,
    "degree_of_enclosure_protection"
  )
  const { dropdownOptions: ga_cable_entry_positionOptions } = useDropdownOptions(
    `${GA_CABLE_ENTRY_POSITION}?fields=["*"]`,
    "position"
  )
  const { dropdownOptions: pc_painting_standardsOptions } = useDropdownOptions(
    `${PC_PAINTING_STANDARDS}?fields=["*"]`,
    "painting_standards"
  )
  const { dropdownOptions: pc_paint_shade_interior_exteriorOptions } = useDropdownOptions(
    `${PC_PAINT_SHADE_FOR_INTERIOR_EXTERIOR}?fields=["*"]`,
    "paint_shade"
  )
  const { dropdownOptions: pc_paint_shade_for_componentOptions } = useDropdownOptions(
    `${PC_PAINT_SHADE_FOR_COMPONENT}?fields=["*"]`,
    "paint_shade"
  )
  const { dropdownOptions: pc_paint_shade_for_base_frameOptions } = useDropdownOptions(
    `${PC_PAINT_SHADE_FOR_BASE_FRAME}?fields=["*"]`,
    "paint_shade"
  )
  const { dropdownOptions: pc_min_coating_thicknessOptions } = useDropdownOptions(
    `${PC_MIN_COATING_THICKNESS}?fields=["*"]`,
    "thickness"
  )
  const { dropdownOptions: pc_pretreatment_panelOptions } = useDropdownOptions(
    `${PC_STANDARD_FOR_PRETREATMENT_PANEL}?fields=["*"]`,
    "standard_for_pretreatment"
  )
  const { dropdownOptions: vfd_auto_manual_selectionOptions } = useDropdownOptions(
    `${VFD_AUTO_MANUAL_SELECTION}?fields=["*"]`,
    "auto_manual_selection"
  )

  const { dropdownOptions: ups_scopeOptions } = useDropdownOptions(`${UPS_SCOPE}?fields=["*"]`, "ups_scope")
  const { dropdownOptions: ups_typeOptions } = useDropdownOptions(`${UPS_TYPE}?fields=["*"]`, "ups_type")
  const { dropdownOptions: ups_battery_typeOptions } = useDropdownOptions(
    `${UPS_BATTERY_TYPE}?fields=["*"]`,
    "ups_battery_type"
  )
  const { dropdownOptions: ups_battery_backup_time_in_minOptions } = useDropdownOptions(
    `${UPS_BATTERY_BACKUP_TIME}?fields=["*"]`,
    "ups_battery_backup_time_in_min"
  )
  const { dropdownOptions: plc_hardware_cpuOptions } = useDropdownOptions(
    `${PLC_CPU_MODULE}?fields=["*"]`,
    "cpu_processor"
  )
  const { dropdownOptions: plc_hardware_communicationOptions } = useDropdownOptions(
    `${PLC_COMMUNICAION_BETWEEN_CPU_AND_IO_CARD}?fields=["*"]`,
    "ups_battery_backup_time_in_min"
  )
  const { dropdownOptions: third_party_communicationOptions } = useDropdownOptions(
    `${THIRD_PARTY_COMMUNICATION_PROTOCOL}?fields=["*"]`,
    "third_party_communication_protocol"
  )
  const { dropdownOptions: client_system_communicationOptions } = useDropdownOptions(
    `${CLIENT_SYSTEM_COMMUNICATION}?fields=["*"]`,
    "client_system_communication"
  )
  const { dropdownOptions: cpu_redundancyOptions } = useDropdownOptions(
    `${CPU_REDUNDANCY}?fields=["*"]`,
    "cpu_redundancy"
  )
  const { dropdownOptions: plc_panel_memoryOptions } = useDropdownOptions(
    `${PLC_PANEL_MEMORY}?fields=["*"]`,
    "panel_memory"
  )
  const { dropdownOptions: plc_panelMounted_acOptions } = useDropdownOptions(
    `${PLC_PANEL_MOUNTED_AC}?fields=["*"]`,
    "panel_mounted_ac"
  )
  const { dropdownOptions: plc_panel_control_voltageOptions } = useDropdownOptions(
    `${PLC_PANEL_CONTROL_VOLTAGE}?fields=["*"]`,
    "control_voltage"
  )
  const { dropdownOptions: marshalling_cabinetOptions } = useDropdownOptions(
    `${MARSHALLING_CABINET_FOR_PLC}?fields=["*"]`,
    "marshalling_cabinet"
  )
  const { dropdownOptions: push_button_color_acknowledgeOptions } = useDropdownOptions(
    `${PUSH_BUTTON_COLOR_ACKNOWLEDGE}?fields=["*"]`,
    "push_button_color_acknowledge"
  )
  const { dropdownOptions: push_button_color_resetOptions } = useDropdownOptions(
    `${PUSH_BUTTON_COLOR_RESET}?fields=["*"]`,
    "push_button_color_reset"
  )
  const { dropdownOptions: indicating_lamp_non_upsOptions } = useDropdownOptions(
    `${INDICATING_LAMP_NON_UPS}?fields=["*"]`,
    "indicating_lamp_color_for_non_ups_power_supply"
  )
  const { dropdownOptions: indicating_lamp_upsOptions } = useDropdownOptions(
    `${INDICATING_LAMP_UPS}?fields=["*"]`,
    "power_supply"
  )

  const { dropdownOptions: di_module_densityOptions } = useDropdownOptions(
    `${DI_MODULE_DENSITY}?fields=["*"]`,
    "density"
  )
  const { dropdownOptions: di_module_typeOfInputOptions } = useDropdownOptions(
    `${DI_MODULE_TYPE_OF_INPUT}?fields=["*"]`,
    "type_of_input"
  )
  const { dropdownOptions: di_module_integorration_voltageOptions } = useDropdownOptions(
    `${DI_MODULE_INTERROGATION_VOLTAGE}?fields=["*"]`,
    "interrogation_voltage"
  )
  const { dropdownOptions: do_module_densityOptions } = useDropdownOptions(
    `${DO_MODULE_DENSITY}?fields=["*"]`,
    "density"
  )
  const { dropdownOptions: do_module_typeOfOutputOptions } = useDropdownOptions(
    `${DO_MODULE_TYPE_OF_OUTPUT}?fields=["*"]`,
    "type_of_output"
  )
  const { dropdownOptions: do_module_no_of_contactsOptions } = useDropdownOptions(
    `${DO_MODULE_NO_OF_CONTACTS}?fields=["*"]`,
    "contacts"
  )
  const { dropdownOptions: ai_module_densityOptions } = useDropdownOptions(
    `${AI_MODULE_DENSITY}?fields=["*"]`,
    "density"
  )
  const { dropdownOptions: ai_module_typeOfOutputOptions } = useDropdownOptions(
    `${AI_MODULE_TYPE_OF_OUTPUT}?fields=["*"]`,
    "type_of_output"
  )
  const { dropdownOptions: ao_module_densityOptions } = useDropdownOptions(
    `${AO_MODULE_DENSITY}?fields=["*"]`,
    "density"
  )
  const { dropdownOptions: ao_module_typeOfOutputOptions } = useDropdownOptions(
    `${AO_MODULE_TYPE_OF_OUTPUT}?fields=["*"]`,
    "type_of_output"
  )
  const { dropdownOptions: rtd_densityOptions } = useDropdownOptions(`${RTD_DENSITY}?fields=["*"]`, "density")
  const { dropdownOptions: rtd_typeOfInputOptions } = useDropdownOptions(
    `${RTD_TYPE_OF_INPUT}?fields=["*"]`,
    "type_of_input"
  )

  const { dropdownOptions: io_countOptions } = useDropdownOptions(`${IO_COUNT}?fields=["*"]`, "count")
  const { dropdownOptions: plc_spare_memotyOptions } = useDropdownOptions(`${PLC_SPARE_MEMORY}?fields=["*"]`, "memory")
  const { dropdownOptions: es_nosOptions } = useDropdownOptions(`${ESNOS}?fields=["*"]`, "es")
  const { dropdownOptions: os_nosOptions } = useDropdownOptions(`${OSNOS}?fields=["*"]`, "os")
  const { dropdownOptions: hmi_nosOptions } = useDropdownOptions(`${HMINOS}?fields=["*"]`, "hmi")
  const { dropdownOptions: hmi_size_in_inchOptions } = useDropdownOptions(
    `${HMI_SIZE_IN_INCH}?fields=["*"]`,
    "hmi_size"
  )
  const { dropdownOptions: scada_development_licOptions } = useDropdownOptions(
    `${SCADA_DEVELOPMENT_LIC}?fields=["*"]`,
    "scada_development_licence"
  )
  const { dropdownOptions: scada_runtime_licOptions } = useDropdownOptions(
    `${SCADA_RUNTIME_LIC}?fields=["*"]`,
    "scada_runtime_license"
  )
  const { dropdownOptions: hmi_development_licOptions } = useDropdownOptions(
    `${HMI_DEVELOPMENT_LIC}?fields=["*"]`,
    "hmi_development_license"
  )
  const { dropdownOptions: plc_programming_licOptions } = useDropdownOptions(
    `${PLC_PROGRAMMING_LIC}?fields=["*"]`,
    "plc_programming_license_software "
  )

  const { dropdownOptions: eo_system_hardwareOptions } = useDropdownOptions(`${EO_SYSTEM_HARDWARE}?fields=["*"]`, "system_hardware")
  const { dropdownOptions: eo_commercial_grade_pcOptions } = useDropdownOptions(`${EO_COMMERCIAL_GRADE_PC}?fields=["*"]`, "commercial_grade_pc")
  const { dropdownOptions: eo_monitor_sizeOptions } = useDropdownOptions(`${EO_MONITOR_SIZE}?fields=["*"]`, "monitor_size")
  const { dropdownOptions: eo_windows_osOptions } = useDropdownOptions(`${EO_WINDOW_OS}?fields=["*"]`, "window_operating_system")
  const { dropdownOptions: eo_printer_ccOptions } = useDropdownOptions(`${EO_PRINTER_CC}?fields=["*"]`, "printer_and_cc")
  const { dropdownOptions: eo_printer_qtyOptions } = useDropdownOptions(`${EO_PRINTER_QTY}?fields=["*"]`, "printer_qty")
  const { dropdownOptions: eo_printer_tableOptions } = useDropdownOptions(`${EO_PRINTER_TABLE}?fields=["*"]`, "printer_table")
  const { dropdownOptions: eo_furniture_consoleOptions } = useDropdownOptions(`${EO_FURNITURE_CONSOLE}?fields=["*"]`, "furniture")
  const { dropdownOptions: eo_communication_cableOptions } = useDropdownOptions(`${EO_COMMUNICATION_CABLE}?fields=["*"]`, "cc_and_hardware")
  const { dropdownOptions: eo_communication_cable2Options } = useDropdownOptions(`${EO_COMMUNICATION_CABLE_2}?fields=["*"]`, "cc_and_hardware")
  const { dropdownOptions: eo_mandatory_spareOptions } = useDropdownOptions(`${EO_MANDATORY_SPARES}?fields=["*"]`, "mandatory_spares")

  return {
    sd_incomer_ampereOptions,
    sd_incomer_poleOptions,
    sd_incomer_typeOptions,
    sd_incomer_above_ampereOptions,
    sd_incomer_above_poleOptions,
    sd_incomer_above_typeOptions,
    sd_incomer_above_under_over_voltageOptions,
    sd_incomer_above_lsigOptions,
    sd_incomer_above_lsiOptions,
    sd_incomer_above_neural_linkOptions,
    current_transformer_A_Options,
    current_transformer_B_Options,
    alarm_annunciatorOptions,
    mi_analogOptions,
    mi_digitalOptions,
    mi_communication_protocolOptions,

    ga_mocOptions,
    ga_moc_thickness_DoorOptions,
    ga_moc_thickness_CoversOptions,
    ga_pcc_construction_AOptions,
    ga_pcc_construction_BOptions,
    ga_pcc_construction_COptions,
    ga_pcc_construction_DOptions,
    ga_current_densityOptions,
    ga_panel_mounting_frameOptions,
    ga_panel_mounting_heightOptions,
    ga_gland_plate_aOptions,
    ga_gland_plate_bOptions,
    ga_busbar_chamber_positionOptions,
    ga_separation_power_chamberOptions,
    ga_degree_of_enclosure_protectionOptions,
    ga_cable_entry_positionOptions,
    pc_painting_standardsOptions,
    pc_paint_shade_interior_exteriorOptions,
    pc_paint_shade_for_componentOptions,
    pc_paint_shade_for_base_frameOptions,
    pc_min_coating_thicknessOptions,
    pc_pretreatment_panelOptions,
    vfd_auto_manual_selectionOptions,

    ups_scopeOptions,
    ups_typeOptions,
    ups_battery_typeOptions,
    ups_battery_backup_time_in_minOptions,
    plc_hardware_cpuOptions,
    plc_hardware_communicationOptions,
    third_party_communicationOptions,
    client_system_communicationOptions,
    cpu_redundancyOptions,
    plc_panel_memoryOptions,
    plc_panelMounted_acOptions,
    plc_panel_control_voltageOptions,
    marshalling_cabinetOptions,
    push_button_color_acknowledgeOptions,
    push_button_color_resetOptions,
    indicating_lamp_non_upsOptions,
    indicating_lamp_upsOptions,

    di_module_densityOptions,
    di_module_typeOfInputOptions,
    di_module_integorration_voltageOptions,
    do_module_densityOptions,
    do_module_typeOfOutputOptions,
    do_module_no_of_contactsOptions,
    ai_module_densityOptions,
    ai_module_typeOfOutputOptions,
    ao_module_densityOptions,
    ao_module_typeOfOutputOptions,
    rtd_densityOptions,
    rtd_typeOfInputOptions,

    io_countOptions,
    plc_spare_memotyOptions,
    es_nosOptions,
    os_nosOptions,
    hmi_nosOptions,
    hmi_size_in_inchOptions,
    scada_development_licOptions,
    scada_runtime_licOptions,
    hmi_development_licOptions,
    plc_programming_licOptions,

    eo_system_hardwareOptions,
    eo_commercial_grade_pcOptions,
    eo_monitor_sizeOptions,
    eo_windows_osOptions,
    eo_printer_ccOptions,
    eo_printer_qtyOptions,
    eo_printer_tableOptions,
    eo_furniture_consoleOptions,
    eo_communication_cableOptions,
    eo_communication_cable2Options,
    eo_mandatory_spareOptions,
  }
}
