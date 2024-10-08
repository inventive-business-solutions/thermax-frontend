import { DeleteOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Tooltip } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import {
  AMBIENT_TEMP_MAX_API,
  CONTROL_SUPPLY_API,
  CONTROL_UTILITY_PHASE_API,
  ELECTRICAL_DESIGN_TEMP_API,
  FAULT_LEVEL_API,
  FREQUENCY_API,
  FREQUENCY_VARIATION_API,
  MAIN_SUPPLY_LV_API,
  MAIN_SUPPLY_MV_API,
  MAIN_SUPPLY_PHASE_API,
  PANEL_TYPE_API,
  PROJECT_API,
  SEC_API,
  SEISMIC_ZONE_API,
  UTILITY_SUPPLY_API,
  VOLTAGE_VARIATION_API,
} from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useGetData } from "hooks/useCRUD"
import useProjectInfoDropdowns from "./ProjectInfoDropdowns"

const sampleSystemSupply = [
  {
    type: "standard",
    mainSupply: "",
    variation: "",
    phase: "",
  },
  {
    type: "standard",
    mainSupply: "",
    variation: "",
    phase: "",
  },
  {
    type: "standard",
    mainSupply: "",
    variation: "",
    phase: "",
  },
  {
    type: "special",
    equipmentType: "", // Different dropdown for this element
    capacity: "", // Another different dropdown
  },
  {
    type: "special",
    equipmentType: "", // Different dropdown for this element
    capacity: "", // Another different dropdown
  },
  {
    type: "special",
    equipmentType: "", // Different dropdown for this element
    capacity: "", // Another different dropdown
  },
  {
    type: "custom",
    customField1: "", // Custom field for this element
    customField2: "", // Another custom field
  },
]

const customValidationSchema = zod.object({
  project_name: zod.string({ required_error: "Project name is required", message: "Project name is required" }),
  project_oc_number: zod.string({
    required_error: "Project OC number is required",
    message: "Project OC number is required",
  }),
  client_name: zod.string({ required_error: "Client name is required", message: "Client name is required" }),
  project_location: zod.string().optional(),
  systemSupply: zod.array(
    zod.object({
      mainSupply: zod.string().optional(),
      variation: zod.string().optional(),
      phase: zod.string().optional(),
      equipmentType: zod.string().optional(),
      capacity: zod.string().optional(),
      customField1: zod.string().optional(),
      customField2: zod.string().optional(),
    })
  ),
  panel_type: zod.string().optional(),
})

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    project_name: editMode ? values?.project_name : null,
    project_oc_number: editMode ? values?.project_oc_number : null,
    client_name: editMode ? values?.client_name : null,
    name_initial: editMode ? values?.name_initial : null,
    digital_signature: editMode ? (!values?.digital_signature ? [] : [values?.digital_signature]) : [],
  }
}

type ProjectInfoFormData = zod.infer<typeof customValidationSchema>

