"use client"

import { ALARM_ACKNOWLEDGE_AND_LAMP_TEST, AMMETER, AMMETER_CONFIGURATION, ANALOG_SIGNAL_WIRING_COLOR, ANALOG_SIGNAL_WIRING_LENGTH, APFC_RELAY, CABLE_WIRING_PVC, CB_CURRENT_DENSITY, CB_HEAT_PVC_SLEEVE, CB_MAIN_BUSBAR_SELECTION, CONTROL_WIRING_COLOR, CONTROL_WIRING_LENGTH, CT_WIRING_COLOR, CT_WIRING_LENGTH, DOL_STARTER, EB_CURRENT_DENSITY, EB_EARTH_BUSBAR_POSITION, EB_MAIN_BUSBAR_SELECTION, FERRULE, FIELD_MOTOR_CABLE_ENTRY, FIELD_MOTOR_CANOPY_ON_TOP, FIELD_MOTOR_COLOUR_SHADE, FIELD_MOTOR_ENCLOSURE, FIELD_MOTOR_MATERIAL, FIELD_MOTOR_QTY, FIELD_MOTOR_TYPE, LPBS_CANOPY_ON_TOP, LPBS_COLOR, LPBS_COLOR_SHADE, LPBS_ENCLOSURE, LPBS_INDICATOR_OFF_COLOR, LPBS_INDICATOR_ON_COLOR, LPBS_MATERIAL, LPBS_QTY, LPBS_SPEED_DECREASE_BUTTON, LPBS_SPEED_INCREASE_BUTTON, LPBS_TYPE, LR_SELECTOR_LOCK_TYPE, LR_SELECTOR_SWITCH_APPLICABLE, MCC_SWITCHGEAR_TYPE, METERING_FOR_FEEDER, PB_CURRENT_DENSITY, PB_HEAT_PVC_SLEEVE, PB_MAIN_BUSBAR_SELECTION, POWER_WIRING_COLOR, POWER_WIRING_LENGTH, PUSH_BUTTON_ESS, PUSH_BUTTON_START, PUSH_BUTTON_STOP, RUNNING_OPEN, SPARE_TERMINAL, SPEED_DECREASE_PB, SPEED_INCREASE_PB, STAR_DELTA_STARTER, STOPPED_CLOSED, SUPPLY_FEEDER_DM_STANDARD, SUPPLY_FEEDER_POLE, SUPPLY_FEEDER_TESTING_STANDARD, SWITCHGEAR_COMBINATION, TEST_RESET, TRIP, VDC_24_WIRING_COLOR, VDC_24_WIRING_LENGTH } from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useCommonConfigDropdowns() {
  const { dropdownOptions: dol_starterOptions } = useDropdownOptions(`${DOL_STARTER}?fields=["*"]`, "dol_starter")
  const { dropdownOptions: star_delta_starterOptions } = useDropdownOptions(`${STAR_DELTA_STARTER}?fields=["*"]`, "star_delta_starter")
  const { dropdownOptions: ammeterOptions } = useDropdownOptions(`${AMMETER}?fields=["*"]`, "ammeter")
  const { dropdownOptions: ammeter_configurationOptions } = useDropdownOptions(`${AMMETER_CONFIGURATION}?fields=["*"]`, "ammeter_configuration")
  const { dropdownOptions: mcc_switchgear_typeOptions } = useDropdownOptions(`${MCC_SWITCHGEAR_TYPE}?fields=["*"]`, "mcc_switchgear_type")
  const { dropdownOptions: switchgear_combinationOptions } = useDropdownOptions(`${SWITCHGEAR_COMBINATION}?fields=["*"]`, "switchgear_combination")

  const { dropdownOptions: poleOptions } = useDropdownOptions(`${SUPPLY_FEEDER_POLE}?fields=["*"]`, "pole")
  const { dropdownOptions: dm_standardOptions } = useDropdownOptions(`${SUPPLY_FEEDER_DM_STANDARD}?fields=["*"]`, "dm_standard")
  const { dropdownOptions: testing_standardOptions } = useDropdownOptions(`${SUPPLY_FEEDER_TESTING_STANDARD}?fields=["*"]`, "testing_standard")
  const { dropdownOptions: power_wiring_colorOptions } = useDropdownOptions(`${POWER_WIRING_COLOR}?fields=["*"]`, "power_wiring_color")
  const { dropdownOptions: power_wiring_lengthOptions } = useDropdownOptions(`${POWER_WIRING_LENGTH}?fields=["*"]`, "power_wiring_length")
  const { dropdownOptions: control_wiring_colorOptions } = useDropdownOptions(`${CONTROL_WIRING_COLOR}?fields=["*"]`, "control_wiring_color")
  const { dropdownOptions: control_wiring_lengthOptions } = useDropdownOptions(`${CONTROL_WIRING_LENGTH}?fields=["*"]`, "control_wiring_length")
  const { dropdownOptions: vdc_24_wiring_colorOptions } = useDropdownOptions(`${VDC_24_WIRING_COLOR}?fields=["*"]`, "vdc_24_wiring_color")
  const { dropdownOptions: vdc_24_wiring_lengthOptions } = useDropdownOptions(`${VDC_24_WIRING_LENGTH}?fields=["*"]`, "vdc_24_wiring_length")
  const { dropdownOptions: analog_signal_wiring_colorOptions } = useDropdownOptions(`${ANALOG_SIGNAL_WIRING_COLOR}?fields=["*"]`, "analog_signal_wiring_color")
  const { dropdownOptions: analog_signal_wiring_lengthOptions } = useDropdownOptions(`${ANALOG_SIGNAL_WIRING_LENGTH}?fields=["*"]`, "analog_signal_wiring_length")
  const { dropdownOptions: ct_wiring_colorOptions } = useDropdownOptions(`${CT_WIRING_COLOR}?fields=["*"]`, "ct_wiring_color")
  const { dropdownOptions: ct_wiring_lengthOptions } = useDropdownOptions(`${CT_WIRING_LENGTH}?fields=["*"]`, "ct_wiring_length")
  const { dropdownOptions: cable_wiring_pvcOptions } = useDropdownOptions(`${CABLE_WIRING_PVC}?fields=["*"]`, "cable_insulation_pvc")
  const { dropdownOptions: ferruleOptions } = useDropdownOptions(`${FERRULE}?fields=["*"]`, "ferrule")
  const { dropdownOptions: spare_terminalOptions } = useDropdownOptions(`${SPARE_TERMINAL}?fields=["*"]`, "spare_terminal")
  
  const { dropdownOptions: test_resetOptions } = useDropdownOptions(`${TEST_RESET}?fields=["*"]`, "test_reset")
  const { dropdownOptions: alarm_acknowledge_and_lamp_testOptions } = useDropdownOptions(`${ALARM_ACKNOWLEDGE_AND_LAMP_TEST}?fields=["*"]`, "alarm_acknowledge_and_lamp_test")
  const { dropdownOptions: speed_decrease_pbOption } = useDropdownOptions(`${SPEED_DECREASE_PB}?fields=["*"]`, "speed_decrease_pb")
  const { dropdownOptions: speed_increase_pbOption } = useDropdownOptions(`${SPEED_INCREASE_PB}?fields=["*"]`, "speed_increase_pb")
  const { dropdownOptions: essOption } = useDropdownOptions(`${PUSH_BUTTON_ESS}?fields=["*"]`, "ess")
  const { dropdownOptions: push_button_stopOptions } = useDropdownOptions(`${PUSH_BUTTON_STOP}?fields=["*"]`, "stop")
  const { dropdownOptions: push_button_startOptions } = useDropdownOptions(`${PUSH_BUTTON_START}?fields=["*"]`, "start")
  
  const { dropdownOptions: lr_selector_lock_switch_applicableOptions } = useDropdownOptions(`${LR_SELECTOR_SWITCH_APPLICABLE}?fields=["*"]`, "applicable")
  const { dropdownOptions: lr_selector_lockOptions } = useDropdownOptions(`${LR_SELECTOR_LOCK_TYPE}?fields=["*"]`, "lockable")
  
  const { dropdownOptions: running_openOption } = useDropdownOptions(`${RUNNING_OPEN}?fields=["*"]`, "running_open")
  const { dropdownOptions: stopped_closedOption } = useDropdownOptions(`${STOPPED_CLOSED}?fields=["*"]`, "stopped_closed")
  const { dropdownOptions: tripOption } = useDropdownOptions(`${TRIP}?fields=["*"]`, "trip")
  
  const { dropdownOptions: field_motor_typeOption } = useDropdownOptions(`${FIELD_MOTOR_TYPE}?fields=["*"]`, "type")
  const { dropdownOptions: field_motor_enclosureOption } = useDropdownOptions(`${FIELD_MOTOR_ENCLOSURE}?fields=["*"]`, "enclosure")
  const { dropdownOptions: field_motor_materialOption } = useDropdownOptions(`${FIELD_MOTOR_MATERIAL}?fields=["*"]`, "material")
  const { dropdownOptions: field_motor_qtyOption } = useDropdownOptions(`${FIELD_MOTOR_QTY}?fields=["*"]`, "qty")
  const { dropdownOptions: field_motor_colourShadeOption } = useDropdownOptions(`${FIELD_MOTOR_COLOUR_SHADE}?fields=["*"]`, "isolator_color_shade")
  const { dropdownOptions: field_motor_cableEntryOption } = useDropdownOptions(`${FIELD_MOTOR_CABLE_ENTRY}?fields=["*"]`, "cable_entry")
  const { dropdownOptions: field_motor_canopyOnTopOption } = useDropdownOptions(`${FIELD_MOTOR_CANOPY_ON_TOP}?fields=["*"]`, "canopy_on_top")

  const { dropdownOptions: lpbs_typeOption } = useDropdownOptions(`${LPBS_TYPE}?fields=["*"]`, "type")
  const { dropdownOptions: lpbs_enclosureOption } = useDropdownOptions(`${LPBS_ENCLOSURE}?fields=["*"]`, "enclosure")
  const { dropdownOptions: lpbs_materialOption } = useDropdownOptions(`${LPBS_MATERIAL}?fields=["*"]`, "material")
  const { dropdownOptions: lpbs_qtyOption } = useDropdownOptions(`${LPBS_QTY}?fields=["*"]`, "qty")
  const { dropdownOptions: lpbs_colorShadeOption } = useDropdownOptions(`${LPBS_COLOR_SHADE}?fields=["*"]`, "lpbs_color_shade")
  const { dropdownOptions: lpbs_canopyOnTopOption } = useDropdownOptions(`${LPBS_CANOPY_ON_TOP}?fields=["*"]`, "canopy_on_top")
  const { dropdownOptions: lpbs_colorOption } = useDropdownOptions(`${LPBS_COLOR}?fields=["*"]`, "start_push_button_color")
  const { dropdownOptions: lpbs_indicator_onOption } = useDropdownOptions(`${LPBS_INDICATOR_ON_COLOR}?fields=["*"]`, "start_on_indication_lamp_color")
  const { dropdownOptions: lpbs_indiacator_offOption } = useDropdownOptions(`${LPBS_INDICATOR_OFF_COLOR}?fields=["*"]`, "stop_off_indication_lamp_color")
  const { dropdownOptions: lpbs_speed_increaseOption } = useDropdownOptions(`${LPBS_SPEED_INCREASE_BUTTON}?fields=["*"]`, "speed_increase_push_button")
  const { dropdownOptions: lpbs_speed_decreaseOption } = useDropdownOptions(`${LPBS_SPEED_DECREASE_BUTTON}?fields=["*"]`, "speed_decrease_push_button")
  
  const { dropdownOptions: apfc_relayOption } = useDropdownOptions(`${APFC_RELAY}?fields=["*"]`, "apfc_relay")
  
  const { dropdownOptions: pb_main_busbar_selectionOption } = useDropdownOptions(`${PB_MAIN_BUSBAR_SELECTION}?fields=["*"]`, "main_busbar_selection")
  const { dropdownOptions: pb_heat_pvc_sleeve_Option } = useDropdownOptions(`${PB_HEAT_PVC_SLEEVE}?fields=["*"]`, "heat_shrinkable_color_pvc_sleeve")
  const { dropdownOptions: pb_current_densityOption } = useDropdownOptions(`${PB_CURRENT_DENSITY}?fields=["*"]`, "pb_current_density")
  const { dropdownOptions: cb_main_busbar_selectionOption } = useDropdownOptions(`${CB_MAIN_BUSBAR_SELECTION}?fields=["*"]`, "main_busbar_selection")
  const { dropdownOptions: cb_heat_pvc_sleeveOption } = useDropdownOptions(`${CB_HEAT_PVC_SLEEVE}?fields=["*"]`, "heat_shrinkable_color_pvc_sleeve")
  const { dropdownOptions: cb_current_densityOption } = useDropdownOptions(`${CB_CURRENT_DENSITY}?fields=["*"]`, "current_density")
  const { dropdownOptions: eb_main_busbar_selectionOption } = useDropdownOptions(`${EB_MAIN_BUSBAR_SELECTION}?fields=["*"]`, "main_busbar_selection")
  const { dropdownOptions: eb_main_busbar_positionOption } = useDropdownOptions(`${EB_EARTH_BUSBAR_POSITION}?fields=["*"]`, "earth_busbar_position")
  const { dropdownOptions: eb_current_densityOption } = useDropdownOptions(`${EB_CURRENT_DENSITY}?fields=["*"]`, "current_density")
  
  const { dropdownOptions: metering_for_feederOption } = useDropdownOptions(`${METERING_FOR_FEEDER}?fields=["*"]`, "metering_for_feeder")


  return {
    metering_for_feederOption,
    pb_main_busbar_selectionOption,
    pb_heat_pvc_sleeve_Option,
    pb_current_densityOption,
    cb_main_busbar_selectionOption,
    cb_heat_pvc_sleeveOption,
    cb_current_densityOption,
    eb_main_busbar_selectionOption,
    eb_main_busbar_positionOption,
    eb_current_densityOption,
    apfc_relayOption,
    field_motor_typeOption,
    field_motor_enclosureOption,
    field_motor_materialOption,
    field_motor_qtyOption,
    field_motor_colourShadeOption,
    field_motor_cableEntryOption,
    field_motor_canopyOnTopOption,
    running_openOption,
    stopped_closedOption,
    tripOption,
    dol_starterOptions,
    star_delta_starterOptions,
    ammeterOptions,
    ammeter_configurationOptions,
    mcc_switchgear_typeOptions,
    switchgear_combinationOptions,
    poleOptions,
    dm_standardOptions,
    testing_standardOptions,
    power_wiring_colorOptions,
    power_wiring_lengthOptions,
    control_wiring_colorOptions,
    control_wiring_lengthOptions,
    vdc_24_wiring_colorOptions,
    vdc_24_wiring_lengthOptions,
    analog_signal_wiring_colorOptions,
    analog_signal_wiring_lengthOptions,
    ct_wiring_colorOptions,
    ct_wiring_lengthOptions,
    cable_wiring_pvcOptions,
    ferruleOptions,
    spare_terminalOptions,
    test_resetOptions,
    alarm_acknowledge_and_lamp_testOptions,
    speed_decrease_pbOption,
    speed_increase_pbOption,
    essOption,
    push_button_stopOptions,
    push_button_startOptions,
    lr_selector_lock_switch_applicableOptions,
    lr_selector_lockOptions,
    lpbs_typeOption,
    lpbs_enclosureOption,
    lpbs_materialOption,
    lpbs_qtyOption,
    lpbs_colorShadeOption,
    lpbs_canopyOnTopOption,
    lpbs_colorOption,
    lpbs_indicator_onOption,
    lpbs_indiacator_offOption,
    lpbs_speed_increaseOption,
    lpbs_speed_decreaseOption
  }
}
