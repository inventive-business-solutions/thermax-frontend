import * as zod from "zod"
export const configItemValidationSchema = zod.object({
  dol_starter: zod.string({ required_error: "DOL Starter is required", message: "DOL Starter is required" }),
  star_delta_starter: zod.string({
    required_error: "Star Delta Starter is required",
    message: "Star Delta Starter is required",
  }),
  ammeter: zod.string({ required_error: "Ammeter is required", message: "Ammeter is required" }),
  ammeter_configuration: zod.string({
    required_error: "Ammeter Configuration is required",
    message: "Ammeter Configuration is required",
  }),
  mcc_switchgear_type: zod.string({
    required_error: "MCC Switchgear Type is required",
    message: "MCC Switchgear Type is required",
  }),
  switchgear_combination: zod.string({
    required_error: "Switchgear Combination is required",
    message: "Switchgear Combination is required",
  }),
  // SUPPLY FEEDER
  pole: zod.string({ required_error: "Pole is required", message: "Pole is required" }),
  supply_feeder_standard: zod.string({
    required_error: "Supply Feeder Standard is required",
    message: "Supply Feeder Standard is required",
  }),
  dm_standard: zod.string({
    required_error: "Design & Manufacturer's Standard is required",
    message: "Design & Manufacturer's Standard is required",
  }),
  testing_standard: zod.string({
    required_error: "Testing Standard is required",
    message: "Testing Standard is required",
  }),
  // Wiring
  power_wiring_color: zod.string({
    required_error: "Power Wiring Color is required",
    message: "Power Wiring Color is required",
  }),
  power_wiring_size: zod.string({
    required_error: "Power Wiring Length is required",
    message: "Control Wiring Color is required",
  }),
  control_wiring_color: zod.string({
    required_error: "Control Wiring Color is required",
    message: "Control Wiring Color is required",
  }),
  control_wiring_size: zod.string({
    required_error: "Control Wiring Length is required",
    message: "Control Wiring Length is required",
  }),
  vdc_24_wiring_color: zod.string({
    required_error: "VDC 24 Wiring Color is required",
    message: "VDC 24 Wiring Color is required",
  }),
  vdc_24_wiring_size: zod.string({
    required_error: "VDC 24 Wiring Length is required",
    message: "VDC 24 Wiring Length is required",
  }),
  analog_signal_wiring_color: zod.string({
    required_error: "Analog Signal Wiring Color is required",
    message: "Analog Signal Wiring Color is required",
  }),
  analog_signal_wiring_size: zod.string({
    required_error: "Analog Signal Wiring Length is required",
    message: "Analog Signal Wiring Length is required",
  }),
  ct_wiring_color: zod.string({
    required_error: "CT Wiring Color is required",
    message: "CT Wiring Color is required",
  }),
  ct_wiring_size: zod.string({
    required_error: "CT Wiring Length is required",
    message: "CT Wiring Length is required",
  }),
  cable_insulation_pvc: zod.string({
    required_error: "Cable Insulation PVC is required",
    message: "Cable Insulation PVC Wiring Length is required",
  }),
  ferrule: zod.string({ required_error: "Ferrule is required", message: "Ferrule is required" }),
  common_requirement: zod.string({
    required_error: "Common Requirement is required",
    message: "Common Requirements is required",
  }),
  // Terminal
  spare_terminal: zod.string({ required_error: "Spare Terminal is required", message: "Spare Terminal is required" }),
  push_button_start: zod.string({
    required_error: "Push Button Start is required",
    message: "Push Button Start is required",
  }),
  push_button_stop: zod.string({
    required_error: "Push Button Stop is required",
    message: "Push Button Stop is required",
  }),
  push_button_ess: zod.string({
    required_error: "Push Button ESS is required",
    message: "Push Button ESS is required",
  }),
  is_push_button_speed_selected: zod.string({
    required_error: "Push Button Speed is required",
    message: "Push Button Speed is required",
  }),
  speed_increase_pb: zod.string({
    required_error: "Speed Increase PB is required",
    message: "Speed Increase PB is required",
  }),
  speed_decrease_pb: zod.string({
    required_error: "Speed Decrease PB is required",
    message: "Speed Decrease PB is required",
  }),
  alarm_acknowledge_and_lamp_test: zod.string({
    required_error: "Alarm Acknoowledgement and Lamp Test is required",
    message: "Alarm Acknowledgement and Lamp Test is required",
  }),
  test_reset: zod.string({ required_error: "Test Reset is required", message: "Test Reset is required" }),
  // Selector Switch
  selector_switch_applicable: zod.string({
    required_error: "Selector Switch Applicable is required",
    message: "Selector Switch Applicable is required",
  }),
  selector_switch_lockable: zod.string({
    required_error: "Selector Switch Lockable is required",
    message: "Selector Switch Lockable is required",
  }),
  // Indication Lamp
  running_open: zod.string({
    required_error: "Running/Open field is required",
    message: "Running/Open field is required",
  }),
  stopped_closed: zod.string({
    required_error: "Stopped/Closed field is required",
    message: "Stopped/Closed field is required",
  }),
  trip: zod.string({ required_error: "Trip field is required", message: "Trip field is required" }),
  // Field Motor Isolator (General Specification)
  field_motor_type: zod.string({
    required_error: "Field Motor Isolator type is required",
    message: "Field Motor Isolator Type is required",
  }),
  field_motor_enclosure: zod.string({
    required_error: "Field Motor Isolator Enclosure is required",
    message: "Field Motor Isolator Enclosure is required",
  }),
  field_motor_material: zod.string({
    required_error: "Field Motor Isolator Material is required",
    message: "Field Motor Isolator Material is required",
  }),
  field_motor_qty: zod.string({
    required_error: "Field Motor Isolator Qty is required",
    message: "Field Motor Isolator Qty is required",
  }),
  field_motor_isolator_color_shade: zod.string({
    required_error: "Field Motor Isolator Color Shade is required",
    message: "Field Motor Isolator Color Shade is required",
  }),
  field_motor_cable_entry: zod.string({
    required_error: "Field Motor Isolator Cable Entry is required",
    message: "Field Motor Isolator Cable Entry is required",
  }),
  field_motor_canopy_on_top: zod.string({
    required_error: "Field Motor Isolator Canopy On Top is Required",
    message: "Field Motor Isolator Canopy On Top is Required",
  }),
  // Local Push Button Station (General Specification)
  lpbs_type: zod.string({
    required_error: "Local Push Button Station Type is required",
    message: "Local Push Button Station Type is required",
  }),
  lpbs_enclosure: zod.string({
    required_error: "Local Push Button Station Enclosure is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_material: zod.string({
    required_error: "Local Push Button Station Material is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_qty: zod.string({
    required_error: "Local Push Button Station Quantity is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_color_shade: zod.string({
    required_error: "Local Push Button Station Color Shade is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_canopy_on_top: zod.string({
    required_error: "Local Push Button Station Canopy On Top is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_push_button_start_color: zod.string({
    required_error: "Local Push Button Station Color is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_indication_lamp_start_color: zod.string({
    required_error: "Local Push Button Station Indicator ON is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_indication_lamp_stop_color: zod.string({
    required_error: "Local Push Button Station Indicator OFF is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_speed_increase: zod.string({
    required_error: "Local Push Button Station Speed Increase is required",
    message: "Local Push Button Station is required",
  }),
  lpbs_speed_decrease: zod.string({
    required_error: "Local Push Button Station Speed Decrease is required",
    message: "Local Push Button Station is required",
  }),
  // APFC
  apfc_relay: zod.string({ required_error: "APFC Relay is required", message: "APFC Relay is required" }),
  // Power Bus
  power_bus_main_busbar_selection: zod.string({
    required_error: "Main Busbar Selection is required",
    message: "Main Busbar Selection is required",
  }),
  power_bus_heat_pvc_sleeve: zod.string({
    required_error: "Heat Shrinkable Color PVC sleeve (L1, L2, L3, N) is required",
    message: "Heat Shrinkable Color PVC sleeve (L1, L2, L3, N) is required",
  }),
  power_bus_material: zod.string({
    required_error: "Power Bus Material is required",
    message: "Power Bus Material is required",
  }),
  power_bus_current_density: zod.string({
    required_error: "Power Bus Current Density is required",
    message: "Power Bus Current Density is required",
  }),
  power_bus_rating_of_busbar: zod.string({
    required_error: "Power Bus Rating of Busbar is required",
    message: "Power Bus Rating of Busbar is required",
  }),
  // Control Bus
  control_bus_main_busbar_selection: zod.string({
    required_error: "Control Bus Main Busbar Selection is required",
    message: "Control Bus Main Busbar Selection is required",
  }),
  control_bus_heat_pvc_sleeve: zod.string({
    required_error: "Heat Shrinkable Color PVC sleeve (L1, L2, L3, N) is required",
    message: "Heat Shrinkable Color PVC sleeve (L1, L2, L3, N) is required",
  }),
  control_bus_material: zod.string({
    required_error: "Control Bus Material is required",
    message: "Control Bus Material is required",
  }),
  control_bus_current_density: zod.string({
    required_error: "Control Bus Current Density is required",
    message: "Control Bus Current Density is required",
  }),
  control_bus_rating_of_busbar: zod.string({
    required_error: "Control Bus Rating of Busbar is required",
    message: "Control Bus Rating of Busbar is required",
  }),
  // Earth Bus
  earth_bus_main_busbar_selection: zod.string({
    required_error: "Earth Bus Main Busbar Selection is required",
    message: "Earth Bus Main Busbar Selection is required",
  }),
  earth_bus_busbar_position: zod.string({
    required_error: "Earth Bus Busbar Position is required",
    message: "Earth Bus Busbar Position is required",
  }),
  earth_bus_material: zod.string({
    required_error: "Earth Bus Material is required",
    message: "Earth Bus Material is required",
  }),
  earth_bus_current_density: zod.string({
    required_error: "Earth Bus Current Density is required",
    message: "Earth Bus Current Density is required",
  }),
  earth_bus_rating_of_busbar: zod.string({
    required_error: "Earth Bus Rating of Busbar is required",
    message: "Earth Bus Rating of Busbar is required",
  }),
  // Metering for Feeder
  metering_for_feeder: zod.string({
    required_error: "Metering for Feeder is required",
    message: "Metering for Feeder is required",
  }),
  // Others
  cooling_fans: zod.string({ required_error: "Cooling Fans is required", message: "Cooling Fans is required" }),
  louvers_and_filters: zod.string({
    required_error: "Louvers and Filters is required",
    message: "Louvers and Filters is required",
  }),
  alarm_annunciator: zod.string({
    required_error: "Alarm Annunciator is required",
    message: "Alarm Annunciator is required",
  }),
  control_transformer: zod.string({
    required_error: "Control Transformer is required",
    message: "Control Transformer is required",
  }),
  // Spares
  commissioning_spare: zod.string().optional(),
  two_year_operational_spare: zod.string().optional(),
})

