"use client"
import { Checkbox } from "antd"
import { Control, Controller } from "react-hook-form"

interface CheckboxFieldProps {
  control: Control<any>
  name: string
  label: string
  checked?: boolean
  onChange?: (value: any) => void
}

export default function CustomCheckboxInput({ control, name, label }: CheckboxFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
            {label}
          </Checkbox>
        </div>
      )}
    />
  )
}
