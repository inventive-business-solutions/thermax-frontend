import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import { MAIN_PKG_URL } from "configs/api-endpoints"
import { useCreateData } from "hooks/useCRUD"
import { useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import * as zod from "zod"

const AddPackageSchema = zod.object({
  package_name: zod.string({ required_error: "Package name is required" }),
})

export default function AddPackageModal({ open, setOpen }: any) {
  const [isPending, startTransition] = useTransition()
  const { create: createMainPackage, error: createMainPackageError } = useCreateData(MAIN_PKG_URL)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const handleCancel = () => {
    setOpen(false)
  }
  const { control, handleSubmit, formState } = useForm<zod.infer<typeof AddPackageSchema>>({
    resolver: zodResolver(AddPackageSchema),
  })

  const onSubmit: SubmitHandler<zod.infer<typeof AddPackageSchema>> = (data: any) => {
    startTransition(async () => {
      await createMainPackage(data)
      if (createMainPackageError) {
        setMessage(createMainPackageError.message)
        setStatus("error")
      }
    })
  }
  return (
    <Modal open={open} title={<h1 className="text-center">Add Main Package</h1>} onCancel={handleCancel} footer={null}>
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
