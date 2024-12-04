"use client";

import {
  DOL_STARTER,
  STAR_DELTA_STARTER,
  AMMETER,
  AMMETER_CONFIGURATION,
  MCC_SWITCHGEAR_TYPE,
  SWITCHGEAR_COMBINATION,
  SUPPLY_FEEDER_POLE,
  SUPPLY_FEEDER_DM_STANDARD,
  SUPPLY_FEEDER_TESTING_STANDARD,
  POWER_WIRING_COLOR,
  POWER_WIRING_SIZE,
  CONTROL_WIRING_COLOR,
  CONTROL_WIRING_SIZE,
  VDC_24_WIRING_COLOR,
  VDC_24_WIRING_SIZE,
  ANALOG_SIGNAL_WIRING_COLOR,
  CT_WIRING_COLOR,
  CT_WIRING_SIZE,
  CABLE_WIRING_PVC,
  FERRULE,
  SPARE_TERMINAL,
  TEST_RESET,
  ALARM_ACKNOWLEDGE_AND_LAMP_TEST,
  SPEED_DECREASE_PB,
  SPEED_INCREASE_PB,
  PUSH_BUTTON_ESS,
  PUSH_BUTTON_STOP_COLOR,
  PUSH_BUTTON_START_COLOR,
  LR_SELECTOR_SWITCH_APPLICABLE,
  LR_SELECTOR_LOCK_TYPE,
  RUNNING_OPEN,
  STOPPED_CLOSED,
  TRIP,
  FIELD_MOTOR_TYPE,
  FIELD_MOTOR_ENCLOSURE,
  FIELD_MOTOR_MATERIAL,
  FIELD_MOTOR_QTY,
  FIELD_MOTOR_COLOUR_SHADE,
  FIELD_MOTOR_CABLE_ENTRY,
  FIELD_MOTOR_CANOPY_ON_TOP,
  LPBS_TYPE,
  LPBS_ENCLOSURE,
  LPBS_MATERIAL,
  LPBS_QTY,
  LPBS_COLOR_SHADE,
  LPBS_CANOPY_ON_TOP,
  LPBS_PUSH_BUTTON_START_COLOR,
  LPBS_INDICATOR_ON_COLOR,
  LPBS_INDICATOR_OFF_COLOR,
  LPBS_SPEED_INCREASE_BUTTON,
  LPBS_SPEED_DECREASE_BUTTON,
  APFC_RELAY,
  POWER_BUS_MAIN_BUSBAR_SELECTION,
  POWER_BUS_HEAT_PVC_SLEEVE,
  POWER_BUS_CURRENT_DENSITY,
  CONTROL_BUS_MAIN_BUSBAR_SELECTION,
  CONTROL_BUS_HEAT_PVC_SLEEVE,
  CONTROL_BUS_CURRENT_DENSITY,
  EARTH_BUS_MAIN_BUSBAR_SELECTION,
  EARTH_BUS_BUSBAR_POSITION,
  EARTH_BUS_CURRENT_DENSITY,
  METERING_FOR_FEEDER,
  ANALOG_SIGNAL_WIRING_SIZE,
} from "@/configs/api-endpoints";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";
import { sortDropdownOptions, moveNAtoEnd } from "@/utils/helpers";

