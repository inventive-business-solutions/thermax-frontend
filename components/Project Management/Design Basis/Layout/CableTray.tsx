import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { CABLE_TRAY_LAYOUT } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useCableTrayDropdowns from "./CableTrayDropdown"
import { cableTrayValidationSchema } from "./schemas"

const getDefaultValues = (cableTrayData: any) => {
  return {
    number_of_cores: cableTrayData?.number_of_cores || "3C",
    specific_requirement: cableTrayData?.specific_requirement || "Standard",
    type_of_insulation: cableTrayData?.type_of_insulation || "PVC",
    color_scheme: cableTrayData?.color_scheme || "Red, Yellow, Blue",
    motor_voltage_drop_during_running: cableTrayData?.motor_voltage_drop_during_running || "2",
    conductor: cableTrayData?.conductor || "Copper",
    cable_installation: cableTrayData?.cable_installation || "Air",
    motor_voltage_drop_during_starting: cableTrayData?.motor_voltage_drop_during_starting || "5",
    voltage_grade: cableTrayData?.voltage_grade || "11 kV",
    derating_factor: cableTrayData?.derating_factor || "2",
    gland_make: cableTrayData?.gland_make || "Comet",
    moc: cableTrayData?.moc || "SS304",
    type_of_gland: cableTrayData?.type_of_gland || "Single Compression",
    future_space_on_trays: cableTrayData?.future_space_on_trays || "10",
    cable_placement: cableTrayData?.cable_placement || "Single Layer",
    orientation: cableTrayData?.orientation || "Layered",
    vertical_distance: cableTrayData?.vertical_distance || "3",
    horizontal_distance: cableTrayData?.horizontal_distance || "3",
    is_dry_area_selected: cableTrayData?.is_dry_area_selected || 1,
    dry_area: cableTrayData?.dry_area || "SS",
    is_wet_area_selected: cableTrayData?.is_wet_area_selected || 1,
    wet_area: cableTrayData?.wet_area || "FRP",
    is_pct_perforated_type_selected: cableTrayData?.is_pct_perforated_type_selected || 1,
    pct_perforated_type_width: cableTrayData?.pct_perforated_type_width || "150",
    pct_perforated_type_height: cableTrayData?.pct_perforated_type_height || "75",
    pct_perforated_type_thickness: cableTrayData?.pct_perforated_type_thickness || "2",
    is_pct_ladder_type_selected: cableTrayData?.is_pct_ladder_type_selected || 1,
    pct_ladder_type_width: cableTrayData?.pct_ladder_type_width || "150",
    pct_ladder_type_height: cableTrayData?.pct_ladder_type_height || "75",
    pct_ladder_type_thickness: cableTrayData?.pct_ladder_type_thickness || "2",
    is_pct_mesh_type_selected: cableTrayData?.is_pct_mesh_type_selected || 1,
    pct_mesh_type_width: cableTrayData?.pct_mesh_type_width || "150",
    pct_mesh_type_height: cableTrayData?.pct_mesh_type_height || "75",
    pct_mesh_type_thickness: cableTrayData?.pct_mesh_type_thickness || "2",
    is_pct_conduit_selected: cableTrayData?.is_pct_conduit_selected || 1,
    pct_conduit_moc: cableTrayData?.pct_conduit_moc || "Sch 40 PVC",
    pct_conduit_size: cableTrayData?.pct_conduit_size || "1/8",
    is_cct_perforated_type_selected: cableTrayData?.is_cct_perforated_type_selected || 1,
    cct_perforated_type_width: cableTrayData?.cct_perforated_type_width || "150",
    cct_perforated_type_height: cableTrayData?.cct_perforated_type_height || "75",
    cct_perforated_type_thickness: cableTrayData?.cct_perforated_type_thickness || "2",
    is_cct_ladder_type_selected: cableTrayData?.is_cct_ladder_type_selected || 1,
    cct_ladder_type_width: cableTrayData?.cct_ladder_type_width || "150",
    cct_ladder_type_height: cableTrayData?.cct_ladder_type_height || "75",
    cct_ladder_type_thickness: cableTrayData?.cct_ladder_type_thickness || "2",
    is_cct_mesh_type_selected: cableTrayData?.is_cct_mesh_type_selected || 1,
    cct_mesh_type_width: cableTrayData?.cct_mesh_type_width || "150",
    cct_mesh_type_height: cableTrayData?.cct_mesh_type_height || "75",
    cct_mesh_type_thickness: cableTrayData?.cct_mesh_type_thickness || "2",
    is_cct_conduit_selected: cableTrayData?.is_cct_conduit_selected || 1,
    cct_conduit_moc: cableTrayData?.cct_conduit_moc || "Sch 40 PVC",
    cct_conduit_size: cableTrayData?.cct_conduit_size || "1/8",
    is_sct_perforated_type_selected: cableTrayData?.is_sct_perforated_type_selected || 1,
    sct_perforated_type_width: cableTrayData?.sct_perforated_type_width || "150",
    sct_perforated_type_height: cableTrayData?.sct_perforated_type_height || "75",
    sct_perforated_type_thickness: cableTrayData?.sct_perforated_type_thickness || "2",
    is_sct_ladder_type_selected: cableTrayData?.is_sct_ladder_type_selected || 1,
    sct_ladder_type_width: cableTrayData?.sct_ladder_type_width || "150",
    sct_ladder_type_height: cableTrayData?.sct_ladder_type_height || "75",
    sct_ladder_type_thickness: cableTrayData?.sct_ladder_type_thickness || "2",
    is_sct_mesh_type_selected: cableTrayData?.is_sct_mesh_type_selected || 1,
    sct_mesh_type_width: cableTrayData?.sct_mesh_type_width || "150",
    sct_mesh_type_height: cableTrayData?.sct_mesh_type_height || "75",
    sct_mesh_type_thickness: cableTrayData?.sct_mesh_type_thickness || "2",
    is_sct_conduit_selected: cableTrayData?.is_sct_conduit_selected || 1,
    sct_conduit_moc: cableTrayData?.sct_conduit_moc || "Sch 40 PVC",
    sct_conduit_size: cableTrayData?.sct_conduit_size || "1/8",
  }
}

