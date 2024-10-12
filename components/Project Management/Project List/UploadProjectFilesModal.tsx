"use client"

import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons"
import { Modal } from "antd"
import { useEffect, useState } from "react"
import { getBucketObjects } from "actions/aws/s3-actions"
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
  const [fileExist, setFileExist] = useState({
    panelSpec: false,
    motorSpec: false,
    lpbsSpec: false,
    localIsolatorSpec: false,
    cableSpec: false,
  })
  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    const checkFileExist = async () => {
      const panelSpec = await getBucketObjects(
        `${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Panel Specification`
      )
      const motorSpec = await getBucketObjects(
        `${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Motor Specification`
      )
      const lpbsSpec = await getBucketObjects(
        `${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/LPBS Specification`
      )
      const localIsolatorSpec = await getBucketObjects(
        `${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Local Isolator Specification`
      )
      const cableSpec = await getBucketObjects(
        `${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Cable Specification`
      )
      setFileExist({
        panelSpec: panelSpec ? panelSpec?.length > 0 : false,
        motorSpec: motorSpec ? motorSpec?.length > 0 : false,
        lpbsSpec: lpbsSpec ? lpbsSpec?.length > 0 : false,
        localIsolatorSpec: localIsolatorSpec ? localIsolatorSpec?.length > 0 : false,
        cableSpec: cableSpec ? cableSpec?.length > 0 : false,
      })
    }
    if (open) {
      checkFileExist()
    }
  }, [open, userInfo?.division, values])

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
          <div className="flex gap-2">
            {fileExist.panelSpec ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" className="text-lg" />
            )}
            <h4 className="font-semibold text-slate-700">Panel Specification</h4>
          </div>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Panel Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {fileExist.motorSpec ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" className="text-lg" />
            )}
            <h4 className="font-semibold text-slate-700">Motor Specification</h4>
          </div>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/Motor Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {fileExist.lpbsSpec ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" className="text-lg" />
            )}
            <h4 className="font-semibold text-slate-700">LPBS Specification</h4>
          </div>
          <div className="flex items-center gap-2">
            <S3BucketUpload
              accept=".pdf"
              folderPath={`${S3FolderMapping[userInfo?.division]}/${values?.["project_name"]}/LPBS Specification`}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {fileExist.localIsolatorSpec ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" className="text-lg" />
            )}
            <h4 className="font-semibold text-slate-700">Local Isolator Specification</h4>
          </div>
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
          <div className="flex gap-2">
            {fileExist.cableSpec ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-lg" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" className="text-lg" />
            )}
            <h4 className="font-semibold text-slate-700">Cable Specification</h4>
          </div>
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
