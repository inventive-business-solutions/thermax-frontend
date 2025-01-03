"use client";

import { createData } from "@/actions/crud-actions";
import { useEffect, useState } from "react";

type DropdownState = {
  [key: string]: any[]; // Each key is a string and the value is an array of any type
};

export default function useCommonConfigDropdowns() {
  const [dropdown, setDropdown] = useState<DropdownState>({});

  useEffect(() => {
    const getDropdown = async () => {
      let response = await createData("/method/common_configuration_1.get_common_config_dropdown", true, {
        "DOL Starter": "name",
        "Star Delta Starter": "name",
        "Ammeter": "name",
        "Ammeter Configuration": "name",
        "MCC Switchgear Type": "name",
        "Switchgear Combination": "name",
        "Metering for Feeder": "name",  //Ammeter Type

          "Control Transformer Type": "name",
          "Control Transformer primary voltage": "name",
          "Control Transformer secondary voltage": "name",
          "Current Transformer Coating": "name",
          "Control Transformer Quantity": "name",
          "Control Transformer Configuration": "name",

          "Digital Meters": "name",
          "Analog Meters": "name",
          "Communication Protocol": "name",

          "Current Transformer": "name",
          "Current Transformer Configuration": "name",
          "Forward and Reverse Push Button": "name",

          "Supply Feeder Pole": "name",
          "Supply Feeder DM Standard": "name",
          "Supply Feeder Testing Standard": "name",
          "Power Wiring Color": "name",
          "Power Wiring Size": "name",
          "Control Wiring Color": "name",
          "Control Wiring Size": "name",
          "VDC 24 Wiring Color": "name",
          "VDC 24 Wiring Size": "name",
          "Analog Signal Wiring Color": "name",
          "Analog Signal Wiring Size": "name",
          "CT Wiring Color": "name",
          "CT Wiring Size": "name",
          "Cable Insulation PVC": "name",
          Ferrule: "name",
          "Power Terminal Clipon": "name",
          "Power Terminal Busbar Type": "name",
          "Control Terminal": "name",
          "Spare Terminal": "name",
          "Air Clearance Doctype": "name",

          "Test Dropdown": "name",
          "Reset Dropdown": "name",
          "Alarm Acknowledge Dropdown": "name",
          "Lamp Test Dropdown": "name",
          "Speed Decrease PB": "name",
          "Speed Increase PB": "name",
          "Push Button ESS": "name",
          "Push Button Stop Color": "name",
          "Push Button Start Color": "name",

          "Indicating Lamp Stopped Closed": "name",
          "Indicating Lamp Running Open": "name",
          "Indicating Lamp Trip": "name",

          "Hazardous Area Type Isolator and Lpbs": "name",
          "Field Motor Isolator General Type": "name",
          "Field Motor Isolator General Enclosure": "name",
          "Field Motor Isolator General Material": "name",
          "Field Motor Thickness": "name",
          "Field Motor Isolator General QTY": "name",
          "Field Motor Isolator Color Shade": "name",
          "Field Motor Isolator General Cable Entry": "name",
          "Field Motor Isolator Canopy On Top": "name",
          "Field Motor Isolator Canopy Type": "name",

          "Local Push Button Station Type": "name",
          "Local Push Button Station Enclosure": "name",
          "Local Push Button Station Material": "name",
          "Local Push Button Station Qty": "name",
          "Local Push Button Station LPBS Color Shade": "name",
          "Local Push Button Station Canopy On top": "name",
          "LPBS Start Push Button Color": "name",
          "LPBS Start On Indication Lamp Color": "name",
          "LPBS Stop Off Indication Lamp Color": "name",
          "LPBS Speed Increase Push Button": "name",
          "LPBS Speed Decrease Push Button": "name",

          "APFC Relay": "name",

          "Power Bus Main Busbar Selection": "name",
          "Power Bus Heat Shrinkable Color PVC sleeve": "name",
          "Power Bus Current Density": "name",
          "Control Bus Main Busbar Selection": "name",
          "Control Bus Heat Shrinkable Color PVC sleeve": "name",
          "Control Bus Current Density": "name",
          "Earth Bus Main Busbar Selection": "name",
          "Earth Bus Busbar Position": "name",
          "Earth Bus Current Density": "name",
        }
      );

      console.log(response, "common Config response");
      setDropdown(response);
    };

    getDropdown();
  }, []);

  // let { dropdownOptions: dol_starter_options } = useDropdownOptions(`${DOL_STARTER}?limit=100&fields=["*"]`, "name")
  // dol_starter_options = sortDropdownOptions(dol_starter_options)

  // let { dropdownOptions: star_delta_starter_options } = useDropdownOptions(
  //   `${STAR_DELTA_STARTER}?limit=100&fields=["*"]`,
  //   "name"
  // )
  // star_delta_starter_options = sortDropdownOptions(star_delta_starter_options)

  // let { dropdownOptions: ammeter_options } = useDropdownOptions(`${AMMETER}?limit=100&fields=["*"]`, "ammeter")
  // ammeter_options = sortDropdownOptions(ammeter_options)

  // let { dropdownOptions: ammeter_configuration_options } = useDropdownOptions(
  //   `${AMMETER_CONFIGURATION}?fields=["*"]`,
  //   "name"
  // )
  // ammeter_configuration_options = moveNAtoEnd(ammeter_configuration_options)

  // const { dropdownOptions: mcc_switchgear_type_options } = useDropdownOptions(
  //   `${MCC_SWITCHGEAR_TYPE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: switchgear_combination_options } = useDropdownOptions(
  //   `${SWITCHGEAR_COMBINATION}?fields=["*"]`,
  //   "name"
  // )

  // const { dropdownOptions: pole_options } = useDropdownOptions(`${SUPPLY_FEEDER_POLE}?fields=["*"]`, "pole")
  // const { dropdownOptions: dm_standard_options } = useDropdownOptions(
  //   `${SUPPLY_FEEDER_DM_STANDARD}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: testing_standard_options } = useDropdownOptions(
  //   `${SUPPLY_FEEDER_TESTING_STANDARD}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: power_wiring_color_options } = useDropdownOptions(
  //   `${POWER_WIRING_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: power_wiring_length_options } = useDropdownOptions(
  //   `${POWER_WIRING_SIZE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: control_wiring_color_options } = useDropdownOptions(
  //   `${CONTROL_WIRING_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: control_wiring_length_options } = useDropdownOptions(
  //   `${CONTROL_WIRING_SIZE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: vdc_24_wiring_color_options } = useDropdownOptions(
  //   `${VDC_24_WIRING_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: vdc_24_wiring_length_options } = useDropdownOptions(
  //   `${VDC_24_WIRING_SIZE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: analog_signal_wiring_color_options } = useDropdownOptions(
  //   `${ANALOG_SIGNAL_WIRING_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: analog_signal_wiring_length_options } = useDropdownOptions(
  //   `${ANALOG_SIGNAL_WIRING_SIZE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: ct_wiring_color_options } = useDropdownOptions(`${CT_WIRING_COLOR}?fields=["*"]`, "name")
  // const { dropdownOptions: ct_wiring_length_options } = useDropdownOptions(`${CT_WIRING_SIZE}?fields=["*"]`, "name")
  // const { dropdownOptions: cable_wiring_pvc_options } = useDropdownOptions(`${CABLE_WIRING_PVC}?fields=["*"]`, "name")
  // const { dropdownOptions: ferrule_options } = useDropdownOptions(`${FERRULE}?fields=["*"]`, "ferrule")
  // const { dropdownOptions: spare_terminal_options } = useDropdownOptions(`${SPARE_TERMINAL}?fields=["*"]`, "name")

  // let { dropdownOptions: test_dropdown_options } = useDropdownOptions(`${TEST_DROPDOWN}?fields=["*"]`, "name")
  // test_dropdown_options = moveNAtoEnd(test_dropdown_options)
  // let { dropdownOptions: reset_dropdown_options } = useDropdownOptions(`${RESET_DROPDOWN}?fields=["*"]`, "name")
  // reset_dropdown_options = moveNAtoEnd(reset_dropdown_options)
  // let { dropdownOptions: alarm_acknowledge_dropdown_options } = useDropdownOptions(
  //   `${ALARM_ACKNOWLEDGE_DROPDOWN}?fields=["*"]`,
  //   "name"
  // )
  // alarm_acknowledge_dropdown_options = moveNAtoEnd(alarm_acknowledge_dropdown_options)
  // let { dropdownOptions: lamp_test_dropdown_options } = useDropdownOptions(
  //   `${LAMP_TEST_DROPDOWN}?fields=["*"]`,
  //   "name"
  // )
  // lamp_test_dropdown_options = moveNAtoEnd(lamp_test_dropdown_options)
  // let { dropdownOptions: speed_decrease_pb_options } = useDropdownOptions(`${SPEED_DECREASE_PB}?fields=["*"]`, "name")
  // speed_decrease_pb_options = moveNAtoEnd(speed_decrease_pb_options)
  // let { dropdownOptions: speed_increase_pb_options } = useDropdownOptions(`${SPEED_INCREASE_PB}?fields=["*"]`, "name")
  // speed_increase_pb_options = moveNAtoEnd(speed_increase_pb_options)
  // const { dropdownOptions: ess_options } = useDropdownOptions(`${PUSH_BUTTON_ESS}?fields=["*"]`, "ess")
  // let { dropdownOptions: push_button_stop_options } = useDropdownOptions(
  //   `${PUSH_BUTTON_STOP_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // push_button_stop_options = moveNAtoEnd(push_button_stop_options)

  // let { dropdownOptions: push_button_start_options } = useDropdownOptions(
  //   `${PUSH_BUTTON_START_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // push_button_start_options = moveNAtoEnd(push_button_start_options)

  // const { dropdownOptions: lr_selector_lock_switch_applicable_options } = useDropdownOptions(
  //   `${LR_SELECTOR_SWITCH_APPLICABLE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: lr_selector_lock_options } = useDropdownOptions(
  //   `${LR_SELECTOR_LOCK_TYPE}?fields=["*"]`,
  //   "name"
  // )

  // const { dropdownOptions: running_open_options } = useDropdownOptions(`${RUNNING_OPEN}?fields=["*"]`, "name")
  // const { dropdownOptions: stopped_closed_options } = useDropdownOptions(`${STOPPED_CLOSED}?fields=["*"]`, "name")
  // const { dropdownOptions: trip_options } = useDropdownOptions(`${TRIP}?fields=["*"]`, "trip")

  // let { dropdownOptions: hazardous_area_type_options } = useDropdownOptions(`${HAZARDOUS_AREA_TYPE}?fields=["*"]`, "type")
  // hazardous_area_type_options = moveNAtoEnd(hazardous_area_type_options)
  // let { dropdownOptions: field_motor_type_options } = useDropdownOptions(`${FIELD_MOTOR_TYPE}?fields=["*"]`, "type")
  // field_motor_type_options = moveNAtoEnd(field_motor_type_options)
  // let { dropdownOptions: field_motor_enclosure_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_ENCLOSURE}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_enclosure_options = moveNAtoEnd(field_motor_enclosure_options)
  // let { dropdownOptions: field_motor_material_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_MATERIAL}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_material_options = moveNAtoEnd(field_motor_material_options)

  // let { dropdownOptions: field_motor_thickness_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_THICKNESS}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_thickness_options = moveNAtoEnd(field_motor_thickness_options)

  // let { dropdownOptions: field_motor_qty_options } = useDropdownOptions(`${FIELD_MOTOR_QTY}?fields=["*"]`, "name")
  // field_motor_qty_options = moveNAtoEnd(field_motor_qty_options)
  // let { dropdownOptions: field_motor_color_shade_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_COLOUR_SHADE}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_color_shade_options = moveNAtoEnd(field_motor_color_shade_options)
  // let { dropdownOptions: field_motor_cable_entry_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_CABLE_ENTRY}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_cable_entry_options = moveNAtoEnd(field_motor_cable_entry_options)
  // let { dropdownOptions: field_motor_canopy_on_top_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_CANOPY_ON_TOP}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_canopy_on_top_options = moveNAtoEnd(field_motor_canopy_on_top_options)

  // let { dropdownOptions: field_motor_canopy_type_options } = useDropdownOptions(
  //   `${FIELD_MOTOR_CANOPY_TYPE}?fields=["*"]`,
  //   "name"
  // )
  // field_motor_canopy_type_options = moveNAtoEnd(field_motor_canopy_type_options)

  // let { dropdownOptions: lpbs_type_options } = useDropdownOptions(`${LPBS_TYPE}?fields=["*"]`, "name")
  // lpbs_type_options = moveNAtoEnd(lpbs_type_options)
  // let { dropdownOptions: lpbs_enclosure_options } = useDropdownOptions(`${LPBS_ENCLOSURE}?fields=["*"]`, "name")
  // lpbs_enclosure_options = moveNAtoEnd(lpbs_enclosure_options)
  // let { dropdownOptions: lpbs_material_options } = useDropdownOptions(`${LPBS_MATERIAL}?fields=["*"]`, "name")
  // lpbs_material_options = moveNAtoEnd(lpbs_material_options)
  // let { dropdownOptions: lpbs_qty_options } = useDropdownOptions(`${LPBS_QTY}?fields=["*"]`, "name")
  // lpbs_qty_options = moveNAtoEnd(lpbs_qty_options)
  // let { dropdownOptions: lpbs_color_shade_options } = useDropdownOptions(
  //   `${LPBS_COLOR_SHADE}?fields=["*"]`,
  //   "lpbs_color_shade"
  // )
  // lpbs_color_shade_options = moveNAtoEnd(lpbs_color_shade_options)
  // let { dropdownOptions: lpbs_canopy_on_top_options } = useDropdownOptions(`${LPBS_CANOPY_ON_TOP}?fields=["*"]`, "name")
  // lpbs_canopy_on_top_options = moveNAtoEnd(lpbs_canopy_on_top_options)
  // let { dropdownOptions: lpbs_push_button_start_color_options } = useDropdownOptions(
  //   `${LPBS_PUSH_BUTTON_START_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // lpbs_push_button_start_color_options = moveNAtoEnd(lpbs_push_button_start_color_options)
  // let { dropdownOptions: lpbs_indicator_on_options } = useDropdownOptions(
  //   `${LPBS_INDICATOR_ON_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // lpbs_indicator_on_options = moveNAtoEnd(lpbs_indicator_on_options)

  // let { dropdownOptions: lpbs_indiacator_off_options } = useDropdownOptions(
  //   `${LPBS_INDICATOR_OFF_COLOR}?fields=["*"]`,
  //   "name"
  // )
  // lpbs_indiacator_off_options = moveNAtoEnd(lpbs_indiacator_off_options)

  // let { dropdownOptions: lpbs_speed_increase_options } = useDropdownOptions(
  //   `${LPBS_SPEED_INCREASE_BUTTON}?fields=["*"]`,
  //   "name"
  // )
  // lpbs_speed_increase_options = moveNAtoEnd(lpbs_speed_increase_options)
  // let { dropdownOptions: lpbs_speed_decrease_options } = useDropdownOptions(
  //   `${LPBS_SPEED_DECREASE_BUTTON}?fields=["*"]`,
  //   "name"
  // )
  // lpbs_speed_decrease_options = moveNAtoEnd(lpbs_speed_decrease_options)

  // let { dropdownOptions: apfc_relay_options } = useDropdownOptions(`${APFC_RELAY}?fields=["*"]`, "name")
  // apfc_relay_options = sortDropdownOptions(apfc_relay_options)

  // const { dropdownOptions: pb_main_busbar_selection_options } = useDropdownOptions(
  //   `${POWER_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: pb_heat_pvc_sleeve_options } = useDropdownOptions(
  //   `${POWER_BUS_HEAT_PVC_SLEEVE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: pb_current_density_options } = useDropdownOptions(
  //   `${POWER_BUS_CURRENT_DENSITY}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: cb_main_busbar_selection_option } = useDropdownOptions(
  //   `${CONTROL_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: cb_heat_pvc_sleeve_options } = useDropdownOptions(
  //   `${CONTROL_BUS_HEAT_PVC_SLEEVE}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: cb_current_density_options } = useDropdownOptions(
  //   `${CONTROL_BUS_CURRENT_DENSITY}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: eb_main_busbar_selection_options } = useDropdownOptions(
  //   `${EARTH_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: eb_main_busbar_position_options } = useDropdownOptions(
  //   `${EARTH_BUS_BUSBAR_POSITION}?fields=["*"]`,
  //   "name"
  // )
  // const { dropdownOptions: eb_current_density_options } = useDropdownOptions(
  //   `${EARTH_BUS_CURRENT_DENSITY}?fields=["*"]`,
  //   "name"
  // )

  // const { dropdownOptions: metering_for_feeder_options } = useDropdownOptions(
  //   `${METERING_FOR_FEEDER}?fields=["*"]`,
  //   "name"
  // )

  return {
    dropdown
  }
}
