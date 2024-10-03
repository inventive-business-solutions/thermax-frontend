"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import { createData, updateData } from "actions/crud-actions"
import CustomUpload from "components/FormInputs/CustomUpload"
import { getUsersUrl, USER_URL } from "configs/api-endpoints"
import AlertNotification from "../AlertNotification"
import CustomTextInput from "../FormInputs/CustomInput"
import { uploadFile } from "components/FileUpload"
import Image from "next/image"
import { mutate } from "swr"
import { List } from "lodash"

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
    digital_signature: editMode ? (values?.digital_signature === "" ? [] : [values?.digital_signature]) : [],
  }
}

export default function UserFormModal({ open, setOpen, editMode, values, editEventTrigger }: any) {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(UserFormValidationSchema),
    defaultValues: getDefaultValues(editMode, values),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values, editEventTrigger])

  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, values))
    setMessage("")
    setStatus("")
  }

  const onSubmit: SubmitHandler<zod.infer<typeof UserFormValidationSchema>> = async (data: any) => {
    setLoading(true)
    console.log(data)
    try {
      if (editMode) {
        await handleEditUser(data)
      } else {
        await handleCreateUser(data)
      }
    } catch (error: any) {
      handleError(error)
    } finally {
      mutate(getUsersUrl)
      setLoading(false)
    }
  }

  // Helper function for updating user
  const handleEditUser = async (userData: any) => {
    const dg_sign_file = userData?.digital_signature
    console.log(userData)
    try {
      if (typeof dg_sign_file === "string" && dg_sign_file.startsWith("/files/")) {
        userData["digital_signature"] = dg_sign_file
      } else {
        const { data } = await uploadFile(dg_sign_file[0] as File)
        userData["digital_signature"] = data.file_url
      }

      await updateData(`${USER_URL}/${values.name}`, userData)
      setStatus("success")
      setMessage("User information updated successfully")
    } catch (error: any) {
      throw error
    }
  }

  // Helper function for creating user
  const handleCreateUser = async (userData: any) => {
    const dg_sign_file = userData?.digital_signature
    try {
      if (Array.isArray(dg_sign_file)) {
        userData["digital_signature"] = ""
      } else {
        const { data } = await uploadFile(dg_sign_file as File)
        userData["digital_signature"] = data.file_url
      }
      await createData(USER_URL, { ...userData, send_welcome_email: 0 })
      setStatus("success")
      setMessage("New project created successfully")
    } catch (error: any) {
      throw error
    }
  }

  // Helper function for handling errors
  const handleError = (error: any) => {
    setStatus("error")
    try {
      const errorObj = JSON.parse(error?.message) as any
      console.log(errorObj)
      setMessage(errorObj?.message)
    } catch (parseError) {
      // If parsing fails, use the raw error message
      setMessage(error?.message || "An unknown error occurred")
    }
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
        <div className="flex gap-4">
          <div className="">
            <CustomUpload
              name="digital_signature"
              control={control}
              uploadButtonLabel="Digital Signature"
              accept="image/*"
            />
          </div>
          <div>
            {values?.digital_signature && (
              <Image
                src={`${process.env.NEXT_PUBLIC_FRAPPE_DOMAIN_NAME}${values?.digital_signature}`}
                width={100}
                height={100}
                alt="Digital Signature"
              />
            )}
          </div>
        </div>

        <AlertNotification message={message} status={status} />
        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={loading} disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