export default function useCommonConfigDropdowns() {
  let { dropdownOptions: dol_starter_options } = useDropdownOptions(
    `${DOL_STARTER}?limit=100&fields=["*"]`,
    "name"
  );
  dol_starter_options = sortDropdownOptions(dol_starter_options);

  let { dropdownOptions: star_delta_starter_options } = useDropdownOptions(
    `${STAR_DELTA_STARTER}?limit=100&fields=["*"]`,
    "name"
  );
  star_delta_starter_options = sortDropdownOptions(star_delta_starter_options);

  let { dropdownOptions: ammeter_options } = useDropdownOptions(
    `${AMMETER}?limit=100&fields=["*"]`,
    "ammeter"
  );
  ammeter_options = sortDropdownOptions(ammeter_options);

  let { dropdownOptions: ammeter_configuration_options } = useDropdownOptions(
    `${AMMETER_CONFIGURATION}?fields=["*"]`,
    "name"
  );
  ammeter_configuration_options = moveNAtoEnd(ammeter_configuration_options);

  const { dropdownOptions: mcc_switchgear_type_options } = useDropdownOptions(
    `${MCC_SWITCHGEAR_TYPE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: switchgear_combination_options } =
    useDropdownOptions(`${SWITCHGEAR_COMBINATION}?fields=["*"]`, "name");

  const { dropdownOptions: pole_options } = useDropdownOptions(
    `${SUPPLY_FEEDER_POLE}?fields=["*"]`,
    "pole"
  );
  const { dropdownOptions: dm_standard_options } = useDropdownOptions(
    `${SUPPLY_FEEDER_DM_STANDARD}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: testing_standard_options } = useDropdownOptions(
    `${SUPPLY_FEEDER_TESTING_STANDARD}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: power_wiring_color_options } = useDropdownOptions(
    `${POWER_WIRING_COLOR}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: power_wiring_length_options } = useDropdownOptions(
    `${POWER_WIRING_SIZE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: control_wiring_color_options } = useDropdownOptions(
    `${CONTROL_WIRING_COLOR}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: control_wiring_length_options } = useDropdownOptions(
    `${CONTROL_WIRING_SIZE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: vdc_24_wiring_color_options } = useDropdownOptions(
    `${VDC_24_WIRING_COLOR}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: vdc_24_wiring_length_options } = useDropdownOptions(
    `${VDC_24_WIRING_SIZE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: analog_signal_wiring_color_options } =
    useDropdownOptions(`${ANALOG_SIGNAL_WIRING_COLOR}?fields=["*"]`, "name");
  const { dropdownOptions: analog_signal_wiring_length_options } =
    useDropdownOptions(`${ANALOG_SIGNAL_WIRING_SIZE}?fields=["*"]`, "name");
  const { dropdownOptions: ct_wiring_color_options } = useDropdownOptions(
    `${CT_WIRING_COLOR}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: ct_wiring_length_options } = useDropdownOptions(
    `${CT_WIRING_SIZE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: cable_wiring_pvc_options } = useDropdownOptions(
    `${CABLE_WIRING_PVC}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: ferrule_options } = useDropdownOptions(
    `${FERRULE}?fields=["*"]`,
    "ferrule"
  );
  const { dropdownOptions: spare_terminal_options } = useDropdownOptions(
    `${SPARE_TERMINAL}?fields=["*"]`,
    "name"
  );

  const { dropdownOptions: test_reset_options } = useDropdownOptions(
    `${TEST_RESET}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: alarm_acknowledge_and_lamp_test_options } =
    useDropdownOptions(
      `${ALARM_ACKNOWLEDGE_AND_LAMP_TEST}?fields=["*"]`,
      "name"
    );
  let { dropdownOptions: speed_decrease_pb_options } = useDropdownOptions(
    `${SPEED_DECREASE_PB}?fields=["*"]`,
    "name"
  );
  speed_decrease_pb_options = moveNAtoEnd(speed_decrease_pb_options);
  let { dropdownOptions: speed_increase_pb_options } = useDropdownOptions(
    `${SPEED_INCREASE_PB}?fields=["*"]`,
    "name"
  );
  speed_increase_pb_options = moveNAtoEnd(speed_increase_pb_options);
  const { dropdownOptions: ess_options } = useDropdownOptions(
    `${PUSH_BUTTON_ESS}?fields=["*"]`,
    "ess"
  );
  let { dropdownOptions: push_button_stop_options } = useDropdownOptions(
    `${PUSH_BUTTON_STOP_COLOR}?fields=["*"]`,
    "name"
  );
  push_button_stop_options = moveNAtoEnd(push_button_stop_options);

  let { dropdownOptions: push_button_start_options } = useDropdownOptions(
    `${PUSH_BUTTON_START_COLOR}?fields=["*"]`,
    "name"
  );
  push_button_start_options = moveNAtoEnd(push_button_start_options);

  const { dropdownOptions: lr_selector_lock_switch_applicable_options } =
    useDropdownOptions(`${LR_SELECTOR_SWITCH_APPLICABLE}?fields=["*"]`, "name");
  const { dropdownOptions: lr_selector_lock_options } = useDropdownOptions(
    `${LR_SELECTOR_LOCK_TYPE}?fields=["*"]`,
    "name"
  );

  const { dropdownOptions: running_open_options } = useDropdownOptions(
    `${RUNNING_OPEN}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: stopped_closed_options } = useDropdownOptions(
    `${STOPPED_CLOSED}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: trip_options } = useDropdownOptions(
    `${TRIP}?fields=["*"]`,
    "trip"
  );

  let { dropdownOptions: field_motor_type_options } = useDropdownOptions(
    `${FIELD_MOTOR_TYPE}?fields=["*"]`,
    "type"
  );
  field_motor_type_options = moveNAtoEnd(field_motor_type_options);
  let { dropdownOptions: field_motor_enclosure_options } = useDropdownOptions(
    `${FIELD_MOTOR_ENCLOSURE}?fields=["*"]`,
    "name"
  );
  field_motor_enclosure_options = moveNAtoEnd(field_motor_enclosure_options);
  let { dropdownOptions: field_motor_material_options } = useDropdownOptions(
    `${FIELD_MOTOR_MATERIAL}?fields=["*"]`,
    "name"
  );
  field_motor_material_options = moveNAtoEnd(field_motor_material_options);
  let { dropdownOptions: field_motor_qty_options } = useDropdownOptions(
    `${FIELD_MOTOR_QTY}?fields=["*"]`,
    "name"
  );
  field_motor_qty_options = moveNAtoEnd(field_motor_qty_options);
  let { dropdownOptions: field_motor_color_shade_options } = useDropdownOptions(
    `${FIELD_MOTOR_COLOUR_SHADE}?fields=["*"]`,
    "name"
  );
  field_motor_color_shade_options = moveNAtoEnd(
    field_motor_color_shade_options
  );
  let { dropdownOptions: field_motor_cable_entry_options } = useDropdownOptions(
    `${FIELD_MOTOR_CABLE_ENTRY}?fields=["*"]`,
    "name"
  );
  field_motor_cable_entry_options = moveNAtoEnd(
    field_motor_cable_entry_options
  );
  let { dropdownOptions: field_motor_canopy_on_top_options } =
    useDropdownOptions(`${FIELD_MOTOR_CANOPY_ON_TOP}?fields=["*"]`, "name");
  field_motor_canopy_on_top_options = moveNAtoEnd(
    field_motor_canopy_on_top_options
  );

  let { dropdownOptions: lpbs_type_options } = useDropdownOptions(
    `${LPBS_TYPE}?fields=["*"]`,
    "name"
  );
  lpbs_type_options = moveNAtoEnd(lpbs_type_options);
  let { dropdownOptions: lpbs_enclosure_options } = useDropdownOptions(
    `${LPBS_ENCLOSURE}?fields=["*"]`,
    "name"
  );
  lpbs_enclosure_options = moveNAtoEnd(lpbs_enclosure_options);
  let { dropdownOptions: lpbs_material_options } = useDropdownOptions(
    `${LPBS_MATERIAL}?fields=["*"]`,
    "name"
  );
  lpbs_material_options = moveNAtoEnd(lpbs_material_options);
  let { dropdownOptions: lpbs_qty_options } = useDropdownOptions(
    `${LPBS_QTY}?fields=["*"]`,
    "name"
  );
  lpbs_qty_options = moveNAtoEnd(lpbs_qty_options);
  let { dropdownOptions: lpbs_color_shade_options } = useDropdownOptions(
    `${LPBS_COLOR_SHADE}?fields=["*"]`,
    "lpbs_color_shade"
  );
  lpbs_color_shade_options = moveNAtoEnd(lpbs_color_shade_options);
  let { dropdownOptions: lpbs_canopy_on_top_options } = useDropdownOptions(
    `${LPBS_CANOPY_ON_TOP}?fields=["*"]`,
    "name"
  );
  lpbs_canopy_on_top_options = moveNAtoEnd(lpbs_canopy_on_top_options);
  let { dropdownOptions: lpbs_push_button_start_color_options } =
    useDropdownOptions(`${LPBS_PUSH_BUTTON_START_COLOR}?fields=["*"]`, "name");
  lpbs_push_button_start_color_options = moveNAtoEnd(
    lpbs_push_button_start_color_options
  );
  let { dropdownOptions: lpbs_indicator_on_options } = useDropdownOptions(
    `${LPBS_INDICATOR_ON_COLOR}?fields=["*"]`,
    "name"
  );
  lpbs_indicator_on_options = moveNAtoEnd(lpbs_indicator_on_options);

  let { dropdownOptions: lpbs_indiacator_off_options } = useDropdownOptions(
    `${LPBS_INDICATOR_OFF_COLOR}?fields=["*"]`,
    "name"
  );
  lpbs_indiacator_off_options = moveNAtoEnd(lpbs_indiacator_off_options);

  let { dropdownOptions: lpbs_speed_increase_options } = useDropdownOptions(
    `${LPBS_SPEED_INCREASE_BUTTON}?fields=["*"]`,
    "name"
  );
  lpbs_speed_increase_options = moveNAtoEnd(lpbs_speed_increase_options);
  let { dropdownOptions: lpbs_speed_decrease_options } = useDropdownOptions(
    `${LPBS_SPEED_DECREASE_BUTTON}?fields=["*"]`,
    "name"
  );
  lpbs_speed_decrease_options = moveNAtoEnd(lpbs_speed_decrease_options);

  let { dropdownOptions: apfc_relay_options } = useDropdownOptions(
    `${APFC_RELAY}?fields=["*"]`,
    "name"
  );
  apfc_relay_options = sortDropdownOptions(apfc_relay_options);

  const { dropdownOptions: pb_main_busbar_selection_options } =
    useDropdownOptions(
      `${POWER_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
      "name"
    );
  const { dropdownOptions: pb_heat_pvc_sleeve_options } = useDropdownOptions(
    `${POWER_BUS_HEAT_PVC_SLEEVE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: pb_current_density_options } = useDropdownOptions(
    `${POWER_BUS_CURRENT_DENSITY}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: cb_main_busbar_selection_option } =
    useDropdownOptions(
      `${CONTROL_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
      "name"
    );
  const { dropdownOptions: cb_heat_pvc_sleeve_options } = useDropdownOptions(
    `${CONTROL_BUS_HEAT_PVC_SLEEVE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: cb_current_density_options } = useDropdownOptions(
    `${CONTROL_BUS_CURRENT_DENSITY}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: eb_main_busbar_selection_options } =
    useDropdownOptions(
      `${EARTH_BUS_MAIN_BUSBAR_SELECTION}?fields=["*"]`,
      "name"
    );
  const { dropdownOptions: eb_main_busbar_position_options } =
    useDropdownOptions(`${EARTH_BUS_BUSBAR_POSITION}?fields=["*"]`, "name");
  const { dropdownOptions: eb_current_density_options } = useDropdownOptions(
    `${EARTH_BUS_CURRENT_DENSITY}?fields=["*"]`,
    "name"
  );

  const { dropdownOptions: metering_for_feeder_options } = useDropdownOptions(
    `${METERING_FOR_FEEDER}?fields=["*"]`,
    "name"
  );

  return {
    metering_for_feeder_options,
    pb_main_busbar_selection_options,
    pb_heat_pvc_sleeve_options,
    pb_current_density_options,
    cb_main_busbar_selection_option,
    cb_heat_pvc_sleeve_options,
    cb_current_density_options,
    eb_main_busbar_selection_options,
    eb_main_busbar_position_options,
    eb_current_density_options,
    apfc_relay_options,
    field_motor_type_options,
    field_motor_enclosure_options,
    field_motor_material_options,
    field_motor_qty_options,
    field_motor_color_shade_options,
    field_motor_cable_entry_options,
    field_motor_canopy_on_top_options,
    running_open_options,
    stopped_closed_options,
    trip_options,
    dol_starter_options,
    star_delta_starter_options,
    ammeter_options,
    ammeter_configuration_options,
    mcc_switchgear_type_options,
    switchgear_combination_options,
    pole_options,
    dm_standard_options,
    testing_standard_options,
    power_wiring_color_options,
    power_wiring_length_options,
    control_wiring_color_options,
    control_wiring_length_options,
    vdc_24_wiring_color_options,
    vdc_24_wiring_length_options,
    analog_signal_wiring_color_options,
    analog_signal_wiring_length_options,
    ct_wiring_color_options,
    ct_wiring_length_options,
    cable_wiring_pvc_options,
    ferrule_options,
    spare_terminal_options,
    test_reset_options,
    alarm_acknowledge_and_lamp_test_options,
    speed_decrease_pb_options,
    speed_increase_pb_options,
    ess_options,
    push_button_stop_options,
    push_button_start_options,
    lr_selector_lock_switch_applicable_options,
    lr_selector_lock_options,
    lpbs_type_options,
    lpbs_enclosure_options,
    lpbs_material_options,
    lpbs_qty_options,
    lpbs_color_shade_options,
    lpbs_canopy_on_top_options,
    lpbs_push_button_start_color_options,
    lpbs_indicator_on_options,
    lpbs_indiacator_off_options,
    lpbs_speed_increase_options,
    lpbs_speed_decrease_options,
  };
}
