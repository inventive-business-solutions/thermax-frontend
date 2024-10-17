"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

// Define the option type
interface OptionType {
  value: string
  label: string
}

// Define the component prop type
interface MakeOfComponentProps {
  handleSwitchTab: () => void
}

// Define the dropdown data structure
interface DropdownData {
  heading: string
  options: OptionType[]
}

// Create a common set of options
const options: OptionType[] = [
  { value: "motor1", label: "Motor Option 1" },
  { value: "motor2", label: "Motor Option 2" },
  { value: "motor3", label: "Motor Option 3" },
]

// Manually create the dropdown data
const dropdownData: DropdownData[] = [
  { heading: "Motors", options },
  { heading: "Cables", options },
  { heading: "LV switchgear", options },
  { heading: "Panel Enclosure", options },
  { heading: "Variable frequency/Speed drive (VFD/VSD)", options },
  { heading: "Soft Starter", options },
  { heading: "PLC", options },
]

// Define Zod schema for validation
const schema = z.object({
  selections: z.array(z.string().min(1, "Selection is required")).length(dropdownData.length),
})

const MakeOfComponent: React.FC<MakeOfComponentProps> = ({ handleSwitchTab }) => {
  const { control, handleSubmit } = useForm<{
    selections: string[]
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      selections: Array(dropdownData.length).fill(""), // Initialize selections with empty strings
    },
  })

  const onSubmit = (data: { selections: string[] }) => {
    console.log(data)
    handleSwitchTab() // Call the switch tab handler after successful submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="font-semibold text-slate-700">Make of Components</h2>
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <CustomSingleSelect control={control} name="motors" label="Motors" options={[]} size="small" />
        </div>
        <div className="flex-1">
          <CustomSingleSelect control={control} name="cables" label="Cables" options={[]} size="small" />
        </div>
        <div className="flex-1">
          <CustomSingleSelect control={control} name="lv_switchgear" label="LV Switchgear" options={[]} size="small" />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="panel_enclosure"
            label="Panel Enclosure"
            options={[]}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="vfd_vsd"
            label="Variable frequency/Speed drive (VFD/VSD)"
            options={[]}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect control={control} name="soft_starter" label="Soft Starter" options={[]} size="small" />
        </div>
      </div>
      <div className="w-1/3">
        <CustomSingleSelect control={control} name="plc" label="PLC" options={[]} size="small" />
      </div>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Save and Next
        </Button>
      </div>
    </form>
  )
}

export default MakeOfComponent
