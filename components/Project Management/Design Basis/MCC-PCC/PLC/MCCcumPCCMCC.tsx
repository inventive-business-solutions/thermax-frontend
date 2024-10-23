import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { useParams } from "next/navigation"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useMCCcumPCCDropdowns from "./MCCcumPCCDropdowns"
import { mutate } from "swr"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  sd_incomer_ampere: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_pole: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_type: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_above_ampere: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_above_pole: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_above_type: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_above_under_over_voltage: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  sd_incomer_above_lsig: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sd_incomer_above_neural_link: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  current_transformer_A: zod.string({ required_error: "This field is required", message: "This field is required" }),
  current_transformer_B: zod.string({ required_error: "This field is required", message: "This field is required" }),
  alarm_annunciator: zod.string({ required_error: "This field is required", message: "This field is required" }),
  mi_analog: zod.string({ required_error: "This field is required", message: "This field is required" }),
  mi_digital: zod.string({ required_error: "This field is required", message: "This field is required" }),
  mi_communication_protocol: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),

  ga_moc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_moc_thickness_cover: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_moc_thickness_door: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_pcc_construction_A: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_pcc_construction_B: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_pcc_construction_C: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_pcc_construction_D: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_current_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_panel_mounting_frame: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_panel_mounting_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_gland_plate_a: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_gland_plate_b: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ga_busbar_chamber_position: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  ga_separation_power_chamber: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  ga_degree_of_enclosure_protection: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  ga_cable_entry_position: zod.string({ required_error: "This field is required", message: "This field is required" }),

  pc_painting_standards: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_paint_shade_interior_exterior: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  pc_paint_shade_for_component: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  pc_paint_shade_for_base_frame: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  pc_min_coating_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_pretreatment_panel: zod.string({ required_error: "This field is required", message: "This field is required" }),
  vfd_auto_manual_selection: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
})

type MccComponentFormData = zod.infer<typeof configItemValidationSchema>

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    sd_incomer_ampere: projectData?.sd_incomer_ampere || "NA",
    sd_incomer_pole: projectData?.sd_incomer_pole || "NA",
    sd_incomer_type: projectData?.sd_incomer_type || "NA",
    sd_incomer_above_ampere: projectData?.sd_incomer_above_ampere || "NA",
    sd_incomer_above_pole: projectData?.sd_incomer_above_pole || "NA",
    sd_incomer_above_type: projectData?.sd_incomer_above_type || "NA",
    sd_incomer_above_under_over_voltage: projectData?.sd_incomer_above_under_over_voltage || "NA",
    sd_incomer_above_lsig: projectData?.sd_incomer_above_lsig || "NA",
    sd_incomer_above_lsi: projectData?.sd_incomer_above_lsi || "NA",
    sd_incomer_above_neural_link: projectData?.sd_incomer_above_neural_link || "NA",
    current_transformer_A: projectData?.current_transformer_A || "NA",
    current_transformer_B: projectData?.current_transformer_B || "NA",
    alarm_annunciator: projectData?.alarm_annunciator || "NA",
    mi_analog: projectData?.mi_analog || "NA",
    mi_digital: projectData?.mi_digital || "NA",
    mi_communication_protocol: projectData?.mi_communication_protocol || "NA",

    ga_moc: projectData?.ga_moc || "NA",
    ga_moc_thickness_cover: projectData?.ga_moc_thickness_cover || "NA",
    ga_moc_thickness_door: projectData?.ga_moc_thickness_door || "NA",
    ga_pcc_construction_A: projectData?.ga_pcc_construction_A || "NA",
    ga_pcc_construction_B: projectData?.ga_pcc_construction_B || "NA",
    ga_pcc_construction_C: projectData?.ga_pcc_construction_C || "NA",
    ga_pcc_construction_D: projectData?.ga_pcc_construction_D || "NA",
    ga_current_density: projectData?.ga_current_density || "NA",
    ga_panel_mounting_frame: projectData?.ga_panel_mounting_frame || "NA",
    ga_panel_mounting_height: projectData?.ga_panel_mounting_height || "NA",
    ga_gland_plate_a: projectData?.ga_gland_plate_a || "NA",
    ga_gland_plate_b: projectData?.ga_gland_plate_b || "NA",
    ga_busbar_chamber_position: projectData?.ga_busbar_chamber_position || "NA",
    ga_separation_power_chamber: projectData?.ga_separation_power_chamber || "NA",
    ga_degree_of_enclosure_protection: projectData?.ga_degree_of_enclosure_protection || "NA",
    ga_cable_entry_position: projectData?.ga_cable_entry_position || "NA",
    pc_painting_standards: projectData?.pc_painting_standards || "NA",
    pc_paint_shade_interior_exterior: projectData?.pc_paint_shade_interior_exterior || "NA",
    pc_paint_shade_for_component: projectData?.pc_paint_shade_for_component || "NA",
    pc_paint_shade_for_base_frame: projectData?.pc_paint_shade_for_base_frame || "NA",
    pc_min_coating_thickness: projectData?.pc_min_coating_thickness || "NA",
    pc_pretreatment_panel: projectData?.pc_pretreatment_panel || "NA",
    vfd_auto_manual_selection: projectData?.vfd_auto_manual_selection || "NA",
  }
}

