import * as zod from "zod"
export const configItemValidationSchema = zod.object({
  rtd_thermocouple_wiring_color: zod.string({
    required_error: "RTD / Thermocouple Wiring Color is required",
    message: "RTD / Thermocouple Wiring Color is required",
  }),
  rtd_thermocouple_wiring_size: zod.string({
    required_error: "RTD / Thermocouple Wiring Size is required",
    message: "RTD / Thermocouple Wiring Size is required",
  }),
  is_field_motor_isolator_selected: zod.string(),
  is_safe_area_isolator_selected: zod.string(),
  is_hazardous_area_isolator_selected: zod.string(),
  is_local_push_button_station_selected: zod.string(),
  is_safe_lpbs_selected: zod.string(),
  is_hazardous_lpbs_selected: zod.string(),
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

  is_control_transformer_applicable: zod.string({
    required_error: "Control Transformer is required",
    message: "Control Transformer is required",
  }),
  control_transformer_primary_voltage: zod.string({
    required_error: "Control Transformer Primary Voltage is required",
    message: "Control Transformer Primary Voltage is required",
  }),
  control_transformer_secondary_voltage: zod.string({
    required_error: "Control Transformer Secondary Voltage is required",
    message: "Control Transformer Secondary Voltage is required",
  }),
  control_transformer_coating: zod.string({
    required_error: "Control Transformer Coating is required",
    message: "Control Transformer Coating is required",
  }),
  control_transformer_quantity: zod.string({
    required_error: "Control Transformer Quantity is required",
    message: "Control Transformer Quantity is required",
  }),
  control_transformer_configuration: zod.string({
    required_error: "Control Transformer Configuration is required",
    message: "Control Transformer Configuration is required",
  }),

  digital_meters: zod.string({
    required_error: "Digital Meters is required",
    message: "Digtial Meters is Required",
  }),
  analog_meters: zod.string({
    required_error: "Analog Meters is required",
    message: "Analog Meters is Required",
  }),
  communication_protocol: zod.string({
    required_error: "Communication Protocol is required",
    message: "Communication Protocol is Required",
  }),

  current_transformer: zod.string({
    required_error: "Current Transformer is required",
    message: "Current Transformer is Required",
  }),

  current_transformer_coating: zod.string({
    required_error: "Current Transformer Coating is required",
    message: "Current Transformer Coating is Required",
  }),
  current_transformer_quantity: zod.string({
    required_error: "Current Transformer Quantity is required",
    message: "Current Transformer Quantity is Required",
  }),
  current_transformer_configuration: zod.string({
    required_error: "Current Transformer Configuration is required",
    message: "Current Transformer Configuration is Required",
  }),

  safe_field_motor_thickness: zod.string({
    required_error: "Safe Field Motor Thickness is required",
    message: "Safe Field Motor Thickness is required",
  }),
  hazardous_field_motor_thickness: zod.string({
    required_error: "Hazardous  Field Motor Thickness is required",
    message: "Hazardous Field Motor Thickness is required",
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
  air_clearance_between_phase_to_phase_bus: zod.string({
    required_error: "Air clearance between phase to phase Bus is required",
    message: "Air clearance between phase to phase Bus is required",
  }),
  air_clearance_between_phase_to_neutral_bus: zod.string({
    required_error: "Air clearance between phase to neutral Bus is required",
    message: "Air clearance between phase to neutral Bus is required",
  }),
  ferrule: zod.string({ required_error: "Ferrule is required", message: "Ferrule is required" }),
  ferrule_note: zod.string({ required_error: "Ferrule is required", message: "Ferrule is required" }),
  device_identification_of_components: zod.string({
    required_error: "Ferrule is required",
    message: "Ferrule is required",
  }),
  general_note_internal_wiring: zod.string({
    required_error: "General Note Internal Wiring is required",
    message: "General Note Internal Wiring is required",
  }),
  common_requirement: zod.string({
    required_error: "Common Requirement is required",
    message: "Common Requirements is required",
  }),
  // Terminal
  power_terminal_clipon: zod.string({
    required_error: "Power Terminal Clipon is required",
    message: "Spare Terminal is required",
  }),
  power_terminal_busbar_type: zod.string({
    required_error: "Power Terminal Busbar Type is required",
    message: "Spare Terminal is required",
  }),
  control_terminal: zod.string({
    required_error: "Control Terminal is required",
    message: "Spare Terminal is required",
  }),
  spare_terminal: zod.string({ required_error: "Spare  is required", message: "Spare Terminal is required" }),
  forward_push_button_start: zod.string({
    required_error: "Push Button Start is required",
    message: "Push Button Start is required",
  }),
  reverse_push_button_start: zod.string({
    required_error: "Push Button Start is required",
    message: "Push Button Start is required",
  }),
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
  potentiometer: zod.string({
    required_error: "Potentiometer ESS is required",
    message: "Potentiometer ESS is required",
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
  lamp_test_push_button: zod.string({
    required_error: "Lamp Test Push Button is required",
    message: "Lamp Test Push Button is required",
  }),
  test_dropdown: zod.string({ required_error: "Test Reset is required", message: "Test Reset is required" }),
  reset_dropdown: zod.string({ required_error: "Test Reset is required", message: "Test Reset is required" }),
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

  // safe area
  safe_field_motor_type: zod.string({
    required_error: "Field Motor Isolator type is required",
    message: "Field Motor Isolator Type is required",
  }),
  safe_field_motor_enclosure: zod.string({
    required_error: "Field Motor Isolator Enclosure is required",
    message: "Field Motor Isolator Enclosure is required",
  }),
  safe_field_motor_material: zod.string({
    required_error: "Field Motor Isolator Material is required",
    message: "Field Motor Isolator Material is required",
  }),
  safe_field_motor_qty: zod.string({
    required_error: "Field Motor Isolator Qty is required",
    message: "Field Motor Isolator Qty is required",
  }),
  safe_field_motor_isolator_color_shade: zod.string({
    required_error: "Field Motor Isolator Color Shade is required",
    message: "Field Motor Isolator Color Shade is required",
  }),
  safe_field_motor_cable_entry: zod.string({
    required_error: "Field Motor Isolator Cable Entry is required",
    message: "Field Motor Isolator Cable Entry is required",
  }),
  safe_field_motor_canopy: zod.string({
    required_error: "Field Motor Isolator Canopy is Required",
    message: "Field Motor Isolator Canopy is Required",
  }),
  safe_field_motor_canopy_type: zod.string({
    required_error: "Field Motor Isolator Canopy Type is Required",
    message: "Field Motor Isolator Canopy Type is Required",
  }),

  // hazardous area
  hazardous_field_motor_type: zod.string({
    required_error: "Field Motor Isolator type is required",
    message: "Field Motor Isolator Type is required",
  }),
  hazardous_field_motor_enclosure: zod.string({
    required_error: "Field Motor Isolator Enclosure is required",
    message: "Field Motor Isolator Enclosure is required",
  }),
  hazardous_field_motor_material: zod.string({
    required_error: "Field Motor Isolator Material is required",
    message: "Field Motor Isolator Material is required",
  }),
  hazardous_field_motor_qty: zod.string({
    required_error: "Field Motor Isolator Qty is required",
    message: "Field Motor Isolator Qty is required",
  }),
  hazardous_field_motor_isolator_color_shade: zod.string({
    required_error: "Field Motor Isolator Color Shade is required",
    message: "Field Motor Isolator Color Shade is required",
  }),
  hazardous_field_motor_cable_entry: zod.string({
    required_error: "Field Motor Isolator Cable Entry is required",
    message: "Field Motor Isolator Cable Entry is required",
  }),
  hazardous_field_motor_canopy: zod.string({
    required_error: "Field Motor Isolator Canopy  is Required",
    message: "Field Motor Isolator Canopy is Required",
  }),
  hazardous_field_motor_canopy_type: zod.string({
    required_error: "Field Motor Isolator Canopy Type is Required",
    message: "Field Motor Isolator Canopy Type is Required",
  }),

  // Local Push Button Station (General Specification)

  // SAFE LPBS
  safe_lpbs_type: zod.string({
    required_error: "Local Push Button Station Type is required",
    message: "Local Push Button Station Type is required",
  }),
  safe_lpbs_enclosure: zod.string({
    required_error: "Local Push Button Station Enclosure is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_material: zod.string({
    required_error: "Local Push Button Station Material is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_thickness: zod.string({
    required_error: "Local Push Button Station Thickness is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_qty: zod.string({
    required_error: "Local Push Button Station Quantity is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_color_shade: zod.string({
    required_error: "Local Push Button Station Color Shade is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_canopy: zod.string({
    required_error: "Local Push Button Station Canopy On Top is required",
    message: "Local Push Button Station is required",
  }),
  safe_lpbs_canopy_type: zod.string({
    required_error: "Local Push Button Station Canopy On Top is required",
    message: "Local Push Button Station is required",
  }),

  // HAZARDOUS LPBS
  hazardous_lpbs_type: zod.string({
    required_error: "Local Push Button Station Type is required",
    message: "Local Push Button Station Type is required",
  }),
  hazardous_lpbs_enclosure: zod.string({
    required_error: "Local Push Button Station Enclosure is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_material: zod.string({
    required_error: "Local Push Button Station Material is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_thickness: zod.string({
    required_error: "Local Push Button Station Thickness is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_qty: zod.string({
    required_error: "Local Push Button Station Quantity is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_color_shade: zod.string({
    required_error: "Local Push Button Station Color Shade is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_canopy: zod.string({
    required_error: "Local Push Button Station Canopy On Top is required",
    message: "Local Push Button Station is required",
  }),
  hazardous_lpbs_canopy_type: zod.string({
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
  //   // APFC
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
  door_earthing: zod.string({
    required_error: "Door Earthing is required",
    message: "Door Earthing is required",
  }),
  instrument_earth: zod.string({
    required_error: "Instrument Earth is required",
    message: "Instrument Earth is required",
  }),
  general_note_busbar_and_insulation_materials: zod.string({
    required_error: "General Note Busbar and Insulation Material is required",
    message: "General Note Busbar and Insulation Material is required",
  }),
  //  Metering for Feeder
  metering_for_feeders: zod.string({
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

export const mccPanelValidationSchema = zod
  .object({
    is_spg_applicable: zod.string().optional(),
    incomer_ampere: zod.string({ required_error: "Incomer Ampere is required", message: "Incomer Ampere is required" }),
    special_note: zod.string().optional(),
    incomer_pole: zod.string({ required_error: "Incomer Pole is required", message: "Incomer Pole is required" }),
    incomer_type: zod.string({ required_error: "Incomer Type is required", message: "Incomer Type is required" }),
    incomer_above_ampere: zod.string({
      required_error: "Incomer Above Ampere is required",
      message: "Incomer Above Ampere is required",
    }),
    control_transformer_coating: zod.string({
      required_error: "Control Transformer Coating is required",
      message: "Control Transformer Coating is required",
    }),
    control_transformer_configuration: zod.string({
      required_error: "Control Transformer Configuration is required",
      message: "Control Transformer Configuration is required",
    }),
    is_other_selected: zod.number().optional(),
    led_type_other_input: zod.string().optional(),
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
    is_led_type_lamp_selected: zod.string({
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
      required_error: "Current Transformer Quantity is required",
      message: "Current Transformer Quantity is required",
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
    ga_moc_material: zod.string({ required_error: "MOC is required", message: "MOC is required" }),
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
    is_punching_details_for_boiler_selected: zod.string({
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
    is_punching_details_for_heater_selected: zod.string({
      required_error: "Punching Details For Heater is required",
      message: "Punching Details For Heater is required",
    }),
    heater_model: zod.string({ required_error: "Heater Motor is required", message: "Heater Motor is required" }),
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
    spg_name_plate_unit_name: zod.string({
      required_error: "Unit Name is required",
      message: "Unit Name is required",
    }),
    spg_name_plate_capacity: zod.string({
      required_error: "Capacity is required",
      message: "Capacity is required",
    }),
    spg_name_plate_manufacturing_year: zod.string({
      required_error: "Manufacturing Year is required",
      message: "Manufacturing Year is required",
    }),
    spg_name_plate_weight: zod.string({
      required_error: "Weight is required",
      message: "Weight is required",
    }),
    spg_name_plate_oc_number: zod.string({
      required_error: "OC Number is required",
      message: "OC Number is required",
    }),
    spg_name_plate_part_code: zod.string({
      required_error: "Part Code is required",
      message: "Part Code is required",
    }),
  })
  .refine((fieldsData) => !(fieldsData.mi_analog === fieldsData.mi_digital), {
    message: "Analog and Digital meter cannot be same",
    path: ["mi_digital"],
  })

export const pccPanelValidationSchema = zod
  .object({
    is_spg_applicable: zod.string().optional(),
    incomer_ampere: zod.string({ required_error: "Incomer Ampere is required", message: "Incomer Ampere is required" }),
    special_note: zod.string().optional(),
    is_other_selected: zod.number().optional(),
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
    control_transformer_coating: zod.string({
      required_error: "Control Transformer Coating is required",
      message: "Control Transformer Coating is required",
    }),
    control_transformer_configuration: zod.string({
      required_error: "Control Transformer Configuration is required",
      message: "Control Transformer Configuration is required",
    }),
    is_under_or_over_voltage_selected: zod.number().optional(),
    is_lsig_selected: zod.number().optional(),
    is_lsi_selected: zod.number().optional(),
    is_neural_link_with_disconnect_facility_selected: zod.number().optional(),
    is_led_type_lamp_selected: zod.string({
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
    ga_moc_material: zod.string({ required_error: "MOC is required", message: "MOC is required" }),
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

    is_punching_details_for_boiler_selected: zod.string({
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
    is_punching_details_for_heater_selected: zod.string({
      required_error: "Punching Details For Heater is required",
      message: "Punching Details For Heater is required",
    }),
    heater_model: zod.string({ required_error: "Heater Motor is required", message: "Heater Motor is required" }),
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
    spg_name_plate_unit_name: zod.string({
      required_error: "Unit Name is required",
      message: "Unit Name is required",
    }),
    spg_name_plate_capacity: zod.string({
      required_error: "Capacity is required",
      message: "Capacity is required",
    }),
    spg_name_plate_manufacturing_year: zod.string({
      required_error: "Manufacturing Year is required",
      message: "Manufacturing Year is required",
    }),
    spg_name_plate_weight: zod.string({
      required_error: "Weight is required",
      message: "Weight is required",
    }),
    spg_name_plate_oc_number: zod.string({
      required_error: "OC Number is required",
      message: "OC Number is required",
    }),
    spg_name_plate_part_code: zod.string({
      required_error: "Part Code is required",
      message: "Part Code is required",
    }),
  })
  .refine((fieldsData) => !(fieldsData.mi_digital === fieldsData.mi_analog), {
    message: "Analog and Digital meter cannot be same",
    path: ["mi_digital"],
  })

export const plcPanelValidationSchema = zod.object({
  ups_control_voltage: zod.string({
    required_error: "Control Voltage is required",
    message: "Control Voltage is required",
  }),
  non_ups_control_voltage: zod.string({
    required_error: "Control Voltage is required",
    message: "Control Voltage is required",
  }),
  is_bulk_power_supply_selected: zod.string({
    required_error: "Bulk Power Supply is required",
    message: "Bulk Power Supply is required",
  }),
  ups_scope: zod.string({
    required_error: "UPS Scope is required",
    message: "UPS Scope is required",
  }),
  ups_input_voltage_3p: zod.string({
    required_error: "UPS Input Voltage 3-Phase is required",
    message: "UPS Input Voltage 3-Phase is required",
  }),
  ups_input_voltage_1p: zod.string({
    required_error: "UPS Input Voltage 1-Phase is required",
    message: "UPS Input Voltage 1-Phase is required",
  }),
  ups_output_voltage_1p: zod.string({
    required_error: "UPS Output Voltage 1-Phase is required",
    message: "UPS Output Voltage 1-Phase is required",
  }),
  ups_type: zod.string({
    required_error: "UPS Type is required",
    message: "UPS Type is required",
  }),
  ups_battery_type: zod.string({
    required_error: "UPS Battery Type is required",
    message: "UPS Battery Type is required",
  }),
  is_ups_battery_mounting_rack_selected: zod.string({
    required_error: "UPS Battery Mounting Rack is required",
    message: "UPS Battery Mounting Rack is required",
  }),
  ups_battery_backup_time: zod.string({
    required_error: "UPS Battery Backup Time is required",
    message: "UPS Battery Backup Time is required",
  }),
  ups_redundancy: zod.string({
    required_error: "UPS Redundancy is required",
    message: "UPS Redundancy is required",
  }),
  plc_cpu_system_series: zod.string({
    required_error: "PLC CPU System Series is required",
    message: "PLC CPU System Series is required",
  }),
  plc_cpu_system_input_voltage: zod.string({
    required_error: "PLC CPU System Input Voltage is required",
    message: "PLC CPU System Input Voltage is required",
  }),
  plc_cpu_system_battery_backup: zod.string({
    required_error: "PLC CPU System Battery Backup is required",
    message: "PLC CPU System Battery Backup is required",
  }),
  plc_cpu_system_memory_free_space_after_program: zod.string({
    required_error: "PLC CPU System Memory Free Space after Program is required",
    message: "PLC CPU System Memory Free Space after Program is required",
  }),
  is_power_supply_plc_cpu_system_selected: zod.string({
    required_error: "Power Supply PLC CPU System is required",
    message: "Power Supply PLC CPU System is required",
  }),
  is_power_supply_input_output_module_selected: zod.string({
    required_error: "Power Supply Input - Output Module is required",
    message: "Power Supply Input - Output Module is required",
  }),
  is_plc_input_output_modules_system_selected: zod.string({
    required_error: "PLC Input - Output Modules System is required",
    message: "PLC Input - Output Modules System is required",
  }),
  is_plc_cpu_system_and_input_output_modules_system_selected: zod.string({
    required_error: "PLC CPU System and PLC Input - Output Modules System is required",
    message: "PLC CPU System and PLC Input - Output Modules System is required",
  }),
  is_plc_cpu_system_and_hmi_scada_selected: zod.string({
    required_error: "PLC CPU System and HMI SCADA is required",
    message: "PLC CPU System and HMI SCADA is required",
  }),
  is_plc_cpu_system_and_third_party_devices_selected: zod.string({
    required_error: "PLC CPU System and Third Party Devices is required",
    message: "PLC CPU System and Third Party Devices is required",
  }),
  is_plc_cpu_system_selected: zod.string({
    required_error: "PLC CPU System is required",
    message: "PLC CPU System is required",
  }),
  plc_cpu_system: zod.string({
    required_error: "PLC CPU System is required",
    message: "PLC CPU System is required",
  }),
  panel_mounted_ac: zod.string({
    required_error: "Panel Mounted AC is required",
    message: "Panel Mounted AC is required",
  }),
  is_plc_and_ups_marshalling_cabinet_selected: zod.string({
    required_error: "PLC and UPS Marshalling Cabinet is required",
    message: "PLC and UPS Marshalling Cabinet is required",
  }),
  marshalling_cabinet_for_plc_and_ups: zod.string({
    required_error: "Marshalling Cabinet for PLC and UPS is required",
    message: "Marshalling Cabinet for PLC and UPS is required",
  }),
  is_electronic_hooter_selected: zod.string({
    required_error: "Electronic Hooter is required",
    message: "Electronic Hooter is required",
  }),
  electronic_hooter_acknowledge: zod.string({
    required_error: "Electronic Hooter Acknowledge is required",
    message: "Electronic Hooter Acknowledge is required",
  }),
  panel_power_supply_on_color: zod.string({
    required_error: "Panel Power Supply On Color is required",
    message: "Panel Power Supply On Color is required",
  }),
  panel_power_supply_off_color: zod.string({
    required_error: "Panel Power Supply Off Color is required",
    message: "Panel Power Supply Off Color is required",
  }),
  indicating_lamp_color_for_nonups_power_supply: zod.string({
    required_error: "Indicating Lamp Color for Non-UPS Power Supply is required",
    message: "Indicating Lamp Color for Non-UPS Power Supply is required",
  }),
  indicating_lamp_colour_for_ups_power_supply: zod.string({
    required_error: "Indicating Lamp Colour for UPS Power Supply is required",
    message: "Indicating Lamp Colour for UPS Power Supply is required",
  }),
  di_module_channel_density: zod.string({
    required_error: "DI Module Channel Density is required",
    message: "DI Module Channel Density is required",
  }),
  di_module_loop_current: zod.string({
    required_error: "DI Module Loop Current is required",
    message: "DI Module Loop Current is required",
  }),
  di_module_isolation: zod.string({
    required_error: "DI Module Isolation is required",
    message: "DI Module Isolation is required",
  }),
  di_module_input_type: zod.string({
    required_error: "DI Module Input Type is required",
    message: "DI Module Input Type is required",
  }),
  di_module_interrogation_voltage: zod.string({
    required_error: "DI Module Interrogation Voltage is required",
    message: "DI Module Interrogation Voltage is required",
  }),
  di_module_scan_time: zod.string({
    required_error: "DI Module Scan Time is required",
    message: "DI Module Scan Time is required",
  }),
  do_module_channel_density: zod.string({
    required_error: "DO Module Channel Density is required",
    message: "DO Module Channel Density is required",
  }),
  do_module_loop_current: zod.string({
    required_error: "DO Module Loop Current is required",
    message: "DO Module Loop Current is required",
  }),
  do_module_isolation: zod.string({
    required_error: "DO Module Isolation is required",
    message: "DO Module Isolation is required",
  }),
  do_module_output_type: zod.string({
    required_error: "DO Module Output Type is required",
    message: "DO Module Output Type is required",
  }),
  interposing_relay: zod.string({
    required_error: "Interposing Relay is required",
    message: "Interposing Relay is required",
  }),
  output_contact_rating_of_interposing_relay: zod.string({
    required_error: "Output Contact Rating of Interposing Relay is required",
    message: "Output Contact Rating of Interposing Relay is required",
  }),
  is_no_of_contact_selected: zod.string({
    required_error: "No of Contacts is required",
    message: "No of Contacts is required",
  }),
  no_of_contacts: zod.string({
    required_error: "No of Contacts is required",
    message: "No of Contacts is required",
  }),
  ai_module_channel_density: zod.string({
    required_error: "AI Module Channel Density is required",
    message: "AI Module Channel Density is required",
  }),
  ai_module_loop_current: zod.string({
    required_error: "AI Module Loop Current is required",
    message: "AI Module Loop Current is required",
  }),
  ai_module_isolation: zod.string({
    required_error: "AI Module Isolation is required",
    message: "AI Module Isolation is required",
  }),
  ai_module_input_type: zod.string({
    required_error: "AI Module Input Type is required",
    message: "AI Module Input Type is required",
  }),
  ai_module_scan_time: zod.string({
    required_error: "AI Module Scan Time is required",
    message: "AI Module Scan Time is required",
  }),
  is_ai_module_hart_protocol_support_selected: zod.string({
    required_error: "AI Module HART Protocol Support is required",
    message: "AI Module HART Protocol Support is required",
  }),
  ao_module_channel_density: zod.string({
    required_error: "AO Module Channel Density is required",
    message: "AO Module Channel Density is required",
  }),
  ao_module_loop_current: zod.string({
    required_error: "AO Module Loop Current is required",
    message: "AO Module Loop Current is required",
  }),
  ao_module_isolation: zod.string({
    required_error: "AO Module Isolation is required",
    message: "AO Module Isolation is required",
  }),
  ao_module_output_type: zod.string({
    required_error: "AO Module Output Type is required",
    message: "AO Module Output Type is required",
  }),
  ao_module_scan_time: zod.string({
    required_error: "AO Module Scan Time is required",
    message: "AO Module Scan Time is required",
  }),
  is_ao_module_hart_protocol_support_selected: zod.string({
    required_error: "AO Module HART Protocol Support is required",
    message: "AO Module HART Protocol Support is required",
  }),
  rtd_module_channel_density: zod.string({
    required_error: "RTD Module Channel Density is required",
    message: "RTD Module Channel Density is required",
  }),
  rtd_module_loop_current: zod.string({
    required_error: "RTD Module Loop Current is required",
    message: "RTD Module Loop Current is required",
  }),
  rtd_module_isolation: zod.string({
    required_error: "RTD Module Isolation is required",
    message: "RTD Module Isolation is required",
  }),
  rtd_module_input_type: zod.string({
    required_error: "RTD Module Input Type is required",
    message: "RTD Module Input Type is required",
  }),
  rtd_module_scan_time: zod.string({
    required_error: "RTD Module Scan Time is required",
    message: "RTD Module Scan Time is required",
  }),
  is_rtd_module_hart_protocol_support_selected: zod.string({
    required_error: "RTD Module HART Protocol Support is required",
    message: "RTD Module HART Protocol Support is required",
  }),
  thermocouple_module_channel_density: zod.string({
    required_error: "Thermocouple Module Channel Density is required",
    message: "Thermocouple Module Channel Density is required",
  }),
  thermocouple_module_loop_current: zod.string({
    required_error: "Thermocouple Module Loop Current is required",
    message: "Thermocouple Module Loop Current is required",
  }),
  thermocouple_module_isolation: zod.string({
    required_error: "Thermocouple Module Isolation is required",
    message: "Thermocouple Module Isolation is required",
  }),
  thermocouple_module_input_type: zod.string({
    required_error: "Thermocouple Module Input Type is required",
    message: "Thermocouple Module Input Type is required",
  }),
  thermocouple_module_scan_time: zod.string({
    required_error: "Thermocouple Module Scan Time is required",
    message: "Thermocouple Module Scan Time is required",
  }),
  is_thermocouple_module_hart_protocol_support_selected: zod.string({
    required_error: "Thermocouple Module HART Protocol Support is required",
    message: "Thermocouple Module HART Protocol Support is required",
  }),
  universal_module_channel_density: zod.string({
    required_error: "Universal Module Channel Density is required",
    message: "Universal Module Channel Density is required",
  }),
  universal_module_loop_current: zod.string({
    required_error: "Universal Module Loop Current is required",
    message: "Universal Module Loop Current is required",
  }),
  universal_module_isolation: zod.string({
    required_error: "Universal Module Isolation is required",
    message: "Universal Module Isolation is required",
  }),
  universal_module_input_type: zod.string({
    required_error: "Universal Module Input Type is required",
    message: "Universal Module Input Type is required",
  }),
  universal_module_scan_time: zod.string({
    required_error: "Universal Module Scan Time is required",
    message: "Universal Module Scan Time is required",
  }),
  is_universal_module_hart_protocol_support_selected: zod.string({
    required_error: "Universal Module HART Protocol Support is required",
    message: "Universal Module HART Protocol Support is required",
  }),
  di_module_terminal: zod.string({
    required_error: "DI Module Terminal is required",
    message: "DI Module Terminal is required",
  }),
  do_module_terminal: zod.string({
    required_error: "DO Module Terminal is required",
    message: "DO Module Terminal is required",
  }),
  ai_module_terminal: zod.string({
    required_error: "AI Module Terminal is required",
    message: "AI Module Terminal is required",
  }),
  ao_module_terminal: zod.string({
    required_error: "AO Module Terminal is required",
    message: "AO Module Terminal is required",
  }),
  rtd_module_terminal: zod.string({
    required_error: "RTD Module Terminal is required",
    message: "RTD Module Terminal is required",
  }),
  thermocouple_module_terminal: zod.string({
    required_error: "Thermocouple Module Terminal is required",
    message: "Thermocouple Module Terminal is required",
  }),
  is_hmi_selected: zod.string({
    required_error: "HMI is required",
    message: "HMI is required",
  }),
  hmi_type: zod.string({
    required_error: "HMI Type is required",
    message: "HMI Type is required",
  }),
  hmi_size: zod.string({
    required_error: "HMI Size is required",
    message: "HMI Size is required",
  }),
  hmi_quantity: zod.string({
    required_error: "HMI Quantity is required",
    message: "HMI Quantity is required",
  }),
  hmi_hardware_make: zod.string({
    required_error: "HMI Hardware Make is required",
    message: "HMI Hardware Make is required",
  }),
  hmi_series: zod.string({
    required_error: "HMI Series is required",
    message: "HMI Series is required",
  }),
  hmi_input_voltage: zod.string({
    required_error: "HMI Input Voltage is required",
    message: "HMI Input Voltage is required",
  }),
  hmi_battery_backup: zod.string({
    required_error: "HMI Battery Backup is required",
    message: "HMI Battery Backup is required",
  }),
  is_engineering_station_quantity_selected: zod.string({
    required_error: "Engineering Station Quantity is required",
    message: "Engineering Station Quantity is required",
  }),
  engineering_station_quantity: zod.string({
    required_error: "Engineering Station Quantity is required",
    message: "Engineering Station Quantity is required",
  }),
  is_engineering_cum_operating_station_quantity_selected: zod.string({
    required_error: "Engineering cum Operating Station Quantity is required",
    message: "Engineering cum Operating Station Quantity is required",
  }),
  engineering_cum_operating_station_quantity: zod.string({
    required_error: "Engineering cum Operating Station Quantity is required",
    message: "Engineering cum Operating Station Quantity is required",
  }),
  is_operating_station_quantity_selected: zod.string({
    required_error: "Operating Station Quantity is required",
    message: "Operating Station Quantity is required",
  }),
  operating_station_quantity: zod.string({
    required_error: "Operating Station Quantity is required",
    message: "Operating Station Quantity is required",
  }),
  is_scada_program_development_license_quantity_selected: zod.string({
    required_error: "SCADA Program Development License Quantity is required",
    message: "SCADA Program Development License Quantity is required",
  }),
  scada_program_development_license_quantity: zod.string({
    required_error: "SCADA Program Development License Quantity is required",
    message: "SCADA Program Development License Quantity is required",
  }),
  is_scada_runtime_license_quantity_selected: zod.string({
    required_error: "SCADA Runtime License Quantity is required",
    message: "SCADA Runtime License Quantity is required",
  }),
  scada_runtime_license_quantity: zod.string({
    required_error: "SCADA Runtime License Quantity is required",
    message: "SCADA Runtime License Quantity is required",
  }),
  is_plc_progamming_software_license_quantity: zod.string({
    required_error: "PLC Programming Software License Quantity is required",
    message: "PLC Programming Software License Quantity is required",
  }),
  plc_programming_software_license_quantity: zod.string({
    required_error: "PLC Programming Software License Quantity is required",
    message: "PLC Programming Software License Quantity is required",
  }),
  system_hardware: zod.string({
    required_error: "System Hardware is required",
    message: "System Hardware is required",
  }),
  pc_hardware_specifications: zod.string({
    required_error: "PC Hardware Specifications is required",
    message: "PC Hardware Specifications is required",
  }),
  monitor_size: zod.string({
    required_error: "Monitor Size is required",
    message: "Monitor Size is required",
  }),
  windows_operating_system: zod.string({
    required_error: "Windows Operating System is required",
    message: "Windows Operating System is required",
  }),
  hardware_between_plc_and_scada_pc: zod.string({
    required_error: "Hardware between PLC and SCADA PC is required",
    message: "Hardware between PLC and SCADA PC is required",
  }),
  printer_type: zod.string({
    required_error: "Printer Type is required",
    message: "Printer Type is required",
  }),
  printer_size: zod.string({
    required_error: "Printer Size is required",
    message: "Printer Size is required",
  }),
  printer_quantity: zod.string({
    required_error: "Printer Quantity is required",
    message: "Printer Quantity is required",
  }),
  is_printer_with_suitable_communication_cable_selected: zod.string({
    required_error: "Printer with Suitable Communication Cable is required",
    message: "Printer with Suitable Communication Cable is required",
  }),
  is_furniture_selected: zod.string({
    required_error: "Furniture is required",
    message: "Furniture is required",
  }),
  is_console_with_chair_selected: zod.string({
    required_error: "Console with Chair is required",
    message: "Console with Chair is required",
  }),
  is_plc_logic_diagram_selected: zod.string({
    required_error: "PLC Logic Diagram is required",
    message: "PLC Logic Diagram is required",
  }),
  is_loop_drawing_for_complete_project_selected: zod.string({
    required_error: "Loop Drawing for Complete Project is required",
    message: "Loop Drawing for Complete Project is required",
  }),
  interface_signal_and_control_logic_implementation: zod.string({
    required_error: "Interface Signal and Control Logic Implementation is required",
    message: "Interface Signal and Control Logic Implementation is required",
  }),
  differential_pressure_flow_linearization: zod.string({
    required_error: "Differential Pressure Flow Linearization is required",
    message: "Differential Pressure Flow Linearization is required",
  }),
  third_party_comm_protocol_for_plc_cpu_system: zod.string({
    required_error: "Third Party Comm Protocol for PLC CPU System is required",
    message: "Third Party Comm Protocol for PLC CPU System is required",
  }),
  third_party_communication_protocol: zod.string({
    required_error: "Third Party Communication Protocol is required",
    message: "Third Party Communication Protocol is required",
  }),
  client_system_communication: zod.string({
    required_error: "Client System Communication is required",
    message: "Client System Communication is required",
  }),
  hardware_between_plc_and_third_party: zod.string({
    required_error: "Hardware between PLC and Third Party is required",
    message: "Hardware between PLC and Third Party is required",
  }),
  hardware_between_plc_and_client_system: zod.string({
    required_error: "Hardware between PLC and Client System is required",
    message: "Hardware between PLC and Client System is required",
  }),
  is_iiot_selected: zod.string({
    required_error: "IIOT is required",
    message: "IIOT is required",
  }),
  is_client_system_comm_with_plc_cpu_selected: zod.string({
    required_error: "Client System Comm with PLC CPU is required",
    message: "Client System Comm with PLC CPU is required",
  }),
  iiot_gateway_note: zod.string({
    required_error: "IIOT Gateway Note is required",
    message: "IIOT Gateway Note is required",
  }),
  iiot_gateway_mounting: zod.string({
    required_error: "IIOT Gateway Mounting is required",
    message: "IIOT Gateway Mounting is required",
  }),
  is_burner_controller_lmv_mounting_selected: zod.string({
    required_error: "Burner Controller LMV Mounting is required",
    message: "Burner Controller LMV Mounting is required",
  }),
  hardware_between_plc_and_burner_controller_lmv: zod.string({
    required_error: "Hardware between PLC and Burner Controller LMV is required",
    message: "Hardware between PLC and Burner Controller LMV is required",
  }),
  burner_controller_lmv_mounting: zod.string({
    required_error: "Burner Controller LMV Mounting is required",
    message: "Burner Controller LMV Mounting is required",
  }),
  burner_controller_lmv_note: zod.string({
    required_error: "Burner Controller LMV Note is required",
    message: "Burner Controller LMV Note is required",
  }),
  spare_input_and_output_notes: zod.string({
    required_error: "Spare Input and Output Notes is required",
    message: "Spare Input and Output Notes is required",
  }),
  commissioning_spare: zod.string({
    required_error: "Commissioning Spare is required",
    message: "Commissioning Spare is required",
  }),
  two_year_operational_spare: zod.string({
    required_error: "Two Year Operational Spare is required",
    message: "Two Year Operational Spare is required",
  }),
  project_specific_notes: zod.string({
    required_error: "Project Specific Notes is required",
    message: "Project Specific Notes is required",
  }),
})
