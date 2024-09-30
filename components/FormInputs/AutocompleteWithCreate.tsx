"use client"
import { AutoComplete, Button, Input, message, Spin } from "antd"
import { useEffect, useState } from "react"
import { Control, Controller } from "react-hook-form"
import { mutate } from "swr"
import { createData } from "actions/crud-actions"

interface CustomAutoCompleteProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  options: { value: string; label?: string; [key: string]: any }[]
  optionKeyName: string
  disabled?: boolean
  createOptionUrl: string
}

export default function CustomAutoComplete({
  control,
  name,
  label,
  placeholder,
  options,
  optionKeyName,
  disabled,
  createOptionUrl,
}: CustomAutoCompleteProps) {
  const [typedValue, setTypedValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  // Use useEffect to update filteredOptions whenever the options prop changes
  useEffect(() => {
    setFilteredOptions(options) // Sync filteredOptions with the new options from parent
  }, [options])

  const handleCreateOption = async (value: string, onChange: (value: string) => void) => {
    if (!value) return

    setIsLoading(true)
    try {
      await createData(createOptionUrl, { [optionKeyName]: value })
      onChange(value)
      mutate(createOptionUrl) // Trigger SWR to re-fetch data
      message.success(`Option "${value}" created successfully!`)
    } catch (error: any) {
      const errorObj = JSON.parse(error?.message) as any
      message.error(errorObj?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (searchText: string) => {
    // Filter options based on input
    const filtered = options.filter(
      (option) =>
        option.label?.toLowerCase().includes(searchText.toLowerCase()) ||
        option.value.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredOptions(filtered)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor={name} className="text-sm font-semibold">
              {label}
            </label>
            {/* Show create button when the input doesn't match any existing option */}
            {typedValue && !filteredOptions.find((opt) => opt.value === typedValue) && (
              <div className="">
                <Button
                  type="primary"
                  onClick={() => handleCreateOption(typedValue, field.onChange)}
                  loading={isLoading}
                  disabled={isLoading || !typedValue}
                  size="small"
                >
                  {isLoading ? <Spin /> : `Create "${typedValue}"`}
                </Button>
              </div>
            )}
          </div>

          <AutoComplete
            {...field}
            value={typedValue}
            onChange={(value) => {
              setTypedValue(value)
              field.onChange(value) // Update form value with selected/typed value
              handleSearch(value) // Filter options based on typed value
            }}
            options={filteredOptions} // Use filteredOptions instead of raw options
            disabled={disabled}
            placeholder={placeholder}
            className="!w-full"
          >
            <Input />
          </AutoComplete>

          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
