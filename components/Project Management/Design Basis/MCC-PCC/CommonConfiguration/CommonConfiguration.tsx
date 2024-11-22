"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
    field_motor_isolator_is_Selected: commonConfigData?.field_motor_isolator_is_Selected || 1,
    local_push_button_station_is_Selected: commonConfigData?.local_push_button_station_is_Selected || 1,
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
    cable_insulation_pvc: commonConfigData?.cable_insulation_pvc || "FRLS",
    ferrule: commonConfigData?.ferrule || "Cross Ferrule",
    common_requirement:
      commonConfigData?.common_requirement ||
      "660/1100 V Grade PVC insulated, FR/FRLS, Multistranded, Copper, Flexible cable identified with colour code",
    spare_terminal: commonConfigData?.spare_terminal || "10",
    push_button_start: commonConfigData?.push_button_start || "Green",
    push_button_stop: commonConfigData?.push_button_stop || "Green",
    push_button_ess: commonConfigData?.push_button_ess || "Stayput (RED)",
    is_push_button_speed_selected: commonConfigData?.is_push_button_speed_selected || 1,
    speed_increase_pb: commonConfigData?.speed_increase_pb || "Yellow",
    speed_decrease_pb: commonConfigData?.speed_decrease_pb || "Black",
    alarm_acknowledge_and_lamp_test: commonConfigData?.alarm_acknowledge_and_lamp_test || "Black",
    test_reset: commonConfigData?.test_reset || "Black",
    selector_switch_applicable: commonConfigData?.selector_switch_applicable || "Not Applicable",
    selector_switch_lockable: commonConfigData?.selector_switch_lockable || "Lockable",
    running_open: commonConfigData?.running_open || "Green",
    stopped_closed: commonConfigData?.stopped_closed || "Red",
    trip: commonConfigData?.trip || "Amber",
    field_motor_type: commonConfigData?.type || "Exd",
    field_motor_enclosure: commonConfigData?.enclosure || "IP 65",
    field_motor_material: commonConfigData?.material || "SS 316",
    field_motor_qty: commonConfigData?.qty || "As Mentioned in Electrical Load List",
    field_motor_isolator_color_shade: commonConfigData?.field_motor_isolator_color_shade || "RAL 7035",
    field_motor_cable_entry: commonConfigData?.cable_entry || "Side",
    field_motor_canopy_on_top: commonConfigData?.canopy_on_top || "All",
    lpbs_type: commonConfigData?.lpbs_type || "Exd",
    lpbs_enclosure: commonConfigData?.lpbs_enclosure || "IP 65",
    lpbs_material: commonConfigData?.lpbs_material || "CRCA",
    lpbs_qty: commonConfigData?.lpbs_qty || "As mentioned in Electrical Load List",
    lpbs_color_shade: commonConfigData?.lpbs_color_shade || "RAL 7035",
    lpbs_canopy_on_top: commonConfigData?.lpbs_canopy_on_top || "All",
    lpbs_push_button_start_color: commonConfigData?.lpbs_push_button_start_color || "Green",
    lpbs_indication_lamp_start_color: commonConfigData?.lpbs_indication_lamp_start_color || "Green",
    lpbs_indication_lamp_stop_color: commonConfigData?.lpbs_indication_lamp_stop_color || "Red",
    lpbs_speed_increase: commonConfigData?.lpbs_speed_increase || "Yellow",
    lpbs_speed_decrease: commonConfigData?.lpbs_speed_decrease || "Black",
    apfc_relay: commonConfigData?.apfc_relay || "4",
    power_bus_main_busbar_selection: commonConfigData?.power_bus_main_busbar_selection || "As per IS",
    power_bus_heat_pvc_sleeve: commonConfigData?.power_bus_heat_pvc_sleeve || "Red, Yellow, Blue, Black",
    power_bus_material: commonConfigData?.power_bus_material || "Aluminium",
    power_bus_current_density: commonConfigData?.power_bus_current_density || "0.8 A/Sq. mm",
    power_bus_rating_of_busbar: commonConfigData?.power_bus_rating_of_busbar || "( Min -1R X 60 mm X 12 mm) for 50 KA",
    control_bus_main_busbar_selection: commonConfigData?.control_bus_main_busbar_selection || "As per IS",
    control_bus_heat_pvc_sleeve: commonConfigData?.control_bus_heat_pvc_sleeve || "Red, Black",
    control_bus_material: commonConfigData?.control_bus_material || "Aluminium",
    control_bus_current_density: commonConfigData?.control_bus_current_density || "0.8 A/Sq. mm",
    control_bus_rating_of_busbar:
      commonConfigData?.control_bus_rating_of_busbar || "( Min -1R X 60 mm X 12 mm) for 50 KA",
    earth_bus_main_busbar_selection: commonConfigData?.earth_bus_main_busbar_selection || "As per IS",
    earth_bus_busbar_position: commonConfigData?.earth_bus_busbar_position || "Top",
    earth_bus_material: commonConfigData?.earth_bus_material || "Aluminium",
    earth_bus_current_density: commonConfigData?.earth_bus_current_density || "0.8 A/Sq. mm",
    earth_bus_rating_of_busbar: commonConfigData?.earth_bus_rating_of_busbar || "( Min- 1R X 20 mm X 5 mm )",
    metering_for_feeder: commonConfigData?.metering_for_feeder || "Ammeter (Digital)",
    cooling_fans: commonConfigData?.cooling_fans || "Not Applicable",
    louvers_and_filters: commonConfigData?.louvers_and_filters || "Not Applicable",
    alarm_annunciator: commonConfigData?.alarm_annunciator || "Not Applicable",
    control_transformer: commonConfigData?.control_transformer || "Not Applicable",
    commissioning_spare: commonConfigData?.commissioning_spare || "NA",
    two_year_operational_spare: commonConfigData?.two_year_operational_spare || "NA",
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
    push_button_stop_options,
    push_button_start_options,
    // ess_options,
    // speed_increase_pb_options,
    // speed_decrease_pb_options,
    // test_reset_options,
    // alarm_acknowledge_and_lamp_test_options,
    ess_options,
    speed_increase_pb_options,
    speed_decrease_pb_options,
    test_reset_options,
    alarm_acknowledge_and_lamp_test_options,
    running_open_options,
    stopped_closed_options,
    trip_options,
    field_motor_type_options,
    field_motor_enclosure_options,
    field_motor_material_options,
    field_motor_qty_options,
    field_motor_color_shade_options,
    field_motor_cable_entry_options,
    field_motor_canopy_on_top_options,
    lpbs_color_shade_options,
    lpbs_canopy_on_top_options,
    lpbs_indicator_on_options,
    lpbs_indiacator_off_options,
    lpbs_speed_increase_options,
    lpbs_speed_decrease_options,
    apfc_relay_options,
    pb_main_busbar_selection_options,
    pb_heat_pvc_sleeve_options,
    pb_current_density_options,
    cb_main_busbar_selection_option,
    cb_heat_pvc_sleeve_options,
    cb_current_density_options,
    eb_main_busbar_selection_options,
    eb_main_busbar_position_options,
    eb_current_density_options,
    metering_for_feeder_options,
  } = useCommonConfigDropdowns()

  const [testing_standards, setTestingStandards] = useState<any[]>(
    Array.isArray(testing_standard_options) ? [...testing_standard_options] : []
  )
  const [dm_standards, setDmStandards] = useState<any[]>(
    Array.isArray(dm_standard_options) ? [...dm_standard_options] : []
  )
  const [pb_current_densityState, setPBCurrentDensityState] = useState<any[]>(
    Array.isArray(pb_current_density_options) ? [...pb_current_density_options] : []
  )
  const [cb_current_densityState, setCBCurrentDensityState] = useState<any[]>(
    Array.isArray(pb_current_density_options) ? [...pb_current_density_options] : []
  )
  const [eb_current_densityState, setEBCurrentDensityState] = useState<any[]>(
    Array.isArray(pb_current_density_options) ? [...pb_current_density_options] : []
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

  useEffect(() => {
    if (is_Ammeter_NA === "NA") {
      setValue("ammeter_configuration", "NA")
    }
  }, [is_Ammeter_NA, setValue])

  // Control Bus (dependancy Logic)
  useEffect(() => {
    if (control_bus_material_controlled === "Aluminium") {
      setValue("control_bus_rating_of_busbar", "( Min -1R X 60 mm X 12 mm) for 50 KA")
      setValue("control_bus_current_density", "0.8 A/Sq. mm")
      let cb_current_options = cb_current_density_options.filter((item: any) => item.name.startsWith("0.8"))
      setCBCurrentDensityState(cb_current_options)
    } else if (control_bus_material_controlled === "Copper") {
      setValue("control_bus_rating_of_busbar", "( Min - 1R X 40 mm X 10 mm )  ")
      setValue("control_bus_current_density", "1.0 A/Sq. mm")
      let cb_current_options = cb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
      )
      setCBCurrentDensityState(cb_current_options)
    } else {
      setValue("control_bus_current_density", "1.0 A/Sq. mm")
      let cb_current_options = cb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.0") || item.name.startsWith("1.2")
      )
      setCBCurrentDensityState(cb_current_options)
    }
  }, [cb_current_density_options, control_bus_material_controlled, setValue])

  // Power Bus (dependency logic)
  useEffect(() => {
    if (power_bus_material_controlled === "Aluminium") {
      setValue("power_bus_rating_of_busbar", "( Min -1R X 60 mm X 12 mm) for 50 KA")
      setValue("power_bus_current_density", "0.8 A/Sq. mm")
      let pb_current_options = pb_current_density_options.filter((item: any) => item.name.startsWith("0.8"))
      setPBCurrentDensityState(pb_current_options)
    } else if (power_bus_material_controlled === "Copper") {
      setValue("power_bus_rating_of_busbar", "( Min - 1R X 40 mm X 10 mm )  ")
      setValue("power_bus_current_density", "1.0 A/Sq. mm")
      let pb_current_options = pb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
      )
      setPBCurrentDensityState(pb_current_options)
    } else {
      let pb_current_options = pb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
      )
      setPBCurrentDensityState(pb_current_options)
      setValue("power_bus_current_density", "1.0 A/Sq. mm")
    }
  }, [pb_current_density_options, power_bus_material_controlled, setValue])

  // earth Bus (Dependency logic)
  useEffect(() => {
    if (earth_bus_material_controlled === "Aluminium") {
      setValue("earth_bus_rating_of_busbar", "( Min - 1R X 40 mm X 10 mm )")
      setValue("earth_bus_current_density", "0.8 A/Sq. mm")
      let eb_current_options = eb_current_density_options.filter((item: any) => item.name.startsWith("0.8"))
      setEBCurrentDensityState(eb_current_options)
    } else if (earth_bus_material_controlled === "Copper") {
      setValue("earth_bus_rating_of_busbar", "( Min- 1R X 20 mm X 5 mm )")
      setValue("earth_bus_current_density", "1.0 A/Sq. mm")
      let eb_current_options = eb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.0") || item.name.startsWith("1.2")
      )
      setEBCurrentDensityState(eb_current_options)
    } else {
      setValue("earth_bus_current_density", "1.0 A/Sq. mm")
      let eb_current_options = eb_current_density_options.filter(
        (item: any) => item.name.startsWith("1.0") || item.name.startsWith("1.2")
      )
      setEBCurrentDensityState(eb_current_options)
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
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label={
                <>
                  DOL Starter <span className="text-xs text-blue-500">(KW including and below)</span>
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
                  Star Delta Starter <span className="text-xs text-blue-500">(KW including and above)</span>
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
                  Ammeter <span className="text-xs text-blue-500">(KW including and above)</span>
                </>
              }
              options={ammeter_options || []}
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
          {/* <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="switchgear_combination"
              label="Switchgear Combination"
              options={switchgear_combination_options || []}
              size="small"
            />
          </div> */}
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
              onChange={(e) => {
                const selectedValue = e.target.value

                const filterOptions = (options: any) => {
                  return options?.filter((item: any) => item.name.startsWith(selectedValue) || item.name === "NA")
                }

                const filteredDmStandards = filterOptions(dm_standard_options)
                const filteredTestingStandards = filterOptions(testing_standard_options)

                setDmStandards(filteredDmStandards)
                setTestingStandards(filteredTestingStandards)
              }}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dm_standard"
              label="Design & Manufacturer's standard"
              options={
                dm_standards?.length === 0
                  ? dm_standard_options.filter((item: any) => item?.name?.startsWith("IEC") || item?.name === "NA")
                  : dm_standards
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="testing_standard"
              label="Testing Standard"
              options={
                testing_standards?.length === 0
                  ? testing_standard_options.filter((item: any) => item?.name?.startsWith("IEC") || item?.name === "NA")
                  : testing_standards
              }
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
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_increase_pb"
              label="Speed Increase PB"
              options={speed_increase_pb_options || []}
              disabled={watch("is_push_button_speed_selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_decrease_pb"
              label="Speed Decrease PB"
              options={speed_decrease_pb_options || []}
              disabled={watch("is_push_button_speed_selected") === 0}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="alarm_acknowledge_and_lamp_test"
              label="Alarm Acknowledge and Lamp Test"
              options={alarm_acknowledge_and_lamp_test_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="test_reset"
              label="Test Reset"
              options={test_reset_options || []}
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
              label="Local/Remot Selector Switch On MCC Panel Front Door"
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
              name="field_motor_isolator_is_Selected"
              label=""
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_type"
              label="Type"
              options={field_motor_type_options || []}
              disabled={watch("field_motor_isolator_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_enclosure"
              label="Enclosure"
              options={field_motor_enclosure_options || []}
              size="small"
              disabled={watch("field_motor_isolator_is_Selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_material"
              label="Material"
              options={field_motor_material_options || []}
              size="small"
              disabled={watch("field_motor_isolator_is_Selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              size="small"
              disabled={watch("field_motor_isolator_is_Selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_isolator_color_shade"
              label="Isolator Color Shade"
              options={field_motor_color_shade_options || []}
              size="small"
              disabled={watch("field_motor_isolator_is_Selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_cable_entry"
              label="Cable Entry"
              options={field_motor_cable_entry_options || []}
              size="small"
              disabled={watch("field_motor_isolator_is_Selected") === 0}
            />
          </div>
        </div>
        <div className="w-1/3">
          <CustomSingleSelect
            control={control}
            name="field_motor_canopy_on_top"
            label="Canopy on Top"
            options={field_motor_canopy_on_top_options || []}
            size="small"
            disabled={watch("field_motor_isolator_is_Selected") === 0}
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Local Push Button Station (General Specification)</span>
          <div>
            <CustomRadioSelect
              control={control}
              name="local_push_button_station_is_Selected"
              label=""
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_type"
              label="Type"
              options={field_motor_type_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_enclosure"
              label="Enclosure"
              options={field_motor_enclosure_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_material"
              label="Material"
              options={field_motor_material_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_qty"
              label="Qty"
              options={field_motor_qty_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_color_shade"
              label="LPBS Color Shade"
              options={lpbs_color_shade_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_canopy_on_top"
              label="Canopy On top"
              options={lpbs_canopy_on_top_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_push_button_start_color"
              label="Start Push Button Color"
              options={lpbs_indicator_on_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indication_lamp_start_color"
              label="Start / ON Indication Lamp Color"
              options={lpbs_indicator_on_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indication_lamp_stop_color"
              label="Stop / OFF Indication Lamp Color"
              options={lpbs_indiacator_off_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
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
              disabled={watch("local_push_button_station_is_Selected") === 0}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_speed_decrease"
              label="Speed Decrease Push Button"
              options={lpbs_speed_decrease_options || []}
              disabled={watch("local_push_button_station_is_Selected") === 0}
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
              // options={pb_current_density_options || []}
              options={pb_current_densityState}
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
              options={cb_current_densityState}
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
              options={eb_current_densityState}
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
          <span className="font-bold text-slate-700">Metering for Feeder</span>
        </Divider>
        <div className="w-1/3 flex-1">
          <CustomSingleSelect
            control={control}
            name="metering_for_feeder"
            label="Metering for Feeder"
            options={metering_for_feeder_options || []}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Others</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="cooling_fans"
              label="Cooling Fans"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="louvers_and_filters"
              label="Louvers and Filters"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="alarm_annunciator"
              label="Alarm Annunciator"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          {/* <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="control_transformer"
              label="Control Transformer"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div> */}
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
