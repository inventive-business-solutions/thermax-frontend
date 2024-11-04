import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd" // Import Select for dropdown
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import useCableTrayDropdowns from "./CableTrayDropdown"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"

const configItemValidationSchema = zod.object({
  number_of_cores: zod.string({
    required_error: "Number of cores is required",
    message: "Number of cores is required",
  }),
  specific_requirement: zod.string({
    required_error: "Specific requirement is required",
    message: "Specific requirement is required",
  }),
  type_of_insulation: zod.string({
    required_error: "Type of insulation is required",
    message: "Type of insulation is required",
  }),
  color_scheme: zod.string({
    required_error: "Color scheme is required",
    message: "Color scheme is required",
  }),
  motor_voltage_drop_during_running: zod.string({
    required_error: "Motor voltage drop during running is required",
    message: "Motor voltage drop during running is required",
  }),
  conductor: zod.string({
    required_error: "Conductor is required",
    message: "Conductor is required",
  }),
  cable_installation: zod.string({
    required_error: "Cable installation is required",
    message: "Cable installation is required",
  }),
  motor_voltage_drop_during_starting: zod.string({
    required_error: "Motor voltage drop during starting is required",
    message: "Motor voltage drop during starting is required",
  }),
  voltage_grade: zod.string({
    required_error: "Voltage grade is required",
    message: "Voltage grade is required",
  }),
  derating_factor: zod.string({
    required_error: "Derating factor is required",
    message: "Derating factor is required",
  }),
  gland_make: zod.string({
    required_error: "Gland make is required",
    message: "Gland make is required",
  }),
  moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  type_of_gland: zod.string({
    required_error: "Type of gland is required",
    message: "Type of gland is required",
  }),
  future_space_on_trays: zod.string({
    required_error: "Future space on trays is required",
    message: "Future space on trays is required",
  }),
  cable_placement: zod.string({
    required_error: "Cable placement is required",
    message: "Cable placement is required",
  }),
  orientation: zod.string({
    required_error: "Orientation is required",
    message: "Orientation is required",
  }),
  vertical_distance: zod.string({
    required_error: "Vertical distance is required",
    message: "Vertical distance is required",
  }),
  horizontal_distance: zod.string({
    required_error: "Horizontal distance is required",
    message: "Horizontal distance is required",
  }),
  is_dry_area_selected: zod.string({
    required_error: "Dry area is required",
    message: "Dry area is required",
  }),
  dry_area: zod.string({
    required_error: "Dry area is required",
    message: "Dry area is required",
  }),
  is_wet_area_selected: zod.string({
    required_error: "Wet area is required",
    message: "Wet area is required",
  }),
  wet_area: zod.string({
    required_error: "Wet area is required",
    message: "Wet area is required",
  }),
  is_pct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  pct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  pct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  pct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  pct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  pct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
  is_cct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  cct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  cct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  cct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  cct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  cct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
  is_sct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  sct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  sct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  sct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  sct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  sct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
})

