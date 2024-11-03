import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { useParams } from "next/navigation"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useCableTrayDrodowns from "./CableTrayDropdown"
import { useLoading } from "hooks/useLoading"
import { mutate } from "swr"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  number_of_cores: zod.string({ required_error: "This field is required", message: "This field is required" }),
  layout_specific_requirements: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  type_of_insulation: zod.string({ required_error: "This field is required", message: "This field is required" }),
  layout_color_scheme: zod.string({ required_error: "This field is required", message: "This field is required" }),
  mv_drop_running: zod.string({ required_error: "This field is required", message: "This field is required" }),
  mv_drop_starting: zod.string({ required_error: "This field is required", message: "This field is required" }),
  layout_conductor: zod.string({ required_error: "This field is required", message: "This field is required" }),
  layout_cable_installation: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  layout_voltage_grade: zod.string({ required_error: "This field is required", message: "This field is required" }),
  layout_derating_factor: zod.string({ required_error: "This field is required", message: "This field is required" }),

  // Power Cable Tray
  pc_perforated_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_perforated_type_height: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  pc_perforated_type_thickness: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  pc_ladder_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_ladder_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_ladder_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_mesh_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_mesh_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_mesh_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_conduit_moc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  pc_conduit_size: zod.string({ required_error: "This field is required", message: "This field is required" }),
  // Control Cable Tray
  cc_perforated_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_perforated_type_height: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  cc_perforated_type_thickness: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  cc_ladder_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_ladder_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_ladder_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_mesh_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_mesh_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_mesh_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_conduit_moc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  cc_conduit_size: zod.string({ required_error: "This field is required", message: "This field is required" }),
  // Single Cable Tray
  sc_perforated_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_perforated_type_height: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  sc_perforated_type_thickness: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  sc_ladder_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_ladder_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_ladder_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_mesh_type_width: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_mesh_type_height: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_mesh_type_thickness: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_conduit_moc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  sc_conduit_size: zod.string({ required_error: "This field is required", message: "This field is required" }),
})

type CableTrayFormData = zod.infer<typeof configItemValidationSchema>

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    number_of_cores: projectData?.number_of_cores || "NA",
    layout_specific_requirements: projectData?.layout_specific_requirements || "NA",
    type_of_insulation: projectData?.type_of_insulation || "NA",
    layout_color_scheme: projectData?.layout_color_scheme || "NA",
    mv_drop_running: projectData?.mv_drop_running || "NA",
    mv_drop_starting: projectData?.mv_drop_starting || "NA",
    layout_conductor: projectData?.layout_conductor || "NA",
    layout_cable_installation: projectData?.layout_cable_installation || "NA",
    layout_voltage_grade: projectData?.layout_voltage_grade || "NA",
    layout_derating_factor: projectData?.layout_derating_factor || "NA",

    gland_make: projectData?.gland_make || "NA",
    gland_moc: projectData?.gland_moc || "NA",
    type_of_gland: projectData?.type_of_gland || "NA",
    ct_future_space: projectData?.ct_future_space || "NA",
    ct_cable_placement: projectData?.ct_cable_placement || "NA",
    ct_orientation: projectData?.ct_orientation || "NA",
    ct_vertical: projectData?.ct_vertical || "NA",
    ct_horizontal: projectData?.ct_horizontal || "NA",

    // Power Cable tray
    pc_perforated_type_width: projectData?.pc_perforated_type_width || "NA",
    pc_perforated_type_height: projectData?.pc_perforated_type_height || "NA",
    pc_perforated_type_thickness: projectData?.pc_perforated_type_thickness || "NA",
    pc_ladder_type_width: projectData?.pc_ladder_type_width || "NA",
    pc_ladder_type_height: projectData?.pc_ladder_type_height || "NA",
    pc_ladder_type_thickness: projectData?.pc_ladder_type_thickness || "NA",
    pc_mesh_type_width: projectData?.pc_mesh_type_width || "NA",
    pc_mesh_type_height: projectData?.pc_mesh_type_height || "NA",
    pc_mesh_type_thickness: projectData?.pc_mesh_type_thickness || "NA",
    pc_conduit_moc: projectData?.pc_conduit_moc || "NA",
    pc_conduit_size: projectData?.pc_conduit_size || "NA",

    // Control Cable tray
    cc_perforated_type_width: projectData?.cc_perforated_type_width || "NA",
    cc_perforated_type_height: projectData?.cc_perforated_type_height || "NA",
    cc_perforated_type_thickness: projectData?.cc_perforated_type_thickness || "NA",
    cc_ladder_type_width: projectData?.cc_ladder_type_width || "NA",
    cc_ladder_type_height: projectData?.cc_ladder_type_height || "NA",
    cc_ladder_type_thickness: projectData?.cc_ladder_type_thickness || "NA",
    cc_mesh_type_width: projectData?.cc_mesh_type_width || "NA",
    cc_mesh_type_height: projectData?.cc_mesh_type_height || "NA",
    cc_mesh_type_thickness: projectData?.cc_mesh_type_thickness || "NA",
    cc_conduit_moc: projectData?.cc_conduit_moc || "NA",
    cc_conduit_size: projectData?.cc_conduit_size || "NA",

    // Single Cable tray
    sc_perforated_type_width: projectData?.sc_perforated_type_width || "NA",
    sc_perforated_type_height: projectData?.sc_perforated_type_height || "NA",
    sc_perforated_type_thickness: projectData?.sc_perforated_type_thickness || "NA",
    sc_ladder_type_width: projectData?.sc_ladder_type_width || "NA",
    sc_ladder_type_height: projectData?.sc_ladder_type_height || "NA",
    sc_ladder_type_thickness: projectData?.sc_ladder_type_thickness || "NA",
    sc_mesh_type_width: projectData?.sc_mesh_type_width || "NA",
    sc_mesh_type_height: projectData?.sc_mesh_type_height || "NA",
    sc_mesh_type_thickness: projectData?.sc_mesh_type_thickness || "NA",
    sc_conduit_moc: projectData?.sc_conduit_moc || "NA",
    sc_conduit_size: projectData?.sc_conduit_size || "NA",
  }
}

