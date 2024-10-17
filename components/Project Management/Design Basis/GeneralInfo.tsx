"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Tabs, TabsProps } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomMultiSelectOption from "components/FormInputs/CustomMultiSelectChoice"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { MAIN_PKG_API } from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useLoading } from "hooks/useLoading"
import GIPkgSelection from "./GIPkgSelection"

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

const GeneralInfo = () => {
  const [pkgTabItems, setPkgTabItems] = useState<TabsProps["items"]>([])
  const { dropdownOptions: packageOptions } = useDropdownOptions(`${MAIN_PKG_API}?fields=["*"]`, "package_name")
  console.log(packageOptions)
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { control, handleSubmit, watch } = useForm({
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

  const main_package_list = watch("main_package_list")

  useEffect(() => {
    setPkgTabItems(
      main_package_list.map((item, index) => {
        return {
          key: index.toString(),
          label: item,
          content: <GIPkgSelection main_pkg_name={item} />,
        }
      })
    )
  }, [main_package_list])

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        {watch("is_package_selected") === "1" && (
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
        )}
      </div>
      {watch("is_package_selected") === "1" && <Tabs items={pkgTabItems} />}
      <Divider />

      <div className="flex flex-col gap-3">
        <div className="font-bold text-slate-800">Battery Limit</div>
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <CustomSingleSelect control={control} name="powerSupply" label="Power Supply" options={[]} size="small" />
          </div>
        </div>
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