export const mccPanelValidationSchema = zod.object({
  incomer_ampere: zod.string({ required_error: "Incomer Ampere is required", message: "Incomer Ampere is required" }),
  incomer_pole: zod.string({ required_error: "Incomer Pole is required", message: "Incomer Pole is required" }),
  incomer_type: zod.string({ required_error: "Incomer Type is required", message: "Incomer Type is required" }),
  incomer_above_ampere: zod.string({
    required_error: "Incomer Above Ampere is required",
    message: "Incomer Above Ampere is required",
  }),
  incomer_above_pole: zod.string({
    required_error: "Incomer Above Pole is required",
    message: "Incomer Above Pole is required",
  }),
  incomer_above_type: zod.string({
    required_error: "Incomer Above Type is required",
    message: "Incomer Above Type is required",
  }),
  is_under_or_over_voltage_selected: zod.number().optional(),
  is_lsig_selected: zod.number().optional(),
  is_lsi_selected: zod.number().optional(),
  is_neural_link_with_disconnect_facility_selected: zod.number().optional(),
  is_led_type_lamp_selected: zod.number({
    required_error: "LED Type Lamp is required",
    message: "LED Type Lamp is required",
  }),
  is_blue_cb_spring_charge_selected: zod.number().optional(),
  is_red_cb_in_service: zod.number().optional(),
  is_white_healthy_trip_circuit_selected: zod.number().optional(),
  current_transformer_coating: zod.string({
    required_error: "Current Transformer Coating is required",
    message: "Current Transformer Coating is required",
  }),
  current_transformer_number: zod.string({
    required_error: "Current Transformer Number is required",
    message: "Current Transformer Number is required",
  }),
  alarm_annunciator: zod.string({
    required_error: "Alarm Annunciator is required",
    message: "Alarm Annunciator is required",
  }),
  mi_analog: zod.string({ required_error: "Analog is required", message: "Analog is required" }),
  mi_digital: zod.string({ required_error: "Digital is required", message: "Digital is required" }),
  mi_communication_protocol: zod.string({
    required_error: "Communication Protocol is required",
    message: "Communication Protocol is required",
  }),
  ga_moc_material: zod.string({ required_error: "MOC Material is required", message: "MOC Material is required" }),
  ga_moc_thickness_door: zod.string({
    required_error: "MOC Thickness Door is required",
    message: "MOC Thickness Door is required",
  }),
  ga_moc_thickness_covers: zod.string({
    required_error: "MOC Thickness Covers is required",
    message: "MOC Thickness Covers is required",
  }),
  ga_mcc_compartmental: zod.string({
    required_error: "MCC Compartmental is required",
    message: "MCC Compartmental is required",
  }),
  ga_mcc_construction_front_type: zod.string({
    required_error: "MCC Construction Front Type is required",
    message: "MCC Construction Front Type is required",
  }),
  ga_mcc_construction_drawout_type: zod.string({
    required_error: "MCC Construction Drawout Type is required",
    message: "MCC Construction Drawout Type is required",
  }),
  ga_mcc_construction_type: zod.string({
    required_error: "MCC Construction Type is required",
    message: "MCC Construction Type is required",
  }),
  busbar_material_of_construction: zod.string({
    required_error: "Busbar Material Of Construction is required",
    message: "Busbar Material Of Construction is required",
  }),
  ga_current_density: zod.string({
    required_error: "Current Density is required",
    message: "Current Density is required",
  }),
  ga_panel_mounting_frame: zod.string({
    required_error: "Panel Mounting Frame is required",
    message: "Panel Mounting Frame is required",
  }),
  ga_panel_mounting_height: zod.string({
    required_error: "Panel Mounting Height is required",
    message: "Panel Mounting Height is required",
  }),
  is_marshalling_section_selected: zod.number().optional(),
  is_cable_alley_section_selected: zod.number().optional(),
  is_power_and_bus_separation_section_selected: zod.number().optional(),
  is_both_side_extension_section_selected: zod.number().optional(),
  ga_gland_plate_3mm_drill_type: zod.string({
    required_error: "Gland Plate Drill Type is required",
    message: "Gland Plate Drill Type is required",
  }),
  ga_gland_plate_3mm_attachment_type: zod.string({
    required_error: "Gland Plate Attachment Type is required",
    message: "Gland Plate Attachment Type is required",
  }),
  ga_busbar_chamber_position: zod.string({
    required_error: "Busbar Chamber Position is required",
    message: "Busbar Chamber Position is required",
  }),
  ga_power_and_control_busbar_separation: zod.string({
    required_error: "Power and Control Busbar Separation is required",
    message: "Power and Control Busbar Separation is required",
  }),
  ga_enclosure_protection_degree: zod.string({
    required_error: "Enclosure Protection Degree is required",
    message: "Enclosure Protection Degree is required",
  }),
  ga_cable_entry_position: zod.string({
    required_error: "Cable Entry Position is required",
    message: "Cable Entry Position is required",
  }),
  ppc_painting_standards: zod.string({
    required_error: "Painting Standards is required",
    message: "Painting Standards is required",
  }),
  ppc_interior_and_exterior_paint_shade: zod.string({
    required_error: "Interior and Exterior Paint Shade is required",
    message: "Interior and Exterior Paint Shade is required",
  }),
  ppc_component_mounting_plate_paint_shade: zod.string({
    required_error: "Component Mounting Plate Paint Shade is required",
    message: "Component Mounting Plate Paint Shade is required",
  }),
  ppc_base_frame_paint_shade: zod.string({
    required_error: "Base Frame Paint Shade is required",
    message: "Base Frame Paint Shade is required",
  }),
  ppc_minimum_coating_thickness: zod.string({
    required_error: "Minimum Coating Thickness is required",
    message: "Minimum Coating Thickness is required",
  }),
  ppc_pretreatment_panel_standard: zod.string({
    required_error: "Pretreatment Panel Standard is required",
    message: "Pretreatment Panel Standard is required",
  }),
  vfd_auto_manual_selection: zod.string({
    required_error: "VFD Auto Manual Selection is required",
    message: "VFD Auto Manual Selection is required",
  }),
  is_punching_details_for_boiler_selected: zod.number({
    required_error: "Punching Details For Boiler is required",
    message: "Punching Details For Boiler is required",
  }),
  boiler_model: zod.string({ required_error: "Boiler Model is required", message: "Boiler Model is required" }),
  boiler_fuel: zod.string({ required_error: "Boiler Fuel is required", message: "Boiler Fuel is required" }),
  boiler_year: zod.string({ required_error: "Boiler Year is required", message: "Boiler Year is required" }),
  boiler_power_supply_vac: zod.string({
    required_error: "Boiler Power Supply VAC is required",
    message: "Boiler Power Supply VAC is required",
  }),
  boiler_power_supply_phase: zod.string({
    required_error: "Boiler Power Supply Phase is required",
    message: "Boiler Power Supply Phase is required",
  }),
  boiler_power_supply_frequency: zod.string({
    required_error: "Boiler Power Supply Frequency is required",
    message: "Boiler Power Supply Frequency is required",
  }),
  boiler_control_supply_vac: zod.string({
    required_error: "Boiler Control Supply VAC is required",
    message: "Boiler Control Supply VAC is required",
  }),
  boiler_control_supply_phase: zod.string({
    required_error: "Boiler Control Supply Phase is required",
    message: "Boiler Control Supply Phase is required",
  }),
  boiler_control_supply_frequency: zod.string({
    required_error: "Boiler Control Supply Frequency is required",
    message: "Boiler Control Supply Frequency is required",
  }),
  boiler_evaporation: zod.string({
    required_error: "Boiler Evaporation is required",
    message: "Boiler Evaporation is required",
  }),
  boiler_output: zod.string({ required_error: "Boiler Output is required", message: "Boiler Output is required" }),
  boiler_connected_load: zod.string({
    required_error: "Boiler Connected Load is required",
    message: "Boiler Connected Load is required",
  }),
  boiler_design_pressure: zod.string({
    required_error: "Boiler Design Pressure is required",
    message: "Boiler Design Pressure is required",
  }),
  is_punching_details_for_heater_selected: zod.number({
    required_error: "Punching Details For Heater is required",
    message: "Punching Details For Heater is required",
  }),
  heater_motor: zod.string({ required_error: "Heater Motor is required", message: "Heater Motor is required" }),
  heater_fuel: zod.string({ required_error: "Heater Fuel is required", message: "Heater Fuel is required" }),
  heater_year: zod.string({ required_error: "Heater Year is required", message: "Heater Year is required" }),
  heater_power_supply_vac: zod.string({
    required_error: "Heater Power Supply VAC is required",
    message: "Heater Power Supply VAC is required",
  }),
  heater_power_supply_phase: zod.string({
    required_error: "Heater Power Supply Phase is required",
    message: "Heater Power Supply Phase is required",
  }),
  heater_power_supply_frequency: zod.string({
    required_error: "Heater Power Supply Frequency is required",
    message: "Heater Power Supply Frequency is required",
  }),
  heater_control_supply_vac: zod.string({
    required_error: "Heater Control Supply VAC is required",
    message: "Heater Control Supply VAC is required",
  }),
  heater_control_supply_phase: zod.string({
    required_error: "Heater Control Supply Phase is required",
    message: "Heater Control Supply Phase is required",
  }),
  heater_control_supply_frequency: zod.string({
    required_error: "Heater Control Supply Frequency is required",
    message: "Heater Control Supply Frequency is required",
  }),
  heater_evaporation: zod.string({
    required_error: "Heater Evaporation is required",
    message: "Heater Evaporation is required",
  }),
  heater_output: zod.string({ required_error: "Heater Output is required", message: "Heater Output is required" }),
  heater_connected_load: zod.string({
    required_error: "Heater Connected Load is required",
    message: "Heater Connected Load is required",
  }),
  heater_temperature: zod.string({
    required_error: "Heater Temperature is required",
    message: "Heater Temperature is required",
  }),
})

