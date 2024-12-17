"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { getData, updateData } from "actions/crud-actions"
import { MAKE_OF_COMPONENT_API } from "configs/api-endpoints"
import { HEATING } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import { useCurrentUser } from "hooks/useCurrentUser"
import { useLoading } from "hooks/useLoading"
import useMakeOfComponentDropdowns from "./MakeDropdowns"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomMultiSelect from "components/FormInputs/CustomMultiSelect"

// Define Zod schema for validation
const makeOfComponentSchema = zod.object({
  gland_make: zod.array(zod.string(), { required_error: "Gland Make is required", message: "Gland Make is required" }),
  preferred_gland_make: zod.string({ required_error: "Preferred Gland Make is required", message: "Preferred Gland Make is required" }),
  motor: zod.array(zod.string(), { required_error: "Motor is required", message: "Motor is required" }),
  preferred_motor: zod.string({
    required_error: "Preferred Motor is required",
    message: "Preferred Motor is required",
  }),
  cable: zod.array(zod.string(), { required_error: "Cable is required", message: "Cable is required" }),
  preferred_cable: zod.string({
    required_error: "Preferred Cable is required",
    message: "Preferred Cable is required",
  }),
  lv_switchgear: zod.array(zod.string(), {
    required_error: "LV Switchgear is required",
    message: "LV Switchgear is required",
  }),
  preferred_lv_switchgear: zod.string({
    required_error: "Preferred LV Switchgear is required",
    message: "Preferred LV Switchgear is required",
  }),
  panel_enclosure: zod.array(zod.string(), {
    required_error: "Panel Enclosure is required",
    message: "Panel Enclosure is required",
  }),
  preferred_panel_enclosure: zod.string({
    required_error: "Preferred Panel Enclosure is required",
    message: "Preferred Panel Enclosure is required",
  }),
  variable_frequency_speed_drive_vfd_vsd: zod.array(zod.string(), {
    required_error: "Variable Frequency/Speed Drive (VFD/VSD) is required",
    message: "Variable Frequency/Speed Drive (VFD/VSD) is required",
  }),
  preferred_vfdvsd: zod.string({
    required_error: "Preferred VFD/VSD is required",
    message: "Preferred VFD/VSD is required",
  }),
  soft_starter: zod.array(zod.string(), {
    required_error: "Soft Starter is required",
    message: "Soft Starter is required",
  }),
  preferred_soft_starter: zod.string({
    required_error: "Preferred Soft Starter is required",
    message: "Preferred Soft Starter is required",
  }),
  plc: zod.array(zod.string(), { required_error: "PLC is required", message: "PLC is required" }),
  preferred_plc: zod.string({
    required_error: "Preferred PLC is required",
    message: "Preferred PLC is required",
  }),
})

const parseToArray = (value: any) => {
  try {
    return Array.isArray(value) ? value : JSON.parse(value)
  } catch (e) {
    // If parsing fails, return the value wrapped in an array
    return Array.isArray(value) ? value : [value]
  }
}

