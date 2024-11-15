import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message, Modal } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"
import { createData, getData, updateData } from "actions/crud-actions"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { AREA_CLASSIFICATION_API, GET_PKG_API, SUB_PKG_API } from "configs/api-endpoints"
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
  const { data: areaClassificationData } = useGetData(AREA_CLASSIFICATION_API)
  const [infoMessage, setInfoMessage] = useState("")
  const [status, setStatus] = useState("")

  const handleCancel = () => {
    setOpen(false)
    reset(getDefaultValues(false, values))
    setInfoMessage("")
    setStatus("")
  }
  const { control, handleSubmit, formState, reset } = useForm<zod.infer<typeof SubPackageSchema>>({
    resolver: zodResolver(SubPackageSchema),
    defaultValues: getDefaultValues(editMode, values),
  })

  useEffect(() => {
    reset(getDefaultValues(editMode, values))
  }, [editMode, reset, values, editEventTrigger])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message?.error(errorObj?.message)
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof SubPackageSchema>> = async (data: any) => {
    const subPkg = await getData(
      `${SUB_PKG_API}?filters=[["main_package_name","=","${data.main_package_name}"]]&fields=["package_name"]`
    )
    const subPkgNames = subPkg?.map((item: any) => item.package_name)

    try {
      if (editMode) {
        await updateData(`${SUB_PKG_API}/${values.name}`, false, data)
        message.success("Sub package updated successfully")
      } else {
        if (subPkgNames?.includes(data.package_name)) {
          message.error("Sub package name already exists for this main package")
        } else {
          await createData(SUB_PKG_API, false, data)
          message.success("Sub package created successfully")
        }
      }
    } catch (error: any) {
      handleError(error)
    } finally {
      mutate(GET_PKG_API)
      handleCancel()
    }
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
        <AlertNotification message={infoMessage} status={status} />
        <div className="text-end">
          <Button type="primary" htmlType="submit" disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
