"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { COMMON_CONFIGURATION } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useCommonConfigDropdowns from "./CommonConfigDropdowns"
import { configItemValidationSchema } from "../schemas"
import { useCurrentUser } from "hooks/useCurrentUser"
import { WWS_SPG } from "configs/constants"

const getDefaultValues = (commonConfigData: any) => {
  return {
    is_field_motor_isolator_selected: commonConfigData?.is_field_motor_isolator_selected?.toString() || "1",
    is_safe_area_isolator_selected: commonConfigData?.is_safe_area_isolator_selected?.toString() || "1",
    is_hazardous_area_isolator_selected: commonConfigData?.is_hazardous_area_isolator_selected?.toString() || "1",
    is_local_push_button_station_selected: commonConfigData?.is_local_push_button_station_selected?.toString() || "1",
    is_safe_lpbs_selected: commonConfigData?.is_safe_lpbs_selected?.toString() || "1",
    is_hazardous_lpbs_selected: commonConfigData?.is_hazardous_lpbs_selected?.toString() || "1",
    dol_starter: commonConfigData?.dol_starter || "0.37",
    star_delta_starter: commonConfigData?.star_delta_starter || "0.55",
    ammeter: commonConfigData?.ammeter || "0.37",
    ammeter_configuration: commonConfigData?.ammeter_configuration || "All Phase With CT",
    mcc_switchgear_type: commonConfigData?.mcc_switchgear_type || "Type II Coordination-Fuseless-One Size Higher",
    switchgear_combination: commonConfigData?.switchgear_combination || "Without MCB",
    pole: commonConfigData?.pole || "4 POLE",
    supply_feeder_standard: commonConfigData?.supply_feeder_standard || "IEC",
    dm_standard: commonConfigData?.dm_standard || "IEC 61439",
    testing_standard: commonConfigData?.testing_standard || "IEC 61439",
    power_wiring_color: commonConfigData?.power_wiring_color || "Brown, Black, Grey, Blue",
    power_wiring_size: commonConfigData?.power_wiring_size || "Min. 2.5 Sq. mm",
    control_wiring_color: commonConfigData?.control_wiring_color || "Grey, Black",
    control_wiring_size: commonConfigData?.control_wiring_size || "1 Sq. mm",
    vdc_24_wiring_color: commonConfigData?.vdc_24_wiring_color || "Orange, White",
    vdc_24_wiring_size: commonConfigData?.vdc_24_wiring_size || "0.75 Sq. mm",
    analog_signal_wiring_color: commonConfigData?.analog_signal_wiring_color || "Blue, White Shielded Cable",
    analog_signal_wiring_size: commonConfigData?.analog_signal_wiring_size || "1 Sq. mm",
    ct_wiring_color: commonConfigData?.ct_wiring_color || "Red, Yellow, Blue, Black",
    ct_wiring_size: commonConfigData?.ct_wiring_size || "2.5 Sq. mm",
    cable_insulation_pvc: commonConfigData?.cable_insulation_pvc || "Fire Resistant",
    ferrule: commonConfigData?.ferrule || "Cross Ferrule",
    common_requirement:
      commonConfigData?.common_requirement ||
      "660/1100 V Grade PVC insulated, FR/FRLS, Multistranded, Copper, Flexible cable identified with colour code",
    spare_terminal: commonConfigData?.spare_terminal || "10",
    push_button_start: commonConfigData?.push_button_start || "Green",
    push_button_stop: commonConfigData?.push_button_stop || "Green",
    push_button_ess: commonConfigData?.push_button_ess || "Stayput (RED)",
    is_push_button_speed_selected: commonConfigData?.is_push_button_speed_selected?.toString() || "1",
    speed_increase_pb: commonConfigData?.speed_increase_pb || "Yellow",
    speed_decrease_pb: commonConfigData?.speed_decrease_pb || "Black",
    alarm_acknowledge_and_lamp_test: commonConfigData?.alarm_acknowledge_and_lamp_test || "Black",
    lamp_test_push_button: commonConfigData?.lamp_test_push_button || "Yellow",
    test_dropdown: commonConfigData?.test_dropdown || "Yellow",
    reset_dropdown: commonConfigData?.reset_dropdown || "Black",
    selector_switch_applicable: commonConfigData?.selector_switch_applicable || "Not Applicable",
    selector_switch_lockable: commonConfigData?.selector_switch_lockable || "Lockable",
    running_open: commonConfigData?.running_open || "Green",
    stopped_closed: commonConfigData?.stopped_closed || "Red",
    trip: commonConfigData?.trip || "Amber",
    safe_field_motor_type: commonConfigData?.type || "Weather Proof Enclosure",
    safe_field_motor_enclosure: commonConfigData?.enclosure || "IP 65",
    safe_field_motor_material: commonConfigData?.material || "SS 316",
    safe_field_motor_thickness: commonConfigData?.thickness || "1.6 mm",
    safe_field_motor_qty: commonConfigData?.qty || "As Mentioned in Electrical Load List",
    safe_field_motor_isolator_color_shade: commonConfigData?.field_motor_isolator_color_shade || "RAL 7035",
    safe_field_motor_cable_entry: commonConfigData?.cable_entry || "Bottom",
    safe_field_motor_canopy: commonConfigData?.canopy_on_top || "All",
    safe_field_motor_canopy_type: commonConfigData?.type || "On Top",
    hazardous_field_motor_type: commonConfigData?.type || "IS",
    hazardous_field_motor_enclosure: commonConfigData?.enclosure || "IP 65",
    hazardous_field_motor_material: commonConfigData?.material || "SS 316",
    hazardous_field_motor_thickness: commonConfigData?.thickness || "1.6 mm",
    hazardous_field_motor_qty: commonConfigData?.qty || "As Mentioned in Electrical Load List",
    hazardous_field_motor_isolator_color_shade: commonConfigData?.field_motor_isolator_color_shade || "RAL 7035",
    hazardous_field_motor_cable_entry: commonConfigData?.cable_entry || "Bottom",
    hazardous_field_motor_canopy: commonConfigData?.canopy_on_top || "All",
    hazardous_field_motor_canopy_type: commonConfigData?.type || "On Top",

    safe_lpbs_type: commonConfigData?.lpbs_type || "Weather Proof Enclosure",
    safe_lpbs_enclosure: commonConfigData?.lpbs_enclosure || "IP 65",
    safe_lpbs_material: commonConfigData?.lpbs_material || "CRCA",
    safe_lpbs_thickness: commonConfigData?.thickness || "1.6 mm",
    safe_lpbs_qty: commonConfigData?.lpbs_qty || "As mentioned in Electrical Load List",
    safe_lpbs_color_shade: commonConfigData?.lpbs_color_shade || "RAL 7035",
    safe_lpbs_canopy: commonConfigData?.lpbs_canopy_on_top || "All",
    safe_lpbs_canopy_type: commonConfigData?.type || "On Top",

    hazardous_lpbs_type: commonConfigData?.lpbs_type || "IS",
    hazardous_lpbs_enclosure: commonConfigData?.lpbs_enclosure || "IP 65",
    hazardous_lpbs_material: commonConfigData?.lpbs_material || "CRCA",
    hazardous_lpbs_thickness: commonConfigData?.thickness || "1.6 mm",
    hazardous_lpbs_qty: commonConfigData?.lpbs_qty || "As mentioned in Electrical Load List",
    hazardous_lpbs_color_shade: commonConfigData?.lpbs_color_shade || "RAL 7035",
    hazardous_lpbs_canopy: commonConfigData?.lpbs_canopy_on_top || "All",
    hazardous_lpbs_canopy_type: commonConfigData?.type || "On Top",


    lpbs_push_button_start_color: commonConfigData?.lpbs_push_button_start_color || "Green",
    lpbs_indication_lamp_start_color: commonConfigData?.lpbs_indication_lamp_start_color || "Green",
    lpbs_indication_lamp_stop_color: commonConfigData?.lpbs_indication_lamp_stop_color || "Red",
    lpbs_speed_increase: commonConfigData?.lpbs_speed_increase || "Yellow",
    lpbs_speed_decrease: commonConfigData?.lpbs_speed_decrease || "Black",
    apfc_relay: commonConfigData?.apfc_relay || "4",
    power_bus_main_busbar_selection: commonConfigData?.power_bus_main_busbar_selection || "As per IS8623",
    power_bus_heat_pvc_sleeve: commonConfigData?.power_bus_heat_pvc_sleeve || "Red, Yellow, Blue, Black",
    power_bus_material: commonConfigData?.power_bus_material || "Aluminium",
    power_bus_current_density: commonConfigData?.power_bus_current_density || "0.8 A/Sq. mm",
    power_bus_rating_of_busbar: commonConfigData?.power_bus_rating_of_busbar || "( Min -1R X 60 mm X 12 mm) for 50 KA",
    control_bus_main_busbar_selection: commonConfigData?.control_bus_main_busbar_selection || "As per IS8623",
    control_bus_heat_pvc_sleeve: commonConfigData?.control_bus_heat_pvc_sleeve || "Red, Black",
    control_bus_material: commonConfigData?.control_bus_material || "Aluminium",
    control_bus_current_density: commonConfigData?.control_bus_current_density || "0.8 A/Sq. mm",
    control_bus_rating_of_busbar:
      commonConfigData?.control_bus_rating_of_busbar || "( Min - 1R X 25 mm X 10 mm )",
    earth_bus_main_busbar_selection: commonConfigData?.earth_bus_main_busbar_selection || "As per IS8623",
    earth_bus_busbar_position: commonConfigData?.earth_bus_busbar_position || "Top",
    earth_bus_material: commonConfigData?.earth_bus_material || "Aluminium",
    earth_bus_current_density: commonConfigData?.earth_bus_current_density || "0.8 A/Sq. mm",
    earth_bus_rating_of_busbar: commonConfigData?.earth_bus_rating_of_busbar || "( Min- 1R X 20 mm X 5 mm )",
    metering_for_feeders: commonConfigData?.metering_for_feeders || "Ammeter (Digital)",
    cooling_fans: commonConfigData?.cooling_fans || "Not Applicable",
    louvers_and_filters: commonConfigData?.louvers_and_filters || "Not Applicable",
    alarm_annunciator: commonConfigData?.alarm_annunciator || "Not Applicable",
    control_transformer: commonConfigData?.control_transformer || "Not Applicable",
    commissioning_spare: commonConfigData?.commissioning_spare || "Not Applicable",
    two_year_operational_spare: commonConfigData?.two_year_operational_spare || "Not Applicable",
  }
}

