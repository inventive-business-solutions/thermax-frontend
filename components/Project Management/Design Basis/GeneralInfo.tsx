"use client"
import { CloseOutlined, DownOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Divider, Dropdown, message, Radio, Select, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { useLoading } from "hooks/useLoading"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { MAIN_PKG_API } from "configs/api-endpoints"
import CustomMultiSelect from "components/FormInputs/CustomMultiSelect"
import CustomMultiSelectOption from "components/FormInputs/CustomMultiSelectChoice"

// Define validation schema using zod
const GeneralInfoSchema = z
  .object({
    selectedPackage: z.string(),
    checkboxOne: z.boolean(),
    checkboxTwo: z.boolean(),
    radioOne: z.string().optional(),
    radioTwo: z.string().optional(),
    powerSupply: z.string(),
    // Only validate area classification fields if one of the areas is hazardous
    standard: z.string().optional(),
    zone: z.string().optional(),
    gasGroup: z.string().optional(),
    temperature: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only require area classification fields when either radio is "hazardous"
      const isHazardous = data.radioOne === "hazardous" || data.radioTwo === "hazardous"
      if (isHazardous) {
        return data.standard && data.zone && data.gasGroup && data.temperature
      }
      return true // No validation if none are hazardous
    },
    {
      message: "All area classification fields are required if any checkbox is hazardous",
      path: ["standard"],
    }
  )

interface GeneralInfoProps {
  handleSave: (data: any) => void
}

const packageOptions = [
  { label: "Package 1", key: "1" },
  { label: "Package 2", key: "2" },
  { label: "Package 3", key: "3" },
  { label: "Package 4", key: "4" },
]

const GeneralInfo = () => {
  const { dropdownOptions: packageOptions } = useDropdownOptions(`${MAIN_PKG_API}?fields=["*"]`, "package_name")
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      is_package_selected: "1",
      main_package_list: [],
      checkboxTwo: false,
      radioOne: "safe",
      radioTwo: "safe",
      powerSupply: "lucy",
      standard: "",
      zone: "",
      gasGroup: "",
      temperature: "",
    },
  })

  console.log(watch("main_package_list"))

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-40">
        <div className="flex gap-4">
          <div className="font-bold text-slate-800">Package Selection</div>
          <div>
            <CustomRadioSelect
              control={control}
              name="is_package_selected"
              label=""
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="text-sm font-semibold text-slate-700">Main Package</div>
          <div className="flex-1">
            <CustomMultiSelectOption
              name="main_package_list"
              control={control}
              label=""
              options={packageOptions}
              placeholder="Select main package"
            />
          </div>
        </div>
      </div>

      <Divider />
      <div className="m-0 flex flex-col gap-6 p-0 ">
        <div className="text-2xl font-bold">Battery Limit</div>
        <div className="ms-6 flex flex-row justify-start gap-4">
          <div>Power Supply at the </div>
          <Controller
            name="powerSupply"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "Yiminghe" },
                ]}
              />
            )}
          />
        </div>
        {errors.powerSupply && <span className="text-red-500">{errors.powerSupply.message}</span>}
      </div>

      <div className="flex w-full justify-end gap-4">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </form>
  )
}

export default GeneralInfo
