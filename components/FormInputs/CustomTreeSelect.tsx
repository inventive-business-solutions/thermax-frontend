"use client"
import { TreeSelect, TreeSelectProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface CustomTreeSelectProps extends TreeSelectProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
  treeData: { [key: string]: any }[]
  showSearch?: boolean
  onChange?: (value: any) => void
  onSearch?: (value: string) => void
}

export default function CustomTreeSelect({
  control,
  name,
  label,
  placeholder,
  treeData,
  showSearch = true,
  ...props
}: CustomTreeSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <TreeSelect
            {...field}
            {...props}
            treeData={treeData}
            placeholder={placeholder}
            showSearch={showSearch}
            treeCheckable
            status={fieldState.error && "error"}
            className="!w-full"
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