export const pccPanelValidationSchema = zod.object({
  incomer_ampere: zod.string({ required_error: "Incomer Ampere is required", message: "Incomer Ampere is required" }),
  incomer_pole: zod.string({ required_error: "Incomer Pole is required", message: "Incomer Pole is required" }),
  incomer_type: zod.string({ required_error: "Incomer Type is required", message: "Incomer Type is required" }),
  incomer_above_ampere: zod.string({
    required_error: "Incomer Above Ampere is required",
    message: "Incomer Above Ampere is required",
  }),
  incomer_above_pole: zod.string({
    required_error: "Incomer Above Pole is required",
    message: "Incomer Above Pole is required",
  }),
  incomer_above_type: zod.string({
    required_error: "Incomer Above Type is required",
    message: "Incomer Above Type is required",
  }),
  is_under_or_over_voltage_selected: zod.number().optional(),
  is_lsig_selected: zod.number().optional(),
  is_lsi_selected: zod.number().optional(),
  is_neural_link_with_disconnect_facility_selected: zod.number().optional(),
  is_led_type_lamp_selected: zod.number({
    required_error: "LED Type Lamp is required",
    message: "LED Type Lamp is required",
  }),
  is_blue_cb_spring_charge_selected: zod.number().optional(),
  is_red_cb_in_service: zod.number().optional(),
  is_white_healthy_trip_circuit_selected: zod.number().optional(),
  alarm_annunciator: zod.string({
    required_error: "Alarm Annunciator is required",
    message: "Alarm Annunciator is required",
  }),
  mi_analog: zod.string({ required_error: "Analog is required", message: "Analog is required" }),
  mi_digital: zod.string({ required_error: "Digital is required", message: "Digital is required" }),
  mi_communication_protocol: zod.string({
    required_error: "Communication Protocol is required",
    message: "Communication Protocol is required",
  }),
  ga_moc_material: zod.string({ required_error: "MOC Material is required", message: "MOC Material is required" }),
  ga_moc_thickness_door: zod.string({
    required_error: "MOC Thickness Door is required",
    message: "MOC Thickness Door is required",
  }),
  ga_moc_thickness_covers: zod.string({
    required_error: "MOC Thickness Covers is required",
    message: "MOC Thickness Covers is required",
  }),
  ga_pcc_compartmental: zod.string({
    required_error: "PCC Compartmental is required",
    message: "PCC Compartmental is required",
  }),
  ga_pcc_construction_front_type: zod.string({
    required_error: "PCC Construction Front Type is required",
    message: "PCC Construction Front Type is required",
  }),
  ga_pcc_construction_drawout_type: zod.string({
    required_error: "PCC Construction Drawout Type is required",
    message: "PCC Construction Drawout Type is required",
  }),
  ga_pcc_construction_type: zod.string({
    required_error: "PCC Construction Type is required",
    message: "PCC Construction Type is required",
  }),
  busbar_material_of_construction: zod.string({
    required_error: "Busbar Material Of Construction is required",
    message: "Busbar Material Of Construction is required",
  }),
  ga_current_density: zod.string({
    required_error: "Current Density is required",
    message: "Current Density is required",
  }),
  ga_panel_mounting_frame: zod.string({
    required_error: "Panel Mounting Frame is required",
    message: "Panel Mounting Frame is required",
  }),
  ga_panel_mounting_height: zod.string({
    required_error: "Panel Mounting Height is required",
    message: "Panel Mounting Height is required",
  }),
  is_marshalling_section_selected: zod.number().optional(),
  is_cable_alley_section_selected: zod.number().optional(),
  is_power_and_bus_separation_section_selected: zod.number().optional(),
  is_both_side_extension_section_selected: zod.number().optional(),
  ga_gland_plate_3mm_drill_type: zod.string({
    required_error: "Gland Plate Drill Type is required",
    message: "Gland Plate Drill Type is required",
  }),
  ga_gland_plate_3mm_attachment_type: zod.string({
    required_error: "Gland Plate Attachment Type is required",
    message: "Gland Plate Attachment Type is required",
  }),
  ga_busbar_chamber_position: zod.string({
    required_error: "Busbar Chamber Position is required",
    message: "Busbar Chamber Position is required",
  }),
  ga_power_and_control_busbar_separation: zod.string({
    required_error: "Power and Control Busbar Separation is required",
    message: "Power and Control Busbar Separation is required",
  }),
  ga_enclosure_protection_degree: zod.string({
    required_error: "Enclosure Protection Degree is required",
    message: "Enclosure Protection Degree is required",
  }),
  ga_cable_entry_position: zod.string({
    required_error: "Cable Entry Position is required",
    message: "Cable Entry Position is required",
  }),
  ppc_painting_standards: zod.string({
    required_error: "Painting Standards is required",
    message: "Painting Standards is required",
  }),
  ppc_interior_and_exterior_paint_shade: zod.string({
    required_error: "Interior and Exterior Paint Shade is required",
    message: "Interior and Exterior Paint Shade is required",
  }),
  ppc_component_mounting_plate_paint_shade: zod.string({
    required_error: "Component Mounting Plate Paint Shade is required",
    message: "Component Mounting Plate Paint Shade is required",
  }),
  ppc_base_frame_paint_shade: zod.string({
    required_error: "Base Frame Paint Shade is required",
    message: "Base Frame Paint Shade is required",
  }),
  ppc_minimum_coating_thickness: zod.string({
    required_error: "Minimum Coating Thickness is required",
    message: "Minimum Coating Thickness is required",
  }),
  ppc_pretreatment_panel_standard: zod.string({
    required_error: "Pretreatment Panel Standard is required",
    message: "Pretreatment Panel Standard is required",
  }),

  is_punching_details_for_boiler_selected: zod.number({
    required_error: "Punching Details For Boiler is required",
    message: "Punching Details For Boiler is required",
  }),
  boiler_model: zod.string({ required_error: "Boiler Model is required", message: "Boiler Model is required" }),
  boiler_fuel: zod.string({ required_error: "Boiler Fuel is required", message: "Boiler Fuel is required" }),
  boiler_year: zod.string({ required_error: "Boiler Year is required", message: "Boiler Year is required" }),
  boiler_power_supply_vac: zod.string({
    required_error: "Boiler Power Supply VAC is required",
    message: "Boiler Power Supply VAC is required",
  }),
  boiler_power_supply_phase: zod.string({
    required_error: "Boiler Power Supply Phase is required",
    message: "Boiler Power Supply Phase is required",
  }),
  boiler_power_supply_frequency: zod.string({
    required_error: "Boiler Power Supply Frequency is required",
    message: "Boiler Power Supply Frequency is required",
  }),
  boiler_control_supply_vac: zod.string({
    required_error: "Boiler Control Supply VAC is required",
    message: "Boiler Control Supply VAC is required",
  }),
  boiler_control_supply_phase: zod.string({
    required_error: "Boiler Control Supply Phase is required",
    message: "Boiler Control Supply Phase is required",
  }),
  boiler_control_supply_frequency: zod.string({
    required_error: "Boiler Control Supply Frequency is required",
    message: "Boiler Control Supply Frequency is required",
  }),
  boiler_evaporation: zod.string({
    required_error: "Boiler Evaporation is required",
    message: "Boiler Evaporation is required",
  }),
  boiler_output: zod.string({ required_error: "Boiler Output is required", message: "Boiler Output is required" }),
  boiler_connected_load: zod.string({
    required_error: "Boiler Connected Load is required",
    message: "Boiler Connected Load is required",
  }),
  boiler_design_pressure: zod.string({
    required_error: "Boiler Design Pressure is required",
    message: "Boiler Design Pressure is required",
  }),
  is_punching_details_for_heater_selected: zod.number({
    required_error: "Punching Details For Heater is required",
    message: "Punching Details For Heater is required",
  }),
  heater_motor: zod.string({ required_error: "Heater Motor is required", message: "Heater Motor is required" }),
  heater_fuel: zod.string({ required_error: "Heater Fuel is required", message: "Heater Fuel is required" }),
  heater_year: zod.string({ required_error: "Heater Year is required", message: "Heater Year is required" }),
  heater_power_supply_vac: zod.string({
    required_error: "Heater Power Supply VAC is required",
    message: "Heater Power Supply VAC is required",
  }),
  heater_power_supply_phase: zod.string({
    required_error: "Heater Power Supply Phase is required",
    message: "Heater Power Supply Phase is required",
  }),
  heater_power_supply_frequency: zod.string({
    required_error: "Heater Power Supply Frequency is required",
    message: "Heater Power Supply Frequency is required",
  }),
  heater_control_supply_vac: zod.string({
    required_error: "Heater Control Supply VAC is required",
    message: "Heater Control Supply VAC is required",
  }),
  heater_control_supply_phase: zod.string({
    required_error: "Heater Control Supply Phase is required",
    message: "Heater Control Supply Phase is required",
  }),
  heater_control_supply_frequency: zod.string({
    required_error: "Heater Control Supply Frequency is required",
    message: "Heater Control Supply Frequency is required",
  }),
  heater_evaporation: zod.string({
    required_error: "Heater Evaporation is required",
    message: "Heater Evaporation is required",
  }),
  heater_output: zod.string({ required_error: "Heater Output is required", message: "Heater Output is required" }),
  heater_connected_load: zod.string({
    required_error: "Heater Connected Load is required",
    message: "Heater Connected Load is required",
  }),
  heater_temperature: zod.string({
    required_error: "Heater Temperature is required",
    message: "Heater Temperature is required",
  }),
})
