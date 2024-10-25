"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useCommonConfigDropdowns from "./CommonConfigDropdowns"
import { mutate } from "swr"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string({ required_error: "DOL Starter is required", message: "DOL Starter is required" }),
  star_delta_starter: zod.string({ required_error: "Star Delta Starter is required", message: "Star Delta Starter is required" }),
  ammeter: zod.string({ required_error: "Ammeter is required", message: "Ammeter is required" }),
  ammeter_configuration: zod.string({ required_error: "Ammeter Configuration is required", message: "Ammeter Configuration is required" }),
  mcc_switchgear_type: zod.string({ required_error: "MCC Switchgear Type is required", message: "MCC Switchgear Type is required" }),
  switchgear_combination: zod.string({ required_error: "Switchgear Combination is required", message: "Switchgear Combination is required" }),
  // SUPPLY FEEDER
  pole: zod.string({ required_error: "Pole is required", message: "Pole is required" }),
  dm_standard: zod.string({ required_error: "Design & Manufacturer's Standard is required", message: "Design & Manufacturer's Standard is required" }),
  testing_standard: zod.string({ required_error: "Testing Standard is required", message: "Testing Standard is required" }),
  power_wiring_color: zod.string({ required_error: "Power Wiring Color is required", message: "Power Wiring Color is required" }),
  power_wiring_length: zod.string({ required_error: "Power Wiring Length is required", message: "Control Wiring Color is required" }),
  control_wiring_color:  zod.string({ required_error: "Control Wiring Color is required", message: "Control Wiring Color is required" }),
  control_wiring_length: zod.string({ required_error: "Control Wiring Length is required", message: "Control Wiring Length is required" }),
  vdc_24_wiring_color: zod.string({ required_error: "VDC 24 Wiring Color is required", message: "VDC 24 Wiring Color is required" }),
  vdc_24_wiring_length:  zod.string({ required_error: "VDC 24 Wiring Length is required", message: "VDC 24 Wiring Length is required" }),
  analog_signal_wiring_color:  zod.string({ required_error: "Analog Signal Wiring Color is required", message: "Analog Signal Wiring Color is required" }),
  analog_signal_wiring_length:  zod.string({ required_error: "Analog Signal Wiring Length is required", message: "Analog Signal Wiring Length is required" }),
  ct_wiring_color: zod.string({ required_error: "CT Wiring Color is required", message: "CT Wiring Color is required" }),
  ct_wiring_length:  zod.string({ required_error: "CT Wiring Length is required", message: "CT Wiring Length is required" }),
  cable_insulation_pvc:  zod.string({ required_error: "Cable Insulation PVC is required", message: "Cable Insulation PVC Wiring Length is required" }),
  ferrule:  zod.string({ required_error: "Ferrule is required", message: "Ferrule is required" }),
  common_requirement: zod.string({ required_error: "Common Requirement is required", message: "Common Requirements is required"}),
  spare_terminal: zod.string({ required_error: "Spare Terminal is required", message: "Spare Terminal is required"}),
  
  test_reset: zod.string({ required_error: "Test Reset is required", message: "Test Reset is required"}),
  alarm_acknowledge_and_lamp_test: zod.string({ required_error: "Alarm Acknoowledgement and Lamp Test is required", message: "Alarm Acknowledgement and Lamp Test is required"}),
  speed_decrease_pb: zod.string({ required_error: "Speed Decrease PB is required", message: "Speed Decrease PB is required"}),
  speed_increase_pb: zod.string({ required_error: "Speed Increase PB is required", message: "Speed Increase PB is required"}),
  ess: zod.string({ required_error: "Push Button ESS is required", message: "Push Button ESS is required"}),
  stop: zod.string({ required_error: "Push Button Stop is required", message: "Push Button Stop is required"}),
  start: zod.string({ required_error: "Push Button Start is required", message: "Push Button Start is required"}),
  lockable: zod.string({ required_error: "field Required" , message: "field required" }),
  applicable: zod.string({ required_error: "field Required" , message: "field required" }),
  running_open: zod.string({required_error:'Running/Open field is required', message : "Running/Open field is required"}),
  stopped_closed: zod.string({required_error: "Stopped/Closed field is required", message: "Stopped/Closed field is required"}),
  trip: zod.string({required_error: "Trip field is required", message: "Trip field is required"}),

  field_motor_type: zod.string({required_error:"Field Motor Isolator type is required", message: "Field Motor Isolator Type is required"}),
  field_motor_enclosure: zod.string({required_error:"Field Motor Isolator Enclosure is required", message: "Field Motor Isolator Enclosure is required"}),
  field_motor_material: zod.string({required_error:"Field Motor Isolator Material is required", message: "Field Motor Isolator Material is required"}),
  field_motor_qty: zod.string({required_error:"Field Motor Isolator Qty is required", message: "Field Motor Isolator Qty is required"}),
  isolator_color_shade: zod.string({required_error:"Field Motor Isolator Color Shade is required", message: "Field Motor Isolator Color Shade is required"}),
  field_motor_cable_entry: zod.string({required_error:"Field Motor Isolator Cable Entry is required", message: "Field Motor Isolator Cable Entry is required"}),
  field_motor_canopy_on_top: zod.string({required_error: "Field Motor Isolator Canopy On Top is Required", message: "Field Motor Isolator Canopy On Top is Required"}),

  lpbs_typeOption: zod.string({required_error:"Local Push Button Station Type is required", message: "Local Push Button Station Type is required"}),
  lpbs_enclosureOption: zod.string({required_error: 'Local Push Button Station Enclosure is required', message: "Local Push Button Station is required"}),
  lpbs_materialOption: zod.string({required_error: "Local Push Button Station Material is required", message: "Local Push Button Station is required"}),
  lpbs_qtyOption: zod.string({required_error: "Local Push Button Station Quantity is required", message: "Local Push Button Station is required"}),
  lpbs_colorShadeOption: zod.string({required_error: "Local Push Button Station Color Shade is required", message: "Local Push Button Station is required"}),
  lpbs_canopyOnTopOption: zod.string({required_error: "Local Push Button Station Canopy On Top is required", message: "Local Push Button Station is required"}),
  lpbs_colorOption: zod.string({required_error: "Local Push Button Station Color is required", message: "Local Push Button Station is required"}),
  lpbs_indicator_onOption: zod.string({required_error: "Local Push Button Station Indicator ON is required", message: "Local Push Button Station is required"}),
  lpbs_indiacator_offOption: zod.string({required_error: "Local Push Button Station Indicator OFF is required", message: "Local Push Button Station is required"}),
  lpbs_speed_increaseOption: zod.string({required_error: "Local Push Button Station Speed Increase is required", message: "Local Push Button Station is required"}),
  lpbs_speed_decreaseOption: zod.string({required_error: "Local Push Button Station Speed Decrease is required", message: "Local Push Button Station is required"}),
  
  apfc_relay: zod.string({required_error:"APFC Relay is required", message: "APFC Relay is required"}),
  
  pb_main_busbar_selection: zod.string({required_error:"This field is required", message: "This field is required"}),
  pb_heat_pvc_sleeve: zod.string({required_error:"This field is required", message: "This field is required"}),
  pb_current_density: zod.string({required_error:"This field is required", message: "This field is required"}),
  cb_main_busbar_selection: zod.string({required_error:"This field is required", message: "This field is required"}),
  cb_heat_pvc_sleeve: zod.string({required_error:"This field is required", message: "This field is required"}),
  cb_current_density: zod.string({required_error:"This field is required", message: "This field is required"}),
  eb_main_busbar_position: zod.string({required_error:"This field is required", message: "This field is required"}),
  eb_earth_busbar_position: zod.string({required_error:"This field is required", message: "This field is required"}),
  eb_current_density: zod.string({required_error:"This field is required", message: "This field is required"}),
  
  metering_for_feeder: zod.string({required_error:"This field is required", message: "This field is required"}),

  supply_feeder_standard: zod.string(),
  // check_switch: zod.boolean(),
})

