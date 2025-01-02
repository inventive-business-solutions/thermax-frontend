import { CopyOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { copyDesignBasisRevision } from "actions/design-basis_revision"
import { Button, message, Modal } from "antd"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { THERMAX_USER_API } from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"

export default function CopyRevisionModel({
  open,
  setOpen,
  userInfo,
  projectData,
  revision_id,
  dbRevisionHistoryUrl,
  setCopyRevisionId,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  userInfo: any
  projectData: any
  revision_id: string
  dbRevisionHistoryUrl: string
  setCopyRevisionId: (revision_id: string) => void
}) {
  const { name: project_id, approver: defaultApprover } = projectData || {}
  console.log(userInfo, projectData)
  const [loading, setLoading] = useState(false)
  const { dropdownOptions: approverOptions } = useDropdownOptions(
    `${THERMAX_USER_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"], ["email", "!=", "${userInfo?.email}"]]`,
    "name"
  )
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(
      zod.object({
        clone_notes: zod.string().optional(),
        approver_email: zod.string({ required_error: "Approver is required", message: "Approver is required" }),
      })
    ),
    defaultValues: {
      clone_notes: "",
      approver_email: defaultApprover,
    },
    mode: "onSubmit",
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true)
    try {
      // API call
      const { clone_notes, approver_email } = data
      await copyDesignBasisRevision(project_id, revision_id, clone_notes, approver_email)
      mutate(dbRevisionHistoryUrl)
      message.success("Design Basis revision is released and locked")
      setOpen(false)
    } catch (error) {
      message.error("Failed to clone revision data")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      open={open}
      title={<h1 className="text-center font-bold">Clone Revision</h1>}
      onCancel={() => {
        setCopyRevisionId("")
        reset({
          clone_notes: "",
          approver_email: defaultApprover,
        })
        setOpen(false)
      }}
      footer={null}
    >
      <form
        onSubmit={(event) => {
          event.stopPropagation()
          handleSubmit(onSubmit)(event)
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex-1">
          <CustomTextAreaInput name="clone_notes" control={control} label="Clone Notes" placeholder="Clone Notes..." />
        </div>
        <div>
          <CustomSingleSelect name="approver_email" control={control} label="Approver" options={approverOptions} />
        </div>

        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={loading} icon={<CopyOutlined />}>
            Clone Revision
          </Button>
        </div>
      </form>
    </Modal>
  )
}
