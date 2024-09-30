"use client"
import { Input } from "antd"
import React from "react"
import { Control, Controller } from "react-hook-form"

interface TextAreaFieldProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  rows?: number // Optional prop for number of rows
  disabled?: boolean // New prop for disabling the textarea
}

const CustomTextAreaInput: React.FC<TextAreaFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  rows = 4, // Default to 4 rows
  disabled = false, // Default to false (enabled)
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <Input.TextArea
            {...field}
            placeholder={placeholder}
            rows={rows}
            status={fieldState.error ? "error" : undefined} // Set status based on error presence
            disabled={disabled} // Pass down the disabled prop
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}

export default CustomTextAreaInput
