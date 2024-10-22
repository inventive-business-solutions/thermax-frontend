"use client"

import {
  CURRENT_TRANSFORMER_A,
  CURRENT_TRANSFORMER_B,
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
  MI_ANALOG,
  MI_COMMUNICATION_PROTOCOL,
  MI_DIGITAL,
  PC_MIN_COATING_THICKNESS,
  PC_PAINT_SHADE_FOR_BASE_FRAME,
  PC_PAINT_SHADE_FOR_COMPONENT,
  PC_PAINT_SHADE_FOR_INTERIOR_EXTERIOR,
  PC_PAINTING_STANDARDS,
  PC_STANDARD_FOR_PRETREATMENT_PANEL,
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
  VFD_AUTO_MANUAL_SELECTION,
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
  }
}
