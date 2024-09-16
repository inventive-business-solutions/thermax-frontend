"use client"
import { UploadOutlined } from "@ant-design/icons"
import { Button, Upload, UploadProps } from "antd"
import { Control, Controller } from "react-hook-form"

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
      defaultValue="" // Use a string as the default value
      render={({ field, fieldState }) => (
        <>
          <Upload
            {...props}
            fileList={
              field.value
                ? field.value.split(", ").map((url: string) => ({
                    uid: url,
                    name: url,
                    status: "done",
                    url: url,
                  }))
                : []
            } // Convert string to fileList array
            onChange={(info) => {
              const fileUrls = info.fileList.map((file) => file.url || file.name).join(", ")
              field.onChange(fileUrls) // Store as a comma-separated string
            }}
          >
            <Button icon={<UploadOutlined />}>{uploadButtonLabel}</Button>
          </Upload>
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </>
      )}
    />
  )
}
