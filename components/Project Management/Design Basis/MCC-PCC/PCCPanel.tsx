import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { PCC_PANEL } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useMCCPCCPanelDropdowns from "./MCCPCCPanelDropdown"
import { pccPanelValidationSchema } from "./schemas"

const getDefaultValues = (pccPanelData: any) => {
  return {
    incomer_ampere: pccPanelData?.incomer_ampere || "1000",
    incomer_pole: pccPanelData?.incomer_pole || "3",
    incomer_type: pccPanelData?.incomer_type || "SFU",
    incomer_above_ampere: pccPanelData?.incomer_above_ampere || "1001",
    incomer_above_pole: pccPanelData?.incomer_above_pole || "4",
    incomer_above_type: pccPanelData?.incomer_above_type || "SFU",
    is_under_or_over_voltage_selected: pccPanelData?.is_under_or_over_voltage_selected,
    is_lsig_selected: pccPanelData?.is_lsig_selected,
    is_lsi_selected: pccPanelData?.is_lsi_selected,
    is_neural_link_with_disconnect_facility_selected: pccPanelData?.is_neural_link_with_disconnect_facility_selected,
    is_led_type_lamp_selected: pccPanelData?.is_led_type_lamp_selected,
    is_blue_cb_spring_charge_selected: pccPanelData?.is_blue_cb_spring_charge_selected,
    is_red_cb_in_service: pccPanelData?.is_red_cb_in_service,
    is_white_healthy_trip_circuit_selected: pccPanelData?.is_white_healthy_trip_circuit_selected,
    current_transformer_coating: pccPanelData?.current_transformer_coating,
    current_transformer_number: pccPanelData?.current_transformer_number,
    alarm_annunciator: pccPanelData?.alarm_annunciator,
    mi_analog: pccPanelData?.mi_analog,
    mi_digital: pccPanelData?.mi_digital,
    mi_communication_protocol: pccPanelData?.mi_communication_protocol,
    ga_moc_material: pccPanelData?.ga_moc_material,
    ga_moc_thickness_door: pccPanelData?.ga_moc_thickness_door,
    ga_moc_thickness_covers: pccPanelData?.ga_moc_thickness_covers,
    ga_pcc_compartmental: pccPanelData?.ga_pcc_compartmental,
    ga_pcc_construction_front_type: pccPanelData?.ga_pcc_construction_front_type,
    ga_pcc_construction_drawout_type: pccPanelData?.ga_pcc_construction_drawout_type,
    ga_pcc_construction_type: pccPanelData?.ga_pcc_construction_type,
    busbar_material_of_construction: pccPanelData?.busbar_material_of_construction,
    ga_current_density: pccPanelData?.ga_current_density,
    ga_panel_mounting_frame: pccPanelData?.ga_panel_mounting_frame,
    ga_panel_mounting_height: pccPanelData?.ga_panel_mounting_height,
    is_marshalling_section_selected: pccPanelData?.is_marshalling_section_selected,
    is_cable_alley_section_selected: pccPanelData?.is_cable_alley_section_selected,
    is_power_and_bus_separation_section_selected: pccPanelData?.is_power_and_bus_separation_section_selected,
    is_both_side_extension_section_selected: pccPanelData?.is_both_side_extension_section_selected,
    ga_gland_plate_3mm_drill_type: pccPanelData?.ga_gland_plate_3mm_drill_type,
    ga_gland_plate_3mm_attachment_type: pccPanelData?.ga_gland_plate_3mm_attachment_type,
    ga_busbar_chamber_position: pccPanelData?.ga_busbar_chamber_position,
    ga_power_and_control_busbar_separation: pccPanelData?.ga_power_and_control_busbar_separation,
    ga_enclosure_protection_degree: pccPanelData?.ga_enclosure_protection_degree,
    ga_cable_entry_position: pccPanelData?.ga_cable_entry_position,
    ppc_painting_standards: pccPanelData?.ppc_painting_standards,
    ppc_interior_and_exterior_paint_shade: pccPanelData?.ppc_interior_and_exterior_paint_shade,
    ppc_component_mounting_plate_paint_shade: pccPanelData?.ppc_component_mounting_plate_paint_shade,
    ppc_base_frame_paint_shade: pccPanelData?.ppc_base_frame_paint_shade,
    ppc_minimum_coating_thickness: pccPanelData?.ppc_minimum_coating_thickness,
    ppc_pretreatment_panel_standard: pccPanelData?.ppc_pretreatment_panel_standard,
    vfd_auto_manual_selection: pccPanelData?.vfd_auto_manual_selection,
    is_punching_details_for_boiler_selected: pccPanelData?.is_punching_details_for_boiler_selected || 0,
    boiler_model: pccPanelData?.boiler_model || "NA",
    boiler_fuel: pccPanelData?.boiler_fuel || "NA",
    boiler_year: pccPanelData?.boiler_year || "NA",
    boiler_power_supply_vac: pccPanelData?.boiler_power_supply_vac || "NA",
    boiler_power_supply_phase: pccPanelData?.boiler_power_supply_phase || "NA",
    boiler_power_supply_frequency: pccPanelData?.boiler_power_supply_frequency || "NA",
    boiler_control_supply_vac: pccPanelData?.boiler_control_supply_vac || "NA",
    boiler_control_supply_phase: pccPanelData?.boiler_control_supply_phase || "NA",
    boiler_control_supply_frequency: pccPanelData?.boiler_control_supply_frequency || "NA",
    boiler_evaporation: pccPanelData?.boiler_evaporation || "NA",
    boiler_output: pccPanelData?.boiler_output || "NA",
    boiler_connected_load: pccPanelData?.boiler_connected_load || "NA",
    boiler_design_pressure: pccPanelData?.boiler_design_pressure || "NA",
    is_punching_details_for_heater_selected: pccPanelData?.is_punching_details_for_heater_selected || 0,
    heater_model: pccPanelData?.heater_model || "NA",
    heater_fuel: pccPanelData?.heater_fuel || "NA",
    heater_year: pccPanelData?.heater_year || "NA",
    heater_power_supply_vac: pccPanelData?.heater_power_supply_vac || "NA",
    heater_power_supply_phase: pccPanelData?.heater_power_supply_phase || "NA",
    heater_power_supply_frequency: pccPanelData?.heater_power_supply_frequency || "NA",
    heater_control_supply_vac: pccPanelData?.heater_control_supply_vac || "NA",
    heater_control_supply_phase: pccPanelData?.heater_control_supply_phase || "NA",
    heater_control_supply_frequency: pccPanelData?.heater_control_supply_frequency || "NA",
    heater_evaporation: pccPanelData?.heater_evaporation || "NA",
    heater_output: pccPanelData?.heater_output || "NA",
    heater_connected_load: pccPanelData?.heater_connected_load || "NA",
    heater_temperature: pccPanelData?.heater_temperature || "NA",
  }
}

