"use client"
import { Radio, RadioGroupProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface RadioSelectProps extends RadioGroupProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  options: { value: any; label: string; [key: string]: any }[]
  onChange?: (value: any) => void
}

export default function CustomRadioSelect({ control, name, label, options, onChange, ...props }: RadioSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name} className="text-sm font-semibold text-slate-700">
            {label}
          </label>
          <Radio.Group
            {...field}
            {...props}
            onChange={(value) => {
              field.onChange(value)
              if (onChange) onChange(value)
            }}
          >
            {options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
