"use client"

import { Modal } from "antd"
import S3BucketUpload from "components/FormInputs/S3BucketUpload"
import { S3FolderMapping } from "configs/constants"

interface UserInfo {
  division: keyof typeof S3FolderMapping
}

export const UploadProjectFilesModal = ({
  open,
  setOpen,
  values,
  userInfo,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  values: any
  userInfo: UserInfo
}) => {
  console.log("projectInfoRow", values)
  console.log("userInfo", userInfo)
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      title={<h1 className="text-center font-bold">Upload Project Files</h1>}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-700">Panel Specification</h4>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Panel Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-700">Motor Specification</h4>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Motor Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-700">LPBS Specification</h4>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/LPBS Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-700">Local Isolator Specification</h4>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.[
                "project_name"
              ]}/Local Isolator Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-700">Cable Specification</h4>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Cable Specification`}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
