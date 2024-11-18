import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message, Modal } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { createData, updateData } from "actions/crud-actions"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import { MAIN_PKG_API } from "configs/api-endpoints"
import { useCurrentUser } from "hooks/useCurrentUser"

const MainPackageSchema = zod.object({
  package_name: zod.string({ required_error: "Package name is required" }),
})

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    package_name: editMode ? values.package_name : null,
  }
}

export default function MainPackageModal({ open, setOpen, editMode, values, editEventTrigger, getPkgUrl }: any) {
  const userInfo = useCurrentUser()
  const [infoMessage, setInfoMessage] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, null))
    setInfoMessage("")
    setStatus("")
  }
  const { control, handleSubmit, reset } = useForm<zod.infer<typeof MainPackageSchema>>({
    resolver: zodResolver(MainPackageSchema),
    defaultValues: getDefaultValues(editMode, values),
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values, editEventTrigger])

  const handleError = (error: any) => {
    console.error(error)
    try {
      const errorObj = JSON.parse(error?.message) as any
      if ((errorObj.type = "DuplicateEntryError")) {
        message.error("Package name already exists")
        return
      } else {
        message.error(errorObj?.message)
      }
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof MainPackageSchema>> = async (data: any) => {
    setLoading(true)
    data["division_name"] = userInfo?.division
    try {
      if (editMode) {
        await updateData(`${MAIN_PKG_API}/${values.name}`, false, data)
        message.success("Main Package saved successfully")
      } else {
        await createData(MAIN_PKG_API, false, data)
        message.success("Main Package created successfully")
      }
    } catch (error: any) {
      handleError(error)
    } finally {
      mutate(getPkgUrl)
      handleCancel()
      setLoading(false)
    }
  }
  return (
    <Modal
      open={open}
      title={<h1 className="text-center">{`${editMode ? "Edit" : "Add"} Main Package`}</h1>}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
          <CustomTextInput name="package_name" control={control} label="Package Name" />
        </div>
        <AlertNotification message={infoMessage} status={status} />
        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
