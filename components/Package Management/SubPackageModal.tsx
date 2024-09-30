import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import { useEffect, useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { createData, updateData } from "actions/crud-actions"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { AREA_CLASSIFICATION_URL, GET_PKG_URL, SUB_PKG_URL } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { createDropdownOptions } from "./package-management.logic"

const SubPackageSchema = zod.object({
  main_package_name: zod.string({ required_error: "Main package name is required!" }),
  package_name: zod.string({ required_error: "Package name is required!" }),
  classification_area: zod.string({ required_error: "Select classification area!" }),
})

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    main_package_name: editMode ? values?.main_package_name : values?.main_package_label,
    package_name: editMode ? values.package_name : null,
    classification_area: editMode ? values.classification_area : "Safe Area",
  }
}

export default function SubPackageModal({ open, setOpen, editMode, values, editEventTrigger }: any) {
  const { data: areaClassificationData } = useGetData(AREA_CLASSIFICATION_URL)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, values))
    setMessage("")
    setStatus("")
  }
  const { control, handleSubmit, formState, reset } = useForm<zod.infer<typeof SubPackageSchema>>({
    resolver: zodResolver(SubPackageSchema),
    defaultValues: getDefaultValues(editMode, values),
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values, editEventTrigger])

  const onSubmit: SubmitHandler<zod.infer<typeof SubPackageSchema>> = (data: any) => {
    console.log(data)
    console.log(values)

    startTransition(async () => {
      if (editMode) {
        try {
          await updateData(`${SUB_PKG_URL}/${values.name}`, data)
          setStatus("success")
          setMessage("Sub package updated successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      } else {
        data["main_package_name"] = values.name
        try {
          await createData(SUB_PKG_URL, data)
          setStatus("success")
          setMessage("Sub package created successfully")
        } catch (error: any) {
          setStatus("error")
          const errorObj = JSON.parse(error?.message) as any
          setMessage(errorObj?.message)
        }
      }
    })
    mutate(GET_PKG_URL)
  }
  return (
    <Modal
      open={open}
      title={<h1 className="text-center">{`${editMode ? "Edit" : "Add"} Sub Package`}</h1>}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {!editMode && (
          <div>
            <CustomTextInput name="main_package_name" control={control} label="Main Package Name" disabled />
          </div>
        )}

        <div>
          <CustomTextInput name="package_name" control={control} label="Sub Package Name" />
        </div>
        <div>
          <CustomSingleSelect
            name="classification_area"
            control={control}
            label="Classification Area"
            options={createDropdownOptions(areaClassificationData, "name")}
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
