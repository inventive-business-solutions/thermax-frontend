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
