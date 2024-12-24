"use client"
import { DownOutlined, PercentageOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message, Skeleton, Tooltip } from "antd"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { PROJECT_API, PROJECT_INFO_API, PROJECT_PANEL_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import DocumentListModal from "./DocumentListModal"
import PanelDataList from "./Panel/PanelDataList"
import useProjectInfoDropdowns from "./ProjectInfoDropdowns"

const ProjectInfoSchema = zod.object({
  project_name: zod.string({ required_error: "Project name is required", message: "Project name is required" }),
  altitude: zod.string({ required_error: "Altitude is required", message: "Altitude is required" }),
  min_humidity: zod.string({ required_error: "Minimum Humidity is required", message: "Humidity is required" }),
  max_humidity: zod.string({ required_error: "Maximum Humidity is required", message: "Humidity is required" }),
  avg_humidity: zod.string({ required_error: "Average Humidity is required", message: "Humidity is required" }),
  performance_humidity: zod.string({ required_error: "Performance Humidity is required", message: "Humidity is required" }),
  project_oc_number: zod.string({
    required_error: "Project OC number is required",
    message: "Project OC number is required",
  }),
  client_name: zod.string({ required_error: "Client name is required", message: "Client name is required" }),
  project_location: zod.string({
    required_error: "Project location is required",
    message: "Project location is required",
  }),
  main_supply_mv: zod.string({ required_error: "Main supply MV is required", message: "Main supply MV is required" }),
  main_supply_mv_variation: zod.string({
    required_error: "Main supply MV variation is required",
    message: "Main supply MV variation is required",
  }),
  main_supply_mv_phase: zod.string({
    required_error: "Main supply MV phase is required",
    message: "Main supply MV phase is required",
  }),
  main_supply_lv: zod.string({ required_error: "Main supply LV is required", message: "Main supply LV is required" }),
  main_supply_lv_variation: zod.string({
    required_error: "Main supply LV variation is required",
    message: "Main supply LV variation is required",
  }),
  main_supply_lv_phase: zod.string({
    required_error: "Main supply LV phase is required",
    message: "Main supply LV phase is required",
  }),
  control_supply: zod.string({ required_error: "Control supply is required", message: "Control supply is required" }),
  control_supply_variation: zod.string({
    required_error: "Control supply variation is required",
    message: "Control supply variation is required",
  }),
  control_supply_phase: zod.string({
    required_error: "Control supply phase is required",
    message: "Control supply phase is required",
  }),
  utility_supply: zod.string({ required_error: "Utility supply is required", message: "Utility supply is required" }),
  utility_supply_variation: zod.string({
    required_error: "Utility supply variation is required",
    message: "Utility supply variation is required",
  }),
  utility_supply_phase: zod.string({
    required_error: "Utility supply phase is required",
    message: "Utility supply phase is required",
  }),
  frequency: zod.string({ required_error: "Frequency is required", message: "Frequency is required" }),
  frequency_variation: zod.string({
    required_error: "Frequency variation is required",
    message: "Frequency variation is required",
  }),
  fault_level: zod.string({ required_error: "Fault level is required", message: "Fault level is required" }),
  sec: zod.string({ required_error: "Sec is required", message: "Sec is required" }),
  ambient_temperature_max: zod.string({
    required_error: "Ambient temperature max is required",
    message: "Ambient temperature max is required",
  }),
  ambient_temperature_min: zod
    .string({ required_error: "Ambient temperature min is required", message: "Ambient temperature min is required" })
    .min(1, "Ambient temperature min is required"),
  electrical_design_temperature: zod.string({
    required_error: "Electrical design temperature is required",
    message: "Electrical design temperature is required",
  }),
  seismic_zone: zod.string({ required_error: "Seismic zone is required", message: "Seismic zone is required" }),
})

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    project_name: projectData?.project_name,
    altitude: projectData?.altitude || "75",
    min_humidity: projectData?.min_humidity || "35",
    max_humidity: projectData?.max_humidity || "85",
    avg_humidity: projectData?.avg_humidity || "65",
    performance_humidity: projectData?.performance_humidity || "65",
    project_oc_number: projectData?.project_oc_number,
    client_name: projectData?.client_name,
    project_location: projectData?.project_location,
    main_supply_mv: projectData?.main_supply_mv || "11 KV",
    main_supply_mv_variation: projectData?.main_supply_mv_variation || "+/- 10.0",
    main_supply_mv_phase: projectData?.main_supply_mv_phase || "3 Phase / 4 Wire",
    main_supply_lv: projectData?.main_supply_lv || "415 VAC",
    main_supply_lv_variation: projectData?.main_supply_lv_variation || "+/- 10.0",
    main_supply_lv_phase: projectData?.main_supply_lv_phase || "3 Phase / 4 Wire",
    control_supply: projectData?.control_supply || "230 VAC",
    control_supply_variation: projectData?.control_supply_variation || "+/- 10.0",
    control_supply_phase: projectData?.control_supply_phase || "1 Phase",
    utility_supply: projectData?.utility_supply || "230 VAC",
    utility_supply_variation: projectData?.utility_supply_variation || "+/- 10.0",
    utility_supply_phase: projectData?.utility_supply_phase || "1 Phase",
    frequency_variation: projectData?.frequency_variation || "+/- 5.0",
    frequency: projectData?.frequency || "50",
    fault_level: projectData?.fault_level || "50",
    sec: projectData?.sec || "1",
    ambient_temperature_max: projectData?.ambient_temperature_max || "40",
    ambient_temperature_min: projectData?.ambient_temperature_min || "40",
    electrical_design_temperature: projectData?.electrical_design_temperature || "50",
    seismic_zone: projectData?.seismic_zone || "2",
  }
}