const CableTray = ({
  revision_id,
  setActiveKey,
}: {
  revision_id: string
  setActiveKey: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { data: cableTrayData } = useGetData(
    `${CABLE_TRAY_LAYOUT}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  )

  const [loading, setLoading] = useState(false)

  const {
    no_of_core_options,
    specific_requirement_options,
    type_of_insulation_options,
    color_scheme_options,
    running_motor_voltage_drop_options,
    conductor_options,
    cable_installation_options,
    starting_motor_voltage_drop_options,
    voltage_grade_options,
    gland_make_options,
    gland_moc_options,
    type_of_gland_options,
    future_space_on_trays_options,
    cable_placement_options,
    cable_tray_orientation_options,
    material_construction_dry_area_options,
    material_construction_wet_area_options,
    cable_tray_width_options,
    cable_tray_height_options,
    cable_tray_thickness_options,
    conduit_moc_options,
    conduit_size_options,
  } = useCableTrayDropdowns()

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(cableTrayValidationSchema),
    defaultValues: getDefaultValues(cableTrayData?.[0]),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(cableTrayData?.[0]))
  }, [cableTrayData, reset])

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
      const cableTrayData = await getData(
        `${CABLE_TRAY_LAYOUT}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      if (cableTrayData && cableTrayData.length > 0) {
        await updateData(`${CABLE_TRAY_LAYOUT}/${cableTrayData[0].name}`, false, data)
      } else {
        data["revision_id"] = revision_id
        await createData(CABLE_TRAY_LAYOUT, false, data)
      }

      message.success("Cable Tray Data updated successfully")
    } catch (error) {
      console.log("error: ", error)
      handleError(error)
    } finally {
      setLoading(false)
      setActiveKey("2")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <Divider>Power Cable</Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="number_of_cores"
                label="Number of Cores"
                options={no_of_core_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="specific_requirement"
                label="Specific Requirement"
                options={specific_requirement_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="type_of_insulation"
                label="Type of Insulation"
                options={type_of_insulation_options}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="color_scheme"
                label="Color Scheme"
                options={color_scheme_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="motor_voltage_drop_during_running"
                label="Motor Voltage Drop During Running"
                options={running_motor_voltage_drop_options}
                size="small"
                suffixIcon={"%"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="conductor"
                label="Conductor"
                options={conductor_options}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cable_installation"
                label="Cable Installation (Provided on trays whenever possible)"
                options={cable_installation_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="motor_voltage_drop_during_starting"
                label="Motor Voltage Drop During Starting"
                options={starting_motor_voltage_drop_options}
                size="small"
                suffixIcon={"%"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="voltage_grade"
                label="Voltage Grade"
                options={voltage_grade_options}
                size="small"
              />
            </div>
          </div>
          <div className="w-1/3 flex-1">
            <CustomTextInput control={control} name="derating_factor" label="Derating Factor" size="small" />
          </div>
        </div>
        <Divider>Gland Details</Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="gland_make"
              label="Gland Make"
              options={gland_make_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="moc" label="MOC" options={gland_moc_options} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="type_of_gland"
              label="Type of Gland"
              options={type_of_gland_options}
              size="small"
            />
          </div>
        </div>
        <Divider>Cable Trays</Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="future_space_on_trays"
                label="Future Space on Trays"
                options={future_space_on_trays_options}
                size="small"
                suffixIcon={"%"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cable_placement"
                label="Cable Placement"
                options={cable_placement_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="orientation"
                label="Orientation"
                options={cable_tray_orientation_options}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomTextNumber
                control={control}
                name="vertical_distance"
                label="Vertical Distance"
                suffix={"mm"}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomTextNumber
                control={control}
                name="horizontal_distance"
                label="Horizontal Distance"
                suffix={"mm"}
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-slate-700">Material Construction</h4>
            <div className="flex gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Dry Area</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_dry_area_selected"
                      label=""
                      options={[
                        { label: "Yes", value: 1 },
                        { label: "No", value: 0 },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="dry_area"
                    label=""
                    size="small"
                    options={material_construction_dry_area_options}
                    disabled={watch("is_dry_area_selected") === 0}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Wet Area</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_wet_area_selected"
                      label=""
                      options={[
                        { label: "Yes", value: 1 },
                        { label: "No", value: 0 },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="wet_area"
                    label=""
                    size="small"
                    options={material_construction_wet_area_options}
                    disabled={watch("is_wet_area_selected") === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Power Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_perforated_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_pct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_pct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_pct_perforated_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_ladder_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_pct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_pct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_pct_ladder_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_mesh_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_pct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_pct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_pct_mesh_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_conduit_moc"
                label="MOC"
                options={conduit_moc_options}
                size="small"
                disabled={watch("is_pct_conduit_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
                disabled={watch("is_pct_conduit_selected") === 0}
              />
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Control Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_perforated_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_cct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_cct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_cct_perforated_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_ladder_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_cct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_cct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_cct_ladder_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_mesh_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_cct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_cct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_cct_mesh_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_conduit_moc"
                label="MOC"
                options={conduit_moc_options}
                size="small"
                disabled={watch("is_cct_conduit_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
                disabled={watch("is_cct_conduit_selected") === 0}
              />
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Signal Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_perforated_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_sct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_sct_perforated_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_sct_perforated_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_ladder_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_sct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_sct_ladder_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_sct_ladder_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_mesh_type_width"
                label="Width"
                options={cable_tray_width_options}
                size="small"
                disabled={watch("is_sct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
                disabled={watch("is_sct_mesh_type_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
                disabled={watch("is_sct_mesh_type_selected") === 0}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: 1 },
                    { label: "No", value: 0 },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_conduit_moc"
                label="MOC"
                options={conduit_moc_options}
                size="small"
                disabled={watch("is_sct_conduit_selected") === 0}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
                disabled={watch("is_sct_conduit_selected") === 0}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" onClick={handleSubmit(onSubmit)} loading={loading}>
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default CableTray