interface CommonConfigurationProps {
  params: any
  handleSwitchTab: (key: string) => void
}

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    dol_starter: projectData?.dol_starter || "NA",
    star_delta_starter: projectData?.star_delta_starter || "NA",
    ammeter: projectData?.ammeter || "NA",
    ammeter_configuration: projectData?.ammeter_configuration || "NA",
    mcc_switchgear_type: projectData?.mcc_switchgear_type || "NA",
    switchgear_combination: projectData?.switchgear_combination || "NA",
    pole: projectData?.pole || "NA",
    dm_standard: projectData?.dm_standard || "NA",
    testing_standard: projectData?.testing_standard || "NA",
    power_wiring_color: projectData?.power_wiring_color || "NA",
    power_wiring_length: projectData?.power_wiring_length || "NA",
    control_wiring_color: projectData?.control_wiring_color || "NA",
    control_wiring_length: projectData?.control_wiring_length || "NA",
    vdc_24_wiring_color: projectData?.vdc_24_wiring_color || "NA",
    vdc_24_wiring_length: projectData?.vdc_24_wiring_length || "NA",
    analog_signal_wiring_color: projectData?.analog_signal_wiring_color || "NA",
    analog_signal_wiring_length: projectData?.analog_signal_wiring_length || "NA",
    ct_wiring_color: projectData?.ct_wiring_color || "NA",
    ct_wiring_length: projectData?.ct_wiring_length || "NA",
    cable_insulation_pvc: projectData?.cable_insulation_pvc || "NA",
    ferrule: projectData?.ferrule || "NA",
    common_requirement: projectData?.common_requirement || "Common Requirement placeholder",
    spare_terminal: projectData?.spare_terminal || "NA",
    test_reset: projectData?.test_reset || "NA",
    alarm_acknowledge_and_lamp_test: projectData?.alarm_acknowledge_and_lamp_test || "NA",
    speed_decrease_pb: projectData?.speed_decrease_pb || "NA",
    speed_increase_pb: projectData?.speed_increase_pb || "NA",
    ess: projectData?.ess || "NA",
    stop: projectData?.stop || "NA",
    start: projectData?.start || "NA",
    lockable: projectData?.lockable || "NA",
    applicable: projectData?.applicable || "NA",
    running_open: projectData?.running_open || "NA",
    stopped_closed: projectData?.stopped_closed || "NA",
    trip: projectData?.trip || "NA",
    field_motor_type: projectData?.type || "NA",
    field_motor_enclosure: projectData?.enclosure || "NA",
    field_motor_material: projectData?.material || "NA",
    field_motor_qty: projectData?.qty || "NA",
    isolator_color_shade: projectData?.isolator_color_shade || "NA",
    field_motor_cable_entry: projectData?.cable_entry || "NA",
    field_motor_canopy_on_top: projectData?.canopy_on_top || "NA",
    lpbs_type: projectData?. lpbs_type || "NA",
    lpbs_enclosure: projectData?.lpbs_enclosure || "NA",
    lpbs_material: projectData?.lpbs_material || "NA",
    lpbs_qty: projectData?.lpbs_qty || "NA",
    lpbs_colorShade: projectData?.lpbs_colorShade || "NA",
    lpbs_canopyOnTop: projectData?.lpbs_canopyOnTop || "NA",
    lpbs_color: projectData?.lpbs_color || "NA",
    lpbs_indicator_on: projectData?.lpbs_indicator_on || "NA",
    lpbs_indiacator_off: projectData?.lpbs_indiacator_off || "NA",
    lpbs_speed_increase: projectData?.lpbs_speed_increase || "NA",
    lpbs_speed_decrease: projectData?.lpbs_speed_decrease || "NA",

    apfc_relay: projectData?.apfc_relay || "NA",

    pb_main_busbar_selection: projectData?.pb_main_busbar_selection || "NA",
    pb_heat_pvc_sleeve: projectData?.pb_heat_pvc_sleeve || "NA",
    pb_current_density: projectData?.pb_current_density || "NA",
    cb_main_busbar_selection: projectData?.cb_main_busbar_selection || "NA",
    cb_heat_pvc_sleeve: projectData?.cb_heat_pvc_sleeve || "NA",
    cb_current_density: projectData?.cb_current_density || "NA",
    eb_main_busbar_selection: projectData?.eb_main_busbar_selection || "NA",
    eb_earth_busbar_position: projectData?.eb_earth_busbar_position || "NA",
    eb_current_density: projectData?.eb_current_density || "NA",
    
    metering_for_feeder: projectData?.metering_for_feeder || "NA"
  }
}

