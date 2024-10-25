"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message } from "antd"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import useMakeOfComponentDropdowns from "./MakeDropdowns"
import { useLoading } from "hooks/useLoading"
import { useGetData } from "hooks/useCRUD"
import { PROJECT_API } from "configs/api-endpoints"
import { mutate } from "swr"

// Define the option type
interface OptionType {
  value: string
  label: string
}

// Define the component prop type
interface MakeOfComponentProps {
  params: any
  handleSwitchTab: () => void
}

// Define the dropdown data structure
interface DropdownData {
  heading: string
  options: OptionType[]
}

// Define Zod schema for validation
const makeOfComponentSchema = zod.object({
  // selections: zod.array(zod.string().min(1, "Selection is required")).length(dropdownData.length),
  motors: zod.string({ required_error: "Motor is required", message: "Motor is required" }),
  cables: zod.string({ required_error: "Cables is required", message: "Cables is required" }),
  lv_switchgear: zod.string({ required_error: "LV Switchgear is required", message: "LV Switchgear is required" }),
  panel_enclosure: zod.string({
    required_error: "Panel Enclosure is required",
    message: "Panel Enclosure is required",
  }),
  vfd_vsd: zod.string({ required_error: "Frequency/Speed is required", message: "Frequency/Speed is required" }),
})

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    motors: projectData?.motors || "NA",
    cable: projectData?.cable || "Gemscab",
    lv_switchgear: projectData?.lv_switchgear || "Siemens",
    panel_enclosure: projectData?.panel_enclosure || "Thermax Approved Vendor",
    vfd_vsd: projectData?.vfd_vsd || "Danfoss",
    soft_starter: projectData?.soft_starter || "ABB",
    plc: projectData?.plc || "Siemens",
  }
}

const MakeOfComponent: React.FC<MakeOfComponentProps> = ({ params, handleSwitchTab }) => {
  const project_id = params.project_id
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`
  const getmakeOfComponentUrl = `${PROJECT_API}/${project_id}`

  const { data: projectMetadata } = useGetData(getProjectMetadataUrl, false)
  const { data: makeOfComponentInfo } = useGetData(getmakeOfComponentUrl, false)

  const projectData = React.useMemo(
    () => ({ ...projectMetadata, makeOfComponentInfo }),
    [projectMetadata, makeOfComponentInfo]
  )
  const [loading, setLoading] = useState(false)

  const {
    motorsMakeOptions,
    plcMakeOptions,
    soft_starterOptions,
    vfd_vsdOptions,
    panel_enclosureOptins,
    lv_switchgearOptions,
    cableMakeOptions,
  } = useMakeOfComponentDropdowns()
  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
  })

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(makeOfComponentSchema),
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

  const onSubmit: SubmitHandler<zod.infer<typeof makeOfComponentInfo>> = async (data: any) => {
    try {
      console.log(data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      mutate(getmakeOfComponentUrl)
    }
    // Call the switch tab handler after successful submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="font-semibold text-slate-700">Make of Components</h2>
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <CustomSingleSelect control={control} name="motors" label="Motors" options={motorsMakeOptions} size="small" />
        </div>
        <div className="flex-1">
          <CustomSingleSelect control={control} name="cable" label="Cables" options={cableMakeOptions} size="small" />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="lv_switchgear"
            label="LV Switchgear"
            options={lv_switchgearOptions}
            size="small"
          />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="panel_enclosure"
            label="Panel Enclosure"
            options={panel_enclosureOptins}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="vfd_vsd"
            label="Variable frequency/Speed drive (VFD/VSD)"
            options={vfd_vsdOptions}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="soft_starter"
            label="Soft Starter"
            options={soft_starterOptions}
            size="small"
          />
        </div>
      </div>
      <div className="w-1/3">
        <CustomSingleSelect control={control} name="plc" label="PLC" options={plcMakeOptions} size="small" />
      </div>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Save and Next
        </Button>
      </div>
    </form>
  )
}

export default MakeOfComponent