const PCCPanel = ({ revision_id, panel_id }: { revision_id: string; panel_id: string }) => {
  const { data: pccPanelData } = useGetData(
    `${PCC_PANEL}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`,
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

  const { control, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(pccPanelValidationSchema),
    defaultValues: getDefaultValues(pccPanelData?.[0]),
    mode: "onSubmit",
  })

  console.log("Form Errors", formState.errors)

  useEffect(() => {
    reset(getDefaultValues(pccPanelData?.[0]))
  }, [pccPanelData, reset])

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
    console.log("PCC Data", data)
    try {
      const pccPanelData = await getData(
        `${PCC_PANEL}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`,
        false
      )

      if (pccPanelData && pccPanelData.length > 0) {
        await updateData(`${PCC_PANEL}/${pccPanelData[0].name}`, false, data)
        message.success("Common configuration updated successfully")
      } else {
        data["revision_id"] = revision_id
        data["panel_id"] = panel_id
        await createData(PCC_PANEL, false, data)
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
        <div className="w-1/3 flex-1">
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
              name="ga_pcc_compartmental"
              label="PCC Compartmentalization"
              options={ga_mcc_compartmental_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_front_type"
              label="PCC Front Type"
              options={ga_mcc_construction_front_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_drawout_type"
              label="PCC Drawout Type"
              options={ga_mcc_construction_drawout_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_type"
              label="PCC Construction Type"
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
              label="Paint Shade for Component Mounting Plate"
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
              label="Paint Shade For Base Frame"
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
            <div className="flex-1">
              <CustomTextInput
                control={control}
                name="boiler_power_supply_frequency"
                label="Power Supply (Hz)"
                disabled={watch("is_punching_details_for_boiler_selected") === 0}
              />
            </div>
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
              name="heater_model"
              label="Model"
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

export default PCCPanel
