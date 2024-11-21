"use client"

import {
  CONTROL_TRANSFORMER_CONFIGURATION,
  CURRENT_TRANSFORMER_COATING,
  CURRENT_TRANSFORMER_NUMBER,
  GA_BUSBAR_CHAMBER_POSITION,
  GA_CABLE_ENTRY_POSITION,
  GA_CURRENT_DENSITY,
  GA_ENCLOSURE_PROTECTION_DEGREE,
  GA_GLAND_PLATE_3MM_ATTACHMENT_TYPE,
  GA_GLAND_PLATE_3MM_DRILL_TYPE,
  GA_MCC_COMPARTMENTAL,
  GA_MCC_CONSTRUCTION_DRAWOUT_TYPE,
  GA_MCC_CONSTRUCTION_FRONT_TYPE,
  GA_MCC_CONSTRUCTION_TYPE,
  GA_MOC,
  GA_MOC_THICKNESS_COVERS,
  GA_MOC_THICKNESS_DOOR,
  GA_PANEL_MOUNTING_FRAME,
  GA_PANEL_MOUNTING_HEIGHT,
  GA_POWER_CONTROL_BUSBAR_SEPARATION,
  INCOMER_ABOVE_AMPERE,
  INCOMER_ABOVE_POLE,
  INCOMER_ABOVE_TYPE,
  INCOMER_AMPERE,
  INCOMER_POLE,
  INCOMER_TYPE,
  MI_ANALOG,
  MI_COMMUNICATION_PROTOCOL,
  MI_DIGITAL,
  PPC_BASE_FRAME_PAINT_SHADE,
  PPC_COMPONENT_MOUNTING_PLATE_PAINT_SHADE,
  PPC_INTERIOR_EXTERIOR_PAINT_SHADE,
  PPC_MINIMUM_COATING_THICKNESS,
  PPC_PAINTING_STANDARDS,
  PPC_PRETREATMENT_PANEL_STANDARD,
} from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"
import { moveNAtoEnd, sortDropdownOptions } from "utils/helpers"