// type commonConfigurationFormData = zod.infer<typeof configItemValidationSchema>

const CommonConfiguration: React.FC<CommonConfigurationProps> = ({ params, handleSwitchTab }) => {
  const project_id = params.project_id
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`
  const getCommonConfigUrl = `${PROJECT_API}/${project_id}`

  const { data: projectMetadata } = useGetData(getProjectMetadataUrl, false)
  const { data: commonConfig } = useGetData(getCommonConfigUrl, false)

  const projectData = React.useMemo(
    () => ({ ...projectMetadata, commonConfig }),
    [projectMetadata, commonConfig]
  )

  const [loading, setLoading] = useState(false)

  const {
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
    running_openOption,
    stopped_closedOption,
    tripOption,
    field_motor_typeOption,
    field_motor_enclosureOption,
    field_motor_materialOption,
    field_motor_qtyOption,
    field_motor_colourShadeOption,
    field_motor_cableEntryOption,
    field_motor_canopyOnTopOption,
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
    lpbs_speed_decreaseOption,
    apfc_relayOption,
    pb_main_busbar_selectionOption,
    pb_heat_pvc_sleeve_Option,
    pb_current_densityOption,
    cb_main_busbar_selectionOption,
    cb_heat_pvc_sleeveOption,
    cb_current_densityOption,
    eb_main_busbar_selectionOption,
    eb_main_busbar_positionOption,
    eb_current_densityOption,
    metering_for_feederOption,
    
  } = useCommonConfigDropdowns()

  
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: getDefaultValues(true, projectData),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(true, projectData))
  }, [reset, projectData])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message?.error(errorObj?.message)
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof commonConfig>> = async (data: any) => {
    try {
      console.log("data: ", data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      mutate(getCommonConfigUrl)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="DOL Starter (KW including and below)"
              options={dol_starterOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="star_delta_starter"
              label="Star Delta Starter (KW including and above)"
              options={star_delta_starterOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ammeter"
              label="Ammeter (KW including and above)"
              options={ammeterOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ammeter_configuration"
              label="Ammeter Configuration"
              options={ammeter_configurationOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mcc_switchgear_type"
              label="MCC Switchgear Type"
              options={mcc_switchgear_typeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="switchgear_combination"
              label="Switchgear Combination"
              options={switchgear_combinationOptions}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Supply Feeder</span>
        </Divider>
        <div className="w-1/3">
          <CustomSingleSelect control={control} name="pole" label="Pole" options={poleOptions} size="small" />
        </div>
        <div className="flex items-center gap-4">
          <div className="basis-1/3">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Supply Feeder"
              options={[
                { label: "IEC", value: "IED" },
                { label: "IS", value: "IS" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dm_standard"
              label="Design & Manufacturer's standard"
              options={dm_standardOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="testing_standard"
              label="Testing Standard"
              options={testing_standardOptions}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Wiring</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Power Wiring (L1, L2, L3, LN)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Color" options={power_wiring_colorOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_length" label="Size" options={power_wiring_lengthOptions} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Control Wiring (P, N)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="control_wiring_color" label="Color" options={control_wiring_colorOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="control_wiring_length" label="Size" options={control_wiring_lengthOptions} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">24 VDC Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="vdc_24_wiring_color" label="Color" options={vdc_24_wiring_colorOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="vdc_24_wiring_length" label="Size" options={vdc_24_wiring_lengthOptions} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Analog Signal Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="analog_signal_wiring_color" label="Color" options={analog_signal_wiring_colorOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="analog_signal_wiring_length" label="Size" options={analog_signal_wiring_lengthOptions} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">CT Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="ct_wiring_color" label="Color" options={ct_wiring_colorOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="ct_wiring_length" label="Size" options={ct_wiring_lengthOptions} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cable_insulation_pvc"
              label="Cable Insulation (PVC)"
              options={cable_wiring_pvcOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="ferrule" label="Ferrule" options={ferruleOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="common_requirement" label="Common Requirement" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Terminal</span>
        </Divider>
        <div className="w-1/2">
          <CustomSingleSelect control={control} name="spare_terminal" label="Spare Terminal" options={spare_terminalOptions} size="small" />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Push Button Color</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="start" label="Start" options={push_button_startOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="stop" label="Stop" options={push_button_stopOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="ess" label="ESS" options={essOption} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="speed"
              label="Speed"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_increase_pb"
              label="Speed Increase PB"
              options={speed_increase_pbOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="speed_decrease_pb"
              label="Speed Decrease PB"
              options={speed_decrease_pbOption}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="alarm_acknowledge_and_lamp_test"
              label="Alarm Knowledge & Lamp Test"
              options={alarm_acknowledge_and_lamp_testOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="test_reset"
              label="Test Reset"
              options={test_resetOptions}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Selector Switch</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">
            Local/Remot Selector Switch On MCC Panel Front Door
          </h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="applicable" label="Applicable" options={lr_selector_lock_switch_applicableOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lockable"
              label="Lock Type"
              options={lr_selector_lockOptions}
              size="small"
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
              options={running_openOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="stopped_closed"
              label="Stopped / Closed"
              options={stopped_closedOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="trip" label="Trip" options={tripOption} size="small" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Field Motor Isolator (General Specification)</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="field_motor_type" label="Type" options={field_motor_typeOption} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_enclosure"
              label="Enclosure"
              options={field_motor_enclosureOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="field_motor_material" label="Material" options={field_motor_materialOption} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="field_motor_qty" label="Qty" options={field_motor_qtyOption} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="isolator_color_shade"
              label="Isolator Color Shade"
              options={field_motor_colourShadeOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="field_motor_cable_entry"
              label="Cable Entry"
              options={field_motor_cableEntryOption}
              size="small"
            />
          </div>
        </div>
        <div className="w-1/3">
          <CustomSingleSelect
            control={control}
            name="field_motor_canopy_on_top"
            label="Canopy on Top"
            options={field_motor_canopyOnTopOption}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Local Push Button Station (General Specification)</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="lpbs_type" label="Type" options={lpbs_typeOption} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_enclosure"
              label="Enclosure"
              options={lpbs_enclosureOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="lpbs_material" label="Material" options={lpbs_materialOption} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="lpbs_qty" label="Qty" options={lpbs_qtyOption} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_colorShade"
              label="LPBS Color Shade"
              options={lpbs_colorShadeOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_canopyOnTop"
              label="Canopy On top"
              options={lpbs_canopyOnTopOption}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_color"
              label="Start Push Button Colour"
              options={lpbs_colorOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indicator_on"
              label="Start / ON Indication Lamp Colour"
              options={lpbs_indicator_onOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_indiacator_off"
              label="Stop / OFF Indication Lamp Colour"
              options={lpbs_indiacator_offOption}
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
              options={lpbs_speed_increaseOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="lpbs_speed_decrease"
              label="Speed Decrease Push Button"
              options={lpbs_speed_decreaseOption}
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
            options={apfc_relayOption}
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
              name="pb_main_busbar_selection"
              label="Main Busbar Selection"
              options={pb_main_busbar_selectionOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pb_heat_pvc_sleeve"
              label="Heat Shrinkable Color PVC sleeve (L1, L2, L3, N)"
              options={pb_heat_pvc_sleeve_Option}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pb_current_density"
              label="Current Density"
              options={pb_current_densityOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Rating of Busbar"
              options={[]}
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
              name="cb_main_busbar_selection"
              label="Main Busbar Selection"
              options={cb_main_busbar_selectionOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cb_heat_pvc_sleeve"
              label="Heat Shrinkable Color PVC sleeve (L1, L2, L3, N)"
              options={cb_heat_pvc_sleeveOption}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cb_current_density"
              label="Current Density"
              options={cb_current_densityOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Rating of Busbar"
              options={[]}
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
              name="eb_main_busbar_selection"
              label="Main Busbar Selection"
              options={eb_main_busbar_selectionOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eb_earth_busbar_position"
              label="Earth Busbar Position"
              options={eb_main_busbar_positionOption}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eb_current_density"
              label="Current Density"
              options={eb_current_densityOption}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Rating of Busbar"
              options={[]}
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
            options={metering_for_feederOption}
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
              name="supply_feeder_standard"
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
              name="supply_feeder_standard"
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
              name="supply_feeder_standard"
              label="Alarm Annunciator"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Control Transformer"
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
            <CustomTextAreaInput control={control} name="power_wiring_color" label="Commissioning Spare" />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="power_wiring_color" label="Two Year Operational spare" />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default CommonConfiguration
