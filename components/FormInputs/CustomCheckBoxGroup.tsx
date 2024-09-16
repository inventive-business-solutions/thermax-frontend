"use client"
import { Checkbox, CheckboxProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface CheckBoxGroupProps extends CheckboxProps {
  control: Control<any>
  name: string
  label: string
  options: { value: string; label: string; [key: string]: any }[]
  onChange?: (value: any) => void
}

export default function CustomCheckBoxGroup({ control, name, label, options, onChange, ...props }: CheckBoxGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <Checkbox.Group
            {...field}
            {...props}
            options={options}
            onChange={(value) => {
              field.onChange(value)
              if (onChange) onChange(value)
            }}
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
