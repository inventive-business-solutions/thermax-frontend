"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { MAKE_OF_COMPONENT_API } from "configs/api-endpoints"
import { HEATING } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import { useCurrentUser } from "hooks/useCurrentUser"
import { useLoading } from "hooks/useLoading"
import useMakeOfComponentDropdowns from "./MakeDropdowns"

// Define Zod schema for validation
const makeOfComponentSchema = zod.object({
  motor: zod.string({ required_error: "Motor is required", message: "Motor is required" }),
  cable: zod.string({ required_error: "Cables is required", message: "Cables is required" }),
  lv_switchgear: zod.string({ required_error: "LV Switchgear is required", message: "LV Switchgear is required" }),
  panel_enclosure: zod.string({
    required_error: "Panel Enclosure is required",
    message: "Panel Enclosure is required",
  }),
  variable_frequency_speed_drive_vfd_vsd: zod.string({
    required_error: "Frequency/Speed is required",
    message: "Frequency/Speed is required",
  }),
  soft_starter: zod.string({ required_error: "Soft Starter is required", message: "Soft Starter is required" }),
  plc: zod.string({ required_error: "PLC is required", message: "PLC is required" }),
})

const getDefaultValues = (data: any) => {
  return {
    motor: data?.motor || "NA",
    cable: data?.cable || "Gemscab",
    lv_switchgear: data?.lv_switchgear || "Siemens",
    panel_enclosure: data?.panel_enclosure || "Thermax Approved Vendor",
    variable_frequency_speed_drive_vfd_vsd: data?.variable_frequency_speed_drive_vfd_vsd || "Danfoss",
    soft_starter: data?.soft_starter || "ABB",
    plc: data?.plc || "Siemens",
  }
}

const MakeOfComponent = ({
  revision_id,
  setActiveKey,
}: {
  revision_id: string
  setActiveKey: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [loading, setLoading] = useState(false)
  const userInfo = useCurrentUser()

  const { data: makeOfComponent } = useGetData(
    `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  )

  const {
    motors_make_options,
    plc_make_options,
    soft_starter_options,
    vfd_vsd_options,
    panel_enclosure_options,
    lv_switchgear_options,
    cable_make_options,
  } = useMakeOfComponentDropdowns()
  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
  })

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(makeOfComponentSchema),
    defaultValues: getDefaultValues(makeOfComponent?.[0]),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(makeOfComponent?.[0]))
  }, [makeOfComponent, reset])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message.error(errorObj?.message)
    } catch (parseError) {
      message.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const makeOfComponentData = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      if (makeOfComponentData && makeOfComponentData.length > 0) {
        await updateData(`${MAKE_OF_COMPONENT_API}/${makeOfComponentData[0].name}`, false, data)
        message.success("Make of Component updated successfully")
      } else {
        data["revision_id"] = revision_id
        await createData(MAKE_OF_COMPONENT_API, false, data)
        message.success("Make of Component created successfully")
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      setActiveKey("Common Configuration")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="font-bold text-slate-700">Make of Components</h2>
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="motor"
            label="Motor"
            options={motors_make_options || []}
            size="small"
            disabled={userInfo?.division === HEATING}
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="cable"
            label="Cable"
            options={cable_make_options || []}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="lv_switchgear"
            label="LV Switchgear"
            options={lv_switchgear_options || []}
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
            options={panel_enclosure_options || []}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="variable_frequency_speed_drive_vfd_vsd"
            label="Variable frequency/Speed drive (VFD/VSD)"
            options={vfd_vsd_options || []}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="soft_starter"
            label="Soft Starter"
            options={soft_starter_options || []}
            size="small"
          />
        </div>
      </div>
      <div className="w-1/3">
        <CustomSingleSelect control={control} name="plc" label="PLC" options={plc_make_options || []} size="small" />
      </div>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" disabled={!formState.isValid} loading={loading}>
          Save and Next
        </Button>
      </div>
    </form>
  )
}

export default MakeOfComponent
