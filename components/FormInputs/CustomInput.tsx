"use client"
import { Input, InputProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface InputFieldProps extends InputProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
}

export default function CustomTextInput({ control, name, label, placeholder, ...props }: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name} className="text-sm font-semibold text-slate-700">
            {label}
          </label>
          <Input
            {...field}
            {...props}
            placeholder={placeholder}
            status={fieldState.error && "error"}
            className="!w-full"
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
