"use client"
import { DatePicker, DatePickerProps } from "antd"
import dayjs from "dayjs"
import { Control, Controller } from "react-hook-form"

interface DateFieldProps extends Omit<DatePickerProps, "locale" | "generateConfig" | "hideHeader"> {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
}

const { RangePicker } = DatePicker

export default function CustomDateRangeInput({ control, name, label }: DateFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="block text-sm">
            {label}
          </label>
          <RangePicker
            {...field}
            format={"DD-MM-YYYY"}
            value={field.value ? [dayjs(field.value[0]), dayjs(field.value[1])] : null}
            onChange={(dates) => {
              const value = dates ? [dates[0]?.toDate(), dates[1]?.toDate()] : null
              field.onChange(value)
            }}
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
