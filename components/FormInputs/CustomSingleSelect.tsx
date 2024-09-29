"use client"
import { Select, SelectProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface SingleSelectProps extends SelectProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
  options: { value: string; label: string; [key: string]: any }[]
  showSearch?: boolean
  onChange?: (value: any) => void
  onSearch?: (value: string) => void
}

export default function CustomSingleSelect({
  control,
  name,
  label,
  placeholder,
  options,
  showSearch = true,
  onChange,
  onSearch,
  ...props
}: SingleSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm font-semibold">
            {label}
          </label>
          <Select
            {...field}
            {...props}
            showSearch={showSearch}
            placeholder={placeholder}
            optionFilterProp="label"
            onChange={(value) => {
              field.onChange(value)
              if (onChange) onChange(value)
            }}
            onSearch={(value) => {
              if (onSearch) onSearch(value)
            }}
            options={options}
            status={fieldState.error && "error"}
            className="!w-full"
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