interface ProjectInfoProps {
  isSaved: (tabKey: string) => void
  handleSave: () => void
  changeTab: (Tab: string) => void
  params: { project_id: string }
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ isSaved, handleSave, changeTab, params }) => {
  const { data: projectData } = useGetData(`${PROJECT_API}/${params.project_id}`, false)
  const {
    panelTypeOptions,
    mainSupplyMVOptions,
    voltageVariationOptions,
    frequencyVariationOptions,
    mainSupplyLVOptions,
    mainSupplyPhaseOptions,
    controlUtilityPhaseOptions,
    controlSupplyOptions,
    utilitySupplyOptions,
    frequencyOptions,
    ambientTempMaxOptions,
    faultLevelOptions,
    secOptions,
    electricalDesignTempOptions,
    seismicZoneOptions,
  } = useProjectInfoDropdowns()

  const [panelArray, setPanelArray] = useState([
    {
      id: 1,
      panel_name: "MCC",
      panel_type: "LT-MCC",
    },
    {
      id: 2,
      panel_name: "PCC",
      panel_type: "LT-PCC",
    },
    {
      id: 3,
      panel_name: "MCC cum PCC",
      panel_type: "LT-PLC",
    },
  ])

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: zodResolver(customValidationSchema),
    defaultValues: getDefaultValues(true, projectData),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(true, projectData))
  }, [reset, projectData])

  const SubmitProjectInfo = (data: ProjectInfoFormData) => {
    isSaved("1")
    handleSave()
  }

  const handleAddPanel = () => {
    setPanelArray((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        panel_name: "",
        panel_type: "",
      },
    ])
    setValue("panelSummary", panelArray)
  }

  const handlePanelRemove = (id: number) => {
    const newArray = panelArray.filter((panel) => panel.id !== id)
    setPanelArray(newArray)
    setValue("panelSummary", newArray)
  }

  const handlePanelChange = (id: number, field: string, value: string) => {
    const updatedArray = panelArray.map((panel) => (panel.id === id ? { ...panel, [field]: value } : panel))
    setPanelArray(updatedArray)
    setValue("panelSummary", updatedArray)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold underline">PROJECT INFORMATION TAB</div>
      <form onSubmit={handleSubmit(SubmitProjectInfo)} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomTextInput name="project_name" control={control} label="Project Name" type="text" disabled />
          </div>
          <div className="flex-1">
            <CustomTextInput name="project_oc_number" control={control} label="Project OC NO." type="text" disabled />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomTextInput name="client_name" control={control} label="Client Name" type="text" disabled />
          </div>
          <div className="flex-1">
            <CustomTextInput name="project_location" control={control} label="Project Location" type="text" />
          </div>
        </div>
        <h1 className="font-bold">System Supply</h1>
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv"
              control={control}
              suffixIcon={
                <>
                  <p>Volts</p>
                  <DownOutlined />
                </>
              }
              label="Main Supply [MV]"
              options={mainSupplyMVOptions}
            />
          </div>

          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv_variation"
              control={control}
              label="Variation"
              options={voltageVariationOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_mv_phase"
              control={control}
              label="Phase"
              options={mainSupplyPhaseOptions}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv"
              control={control}
              suffixIcon={
                <>
                  <p>Volts</p>
                  <DownOutlined />
                </>
              }
              label="Main Supply [LV]"
              options={mainSupplyLVOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv_variation"
              control={control}
              label="Variation"
              options={voltageVariationOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="main_supply_lv_phase"
              control={control}
              label="Phase"
              options={mainSupplyPhaseOptions}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply"
              control={control}
              suffixIcon={
                <>
                  <p>Volts</p>
                  <DownOutlined />
                </>
              }
              label="Control Supply"
              options={controlSupplyOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply_variation"
              control={control}
              label="Variation"
              options={voltageVariationOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="control_supply_phase"
              control={control}
              label="Phase"
              options={controlUtilityPhaseOptions}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply"
              control={control}
              suffixIcon={
                <>
                  <p>Volts</p>
                  <DownOutlined />
                </>
              }
              label="Utility Supply"
              options={utilitySupplyOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply_variation"
              control={control}
              label="Variation"
              options={voltageVariationOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="utility_supply_phase"
              control={control}
              label="Phase"
              options={controlUtilityPhaseOptions}
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-2">
          <div className="flex-1">
            <CustomSingleSelect name="frequency" control={control} label="Frequency" options={frequencyOptions} />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="frequency_variation"
              control={control}
              label="Variation"
              options={frequencyVariationOptions}
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-2">
          <div className="flex-1">
            <CustomSingleSelect name="fault_level" control={control} label="Fault Level" options={faultLevelOptions} />
          </div>
          <div className="flex-1">
            <CustomSingleSelect name="sec" control={control} label="Sec" options={secOptions} />
          </div>
        </div>
        <div className="flex w-2/3 gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="ambient_temperature_max"
              control={control}
              label="Ambient Temperature [Max]"
              options={ambientTempMaxOptions}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput name="ambient_temperature_min" control={control} label="Ambient Temperature [Min]" />
          </div>
        </div>
        <div className="flex w-2/3 gap-2">
          <div className="flex-1">
            <CustomSingleSelect
              name="electrical_design_temperature"
              control={control}
              label="Electrical Design Temperature"
              options={electricalDesignTempOptions}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="seismic_zone"
              control={control}
              label="Seismic Zone"
              options={seismicZoneOptions}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-bold">Panel Summary</div>
          <div className="flex items-center justify-start gap-4">
            <div>Number of Panels: {panelArray.length}</div>
            <Button type="primary" iconPosition="start" onClick={handleAddPanel} icon={<PlusOutlined />}>
              Add Panel
            </Button>
          </div>
        </div>

        <div className="col-span-2  me-4 min-h-[200px] overflow-y-scroll">
          <div className="flex w-full flex-col justify-start gap-3">
            {panelArray.map((item, index) => (
              <div key={index} className="mt-3 grid grid-cols-9 gap-4">
                <div>{index + 1}</div>
                <div className="col-span-2">
                  <CustomTextInput
                    name={`panelSummary.${index}.panel_name`}
                    label=""
                    type="text"
                    control={control}
                    defaultValue={item.panel_name}
                    onChange={(e) => handlePanelChange(item.id, "panel_name", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <CustomSingleSelect name="panel_type" control={control} label="" options={panelTypeOptions} />
                </div>
                <Button type="primary" icon={<DeleteOutlined />} onClick={() => handlePanelRemove(item.id)} danger />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-row items-end justify-end gap-2">
          <Button type="primary">Go to SLD</Button>
          <Tooltip title="Save" placement="top">
            <Button type="primary" onClick={handleSubmit(SubmitProjectInfo)}>
              Save
            </Button>
          </Tooltip>
          <Button type="primary">Document List</Button>
          <Button type="primary">Instrumental</Button>
          <Tooltip title="Save and go to Design Basis" placement="top">
            <Button
              type="primary"
              onClick={async () => {
                try {
                  isSaved("1")
                  handleSave()
                  changeTab("2")
                } catch (error) {
                  console.error("Error during submission:", error)
                  // Optionally, handle the error (e.g., show a notification or alert)
                }
              }}
            >
              Electrical
            </Button>
          </Tooltip>
        </div>
      </form>
    </div>
  )
}

export default ProjectInfo