const ProjectInfo = ({ revision_id }: { revision_id: string }) => {
  const router = useRouter()
  const params = useParams()
  const project_id = params.project_id
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`
  const getProjectInfoUrl = `${PROJECT_INFO_API}/${project_id}`


  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: projectMetadata } = useGetData(getProjectMetadataUrl)
  const { data: projectInfo } = useGetData(getProjectInfoUrl)

  const [loading, setLoading] = useState(false)
  const [openDocumentList, setOpenDocumentList] = useState(false)
  const projectData = React.useMemo(() => ({ ...projectMetadata, ...projectInfo }), [projectMetadata, projectInfo])
  const {
    dropdown,
  } = useProjectInfoDropdowns()

  const { control, handleSubmit, reset, formState, watch, setValue } = useForm({
    resolver: zodResolver(ProjectInfoSchema),
    defaultValues: getDefaultValues(true, projectData),
    mode: "onSubmit",
  })

  const isControlSupplyVDC = watch("control_supply")
  const isUtilitySupplyVDC = watch("utility_supply")
  const getProjectPanelDataUrl = `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`

  const main_supply_mvControlled = watch("main_supply_mv")

  let { data: projectPanelData } = useGetData(getProjectPanelDataUrl)

  useEffect(() => {
    if (main_supply_mvControlled === "NA") {
      setValue("main_supply_mv_variation", "NA")
      setValue("main_supply_mv_phase", "NA")
    }
  }, [main_supply_mvControlled, setValue])

  useEffect(() => {
    if (isControlSupplyVDC?.endsWith("VDC")) {
      setValue("control_supply_phase", "NA")
      setValue("control_supply_variation", "NA")
    }
  }, [isControlSupplyVDC, setValue])

  useEffect(() => {
    if (isUtilitySupplyVDC?.endsWith("VDC")) {
      setValue("utility_supply_phase", "NA")
      setValue("utility_supply_variation", "NA")
    }
  }, [isControlSupplyVDC, isUtilitySupplyVDC, setValue])

  useEffect(() => {
    reset(getDefaultValues(true, projectData))
  }, [reset, projectData])

  // Helper function for handling errors
  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message.error(errorObj?.message)
    } catch (parseError) {
      // If parsing fails, use the raw error message
      message.error(error?.message || "An unknown error occurred")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof ProjectInfoSchema>> = async (data: any) => {
    setLoading(true)
    try {
      if (projectPanelData?.length === 0) {
        message.error("Please select a panel")
        return
      }
      await updateData(getProjectInfoUrl, false, data)
      message.success("Project information updated successfully!")
      // setModalLoading(true)
    } catch (error: any) {
      console.error("Error updating project information", error)
      handleError(error)
    } finally {
      setLoading(false)
      mutate(getProjectInfoUrl)
    }
  }

  // if (dropdown) {
  //   return (
  //     <div>
  //       <Skeleton active paragraph={{ rows: 8 }} />
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex font-semibold">
        <h2>{projectData?.project_oc_number}</h2>
        <h2> / {projectData?.project_name}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              name="project_name"
              control={control}
              label="Project Name"
              type="text"
              disabled
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="project_oc_number"
              control={control}
              label="Project OC NO."
              type="text"
              disabled
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              name="client_name"
              control={control}
              label="Client Name"
              type="text"
              disabled
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="project_location"
              control={control}
              label="Project Location"
              type="text"
              size="small"
            />
          </div>
        </div>
        <h1 className="font-bold">System Supply</h1>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv"
              control={control}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Volts</p>
                  <DownOutlined />
                </>
              }
              label="Main Supply [MV]"
              options={dropdown["Main Supply MV"] || []}
              size="small"
            />
          </div>

          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv_variation"
              control={control}
              label="Variation"
              options={dropdown["Voltage Variation"] || []}
              suffixIcon={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv_phase"
              control={control}
              label="Phase"
              options={dropdown["Main Supply Phase"] || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv"
              control={control}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Volts</p>
                  <DownOutlined />
                </>
              }
              label="Main Supply [LV]"
              options={dropdown["Main Supply LV"] || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv_variation"
              control={control}
              label="Variation"
              options={dropdown["Voltage Variation"]?.filter((item: any) => item.name !== "NA") || []}
              size="small"
              suffixIcon={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                  <DownOutlined />
                </>
              }
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv_phase"
              control={control}
              label="Phase"
              options={dropdown["Main Supply Phase"]?.filter((item: any) => item.name !== "NA") || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply"
              control={control}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Volts</p>
                  <DownOutlined />
                </>
              }
              label="Control Supply"
              options={dropdown["Control Supply"] || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply_variation"
              control={control}
              label="Variation"
              options={dropdown["Voltage Variation"] || []}
              size="small"
              disabled={watch("control_supply").endsWith("VDC")}
              suffixIcon={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                  <DownOutlined />
                </>
              }
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply_phase"
              control={control}
              label="Phase"
              options={dropdown["Control and Utility Supply Phase"] || []}
              disabled={watch("control_supply").endsWith("VDC")}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply"
              control={control}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Volts</p>
                  <DownOutlined />
                </>
              }
              label="Utility Supply"
              options={dropdown["Utility Supply"] || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply_variation"
              control={control}
              label="Variation"
              options={dropdown["Voltage Variation"] || []}
              disabled={watch("utility_supply").endsWith("VDC")}
              suffixIcon={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply_phase"
              control={control}
              label="Phase"
              options={dropdown["Control and Utility Supply Phase"] || []}
              disabled={watch("utility_supply").endsWith("VDC")}
              size="small"
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="frequency"
              control={control}
              label="Frequency"
              options={dropdown["Frequency"] || []}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Hz</p>
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="frequency_variation"
              control={control}
              label="Variation"
              options={dropdown["Frequency Variation"] || []}
              suffixIcon={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="fault_level"
              control={control}
              label="Fault Level"
              options={dropdown["Fault Level"] || []}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">kA</p>
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect name="sec" control={control} label="Sec" options={dropdown["Sec"] || []} size="small" />
          </div>
        </div>
        <div className="flex w-2/3 gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="ambient_temperature_max"
              control={control}
              label="Ambient Temperature [Max]"
              options={dropdown["Ambient Temperature Max"] || []}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Deg C</p>
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="ambient_temperature_min"
              control={control}
              label="Ambient Temperature [Min]"
              type="text"
              suffix={
                <>
                  <p className="text-xs font-semibold text-blue-400">Deg C</p>
                </>
              }
              size="small"
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              name="electrical_design_temperature"
              control={control}
              label="Electrical Design Temperature"
              options={dropdown["Electrical Design Temp"] || []}
              suffixIcon={
                <>
                  <p className="font-semibold text-blue-500">Deg C</p>
                  <DownOutlined />
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="seismic_zone"
              control={control}
              label="Seismic Zone"
              size="small"
            />
          </div>
        </div>


        {/* Humidity Part */}
        {/* <div className="text-sm font-semibold text-slate-00">Humidity</div> */}
        <div className="flex w-2/3 gap-4">
          <div className="w-1/2">
            <CustomTextInput
              name="min_humidity"
              control={control}
              label="Minimum Humidity"
              suffix={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                </>
              }
              size="small"
            />
          </div>
          <div className="w-1/2">
            <CustomTextInput
              name="max_humidity"
              control={control}
              label="Maximum Humidity"
              suffix={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                </>
              }
              size="small"
            />
          </div>
        </div>

        <div className="flex w-2/3 gap-4">
          <div className="w-1/2">
            <CustomTextInput
              name="avg_humidity"
              control={control}
              label="Average Humidity"
              suffix={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                </>
              }
              size="small"
            />
          </div>
          <div className="w-1/2">
            <CustomTextInput
              name="performance_humidity"
              control={control}
              label="Performance Humidity"
              suffix={
                <>
                  <PercentageOutlined style={{ color: "#3b82f6" }} />
                </>
              }
              size="small"
            />
          </div>
        </div>

        <div className="w-1/3">
          <div className="flex-1">
            <CustomTextInput
              name="altitude"
              control={control}
              label="Altitude"
              suffix={
                <>
                  <p className="text-xs text-blue-500">meter</p>
                </>
              }
              size="small"
            />
          </div>
        </div>

        <div className="w-2/3">
          <PanelDataList revision_id={revision_id} />
        </div>

        <div className="mt-4 flex items-end justify-end gap-2">
          <div className="">
            <Button type="primary" htmlType="button" disabled={!formState.isValid}>
              Go to SLD
            </Button>
          </div>
          <div className="">
            <Tooltip title="Save" placement="top">
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Tooltip>
          </div>
          <div className="">
            <Button type="primary" htmlType="button" onClick={() => setOpenDocumentList(true)}>
              Document List
            </Button>
          </div>
          <div className="">
            <Button type="primary" htmlType="button">
              Instrumental
            </Button>
          </div>
          <div className="">
            <Tooltip title="Save and Go to Design Basis" placement="top">
              <Button
                type="primary"
                htmlType="button"
                disabled={!formState.isValid}
                onClick={() => {
                  handleSubmit(onSubmit)
                  router.push(`/project/${params.project_id}/design-basis/document-revision`)
                }}
              >
                Electrical
              </Button>
            </Tooltip>
          </div>
        </div>
      </form>

      <DocumentListModal open={openDocumentList} setOpen={setOpenDocumentList} revision_id={revision_id} />
    </div>
  )
}

export default ProjectInfo
