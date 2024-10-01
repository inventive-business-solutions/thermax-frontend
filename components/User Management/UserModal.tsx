"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import { useEffect, useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { createData, updateData } from "actions/crud-actions"
import CustomUpload from "components/FormInputs/CustomUpload"
import { getUsersUrl, USER_URL } from "configs/api-endpoints"
import AlertNotification from "../AlertNotification"
import CustomTextInput from "../FormInputs/CustomInput"
import { uploadFile } from "actions/file-upload"

const UserFormValidationSchema = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  email: zod.string().optional(),
  name_initial: zod.string().optional(),
  digital_signature: zod.any().optional(),
})

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    first_name: editMode ? values?.first_name : null,
    last_name: editMode ? values?.last_name : null,
    email: editMode ? values?.email : null,
    name_initial: editMode ? values?.name_initial : null,
    digital_signature: editMode ? values?.digital_signature : null,
  }
}

export default function UserFormModal({ open, setOpen, editMode, values }: any) {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [isPending, startTransition] = useTransition()

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(UserFormValidationSchema),
    defaultValues: getDefaultValues(editMode, values),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values])

  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, values))
    setMessage("")
    setStatus("")
  }

  const onSubmit: SubmitHandler<zod.infer<typeof UserFormValidationSchema>> = (data: any) => {
    startTransition(async () => {
      if (editMode) {
        try {
          await updateData(`${USER_URL}/${values.name}`, data)
          setStatus("success")
          setMessage("User information updated successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      } else {
        try {
          await createData(USER_URL, { ...data, send_welcome_email: 0 })
          setStatus("success")
          setMessage("New project created successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      }
    })
    mutate(getUsersUrl)
  }

  return (
    <Modal
      open={open}
      title={<h1 className="text-center font-bold">{`${editMode ? "Edit" : "Add New"} User`}</h1>}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomTextInput name="first_name" control={control} label="First Name" type="text" />
          </div>
          <div className="flex-1">
            <CustomTextInput name="last_name" control={control} label="Last Name" type="text" />
          </div>
        </div>
        <div className="flex-1">
          <CustomTextInput name="email" control={control} label="Email" type="email" disabled={editMode} />
        </div>
        <div className="flex-1">
          <CustomTextInput name="name_initial" control={control} label="Initials" type="text" />
        </div>
        <div>
          <CustomUpload
            name="digital_signature"
            control={control}
            uploadButtonLabel="Digital Signature"
            accept="image/*"
          />
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
