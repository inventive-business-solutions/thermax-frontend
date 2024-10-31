import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { useGetData } from "hooks/useCRUD"
import { useParams } from "next/navigation"
import { MCC_PANEL } from "configs/api-endpoints"
import useMCCPanelDropdowns from "./MCCPanelDropdown"
import { createData, getData, updateData } from "actions/crud-actions"

const mccPanelValidationSchema = zod.object({
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
  is_under_or_over_voltage_selected: zod.number({
    required_error: "Under or Over Voltage is required",
    message: "Under or Over Voltage is required",
  }),
  is_lsig_selected: zod.number({ required_error: "LSIG is required", message: "LSIG is required" }),
  is_lsi_selected: zod.number({ required_error: "LSI is required", message: "LSI is required" }),
  is_neural_link_with_disconnect_facility_selected: zod.number({
    required_error: "Neural Link With Disconnect Facility is required",
    message: "Neural Link With Disconnect Facility is required",
  }),
  is_led_type_lamp_selected: zod.number({
    required_error: "LED Type Lamp is required",
    message: "LED Type Lamp is required",
  }),
  is_blue_cb_spring_charge_selected: zod.number({
    required_error: "CB Spring Charge is required",
    message: "CB Spring Charge is required",
  }),
  is_red_cb_in_service: zod.number({
    required_error: "CB in Service is required",
    message: "CB in Service is required",
  }),
  is_white_healthy_trip_circuit_selected: zod.number({
    required_error: "Trip Circuit Healthy is required",
    message: "Trip Circuit Healthy is required",
  }),
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
  is_marshalling_section_selected: zod.number({
    required_error: "Marshalling Section is required",
    message: "Marshalling Section is required",
  }),
  is_cable_alley_section_selected: zod.number({
    required_error: "Cable Alley Section is required",
    message: "Cable Alley Section is required",
  }),
  is_power_and_bus_separation_section_selected: zod.number({
    required_error: "Power and Bus Separation Section is required",
    message: "Power and Bus Separation Section is required",
  }),
  is_both_side_extension_section_selected: zod.number({
    required_error: "Both Side Extension Section is required",
    message: "Both Side Extension Section is required",
  }),
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

const getDefaultValues = (mccPanelData: any) => {
  return {
    incomer_ampere: mccPanelData?.incomer_ampere || "1000",
    incomer_pole: mccPanelData?.incomer_pole || "3",
    incomer_type: mccPanelData?.incomer_type || "SFU",
    incomer_above_ampere: mccPanelData?.incomer_above_ampere || "1001",
    incomer_above_pole: mccPanelData?.incomer_above_pole || "4",
    incomer_above_type: mccPanelData?.incomer_above_type || "SFU",
    is_under_or_over_voltage_selected: mccPanelData?.is_under_or_over_voltage_selected,
    is_lsig_selected: mccPanelData?.is_lsig_selected,
    is_lsi_selected: mccPanelData?.is_lsi_selected,
    is_neural_link_with_disconnect_facility_selected: mccPanelData?.is_neural_link_with_disconnect_facility_selected,
    is_led_type_lamp_selected: mccPanelData?.is_led_type_lamp_selected,
    is_blue_cb_spring_charge_selected: mccPanelData?.is_blue_cb_spring_charge_selected,
    is_red_cb_in_service: mccPanelData?.is_red_cb_in_service,
    is_white_healthy_trip_circuit_selected: mccPanelData?.is_white_healthy_trip_circuit_selected,
    current_transformer_coating: mccPanelData?.current_transformer_coating,
    current_transformer_number: mccPanelData?.current_transformer_number,
    alarm_annunciator: mccPanelData?.alarm_annunciator,
    mi_analog: mccPanelData?.mi_analog,
    mi_digital: mccPanelData?.mi_digital,
    mi_communication_protocol: mccPanelData?.mi_communication_protocol,
    ga_moc_material: mccPanelData?.ga_moc_material,
    ga_moc_thickness_door: mccPanelData?.ga_moc_thickness_door,
    ga_moc_thickness_covers: mccPanelData?.ga_moc_thickness_covers,
    ga_mcc_compartmental: mccPanelData?.ga_mcc_compartmental,
    ga_mcc_construction_front_type: mccPanelData?.ga_mcc_construction_front_type,
    ga_mcc_construction_drawout_type: mccPanelData?.ga_mcc_construction_drawout_type,
    ga_mcc_construction_type: mccPanelData?.ga_mcc_construction_type,
    busbar_material_of_construction: mccPanelData?.busbar_material_of_construction,
    ga_current_density: mccPanelData?.ga_current_density,
    ga_panel_mounting_frame: mccPanelData?.ga_panel_mounting_frame,
    ga_panel_mounting_height: mccPanelData?.ga_panel_mounting_height,
    is_marshalling_section_selected: mccPanelData?.is_marshalling_section_selected,
    is_cable_alley_section_selected: mccPanelData?.is_cable_alley_section_selected,
    is_power_and_bus_separation_section_selected: mccPanelData?.is_power_and_bus_separation_section_selected,
    is_both_side_extension_section_selected: mccPanelData?.is_both_side_extension_section_selected,
    ga_gland_plate_3mm_drill_type: mccPanelData?.ga_gland_plate_3mm_drill_type,
    ga_gland_plate_3mm_attachment_type: mccPanelData?.ga_gland_plate_3mm_attachment_type,
    ga_busbar_chamber_position: mccPanelData?.ga_busbar_chamber_position,
    ga_power_and_control_busbar_separation: mccPanelData?.ga_power_and_control_busbar_separation,
    ga_enclosure_protection_degree: mccPanelData?.ga_enclosure_protection_degree,
    ga_cable_entry_position: mccPanelData?.ga_cable_entry_position,
    ppc_painting_standards: mccPanelData?.ppc_painting_standards,
    ppc_interior_and_exterior_paint_shade: mccPanelData?.ppc_interior_and_exterior_paint_shade,
    ppc_component_mounting_plate_paint_shade: mccPanelData?.ppc_component_mounting_plate_paint_shade,
    ppc_base_frame_paint_shade: mccPanelData?.ppc_base_frame_paint_shade,
    ppc_minimum_coating_thickness: mccPanelData?.ppc_minimum_coating_thickness,
    ppc_pretreatment_panel_standard: mccPanelData?.ppc_pretreatment_panel_standard,
    vfd_auto_manual_selection: mccPanelData?.vfd_auto_manual_selection,
    is_punching_details_for_boiler_selected: mccPanelData?.is_punching_details_for_boiler_selected || 0,
    boiler_model: mccPanelData?.boiler_model || "NA",
    boiler_fuel: mccPanelData?.boiler_fuel || "NA",
    boiler_year: mccPanelData?.boiler_year || "NA",
    boiler_power_supply_vac: mccPanelData?.boiler_power_supply_vac || "NA",
    boiler_power_supply_phase: mccPanelData?.boiler_power_supply_phase || "NA",
    boiler_power_supply_frequency: mccPanelData?.boiler_power_supply_frequency || "NA",
    boiler_control_supply_vac: mccPanelData?.boiler_control_supply_vac || "NA",
    boiler_control_supply_phase: mccPanelData?.boiler_control_supply_phase || "NA",
    boiler_control_supply_frequency: mccPanelData?.boiler_control_supply_frequency || "NA",
    boiler_evaporation: mccPanelData?.boiler_evaporation || "NA",
    boiler_output: mccPanelData?.boiler_output || "NA",
    boiler_connected_load: mccPanelData?.boiler_connected_load || "NA",
    boiler_design_pressure: mccPanelData?.boiler_design_pressure || "NA",
    is_punching_details_for_heater_selected: mccPanelData?.is_punching_details_for_heater_selected || 0,
    heater_motor: mccPanelData?.heater_motor || "NA",
    heater_fuel: mccPanelData?.heater_fuel || "NA",
    heater_year: mccPanelData?.heater_year || "NA",
    heater_power_supply_vac: mccPanelData?.heater_power_supply_vac || "NA",
    heater_power_supply_phase: mccPanelData?.heater_power_supply_phase || "NA",
    heater_power_supply_frequency: mccPanelData?.heater_power_supply_frequency || "NA",
    heater_control_supply_vac: mccPanelData?.heater_control_supply_vac || "NA",
    heater_control_supply_phase: mccPanelData?.heater_control_supply_phase || "NA",
    heater_control_supply_frequency: mccPanelData?.heater_control_supply_frequency || "NA",
    heater_evaporation: mccPanelData?.heater_evaporation || "NA",
    heater_output: mccPanelData?.heater_output || "NA",
    heater_connected_load: mccPanelData?.heater_connected_load || "NA",
    heater_temperature: mccPanelData?.heater_temperature || "NA",
  }
}

const MCCPanel = () => {
  const params = useParams()
  const { data: mccPanelData } = useGetData(
    `${MCC_PANEL}?fields=["*"]&filters=[["project_id", "=", "${params.project_id}"]]`,
    false
  )
  // console.log("MCC Panel Data", mccPanelData)
  const [loading, setLoading] = useState(false)

  const {
    incomer_ampere_options,
    incomer_pole_options,
    incomer_type_options,
    incomer_above_ampere_options,
    incomer_above_pole_options,
    incomer_above_type_options,
  } = useMCCPanelDropdowns()

  const { control, handleSubmit, reset, watch, formState } = useForm({
    resolver: zodResolver(mccPanelValidationSchema),
    defaultValues: getDefaultValues(mccPanelData?.[0]),
    mode: "onSubmit",
  })

  console.log("Form Errors", formState.errors)
  console.log(watch("is_blue_cb_spring_charge_selected"))

  useEffect(() => {
    reset(getDefaultValues(mccPanelData?.[0]))
  }, [mccPanelData, reset])

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
    console.log("MCC Data", data)
    try {
      const mccPanelData = await getData(
        `${MCC_PANEL}?fields=["*"]&filters=[["project_id", "=", "${params.project_id}"]]`,
        false
      )

      if (mccPanelData && mccPanelData.length > 0) {
        await updateData(`${MCC_PANEL}/${mccPanelData[0].name}`, false, data)
        message.success("Common configuration updated successfully")
      } else {
        data["project_id"] = params.project_id
        await createData(MCC_PANEL, false, data)
        message.success("Common configuration created successfully")
      }
    } catch (error) {
      console.log("error: ", error)
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Divider>
        <span className="font-bold text-slate-700">Selection Details</span>
      </Divider>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">Incomer</h4>
            <div className="text-xs font-semibold text-blue-500">Upto and including</div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_ampere"
              label="Ampere"
              options={incomer_ampere_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_pole"
              label="Pole"
              options={incomer_pole_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_type"
              label="Type"
              options={incomer_type_options}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">Incomer Above</h4>
            <div className="text-xs font-semibold text-blue-500">Above and including</div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_ampere"
              label="Ampere"
              options={incomer_above_ampere_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_pole"
              label="Pole"
              options={incomer_above_pole_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_type"
              label="Type"
              options={incomer_above_type_options}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_under_or_over_voltage_selected"
              label="Under / Over Voltage"
            />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="is_lsig_selected" label="LSIG" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="is_lsi_selected" label="LSI" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_neural_link_with_disconnect_facility_selected"
              label="Neural Link With Disconnect Facility"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_led_type_lamp_selected"
              label="Indication (LED Type Lamp)"
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput
              control={control}
              name="is_blue_cb_spring_charge_selected"
              label="CB Spring Charge (Blue)"
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="is_red_cb_in_service" label="CB in Service (Red)" />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput
              control={control}
              name="is_white_healthy_trip_circuit_selected"
              label="Trip Circuit Healthy (White)"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_coating"
              label="Current Transformer Coating"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_number"
              label="Current Transformer Number"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="alarm_annunciator"
              label="Alarm Annunciator"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Metering Instruments for Incomer</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="mi_analog" label="Analog" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="mi_digital" label="Digital" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_communication_protocol"
              label="Communication Protocol"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">General Arrangement</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_material"
              label="MOC Material"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_door"
              label="MOC Thickness (Door & Component mounting plate thickness in mm)"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_covers"
              label="MOC Thickness (Top & Side covers thickness in mm)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_compartmental"
              label="MCC Compartmental"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_front_type"
              label="MCC Construction Front Type"
              options={[]}
              size="small"
            />
          </div>

          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_drawout_type"
              label="MCC Construction Drawout Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_type"
              label="GA MCC Construction Type"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="busbar_material_of_construction"
              label="Busbar Material Of Construction"
              options={[
                { label: "Aluminium", value: "Aluminium" },
                { label: "Copper", value: "Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_current_density"
              label="Current Density"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_frame"
              label="Panel Mounting"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_height"
              label="Height of base frame (mm)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="mr-2 font-semibold text-slate-700">Sections</h4>
          <div className="">
            <CustomCheckboxInput control={control} name="is_marshalling_section_selected" label="Marshalling Section" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="is_cable_alley_section_selected" label="Cable Alley Section" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_power_and_bus_separation_section_selected"
              label="Separation Between Power & Control Bus"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_both_side_extension_section_selected"
              label="Extentional On Both Sides"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_3mm_drill_type"
              label="Gland Plate (3mm) Drill Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_3mm_attachment_type"
              label="Gland Plate (3mm) Opening Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_busbar_chamber_position"
              label="Busbar Chamber Position"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_power_and_control_busbar_separation"
              label="Separation between power & control busbar"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_enclosure_protection_degree"
              label="Degree of Enclosure Protection"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_cable_entry_position"
              label="Cable Entry Position"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Painting / Powder Coating</span>
        </Divider>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_painting_standards"
              label="Painting Standards"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_interior_and_exterior_paint_shade"
              label="Paint Shade for Interior and Exterior"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_component_mounting_plate_paint_shade"
              label="Paint shade for component mounting plate"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_base_frame_paint_shade"
              label="Paint shade for base frame"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_minimum_coating_thickness"
              label="Minimum Coating Thickness"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_pretreatment_panel_standard"
              label="Standard for pretreatment Panel Shall Be Degreased And Derusted (7 Tank Pretreatment)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">VFD</span>
        </Divider>
        <div className="w-1/3 flex-1">
          <CustomSingleSelect
            control={control}
            name="vfd_auto_manual_selection"
            label="VFD Auto / Manual Selection"
            options={[]}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Punching Details</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="font-bold text-slate-700">Punching Details For Boiler</h4>
          <div>
            <CustomRadioSelect
              control={control}
              name="is_punching_details_for_boiler_selected"
              label=""
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_model"
              label="Model"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_fuel"
              label="Fuel"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_year"
              label="Year"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_power_supply_vac"
              label="Power Supply (VAC)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_power_supply_phase"
              label="Power Supply (Phase)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_power_supply_frequency"
              label="Power Supply (Hz)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_control_supply_vac"
              label="Control Supply (VAC)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_control_supply_phase"
              label="Control Supply (Phase)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_control_supply_frequency"
              label="Control Supply (Hz)"
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_evaporation"
              label="Evaporation"
              addonAfter={"Kg/Hr"}
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_output"
              label="OutPut"
              addonAfter={"MW"}
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_connected_load"
              label="Connected Load"
              addonAfter={"KW"}
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="boiler_design_pressure"
              label="Design Pressure"
              addonAfter={"Kg/cm2(g)/Bar"}
              disabled={watch("is_punching_details_for_boiler_selected") === 0}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="font-bold text-slate-700">Punching Details For Heater</h4>
          <div>
            <CustomRadioSelect
              control={control}
              name="is_punching_details_for_heater_selected"
              label=""
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_motor"
              label="Motor"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_fuel"
              label="Fuel"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_year"
              label="Year"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_power_supply_vac"
              label="Power Supply (VAC)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_power_supply_phase"
              label="Power Supply (Phase)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_power_supply_frequency"
              label="Power Supply (Hz)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_control_supply_vac"
              label="Control Supply (VAC)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_control_supply_phase"
              label="Control Supply (Phase)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_control_supply_frequency"
              label="Control Supply (Hz)"
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_evaporation"
              label="Evaporation"
              addonAfter={"Kcal/Hr"}
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_output"
              label="Output"
              addonAfter={"MW"}
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_connected_load"
              label="Connected Load"
              addonAfter={"KW"}
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="heater_temperature"
              label="Temperature"
              addonAfter={"Deg C"}
              disabled={watch("is_punching_details_for_heater_selected") === 0}
            />
          </div>
        </div>
        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default MCCPanel
