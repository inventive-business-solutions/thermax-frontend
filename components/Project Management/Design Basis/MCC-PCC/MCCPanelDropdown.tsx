"use client"

import {
  INCOMER_ABOVE_AMPERE,
  INCOMER_ABOVE_POLE,
  INCOMER_ABOVE_TYPE,
  INCOMER_AMPERE,
  INCOMER_POLE,
  INCOMER_TYPE,
  MAKE_CABLE,
  MAKE_LV_SWITCHGEAR,
  MAKE_MOTORS,
  MAKE_PANEL_ENCLOSURE,
  MAKE_PLC,
  MAKE_SOFT_STARTER,
  MAKE_VFD_VSD,
} from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useMCCPanelDropdowns() {
  const { dropdownOptions: incomer_ampere_options } = useDropdownOptions(`${INCOMER_AMPERE}?fields=["*"]`, "name")
  //   incomer_ampere: mccPanelData?.incomer_ampere,
  //     incomer_pole: mccPanelData?.incomer_pole,
  //     incomer_type: mccPanelData?.incomer_type,
  //     incomer_above_ampere: mccPanelData?.incomer_above_ampere,
  //     incomer_above_pole: mccPanelData?.incomer_above_pole,
  //     incomer_above_type: mccPanelData?.incomer_above_type,
  //     is_under_or_over_voltage_selected: mccPanelData?.is_under_or_over_voltage_selected,
  //     is_lsig_selected: mccPanelData?.is_lsig_selected,
  //     is_lsi_selected: mccPanelData?.is_lsi_selected,
  //     is_neural_link_with_disconnect_facility_selected: mccPanelData?.is_neural_link_with_disconnect_facility_selected,
  //     is_led_type_lamp_selected: mccPanelData?.is_led_type_lamp_selected,
  //     is_blue_cb_spring_charge_selected: mccPanelData?.is_blue_cb_spring_charge_selected,
  //     is_red_cb_in_service: mccPanelData?.is_red_cb_in_service,
  //     is_white_healthy_trip_circuit_selected: mccPanelData?.is_white_healthy_trip_circuit_selected,
  //     current_transformer_coating: mccPanelData?.current_transformer_coating,
  //     current_transformer_number: mccPanelData?.current_transformer_number,
  //     alarm_annunciator: mccPanelData?.alarm_annunciator,
  //     mi_analog: mccPanelData?.mi_analog,
  //     mi_digital: mccPanelData?.mi_digital,
  //     mi_communication_protocol: mccPanelData?.mi_communication_protocol,
  //     ga_moc_material: mccPanelData?.ga_moc_material,
  //     ga_moc_thickness_door: mccPanelData?.ga_moc_thickness_door,
  //     ga_moc_thickness_covers: mccPanelData?.ga_moc_thickness_covers,
  //     ga_mcc_compartmental: mccPanelData?.ga_mcc_compartmental,
  //     ga_mcc_construction_front_type: mccPanelData?.ga_mcc_construction_front_type,
  //     ga_mcc_construction_drawout_type: mccPanelData?.ga_mcc_construction_drawout_type,
  //     ga_mcc_construction_type: mccPanelData?.ga_mcc_construction_type,
  //     busbar_material_of_construction: mccPanelData?.busbar_material_of_construction,
  //     ga_current_density: mccPanelData?.ga_current_density,
  //     ga_panel_mounting_frame: mccPanelData?.ga_panel_mounting_frame,
  //     ga_panel_mounting_height: mccPanelData?.ga_panel_mounting_height,
  //     is_marshalling_section_selected: mccPanelData?.is_marshalling_section_selected,
  //     is_cable_alley_section_selected: mccPanelData?.is_cable_alley_section_selected,
  //     is_power_and_bus_separation_section_selected: mccPanelData?.is_power_and_bus_separation_section_selected,
  //     is_both_side_extension_section_selected: mccPanelData?.is_both_side_extension_section_selected,
  //     ga_gland_plate_3mm_drill_type: mccPanelData?.ga_gland_plate_3mm_drill_type,
  //     ga_gland_plate_3mm_attachment_type: mccPanelData?.ga_gland_plate_3mm_attachment_type,
  //     ga_busbar_chamber_position: mccPanelData?.ga_busbar_chamber_position,
  //     ga_power_and_control_busbar_separation: mccPanelData?.ga_power_and_control_busbar_separation,
  //     ga_enclosure_protection_degree: mccPanelData?.ga_enclosure_protection_degree,
  //     ga_cable_entry_position: mccPanelData?.ga_cable_entry_position,
  //     ppc_painting_standards: mccPanelData?.ppc_painting_standards,
  //     ppc_interior_and_exterior_paint_shade: mccPanelData?.ppc_interior_and_exterior_paint_shade,
  //     ppc_component_mounting_plate_paint_shade: mccPanelData?.ppc_component_mounting_plate_paint_shade,
  //     ppc_base_frame_paint_shade: mccPanelData?.ppc_base_frame_paint_shade,
  //     ppc_minimum_coating_thickness: mccPanelData?.ppc_minimum_coating_thickness,
  //     ppc_pretreatment_panel_standard: mccPanelData?.ppc_pretreatment_panel_standard,
  //     vfd_auto_manual_selection: mccPanelData?.vfd_auto_manual_selection,
  //     is_punching_details_for_boiler_selected: mccPanelData?.is_punching_details_for_boiler_selected,
  //     boiler_model: mccPanelData?.boiler_model,
  //     boiler_fuel: mccPanelData?.boiler_fuel,
  //     boiler_year: mccPanelData?.boiler_year,
  //     boiler_power_supply_vac: mccPanelData?.boiler_power_supply_vac,
  //     boiler_power_supply_phase: mccPanelData?.boiler_power_supply_phase,
  //     boiler_power_supply_frequency: mccPanelData?.boiler_power_supply_frequency,
  //     boiler_control_supply_vac: mccPanelData?.boiler_control_supply_vac,
  //     boiler_control_supply_phase: mccPanelData?.boiler_control_supply_phase,
  //     boiler_control_supply_frequency: mccPanelData?.boiler_control_supply_frequency,
  //     boiler_evaporation: mccPanelData?.boiler_evaporation,
  //     boiler_output: mccPanelData?.boiler_output,
  //     boiler_connected_load: mccPanelData?.boiler_connected_load,
  //     boiler_design_pressure: mccPanelData?.boiler_design_pressure,
  //     is_punching_details_for_heater_selected: mccPanelData?.is_punching_details_for_heater_selected,
  //     heater_motor: mccPanelData?.heater_motor,
  //     heater_fuel: mccPanelData?.heater_fuel,
  //     heater_year: mccPanelData?.heater_year,
  //     heater_power_supply_vac: mccPanelData?.heater_power_supply_vac,
  //     heater_power_supply_phase: mccPanelData?.heater_power_supply_phase,
  //     heater_power_supply_frequency: mccPanelData?.heater_power_supply_frequency,
  //     heater_control_supply_vac: mccPanelData?.heater_control_supply_vac,
  //     heater_control_supply_phase: mccPanelData?.heater_control_supply_phase,
  //     heater_control_supply_frequency: mccPanelData?.heater_control_supply_frequency,
  //     heater_evaporation: mccPanelData?.heater_evaporation,
  //     heater_output: mccPanelData?.heater_output,
  //     heater_connected_load: mccPanelData?.heater_connected_load,
  //     heater_temperature: mccPanelData?.heater_temperature,
  const { dropdownOptions: incomer_pole_options } = useDropdownOptions(`${INCOMER_POLE}?fields=["*"]`, "name")
  const { dropdownOptions: incomer_type_options } = useDropdownOptions(`${INCOMER_TYPE}?fields=["*"]`, "name")
  const { dropdownOptions: incomer_above_ampere_options } = useDropdownOptions(
    `${INCOMER_ABOVE_AMPERE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: incomer_above_pole_options } = useDropdownOptions(
    `${INCOMER_ABOVE_POLE}?fields=["*"]`,
    "name"
  )
  const { dropdownOptions: incomer_above_type_options } = useDropdownOptions(
    `${INCOMER_ABOVE_TYPE}?fields=["*"]`,
    "name"
  )

  return {
    incomer_ampere_options,
    incomer_pole_options,
    incomer_type_options,
    incomer_above_ampere_options,
    incomer_above_pole_options,
    incomer_above_type_options,
  }
}