export default function useMCCPCCPanelDropdowns() {
  let { dropdownOptions: incomer_ampere_options } = useDropdownOptions(`${INCOMER_AMPERE}?fields=["*"]`, "name")
  incomer_ampere_options = sortDropdownOptions(incomer_ampere_options)
  const { dropdownOptions: incomer_pole_options } = useDropdownOptions(`${INCOMER_POLE}?fields=["*"]`, "name")
  const { dropdownOptions: incomer_type_options } = useDropdownOptions(`${INCOMER_TYPE}?fields=["*"]`, "name")
  let { dropdownOptions: incomer_above_ampere_options } = useDropdownOptions(
    `${INCOMER_ABOVE_AMPERE}?fields=["*"]`,
    "name"
  )
  incomer_above_ampere_options = sortDropdownOptions(incomer_above_ampere_options)
  const { dropdownOptions: incomer_above_pole_options } = useDropdownOptions(
    `${INCOMER_ABOVE_POLE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: incomer_above_type_options } = useDropdownOptions(
    `${INCOMER_ABOVE_TYPE}?fields=["*"]`,
    "name"
  )
  let { dropdownOptions: current_transformer_coating_options } = useDropdownOptions(
    `${CURRENT_TRANSFORMER_COATING}?fields=["*"]`,
    "name"
  )
  let { dropdownOptions: control_transformer_configuration_options } = useDropdownOptions(
    `${CONTROL_TRANSFORMER_CONFIGURATION}?fields=["*"]`,
    "control_transformer_configuration"
  )
  current_transformer_coating_options = moveNAtoEnd(current_transformer_coating_options)

  let { dropdownOptions: current_transformer_number_options } = useDropdownOptions(
    `${CURRENT_TRANSFORMER_NUMBER}?fields=["*"]`,
    "name"
  )
  current_transformer_number_options = moveNAtoEnd(current_transformer_number_options)

  // let { dropdownOptions: control_transformer_configuration_options } = useDropdownOptions(
  //   `${CONTROL_TRANSFORMER_CONFIGURATION}?fields=["*"]`,
  //   "control_transformer_configuration"
  // )
  control_transformer_configuration_options = moveNAtoEnd(control_transformer_configuration_options)
  let { dropdownOptions: mi_analog_options } = useDropdownOptions(`${MI_ANALOG}?fields=["*"]`, "name")
  mi_analog_options = moveNAtoEnd(mi_analog_options)
  let { dropdownOptions: mi_digital_options } = useDropdownOptions(`${MI_DIGITAL}?fields=["*"]`, "name")
  mi_digital_options = moveNAtoEnd(mi_digital_options)
  let { dropdownOptions: mi_communication_protocol_options } = useDropdownOptions(
    `${MI_COMMUNICATION_PROTOCOL}?fields=["*"]`,
    "name"
  )
  mi_communication_protocol_options = moveNAtoEnd(mi_communication_protocol_options)
  const { dropdownOptions: ga_moc_material_options } = useDropdownOptions(`${GA_MOC}?fields=["*"]`, "name")
  const { dropdownOptions: ga_moc_thickness_door_options } = useDropdownOptions(
    `${GA_MOC_THICKNESS_DOOR}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_moc_thickness_covers_options } = useDropdownOptions(
    `${GA_MOC_THICKNESS_COVERS}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_mcc_compartmental_options } = useDropdownOptions(
    `${GA_MCC_COMPARTMENTAL}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_mcc_construction_front_type_options } = useDropdownOptions(
    `${GA_MCC_CONSTRUCTION_FRONT_TYPE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_mcc_construction_drawout_type_options } = useDropdownOptions(
    `${GA_MCC_CONSTRUCTION_DRAWOUT_TYPE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_mcc_construction_type_options } = useDropdownOptions(
    `${GA_MCC_CONSTRUCTION_TYPE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_current_density_options } = useDropdownOptions(
    `${GA_CURRENT_DENSITY}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_panel_mounting_frame_options } = useDropdownOptions(
    `${GA_PANEL_MOUNTING_FRAME}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_panel_mounting_height_options } = useDropdownOptions(
    `${GA_PANEL_MOUNTING_HEIGHT}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_gland_plate_3mm_drill_type_options } = useDropdownOptions(
    `${GA_GLAND_PLATE_3MM_DRILL_TYPE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_gland_plate_3mm_attachment_type_options } = useDropdownOptions(
    `${GA_GLAND_PLATE_3MM_ATTACHMENT_TYPE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_busbar_chamber_position_options } = useDropdownOptions(
    `${GA_BUSBAR_CHAMBER_POSITION}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_power_and_control_busbar_separation_options } = useDropdownOptions(
    `${GA_POWER_CONTROL_BUSBAR_SEPARATION}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_enclosure_protection_degree_options } = useDropdownOptions(
    `${GA_ENCLOSURE_PROTECTION_DEGREE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ga_cable_entry_position_options } = useDropdownOptions(
    `${GA_CABLE_ENTRY_POSITION}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_painting_standards_options } = useDropdownOptions(
    `${PPC_PAINTING_STANDARDS}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_interior_and_exterior_paint_shade_options } = useDropdownOptions(
    `${PPC_INTERIOR_EXTERIOR_PAINT_SHADE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_component_mounting_plate_paint_shade_options } = useDropdownOptions(
    `${PPC_COMPONENT_MOUNTING_PLATE_PAINT_SHADE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_base_frame_paint_shade_options } = useDropdownOptions(
    `${PPC_BASE_FRAME_PAINT_SHADE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_minimum_coating_thickness_options } = useDropdownOptions(
    `${PPC_MINIMUM_COATING_THICKNESS}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: ppc_pretreatment_panel_standard_options } = useDropdownOptions(
    `${PPC_PRETREATMENT_PANEL_STANDARD}?fields=["*"]`,
    "name"
  )

  return {
    incomer_ampere_options,
    incomer_pole_options,
    incomer_type_options,
    incomer_above_ampere_options,
    incomer_above_pole_options,
    incomer_above_type_options,
    current_transformer_coating_options,
    current_transformer_number_options,
    mi_analog_options,
    mi_digital_options,
    mi_communication_protocol_options,
    ga_moc_material_options,
    ga_moc_thickness_door_options,
    ga_moc_thickness_covers_options,
    control_transformer_configuration_options,
    ga_mcc_compartmental_options,
    ga_mcc_construction_front_type_options,
    ga_mcc_construction_drawout_type_options,
    ga_mcc_construction_type_options,
    ga_current_density_options,
    ga_panel_mounting_frame_options,
    ga_panel_mounting_height_options,
    ga_gland_plate_3mm_drill_type_options,
    ga_gland_plate_3mm_attachment_type_options,
    ga_busbar_chamber_position_options,
    ga_power_and_control_busbar_separation_options,
    ga_enclosure_protection_degree_options,
    ga_cable_entry_position_options,
    ppc_painting_standards_options,
    ppc_interior_and_exterior_paint_shade_options,
    ppc_component_mounting_plate_paint_shade_options,
    ppc_base_frame_paint_shade_options,
    ppc_minimum_coating_thickness_options,
    ppc_pretreatment_panel_standard_options,
  }
}
