import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import { useEffect, useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { createData, updateData } from "actions/crud-actions"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import { GET_PKG_API, MAIN_PKG_API } from "configs/api-endpoints"

const MainPackageSchema = zod.object({
  package_name: zod.string({ required_error: "Package name is required" }),
})

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    package_name: editMode ? values.package_name : null,
  }
}

export default function MainPackageModal({ open, setOpen, editMode, values, editEventTrigger }: any) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, null))
    setMessage("")
    setStatus("")
  }
  const { control, handleSubmit, formState, reset } = useForm<zod.infer<typeof MainPackageSchema>>({
    resolver: zodResolver(MainPackageSchema),
    defaultValues: getDefaultValues(editMode, values),
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values, editEventTrigger])

  const onSubmit: SubmitHandler<zod.infer<typeof MainPackageSchema>> = (data: any) => {
    startTransition(async () => {
      if (editMode) {
        try {
          await updateData(`${MAIN_PKG_API}/${values.name}`, data)
          // await updateMainPackage(MAIN_PKG_URL, values.name, data)
          setStatus("success")
          setMessage("Main package updated successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      } else {
        try {
          await createData(MAIN_PKG_API, data)
          setStatus("success")
          setMessage("Main package created successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      }
    })
    mutate(GET_PKG_API)
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
        <AlertNotification message={message} status={status} />
        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={isPending} disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