const getDefaultValues = (cableTrayData: any) => {
  return {
    number_of_cores: cableTrayData?.number_of_cores || "",
    specific_requirement: cableTrayData?.specific_requirement || "",
    type_of_insulation: cableTrayData?.type_of_insulation || "",
    color_scheme: cableTrayData?.color_scheme || "",
    motor_voltage_drop_during_running: cableTrayData?.motor_voltage_drop_during_running || "",
    conductor: cableTrayData?.conductor || "",
    cable_installation: cableTrayData?.cable_installation || "",
    motor_voltage_drop_during_starting: cableTrayData?.motor_voltage_drop_during_starting || "",
    voltage_grade: cableTrayData?.voltage_grade || "",
    derating_factor: cableTrayData?.derating_factor || "",
    gland_make: cableTrayData?.gland_make || "",
    moc: cableTrayData?.moc || "",
    type_of_gland: cableTrayData?.type_of_gland || "",
    future_space_on_trays: cableTrayData?.future_space_on_trays || "",
    cable_placement: cableTrayData?.cable_placement || "",
    orientation: cableTrayData?.orientation || "",
    vertical_distance: cableTrayData?.vertical_distance || "",
    horizontal_distance: cableTrayData?.horizontal_distance || "",
    is_dry_area_selected: cableTrayData?.is_dry_area_selected || 1,
    dry_area: cableTrayData?.dry_area || "",
    is_wet_area_selected: cableTrayData?.is_wet_area_selected || 1,
    wet_area: cableTrayData?.wet_area || "",
    is_pct_perforated_type_selected: cableTrayData?.is_pct_perforated_type_selected || 1,
    pct_perforated_type_width: cableTrayData?.pct_perforated_type_width || "",
    pct_perforated_type_height: cableTrayData?.pct_perforated_type_height || "",
    pct_perforated_type_thickness: cableTrayData?.pct_perforated_type_thickness || "",
    is_pct_ladder_type_selected: cableTrayData?.is_pct_ladder_type_selected || 1,
    pct_ladder_type_width: cableTrayData?.pct_ladder_type_width || "",
    pct_ladder_type_height: cableTrayData?.pct_ladder_type_height || "",
    pct_ladder_type_thickness: cableTrayData?.pct_ladder_type_thickness || "",
    is_pct_mesh_type_selected: cableTrayData?.is_pct_mesh_type_selected || 1,
    pct_mesh_type_width: cableTrayData?.pct_mesh_type_width || "",
    pct_mesh_type_height: cableTrayData?.pct_mesh_type_height || "",
    pct_mesh_type_thickness: cableTrayData?.pct_mesh_type_thickness || "",
    is_pct_conduit_selected: cableTrayData?.is_pct_conduit_selected || 1,
    pct_conduit_moc: cableTrayData?.pct_conduit_moc || "",
    pct_conduit_size: cableTrayData?.pct_conduit_size || "",
    is_cct_perforated_type_selected: cableTrayData?.is_cct_perforated_type_selected || 1,
    cct_perforated_type_width: cableTrayData?.cct_perforated_type_width || "",
    cct_perforated_type_height: cableTrayData?.cct_perforated_type_height || "",
    cct_perforated_type_thickness: cableTrayData?.cct_perforated_type_thickness || "",
    is_cct_ladder_type_selected: cableTrayData?.is_cct_ladder_type_selected || 1,
    cct_ladder_type_width: cableTrayData?.cct_ladder_type_width || "",
    cct_ladder_type_height: cableTrayData?.cct_ladder_type_height || "",
    cct_ladder_type_thickness: cableTrayData?.cct_ladder_type_thickness || "",
    is_cct_mesh_type_selected: cableTrayData?.is_cct_mesh_type_selected || 1,
    cct_mesh_type_width: cableTrayData?.cct_mesh_type_width || "",
    cct_mesh_type_height: cableTrayData?.cct_mesh_type_height || "",
    cct_mesh_type_thickness: cableTrayData?.cct_mesh_type_thickness || "",
    is_cct_conduit_selected: cableTrayData?.is_cct_conduit_selected || 1,
    cct_conduit_moc: cableTrayData?.cct_conduit_moc || "",
    cct_conduit_size: cableTrayData?.cct_conduit_size || "",
    is_sct_perforated_type_selected: cableTrayData?.is_sct_perforated_type_selected || 1,
    sct_perforated_type_width: cableTrayData?.sct_perforated_type_width || "",
    sct_perforated_type_height: cableTrayData?.sct_perforated_type_height || "",
    sct_perforated_type_thickness: cableTrayData?.sct_perforated_type_thickness || "",
    is_sct_ladder_type_selected: cableTrayData?.is_sct_ladder_type_selected || 1,
    sct_ladder_type_width: cableTrayData?.sct_ladder_type_width || "",
    sct_ladder_type_height: cableTrayData?.sct_ladder_type_height || "",
    sct_ladder_type_thickness: cableTrayData?.sct_ladder_type_thickness || "",
    is_sct_mesh_type_selected: cableTrayData?.is_sct_mesh_type_selected || 1,
    sct_mesh_type_width: cableTrayData?.sct_mesh_type_width || "",
    sct_mesh_type_height: cableTrayData?.sct_mesh_type_height || "",
    sct_mesh_type_thickness: cableTrayData?.sct_mesh_type_thickness || "",
    is_sct_conduit_selected: cableTrayData?.is_sct_conduit_selected || 1,
    sct_conduit_moc: cableTrayData?.sct_conduit_moc || "",
    sct_conduit_size: cableTrayData?.sct_conduit_size || "",
  }
}

const CableTray = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
    },
    mode: "onSubmit",
  })

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

  const onSubmit = (data: any) => {
    console.log("Common Config Data:", data)
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
                label="Specific requirement"
                options={specific_requirement_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="type_of_insulation"
                label="Type of insulation"
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
                label="Motor voltage drop during running"
                options={running_motor_voltage_drop_options}
                size="small"
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
                label="Motor voltage drop during starting"
                options={starting_motor_voltage_drop_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="voltage_grade"
                label="Voltage grade"
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
              <CustomTextNumber control={control} name="vertical_distance" label="Vertical Distance" size="small" />
            </div>
            <div className="flex-1">
              <CustomTextNumber control={control} name="horizontal_distance" label="Horizontal Distance" size="small" />
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
              />
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Single Cable Tray</span>
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_perforated_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_perforated_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_ladder_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_ladder_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_mesh_type_height"
                label="Height"
                options={cable_tray_height_options}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_mesh_type_thickness"
                label="Thickness"
                options={cable_tray_thickness_options}
                size="small"
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
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sct_conduit_size"
                label="Size"
                options={conduit_size_options}
                size="small"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default CableTray
