import { DeleteOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Tooltip } from "antd"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

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
  project_name: zod.string(),
  project_OC_Number: zod.string(),
  client_name: zod.string(),
  project_location: zod.string(),
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
  panelSummary: zod.array(
    zod.object({
      panel_name: zod.string().optional(),
      panel_type: zod.string().optional(),
    })
  ),
})

type ProjectInfoFormData = zod.infer<typeof customValidationSchema>

interface ProjectInfoProps {
  isSaved: (tabKey: string) => void
  handleSave: () => void
  changeTab: (Tab: string) => void
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ isSaved, handleSave, changeTab }) => {
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

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(customValidationSchema),
    defaultValues: {
      project_name: "",
      project_OC_Number: "",
      client_name: "",
      project_location: "",
      systemSupply: sampleSystemSupply,
      panelSummary: panelArray,
    },
    mode: "onBlur",
  })

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
      <form onSubmit={handleSubmit(SubmitProjectInfo)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex flex-col justify-start gap-3 pe-5">
              <CustomTextInput name="project_name" control={control} label="Project Name" type="text" />
              <CustomTextInput name="client_name" control={control} label="Client Name" type="text" />
            </div>
          </div>
          <div className="flex flex-col justify-start gap-3 ps-5">
            <CustomTextInput name="project_OC_Number" control={control} label="Project OC NO." type="text" />
            <CustomTextInput name="project_location" control={control} label="Project Location" type="text" />
          </div>
          <div className="col-span-2">
            <div className="font-bold">System Supply</div>
            <div className="grid grid-cols-1 gap-3">
              {sampleSystemSupply.map((supply, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  {supply.type === "standard" ? (
                    <>
                      <CustomSingleSelect
                        name={`systemSupply.${index}.mainSupply`}
                        control={control}
                        suffixIcon={
                          <>
                            <div>Volts</div>
                            <DownOutlined />
                          </>
                        }
                        label="Main Supply"
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
                      <CustomSingleSelect
                        name={`systemSupply.${index}.variation`}
                        control={control}
                        label="Variation"
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
                      <CustomSingleSelect
                        name={`systemSupply.${index}.phase`}
                        control={control}
                        label="Phase"
                        options={[
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ]}
                      />
                    </>
                  ) : supply.type === "special" ? (
                    <>
                      <CustomSingleSelect
                        name={`systemSupply.${index}.equipmentType`}
                        control={control}
                        label="Equipment Type"
                        options={[
                          { value: "type1", label: "Type A" },
                          { value: "type2", label: "Type B" },
                          { value: "type3", label: "Type C" },
                        ]}
                      />
                      <CustomSingleSelect
                        name={`systemSupply.${index}.capacity`}
                        control={control}
                        label="Capacity"
                        options={[
                          { value: "capacity1", label: "100 kW" },
                          { value: "capacity2", label: "200 kW" },
                          { value: "capacity3", label: "300 kW" },
                        ]}
                      />
                    </>
                  ) : (
                    <>
                      <CustomSingleSelect
                        name={`systemSupply.${index}.customField1`}
                        control={control}
                        label="Custom Field 1"
                        options={[
                          { value: "custom1", label: "Custom Option A" },
                          { value: "custom2", label: "Custom Option B" },
                          { value: "custom3", label: "Custom Option C" },
                        ]}
                      />
                      <CustomSingleSelect
                        name={`systemSupply.${index}.customField2`}
                        control={control}
                        label="Custom Field 2"
                        options={[
                          { value: "custom1", label: "Custom Option A" },
                          { value: "custom2", label: "Custom Option B" },
                          { value: "custom3", label: "Custom Option C" },
                        ]}
                      />
                    </>
                  )}
                </div>
              ))}
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
                    <CustomSingleSelect
                      name={`panelSummary.${index}.panel_type`}
                      control={control}
                      label=""
                      options={[
                        { value: "Male1", label: "Male1" },
                        { value: "Male2", label: "Male2" },
                        { value: "Male3", label: "Male3" },
                        { value: "Male4", label: "Male4" },
                        { value: "Male", label: "Male" },
                        { value: "Male5", label: "Male5" },
                        { value: "Female1", label: "Female1" },
                        { value: "Female2", label: "Female2" },
                        { value: "Female3", label: "Female3" },
                        { value: "Female4", label: "Female4" },
                        { value: "Female5", label: "Female5" },
                        { value: "Female6", label: "Female6" },
                        { value: "Female", label: "Female" },
                      ]}
                      defaultValue={item.panel_type}
                      onChange={(value) => handlePanelChange(item.id, "panel_type", value)}
                    />
                  </div>
                  <Button type="primary" icon={<DeleteOutlined />} onClick={() => handlePanelRemove(item.id)} danger />
                </div>
              ))}
            </div>
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
