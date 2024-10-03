"use client"
import { UploadOutlined } from "@ant-design/icons"
import { Button, GetProp, Upload, UploadProps } from "antd"
import { RcFile, UploadFile } from "antd/es/upload"
import { useState } from "react"
import { Control, Controller } from "react-hook-form"
import Image from "antd"

interface CustomUploadProps extends UploadProps {
  control: Control<any>
  name: string
  uploadButtonLabel: string
  size?: "small"
  defaultChecked?: boolean
  onChange?: UploadProps["onChange"]
}

export default function CustomUpload({ control, name, uploadButtonLabel, ...props }: CustomUploadProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Upload
            {...props}
            onRemove={(file) => {
              const index = field.value.indexOf(file)
              const newFileList = field.value.slice()
              newFileList.splice(index, 1)
              field.onChange(newFileList) // Call onChange to update the form value
            }}
            beforeUpload={(file) => {
              field.onChange([...field.value, file]) // Add new file to the list
              return false // Prevent auto-upload
            }}
            fileList={field.value}
          >
            <Button type="dashed" icon={<UploadOutlined />}>
              {uploadButtonLabel}
            </Button>
          </Upload>

          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </>
      )}
    />
  )
}
