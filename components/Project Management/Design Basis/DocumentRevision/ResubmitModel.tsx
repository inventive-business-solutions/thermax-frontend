"use client"

import { SendOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { createData, getData, updateData } from "actions/crud-actions"
import { Button, message, Modal } from "antd"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import CustomUpload from "components/FormInputs/CustomUpload"
import { uploadFile } from "components/FormInputs/FileUpload"
import { DESIGN_BASIS_REVISION_HISTORY_API, REVIEW_RESUBMISSION_EMAIL_API } from "configs/api-endpoints"
import { DB_REVISION_STATUS } from "configs/constants"
import { useParams } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { mutate } from "swr"
import * as zod from "zod"

export default function ResubmitModel({
  open,
  setOpen,
  projectData,
  dbRevisionHistoryUrl,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  projectData: any
  dbRevisionHistoryUrl: string
}) {
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(
      zod.object({
        feedback_description: zod.string({
          required_error: "Feedback is required",
          message: "Feedback is required",
        }),
        email_attachment: zod.any().optional(),
      })
    ),
    defaultValues: {
      feedback_description: null,
      email_attachment: [],
    },
    mode: "onSubmit",
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true)
    console.log(data)
    try {
      const revisionData = await getData(
        `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectData.name}"], ["status", "=", "${DB_REVISION_STATUS.Submitted}"]]&fields=["*"]`
      )
      const revision_id = revisionData[0].name
      await updateData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revision_id}`, false, {
        status: DB_REVISION_STATUS.Resubmitted,
      })
      const email_attachment = data.email_attachment
      let attachment_url = ""
      if (email_attachment.length > 0) {
        const { data } = await uploadFile(email_attachment[0] as File)
        attachment_url = data.file_url
        console.log(attachment_url)
      }
      await createData(REVIEW_RESUBMISSION_EMAIL_API, false, {
        approver_email: projectData?.approver,
        project_owner_email: projectData?.owner,
        project_oc_number: projectData?.project_oc_number,
        project_name: projectData?.project_name,
        feedback_description: data.feedback_description,
        subject: `Design Basis Approval - EnIMAX - ${projectData?.project_oc_number}`,
        attachments: [{ file_url: attachment_url }],
      })
      mutate(dbRevisionHistoryUrl)
      setOpen(false)
      message.success("Review submission email sent")
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  return (
    <Modal
      open={open}
      title={<h1 className="text-center font-bold">Feedback</h1>}
      onCancel={() => setOpen(false)}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex-1">
          <CustomTextAreaInput
            name="feedback_description"
            control={control}
            label="Description"
            placeholder="Feedback comments..."
          />
        </div>

        <div className="">
          <CustomUpload name="email_attachment" control={control} uploadButtonLabel="Attachment" accept="*" />
        </div>

        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
            Send
          </Button>
        </div>
      </form>
    </Modal>
  )
}