const CableTray: React.FC = () => {
  const params = useParams()

  const project_id = params.project_id
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`
  const cableTrayUrl = `${PROJECT_API}/${project_id}`

  const { data: projectMetadata } = useGetData(getProjectMetadataUrl, false)
  const { data: cableTray } = useGetData(cableTrayUrl, false)

  const [loading, setLoading] = useState(false)
  const projectData = React.useMemo(() => ({ ...projectMetadata, cableTray }), [projectMetadata, cableTray])

  const {
    number_of_coresOptions,
    layout_specific_requirementsOptions,
    type_of_insulationsOptions,
    layout_color_schemeOptions,
    mv_drop_runningOptions,
    layout_conductorOptions,
    layout_cable_installationOptions,
    mv_drop_startingOptions,
    layout_voltage_gradeOptions,
    layout_derating_factorOptions,

    gland_makeOptions,
    gland_mocOptions,
    type_of_glandOptions,
    ct_future_spaceOptions,
    ct_cable_placementOptions,
    ct_orientationOptions,
    ct_verticalOptions,
    ct_horizontalOptions,

    ct_widthOptions,
    ct_heightOptions,
    ct_thicknessOptions,
    ct_mocOptions,
    ct_sizeOptions,
  } = useCableTrayDrodowns()

  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
  },[])

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
      message.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof cableTray>> = async (data: any) => {
    setLoading(true)
    try {
      console.log("data: ", data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      mutate(cableTrayUrl)
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
                options={number_of_coresOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="layout_specific_requirements"
                label="Specific requirement"
                options={layout_specific_requirementsOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="type_of_insulation"
                label="Type of insulation"
                options={type_of_insulationsOptions}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="layout_color_scheme"
                label="Color Scheme"
                options={layout_color_schemeOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="mv_drop_running"
                label="Motor voltage drop during running"
                options={mv_drop_runningOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Conductor"
                options={layout_conductorOptions}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="layout_cable_installation"
                label="Cable Installation (Provided on trays whenever possible)"
                options={layout_cable_installationOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="mv_drop_starting"
                label="Motor voltage drop during starting"
                options={mv_drop_startingOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="layout_voltage_grade"
                label="Voltage grade"
                options={layout_voltage_gradeOptions}
                size="small"
              />
            </div>
          </div>
          <div className="w-1/3 flex-1">
            <CustomTextInput control={control} name="layout_derating_factor" label="Derating Factor" size="small" />
          </div>
        </div>
        <Divider>Gland Details</Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="gland_make"
              label="Gland Make"
              options={gland_makeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="gland_moc"
              label="MOC"
              options={gland_mocOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="type_of_gland"
              label="Type of Gland"
              options={type_of_glandOptions}
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
                name="ct_future_space"
                label="Future Space on Trays"
                options={ct_future_spaceOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ct_cable_placement"
                label="Cable Placement"
                options={ct_cable_placementOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ct_orientation"
                label="Orientation"
                options={ct_orientationOptions}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ct_vertical"
                label="Vertical Distance"
                options={ct_verticalOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ct_horizontal"
                label="Horizontal Distance"
                options={ct_horizontalOptions}
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
                      name="supply_feeder_standard"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Wet Area</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_perforated_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_perforated_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_perforated_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_ladder_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_ladder_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_ladder_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_mesh_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_mesh_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_mesh_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_conduit_moc"
                label="MOC"
                options={ct_mocOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="pc_conduit_size"
                label="Size"
                options={ct_sizeOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_perforated_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_perforated_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_perforated_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_ladder_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_ladder_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_ladder_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_mesh_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_mesh_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_mesh_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_conduit_moc"
                label="MOC"
                options={ct_mocOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="cc_conduit_size"
                label="Size"
                options={ct_sizeOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_perforated_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_perforated_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_perforated_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_ladder_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_ladder_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_ladder_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_mesh_type_width"
                label="Width"
                options={ct_widthOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_mesh_type_height"
                label="Height"
                options={ct_heightOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_mesh_type_thickness"
                label="Thickness"
                options={ct_thicknessOptions}
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
                  name="supply_feeder_standard"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_conduit_moc"
                label="MOC"
                options={ct_mocOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="sc_conduit_size"
                label="Size"
                options={ct_sizeOptions}
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