const CommonConfiguration = ({
  revision_id,
}: {
  revision_id: string
  setActiveKey: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { data: commonConfigurationData } = useGetData(
    `${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  )

  // const { data: projectPanelData } = useGetData(
  //   `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  // )
  const [loading, setLoading] = useState(false)

  const userInfo = useCurrentUser()
  let {
    dropdown
  } = useCommonConfigDropdowns()

  let dol_starter_options = dropdown["DOL Starter"]
  let star_delta_starter_options = dropdown["Star Delta Starter"]
  let ammeter_options = dropdown["Ammeter"]
  let ammeter_configuration_options = dropdown["Ammeter Configuration"]
  let mcc_switchgear_type_options = dropdown["MCC Switchgear Type"]
  let switchgear_combination_options = dropdown["Switchgear Combination"]
  let pole_options = dropdown["Supply Feeder Pole"]
  let dm_standard_options = dropdown["Supply Feeder DM Standard"]
  let testing_standard_options = dropdown["Supply Feeder Testing Standard"]
  let power_wiring_color_options = dropdown["Power Wiring Color"]
  let power_wiring_length_options = dropdown["Power Wiring Size"]
  let control_wiring_color_options = dropdown["Control Wiring Color"]
  let control_wiring_length_options = dropdown["Control Wiring Size"]
  let vdc_24_wiring_color_options = dropdown["VDC 24 Wiring Color"]
  let vdc_24_wiring_length_options = dropdown["VDC 24 Wiring Size"]
  let analog_signal_wiring_color_options = dropdown["Analog Signal Wiring Color"]
  let analog_signal_wiring_length_options = dropdown["Analog Signal Wiring Size"]
  let ct_wiring_color_options = dropdown["CT Wiring Color"]
  let ct_wiring_length_options = dropdown["CT Wiring Size"]
  let cable_wiring_pvc_options = dropdown["Cable Insulation PVC"]
  let ferrule_options = dropdown["Ferrule"]

  let spare_terminal_options = dropdown["Spare Terminal"]

  let push_button_stop_options = dropdown["Push Button Stop Color"]
  let push_button_start_options = dropdown["Push Button Start Color"]
  let ess_options = dropdown["Push Button ESS"]
  let speed_increase_pb_options = dropdown["Speed Increase PB"]
  let field_motor_thickness_options = dropdown["Field Motor Thickness"]
  let speed_decrease_pb_options = dropdown["Speed Decrease PB"]
  let test_dropdown_options = dropdown["Test Dropdown"]
  let reset_dropdown_options = dropdown["Reset Dropdown"]
  let alarm_acknowledge_dropdown_options = dropdown["Alarm Acknowledge Dropdown"]
  let lamp_test_dropdown_options = dropdown["Lamp Test Dropdown"]

  let running_open_options = dropdown["Indicating Lamp Running Open"]
  let stopped_closed_options = dropdown["Indicating Lamp Stopped Closed"]
  let trip_options = dropdown["Indicating Lamp Trip"]

  let field_motor_type_options = dropdown["Field Motor Isolator General Type"]
  let hazardous_area_type_options = dropdown["Hazardous Area Type Isolator and Lpbs"]
  let field_motor_enclosure_options = dropdown["Field Motor Isolator General Enclosure"]
  let field_motor_material_options = dropdown["Field Motor Isolator General Material"]
  let field_motor_qty_options = dropdown["Field Motor Isolator General QTY"]
  let field_motor_color_shade_options = dropdown["Field Motor Isolator Color Shade"]
  let field_motor_cable_entry_options = dropdown["Field Motor Isolator General Cable Entry"]
  let field_motor_canopy_on_top_options = dropdown["Field Motor Isolator Canopy On Top"]
  let field_motor_canopy_type_options = dropdown["Field Motor Isolator Canopy Type"]

  let lpbs_color_shade_options = dropdown["Local Push Button Station LPBS Color Shade"]
  let lpbs_canopy_on_top_options = dropdown["Local Push Button Station Canopy On top"]
  let lpbs_indicator_on_options = dropdown["LPBS Start On Indication Lamp Color"]
  let lpbs_indiacator_off_options = dropdown["LPBS Stop Off Indication Lamp Color"]
  let lpbs_speed_increase_options = dropdown["LPBS Speed Increase Push Button"]
  let lpbs_speed_decrease_options = dropdown["LPBS Speed Decrease Push Button"]

  let apfc_relay_options = dropdown["APFC Relay"]


  let pb_main_busbar_selection_options = dropdown["Power Bus Main Busbar Selection"]
  let pb_heat_pvc_sleeve_options = dropdown["Power Bus Heat Shrinkable Color PVC sleeve"]
  let pb_current_density_options = dropdown["Power Bus Current Density"]
  let cb_main_busbar_selection_option = dropdown["Control Bus Main Busbar Selection"]
  let cb_heat_pvc_sleeve_options = dropdown["Control Bus Heat Shrinkable Color PVC sleeve"]
  let cb_current_density_options = dropdown["Control Bus Current Density"]
  let eb_main_busbar_selection_options = dropdown["Earth Bus Main Busbar Selection"]
  let eb_main_busbar_position_options = dropdown["Earth Bus Busbar Position"]
  let eb_current_density_options = dropdown["Earth Bus Current Density"]
  let metering_for_feeder_options = dropdown["Metering for Feeder"]


  const [testing_standards, setTestingStandards] = useState<any[]>(
    Array.isArray(testing_standard_options) ? [...testing_standard_options] : []
  )
  const iec_testing_standards = testing_standard_options?.filter(
    (item: any) => item.name.startsWith("IEC") || item.name === "NA"
  )
  const is_testing_standards = testing_standard_options?.filter(
    (item: any) => item.name.startsWith("IS") || item.name === "NA"
  )

  const iec_dm_standards = dm_standard_options?.filter((item: any) => item.name.startsWith("IEC") || item.name === "NA")
  const is_dm_standards = dm_standard_options?.filter((item: any) => item.name.startsWith("IS") || item.name === "NA")

  const al_pb_current_density = pb_current_density_options?.filter((item: any) => item.name.startsWith("0.8"))
  const cu_pb_current_density = pb_current_density_options?.filter(
    (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
  )
  const al_cb_current_density = cb_current_density_options?.filter((item: any) => item.name.startsWith("0.8"))
  const cu_cb_current_density = cb_current_density_options?.filter(
    (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
  )
  const al_eb_current_density = eb_current_density_options?.filter((item: any) => item.name.startsWith("0.8"))
  const cu_eb_current_density = eb_current_density_options?.filter(
    (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
  )

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: getDefaultValues(commonConfigurationData?.[0]),
    mode: "onSubmit",
  })

  const supply_feeder_standard_controlled = watch("supply_feeder_standard")

  useEffect(() => {
    reset(getDefaultValues(commonConfigurationData?.[0]))
  }, [commonConfigurationData, reset])

  useEffect(() => {
    if (supply_feeder_standard_controlled === "IS") {
      setValue("dm_standard", "IS 8623")
      setValue("testing_standard", "IS 8623")
    } else {
      setValue("dm_standard", "IEC 60439")
      setValue("testing_standard", "IEC 60439")
    }
  }, [setValue, supply_feeder_standard_controlled])

  const is_Ammeter_NA = watch("ammeter")
  const control_bus_material_controlled = watch("control_bus_material")
  const power_bus_material_controlled = watch("power_bus_material")
  const earth_bus_material_controlled = watch("earth_bus_material")
  const safe_field_motor_controlled = watch("safe_field_motor_material")
  const hazardous_field_motor_controlled = watch("hazardous_field_motor_material")
  const hazardous__field_motor_type_controlled = watch("hazardous_field_motor_type")
  const safe_lpbs_material_controlled = watch("safe_lpbs_material")
  const hazardous_lpbs_material_controlled = watch("hazardous_lpbs_material")
  const hazardous_lpbs_type_controlled = watch("hazardous_lpbs_type")

  useEffect(() => {
    if (is_Ammeter_NA === "NA") {
      setValue("ammeter_configuration", "NA")
    }

    if (safe_field_motor_controlled !== "SS 316" && safe_field_motor_controlled !== "SS 304" && safe_field_motor_controlled !== "CRCA") {
      setValue("safe_field_motor_thickness", "NA")
    }
    if (hazardous_field_motor_controlled !== "SS 316" && hazardous_field_motor_controlled !== "SS 304" && hazardous_field_motor_controlled !== "CRCA") {
      setValue("hazardous_field_motor_thickness", "NA")
    }
    if (safe_lpbs_material_controlled !== "SS 316" && safe_lpbs_material_controlled !== "SS 304" && safe_lpbs_material_controlled !== "CRCA") {
      setValue("safe_lpbs_thickness", "NA")
    }
    if (hazardous_lpbs_material_controlled !== "SS 316" && hazardous_lpbs_material_controlled !== "SS 304" && hazardous_lpbs_material_controlled !== "CRCA") {
      setValue("hazardous_lpbs_thickness", "NA")
    }
    if (hazardous__field_motor_type_controlled === "IEC Exd") {
      setValue("hazardous_field_motor_material", "Diecast Aluminium")
    }
    if (hazardous__field_motor_type_controlled === "IEC Exe") {
      setValue("hazardous_field_motor_material", "SS 316")
    }
    if (hazardous_lpbs_type_controlled === "IEC Exd") {
      setValue("hazardous_lpbs_material", "Diecast Aluminium")
    }
    if (hazardous_lpbs_type_controlled === "IEC Exe") {
      setValue("hazardous_lpbs_material", "SS 316")
    }

  }, [is_Ammeter_NA, safe_lpbs_material_controlled, hazardous_lpbs_material_controlled, hazardous__field_motor_type_controlled, hazardous_lpbs_type_controlled, safe_field_motor_controlled, hazardous_field_motor_controlled, setValue])
  // }, [is_Ammeter_NA, safe_field_motor_controlled, hazardous_field_motor_controlled, hazardous__field_motor_type_controlled, setValue])

  // Control Bus (dependancy Logic)
  useEffect(() => {
    if (control_bus_material_controlled === "Aluminium") {
      setValue("control_bus_current_density", "0.8 A/Sq. mm")
    } else if (control_bus_material_controlled === "Copper") {
      setValue("control_bus_current_density", "1.0 A/Sq. mm")
    } else {
      setValue("control_bus_current_density", "1.0 A/Sq. mm")
    }
  }, [cb_current_density_options, control_bus_material_controlled, setValue])

  // Power Bus (dependency logic)
  useEffect(() => {
    if (power_bus_material_controlled === "Aluminium") {
      setValue("power_bus_current_density", "0.8 A/Sq. mm")
    } else if (power_bus_material_controlled === "Copper") {
      setValue("power_bus_current_density", "1.0 A/Sq. mm")
    } else {
      setValue("power_bus_current_density", "1.0 A/Sq. mm")
    }
  }, [pb_current_density_options, power_bus_material_controlled, setValue])

  // earth Bus (Dependency logic)
  useEffect(() => {
    if (earth_bus_material_controlled === "Aluminium") {
      setValue("earth_bus_current_density", "0.8 A/Sq. mm")
    } else if (earth_bus_material_controlled === "Copper") {
      setValue("earth_bus_current_density", "1.0 A/Sq. mm")
    } else {
      setValue("earth_bus_current_density", "1.0 A/Sq. mm")
    }
  }, [earth_bus_material_controlled, eb_current_density_options, setValue])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message?.error(errorObj?.message)
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const commonConfigData = await getData(
        `${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      if (commonConfigData && commonConfigData.length > 0) {
        await updateData(`${COMMON_CONFIGURATION}/${commonConfigData[0].name}`, false, data)
        message.success("Common configuration updated successfully")
      } else {
        data["revision_id"] = revision_id
        await createData(COMMON_CONFIGURATION, false, data)
        message.success("Common configuration created successfully")
      }
    } catch (error) {
      console.error("error: ", error)
      console.error("error: ", error)
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4">
        <Divider>
          <span className="font-bold text-slate-700">Outgoing Feeder</span>
        </Divider>

        <div className="flex items-center gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label={
                <>
                  DOL Starter <span className="text-xs text-blue-500">(kW including and below)</span>
                </>
              }
              options={dol_starter_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="star_delta_starter"
              label={
                <>
                  Star Delta Starter <span className="text-xs text-blue-500">(kW including and above)</span>
                </>
              }
              options={star_delta_starter_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ammeter"
              label={
                <>
                  Ammeter <span className="text-xs text-blue-500">(kW including and above)</span>
                </>
              }
              options={ammeter_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="metering_for_feeders"
              label="Ammeter Type"
              options={metering_for_feeder_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ammeter_configuration"
              label="Ammeter Configuration"
              options={ammeter_configuration_options || []}
              size="small"
              disabled={is_Ammeter_NA === "NA"}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="col-1">
            <CustomSingleSelect
              control={control}
              name="mcc_switchgear_type"
              label="MCC Switchgear Type"
              options={mcc_switchgear_type_options || []}
              size="small"
            />
          </div>


          {userInfo?.division === WWS_SPG && (
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="switchgear_combination"
                label="Switchgear Combination"
                disabled={
                  watch("mcc_switchgear_type") === "Type II Coordination-Fuse" ||
                  watch("mcc_switchgear_type") === "Type II Coordination-Fuse-One Size Higher"
                }
                options={switchgear_combination_options || []}
                size="small"
              />
            </div>
          )}
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Supply Feeder</span>
        </Divider>
        <div className="w-1/3">
          <CustomSingleSelect control={control} name="pole" label="Pole" options={pole_options || []} size="small" />
        </div>
        <div className="flex items-center gap-4">
          <div className="basis-1/3">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Supply Feeder"
              options={[
                { label: "IEC", value: "IEC" },
                { label: "IS", value: "IS" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dm_standard"
              label="Design & Manufacturer's standard"
              options={(watch("supply_feeder_standard").startsWith("IEC") ? iec_dm_standards : is_dm_standards) || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="testing_standard"
              label="Testing Standard"
              options={(watch("supply_feeder_standard").startsWith("IEC") ? iec_testing_standards : is_testing_standards) || []}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Wiring</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Power Wiring (L1, L2, L3, N)</h4>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_wiring_color"
              label="Color"
              options={power_wiring_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_wiring_size"
              label="Size"
              options={power_wiring_length_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Control Wiring (P, N)</h4>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_wiring_color"
              label="Color"
              options={control_wiring_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_wiring_size"
              label="Size"
              options={control_wiring_length_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">24 VDC Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="vdc_24_wiring_color"
              label="Color"
              options={vdc_24_wiring_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="vdc_24_wiring_size"
              label="Size"
              options={vdc_24_wiring_length_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Analog Signal Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="analog_signal_wiring_color"
              label="Color"
              options={analog_signal_wiring_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="analog_signal_wiring_size"
              label="Size"
              options={analog_signal_wiring_length_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">CT Wiring</h4>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ct_wiring_color"
              label="Color"
              options={ct_wiring_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ct_wiring_size"
              label="Size"
              options={ct_wiring_length_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cable_insulation_pvc"
              label="Cable Insulation (PVC)"
              options={cable_wiring_pvc_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ferrule"
              label="Ferrule"
              options={ferrule_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="common_requirement" label="Common Requirement" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Terminal</span>
        </Divider>
        <div className="w-1/2">
          <CustomSingleSelect
            control={control}
            name="spare_terminal"
            label="Spare Terminal"
            options={spare_terminal_options || []}
            size="small"
            suffixIcon={
              <>
                <p className="text-base font-semibold text-blue-400">%</p>
              </>
            }
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Push Button Color</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_start"
              label="Start"
              options={push_button_start_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_stop"
              label="Stop"
              options={push_button_stop_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_ess"
              label="ESS"
              options={ess_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_push_button_speed_selected"
              label="Speed"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_increase_pb"
              label="Speed Increase PB"
              options={speed_increase_pb_options || []}
              disabled={watch("is_push_button_speed_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_decrease_pb"
              label="Speed Decrease PB"
              options={speed_decrease_pb_options || []}
              disabled={watch("is_push_button_speed_selected") === "0"}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="alarm_acknowledge_and_lamp_test"
              label="Alarm Acknowledge PB"
              options={alarm_acknowledge_dropdown_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lamp_test_push_button"
              label="Lamp Test PB"
              options={lamp_test_dropdown_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="test_dropdown"
              label="Test"
              options={test_dropdown_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="reset_dropdown"
              label="Reset"
              options={reset_dropdown_options || []}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Selector Switch</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="selector_switch_applicable"
              label="Local/Remote Selector Switch On MCC Panel Front Door"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="selector_switch_lockable"
              label="Lock Type"
              options={[
                { label: "Lockable", value: "Lockable" },
                { label: "UnLockable", value: "UnLockable" },
              ]}
              disabled={watch("selector_switch_applicable") !== "Applicable"}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Indicating Lamp</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="running_open"
              label="Running / Open"
              options={running_open_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="stopped_closed"
              label="Stopped / Closed"
              options={stopped_closed_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="trip" label="Trip" options={trip_options || []} size="small" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Field Motor Isolator (General Specification)</span>
          <div>
            <CustomRadioSelect
              control={control}
              name="is_field_motor_isolator_selected"
              label=""
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
        </Divider>

        <div className="text-base font-bold text-slate-700 flex flex-row items-center gap-4">
          <div>Safe Area</div>
          <CustomRadioSelect
            control={control}
            name="is_safe_area_isolator_selected"
            label=""
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            disabled={watch("is_field_motor_isolator_selected") === "0"}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_type"
              label="Type"
              options={field_motor_type_options || []}
              disabled={true}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_enclosure"
              label="IP Protection"
              options={field_motor_enclosure_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_material"
              label="MOC"
              options={field_motor_material_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_thickness"
              label="Thickness"
              options={field_motor_thickness_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_isolator_color_shade"
              label="Isolator Color Shade"
              options={field_motor_color_shade_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_canopy"
              label="Canopy"
              options={field_motor_canopy_on_top_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_field_motor_canopy_type"
              label="Canopy Type"
              options={field_motor_canopy_type_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_safe_area_isolator_selected") === "0"}
            />
          </div>
        </div>



        <div className="text-base font-bold text-slate-700 flex flex-row items-center gap-4">
          <div>Hazardous Area</div>
          <CustomRadioSelect
            control={control}
            name="is_hazardous_area_isolator_selected"
            label=""
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            disabled={watch("is_field_motor_isolator_selected") === "0"}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_type"
              label="Type"
              options={hazardous_area_type_options || []}
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_enclosure"
              label="IP Protection"
              options={field_motor_enclosure_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_material"
              label="MOC"
              options={field_motor_material_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_thickness"
              label="Thickness"
              options={field_motor_thickness_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_isolator_color_shade"
              label="Isolator Color Shade"
              options={field_motor_color_shade_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_canopy"
              label="Canopy"
              options={field_motor_canopy_on_top_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_field_motor_canopy_type"
              label="Canopy Type"
              options={field_motor_canopy_type_options || []}
              size="small"
              disabled={watch("is_field_motor_isolator_selected") === "0" || watch("is_hazardous_area_isolator_selected") === "0"}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Local Push Button Station (General Specification)</span>
          <div>
            <CustomRadioSelect
              control={control}
              name="is_local_push_button_station_selected"
              label=""
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_push_button_start_color"
              label="Start Push Button Color"
              options={lpbs_indicator_on_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indication_lamp_start_color"
              label="Start / ON Indication Lamp Color"
              options={lpbs_indicator_on_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indication_lamp_stop_color"
              label="Stop / OFF Indication Lamp Color"
              options={lpbs_indiacator_off_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0"}
              size="small"
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_speed_increase"
              label="Speed Increase Push Button"
              options={lpbs_speed_increase_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_speed_decrease"
              label="Speed Decrease Push Button"
              options={lpbs_speed_decrease_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0"}
              size="small"
            />
          </div>
        </div>

        <div className="text-base font-bold text-slate-700 flex flex-row items-center gap-4">
          <div>Safe Area</div>
          <CustomRadioSelect
            control={control}
            name="is_safe_lpbs_selected"
            label=""
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            disabled={watch("is_local_push_button_station_selected") === "0"}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_type"
              label="Type"
              options={field_motor_type_options || []}
              disabled={true}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_enclosure"
              label="IP Protection"
              options={field_motor_enclosure_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_material"
              label="MOC"
              options={field_motor_material_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_thickness"
              label="Thickness"
              options={field_motor_thickness_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_color_shade"
              label="LPBS Color Shade"
              options={lpbs_color_shade_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_canopy"
              label="Canopy"
              options={lpbs_canopy_on_top_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="safe_lpbs_canopy_type"
              label="Canopy Type"
              options={field_motor_canopy_type_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_safe_lpbs_selected") === "0"}
              size="small"
            />
          </div>
        </div>


        <div className="text-base font-bold text-slate-700 flex flex-row items-center gap-4">
          <div>Hazardous Area</div>
          <CustomRadioSelect
            control={control}
            name="is_hazardous_lpbs_selected"
            label=""
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            disabled={watch("is_local_push_button_station_selected") === "0"}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_type"
              label="Type"
              options={hazardous_area_type_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_enclosure"
              label="IP Protection"
              options={field_motor_enclosure_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_material"
              label="MOC"
              options={field_motor_material_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_thickness"
              label="Thickness"
              options={field_motor_thickness_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_color_shade"
              label="LPBS Color Shade"
              options={lpbs_color_shade_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_canopy"
              label="Canopy"
              options={lpbs_canopy_on_top_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hazardous_lpbs_canopy_type"
              label="Canopy Type"
              options={field_motor_canopy_type_options || []}
              disabled={watch("is_local_push_button_station_selected") === "0" || watch("is_hazardous_lpbs_selected") === "0"}
              size="small"
            />
          </div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">APFC</span>
        </Divider>
        <div className="w-1/3">
          <CustomSingleSelect
            control={control}
            name="apfc_relay"
            label="APFC Relay"
            options={apfc_relay_options || []}
            suffixIcon={
              <>
                <p className="font-semibold text-blue-500">Stage</p>
              </>
            }
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Power Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_bus_main_busbar_selection"
              label="Main Busbar Selection"
              options={pb_main_busbar_selection_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_bus_heat_pvc_sleeve"
              label="Heat Shrinkable Color PVC sleeve (L1, L2, L3, N)"
              options={pb_heat_pvc_sleeve_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="power_bus_material"
              label="Material"
              options={[
                { label: "Aluminium", value: "Aluminium" },
                { label: "Copper", value: "Copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_bus_current_density"
              label="Current Density"
              options={(watch("power_bus_material") === "Aluminium" ? al_pb_current_density : cu_pb_current_density) || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="power_bus_rating_of_busbar"
              label="Rating of Busbar"
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Control Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_bus_main_busbar_selection"
              label="Main Busbar Selection"
              options={cb_main_busbar_selection_option || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_bus_heat_pvc_sleeve"
              label="Heat Shrinkable Color PVC sleeve (L, N)"
              options={cb_heat_pvc_sleeve_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="control_bus_material"
              label="Material"
              options={[
                { label: "Aluminium", value: "Aluminium" },
                { label: "Copper", value: "Copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_bus_current_density"
              label="Current Density"
              options={(watch("control_bus_material") === "Aluminium" ? al_cb_current_density : cu_cb_current_density) || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="control_bus_rating_of_busbar"
              label="Rating of Busbar"
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Earth Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earth_bus_main_busbar_selection"
              label="Main Busbar Selection"
              options={eb_main_busbar_selection_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earth_bus_busbar_position"
              label="Earth Busbar Position"
              options={eb_main_busbar_position_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="earth_bus_material"
              label="Material"
              options={[
                { label: "Aluminium", value: "Aluminium" },
                { label: "Copper", value: "Copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earth_bus_current_density"
              label="Current Density"
              options={(watch("earth_bus_material") === "Aluminium" ? al_eb_current_density : cu_eb_current_density) || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="earth_bus_rating_of_busbar"
              label="Rating of Busbar"
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Others</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex flex-row items-center gap-4 flex-1">
            <div className="font-semibold mt-[6px]">Cooling Fans</div>

            <CustomRadioSelect
              control={control}
              name="cooling_fans"
              label=""
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex flex-row items-center gap-4 flex-1">
            <div className="font-semibold mt-[6px]">Louvers and Filters</div>
            <CustomRadioSelect
              control={control}
              name="louvers_and_filters"
              label=""
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Spares</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="commissioning_spare" label="Commissioning Spare" />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput
              control={control}
              name="two_year_operational_spare"
              label="Two Year Operational Spare"
            />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save and Next
          </Button>
        </div>
      </form>
    </>
  )
}

export default CommonConfiguration
