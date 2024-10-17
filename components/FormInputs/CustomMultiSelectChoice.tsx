"use client"
import { Popconfirm, Select, SelectProps } from "antd"
import { useState } from "react"
import { Control, Controller } from "react-hook-form"

interface MultiSelectProps extends SelectProps {
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

export default function CustomMultiSelectOption({
  control,
  name,
  label,
  placeholder,
  options,
  showSearch = true,
  ...props
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]) // Track selected values manually
  const [pendingValue, setPendingValue] = useState<string | null>(null) // Track which value is pending confirmation
  const [open, setOpen] = useState(false) // Popconfirm visibility
  const [actionType, setActionType] = useState<"select" | "deselect">() // Track action type

  const handleConfirm = (field: any) => {
    if (actionType === "select" && pendingValue) {
      field.onChange([...selectedValues, pendingValue]) // Update form state
      setSelectedValues([...selectedValues, pendingValue])
    } else if (actionType === "deselect" && pendingValue) {
      field.onChange(selectedValues.filter((v) => v !== pendingValue)) // Update form state
      setSelectedValues(selectedValues.filter((v) => v !== pendingValue))
    }
    setOpen(false)
    setPendingValue(null)
  }

  const handleCancel = () => {
    setOpen(false)
    setPendingValue(null)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm font-semibold text-slate-700">
            {label}
          </label>

          <Popconfirm
            title={`Are you sure you want to ${actionType === "select" ? "select" : "deselect"} this option?`}
            open={open}
            onConfirm={() => handleConfirm(field)}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Select
              {...props}
              mode="multiple"
              allowClear
              showSearch={showSearch}
              placeholder={placeholder}
              optionFilterProp="label"
              value={selectedValues} // Control the selected values manually
              onSelect={(value) => {
                setPendingValue(value)
                setActionType("select")
                setOpen(true) // Show confirmation for selection
              }}
              onDeselect={(value) => {
                setPendingValue(value)
                setActionType("deselect")
                setOpen(true) // Show confirmation for deselection
              }}
              // onChange={(newValue) => {
              //   handleSelectChange(field, newValue)
              // }}
              options={options}
              status={fieldState.error && "error"}
              className="!w-full"
            />
          </Popconfirm>

          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