const MCCcumPCCMCCPanel = () => {
  const params = useParams()
  const project_id = params.project_id
  const getPProjectMetaDataUrl = `${PROJECT_API}/${project_id}`
  const getMccPanelUrl = `${PROJECT_API}/${project_id}`
  const [loading, setLoading] = useState(false)

  const { data: projectMetadata } = useGetData(getPProjectMetaDataUrl, false)
  const { data: mccPanel } = useGetData(getMccPanelUrl, false)

  const projectData = React.useMemo(() => ({ ...projectMetadata, mccPanel }), [projectMetadata, mccPanel])

  const {
    sd_incomer_ampereOptions,
    sd_incomer_poleOptions,
    sd_incomer_typeOptions,
    sd_incomer_above_ampereOptions,
    sd_incomer_above_poleOptions,
    sd_incomer_above_typeOptions,
    sd_incomer_above_under_over_voltageOptions,
    sd_incomer_above_lsigOptions,
    sd_incomer_above_lsiOptions,
    sd_incomer_above_neural_linkOptions,
    current_transformer_A_Options,
    current_transformer_B_Options,
    alarm_annunciatorOptions,
    mi_analogOptions,
    mi_digitalOptions,
    mi_communication_protocolOptions,

    ga_mocOptions,
    ga_moc_thickness_DoorOptions,
    ga_moc_thickness_CoversOptions,
    ga_pcc_construction_AOptions,
    ga_pcc_construction_BOptions,
    ga_pcc_construction_COptions,
    ga_pcc_construction_DOptions,
    ga_current_densityOptions,
    ga_panel_mounting_frameOptions,
    ga_panel_mounting_heightOptions,
    ga_gland_plate_aOptions,
    ga_gland_plate_bOptions,
    ga_busbar_chamber_positionOptions,
    ga_separation_power_chamberOptions,
    ga_degree_of_enclosure_protectionOptions,
    ga_cable_entry_positionOptions,
    pc_painting_standardsOptions,
    pc_paint_shade_interior_exteriorOptions,
    pc_paint_shade_for_componentOptions,
    pc_paint_shade_for_base_frameOptions,
    pc_min_coating_thicknessOptions,
    pc_pretreatment_panelOptions,
    vfd_auto_manual_selectionOptions,
  } = useMCCcumPCCDropdowns()

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
      message.error(errorObj?.message)
    } catch (parseError) {
      message.error(error?.message || "An Unknown error occurred")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof mccPanel>> = async (data: any) => {
    setLoading(true)
    try {
      console.log("data: ", data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
      mutate(getMccPanelUrl)
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
              name="sd_incomer_ampere"
              label="Ampere"
              options={sd_incomer_ampereOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sd_incomer_pole"
              label="Pole"
              options={sd_incomer_poleOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sd_incomer_type"
              label="Type"
              options={sd_incomer_typeOptions}
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
              name="sd_incomer_above_ampere"
              label="Ampere"
              options={sd_incomer_above_ampereOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sd_incomer_above_pole"
              label="Pole"
              options={sd_incomer_above_poleOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sd_incomer_above_type"
              label="Type"
              options={sd_incomer_above_typeOptions}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Under / Over Voltage" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="LSIG" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="LSI" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="push_button_color"
              label="Neural Link With Disconnect Facility"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Indication (LED Type Lamp)"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="CB Spring Charge (Blue)" />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="CB in Service (Red)" />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="Trip Circuit Healthy (White)" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_A"
              label="Current Transformer Coating"
              options={current_transformer_A_Options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_B"
              label="Current Transformer Number"
              options={current_transformer_B_Options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="alarm_annunciator"
              label="Alarm Annunciator"
              options={alarm_annunciatorOptions}
              size="small"
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
              options={mi_analogOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_digital"
              label="Digital"
              options={mi_digitalOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_communication_protocol"
              label="Communication Protocol"
              options={mi_communication_protocolOptions}
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
              name="ga_moc"
              label="MOC Material"
              options={ga_mocOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_door"
              label="MOC Thickness (Door & Component mounting plate thickness in mm)"
              options={ga_moc_thickness_DoorOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              label="MOC Thickness (Top & Side covers thickness in mm)"
              name="ga_moc_thickness_cover"
              options={ga_moc_thickness_CoversOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_A"
              label="MCC Compartmentalization"
              options={ga_pcc_construction_AOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_B"
              label="MCC Front"
              options={ga_pcc_construction_BOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_C"
              label="MCC Drawtype"
              options={ga_pcc_construction_COptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_pcc_construction_D"
              label="MCC Construction Type"
              options={ga_pcc_construction_DOptions}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
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
              options={ga_current_densityOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_frame"
              label="Panel Mounting"
              options={ga_panel_mounting_frameOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_height"
              label="Height of base frame (mm)"
              options={ga_panel_mounting_heightOptions}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="mr-2 font-semibold text-slate-700">Sections</h4>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Marshalling Section" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Cable Alley Section" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="push_button_color"
              label="Separation Between Power & Control Bus"
            />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Extentional On Both Sides" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_a"
              label="Gland Plate (3mm) Drill Type"
              options={ga_gland_plate_aOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_b"
              label="Gland Plate (3mm) Opening Type"
              options={ga_gland_plate_bOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_busbar_chamber_position"
              label="Busbar Chamber Position"
              options={ga_busbar_chamber_positionOptions}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_separation_power_chamber"
              label="Separation between power & control busbar"
              options={ga_separation_power_chamberOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_degree_of_enclosure_protection"
              label="Degree of Enclosure Protection"
              options={ga_degree_of_enclosure_protectionOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_cable_entry_position"
              label="Cable Entry Position"
              options={ga_cable_entry_positionOptions}
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
              name="pc_painting_standards"
              label="Painting Standards"
              options={pc_painting_standardsOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pc_paint_shade_interior_exterior"
              label="Paint Shade for Interior and Exterior"
              options={pc_paint_shade_interior_exteriorOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pc_paint_shade_for_component"
              label="Paint shade for component mounting plate"
              options={pc_paint_shade_for_componentOptions}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pc_paint_shade_for_base_frame"
              label="Paint shade for base frame"
              options={pc_paint_shade_for_base_frameOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pc_min_coating_thickness"
              label="Minimum Coating Thickness"
              options={pc_min_coating_thicknessOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pc_pretreatment_panel"
              label="Standard for pretreatment Panel Shall Be Degreased And Derusted (7 Tank Pretreatment)"
              options={pc_pretreatment_panelOptions}
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
            options={vfd_auto_manual_selectionOptions}
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
              name="supply_feeder_standard"
              label=""
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Motor" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Fuel" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Year" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Evaporation" addonAfter={"Kg/Hr"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="OutPut" addonAfter={"MW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Connected Load" addonAfter={"KW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="push_button_color"
              label="Design Pressure"
              addonAfter={"Kg/cm2(g)/Bar"}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="font-bold text-slate-700">Punching Details For Heater</h4>
          <div>
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label=""
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Motor" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Fuel" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Year" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Evaporation" addonAfter={"Kcal/Hr"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="OutPut" addonAfter={"MW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Connected Load" addonAfter={"KW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Temperature" addonAfter={"Deg C"} />
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

export default MCCcumPCCMCCPanel