const getDefaultValues = (data: any) => {
  return {
    gland_make: parseToArray(data?.gland_make || "Comet"),
    preferred_gland_make: data?.preferred_gland_make || "NA",
    motor: parseToArray(data?.motor || "NA"),
    preferred_motor: data?.preferred_motor || "NA",
    cable: parseToArray(data?.cable || "Gemscab"),
    preferred_cable: data?.preferred_cable || "Gemscab",
    lv_switchgear: parseToArray(data?.lv_switchgear || "Siemens"),
    preferred_lv_switchgear: data?.preferred_lv_switchgear || "Siemens",
    panel_enclosure: parseToArray(data?.panel_enclosure || "Thermax Approved Vendor"),
    preferred_panel_enclosure: data?.preferred_panel_enclosure || "Thermax Approved Vendor",
    variable_frequency_speed_drive_vfd_vsd: parseToArray(data?.variable_frequency_speed_drive_vfd_vsd || "Danfoss"),
    preferred_vfdvsd: data?.preferred_vfdvsd || "Danfoss",
    soft_starter: parseToArray(data?.soft_starter || "ABB"),
    preferred_soft_starter: data?.preferred_soft_starter || "ABB",
    plc: parseToArray(data?.plc || "Siemens"),
    preferred_plc: data?.preferred_plc || "Siemens",
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
    gland_make_options,
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

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: zodResolver(makeOfComponentSchema),
    defaultValues: getDefaultValues(makeOfComponent?.[0]),
    mode: "onSubmit",
  })

  const gland_make = watch("gland_make") as string[]
  const motor = watch("motor") as string[]
  const cable = watch("cable") as string[]
  const lv_switchgear = watch("lv_switchgear") as string[]
  const panel_enclosure = watch("panel_enclosure") as string[]
  const vfd_vsd = watch("variable_frequency_speed_drive_vfd_vsd") as string[]
  const soft_starter = watch("soft_starter") as string[]
  const plc = watch("plc") as string[]

  useEffect(() => {
    setValue("preferred_gland_make", gland_make[0])
    setValue("preferred_motor", motor[0])
    setValue("preferred_cable", cable[0])
    setValue("preferred_lv_switchgear", lv_switchgear[0])
    setValue("preferred_panel_enclosure", panel_enclosure[0])
    setValue("preferred_vfdvsd", vfd_vsd[0])
    setValue("preferred_soft_starter", soft_starter[0])
    setValue("preferred_plc", plc[0])
  }, [gland_make, cable, lv_switchgear, motor, panel_enclosure, plc, setValue, soft_starter, vfd_vsd])

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
    const fieldsToStringify = [
      "gland_make",
      "motor",
      "cable",
      "lv_switchgear",
      "panel_enclosure",
      "variable_frequency_speed_drive_vfd_vsd",
      "soft_starter",
      "plc",
    ]

    const transformedData = { ...data }

    fieldsToStringify.forEach((field) => {
      if (Array.isArray(transformedData[field])) {
        transformedData[field] = JSON.stringify(transformedData[field])
      }
    })
    try {
      const makeOfComponentData = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )
      if (makeOfComponentData && makeOfComponentData.length > 0) {
        await updateData(`${MAKE_OF_COMPONENT_API}/${makeOfComponentData[0].name}`, false, transformedData)
        message.success("Make of Component Saved Successfully")
      } else {
        message.error("Make of Component not found for this revision")
      }
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      setActiveKey("Common Configuration")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4">
      <Divider className="flex items-center justify-center">
        <h2 className="font-bold text-slate-700">Make of Components</h2>
      </Divider>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="motor"
              label="Motor"
              options={motors_make_options || []}
              size="small"
              disabled={userInfo?.division === HEATING}
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput
              control={control}
              name="preferred_motor"
              label="Preferred Motor"
              size="small"
              readOnly
              disabled={userInfo?.division === HEATING}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="cable"
              label="Cable"
              options={cable_make_options || []}
              size="small"
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput control={control} name="preferred_cable" readOnly label="Preferred Cable" size="small" />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="lv_switchgear"
              label="LV Switchgear"
              options={lv_switchgear_options || []}
              size="small"
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput
              control={control}
              name="preferred_lv_switchgear"
              label="Preferred LV Switchgear"
              readOnly
              size="small"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="panel_enclosure"
              label="Panel Enclosure"
              options={panel_enclosure_options || []}
              size="small"
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput
              control={control}
              name="preferred_panel_enclosure"
              label="Preferred Panel Enclosure"
              readOnly
              size="small"
            />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="variable_frequency_speed_drive_vfd_vsd"
              label="Variable Frequency/Speed Drive (VFD/VSD)"
              options={vfd_vsd_options || []}
              size="small"
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput
              control={control}
              name="preferred_vfdvsd"
              label="Preferred VFD/VSD"
              readOnly
              size="small"
            />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="w-4/5">
            <CustomMultiSelect
              control={control}
              name="soft_starter"
              label="Soft Starter"
              options={soft_starter_options || []}
              size="small"
            />
          </div>
          <div className="w-1/5">
            <CustomTextInput
              control={control}
              name="preferred_soft_starter"
              label="Preferred Soft Starter"
              readOnly
              size="small"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-4">
        <div className="w-4/5">
          <CustomMultiSelect control={control} name="plc" label="PLC" options={plc_make_options || []} size="small" />
        </div>
        <div className="w-1/5">
          <CustomTextInput control={control} name="preferred_plc" readOnly label="Preferred PLC" size="small" />
        </div>
      </div>
      <div className="flex flex-1 items-center gap-4">
        <div className="w-4/5">
          <CustomMultiSelect control={control} name="gland_make" label="Gland Make" options={gland_make_options || []} size="small" />
        </div>
        <div className="w-1/5">
          <CustomTextInput control={control} name="preferred_gland_make" readOnly label="Preferred Gland Make" size="small" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Save and Next
        </Button>
      </div>
    </form>
  )
}

export default MakeOfComponent
