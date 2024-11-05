"use client"
import { InputNumber, InputNumberProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface InputNumberFieldProps extends InputNumberProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
}

export default function CustomTextNumber({ control, name, label, placeholder, ...props }: InputNumberFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <InputNumber
            className="!w-full"
            {...field}
            {...props}
            placeholder={placeholder}
            status={fieldState.error && "error"}
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
