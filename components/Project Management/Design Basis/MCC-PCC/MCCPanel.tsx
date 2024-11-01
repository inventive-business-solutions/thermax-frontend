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
import useMCCPCCPanelDropdowns from "./MCCPanelDropdown"
import { createData, getData, updateData } from "actions/crud-actions"
import { mccPanelValidationSchema } from "./schemas"

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
    current_transformer_coating_options,
    current_transformer_number_options,
    mi_analog_options,
    mi_digital_options,
    mi_communication_protocol_options,
    ga_moc_material_options,
    ga_moc_thickness_door_options,
    ga_moc_thickness_covers_options,
    ga_mcc_compartmental_options,
    ga_mcc_construction_front_type_options,
    ga_mcc_construction_drawout_type_options,
    ga_mcc_construction_type_options,
    ga_current_density_options,
    ga_panel_mounting_frame_options,
    ga_panel_mounting_height_options,
    ga_gland_plate_3mm_drill_type_options,
    ga_gland_plate_3mm_attachment_type_options,
    ga_busbar_chamber_position_options,
    ga_power_and_control_busbar_separation_options,
    ga_enclosure_protection_degree_options,
    ga_cable_entry_position_options,
    ppc_painting_standards_options,
    ppc_interior_and_exterior_paint_shade_options,
    ppc_component_mounting_plate_paint_shade_options,
    ppc_base_frame_paint_shade_options,
    ppc_minimum_coating_thickness_options,
    ppc_pretreatment_panel_standard_options,
  } = useMCCPCCPanelDropdowns()

  const { control, handleSubmit, reset, watch, formState } = useForm({
    resolver: zodResolver(mccPanelValidationSchema),
    defaultValues: getDefaultValues(mccPanelData?.[0]),
    mode: "onSubmit",
  })

  console.log("Form Errors", formState.errors)

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
              options={current_transformer_coating_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_number"
              label="Current Transformer Number"
              options={current_transformer_number_options}
              size="small"
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
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Metering Instruments for Incomer</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_analog"
              label="Analog"
              options={mi_analog_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_digital"
              label="Digital"
              options={mi_digital_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_communication_protocol"
              label="Communication Protocol"
              options={mi_communication_protocol_options}
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
              options={ga_moc_material_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_door"
              label="MOC Thickness (Door & Component mounting plate thickness in mm)"
              options={ga_moc_thickness_door_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_covers"
              label="MOC Thickness (Top & Side covers thickness in mm)"
              options={ga_moc_thickness_covers_options}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_compartmental"
              label="MCC Compartmentalization"
              options={ga_mcc_compartmental_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_front_type"
              label="MCC Front Type"
              options={ga_mcc_construction_front_type_options}
              size="small"
            />
          </div>

          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_drawout_type"
              label="MCC Drawout Type"
              options={ga_mcc_construction_drawout_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_type"
              label="MCC Construction Type"
              options={ga_mcc_construction_type_options}
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
              options={ga_current_density_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_frame"
              label="Panel Mounting"
              options={ga_panel_mounting_frame_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_height"
              label="Height of base frame (mm)"
              options={ga_panel_mounting_height_options}
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
              options={ga_gland_plate_3mm_drill_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_3mm_attachment_type"
              label="Gland Plate (3mm) Opening Type"
              options={ga_gland_plate_3mm_attachment_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_busbar_chamber_position"
              label="Busbar Chamber Position"
              options={ga_busbar_chamber_position_options}
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
              options={ga_power_and_control_busbar_separation_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_enclosure_protection_degree"
              label="Degree of Enclosure Protection"
              options={ga_enclosure_protection_degree_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_cable_entry_position"
              label="Cable Entry Position"
              options={ga_cable_entry_position_options}
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
              options={ppc_painting_standards_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_interior_and_exterior_paint_shade"
              label="Paint Shade for Interior and Exterior"
              options={ppc_interior_and_exterior_paint_shade_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_component_mounting_plate_paint_shade"
              label="Paint shade for component mounting plate"
              options={ppc_component_mounting_plate_paint_shade_options}
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
              options={ppc_base_frame_paint_shade_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_minimum_coating_thickness"
              label="Minimum Coating Thickness"
              options={ppc_minimum_coating_thickness_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_pretreatment_panel_standard"
              label="Standard for pretreatment Panel Shall Be Degreased And Derusted (7 Tank Pretreatment)"
              options={ppc_pretreatment_panel_standard_options}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">VFD</span>
        </Divider>
        <div className="w-1/3 flex-1">
          <CustomRadioSelect
            control={control}
            name="vfd_auto_manual_selection"
            label="VFD Auto / Manual Selection"
            options={[
              { label: "Applicable", value: "Applicable" },
              { label: "Not Applicable", value: "Not Applicable" },
            ]}
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
        <Divider />
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
