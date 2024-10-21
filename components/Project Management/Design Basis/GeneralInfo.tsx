"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Select, Tabs, TabsProps } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomMultiSelectOption from "components/FormInputs/CustomMultiSelectChoice"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { MAIN_PKG_API, PROJECT_MAIN_PKG_API, SUB_PKG_API } from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useLoading } from "hooks/useLoading"
import GIPkgSelectionTabs from "./GIPkgSelection"
import { useParams } from "next/navigation"
import { useGetData } from "hooks/useCRUD"
import { createData, getData } from "actions/crud-actions"

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
  const params = useParams()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { dropdownOptions: packageOptions } = useDropdownOptions(`${MAIN_PKG_API}?fields=["*"]`, "package_name")
  const filteredOptions = packageOptions?.filter((o) => !selectedItems.includes(o.name))
  const mainPkgUrl = `${PROJECT_MAIN_PKG_API}?fields=["*"]&filters=[["project_id", "=", "${params.project_id}"]]`
  const { data: mainPkgData } = useGetData(mainPkgUrl, false)
  // wrap in useMemo to prevent re-rendering
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mainPkgData) {
      setSelectedItems(mainPkgData?.map((pkg) => pkg.main_package_name))
    }
  }, [mainPkgData])

  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      is_package_selected: "1",
    },
  })

  const handleAddPkg = async () => {
    const alreadyAdded = mainPkgData?.map((pkg) => pkg.main_package_name)
    const newlyAdded = selectedItems?.filter((pkg) => !alreadyAdded.includes(pkg))

    newlyAdded.forEach(async (pkg) => {
      const subPkgUrl = `${SUB_PKG_API}?fields=["*"]&filters=[["main_package_name", "=", "${pkg}"]]`
      const subPkgData = await getData(subPkgUrl, false)
      const subPkgCreateData = subPkgData?.map((subPkg: any) => ({
        main_package_name: pkg,
        sub_package_name: subPkg?.package_name,
        area_of_classification: subPkg?.classification_area,
        is_sub_package_selected: false,
      }))
      await createData(PROJECT_MAIN_PKG_API, false, {
        project_id: params.project_id,
        main_package_name: pkg,
        sub_packages: subPkgCreateData,
      })
    })
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
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
            <div className="flex flex-1">
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={(values) => setSelectedItems(values)}
                style={{ width: "100%" }}
                options={filteredOptions}
                size="small"
                removeIcon={null}
              />
            </div>
            <div className="">
              <Button type="primary" htmlType="button" size="small" onClick={handleAddPkg}>
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
      {watch("is_package_selected") === "1" && <GIPkgSelectionTabs main_package_list={mainPkgData} />}
      <Divider>
        <span className="font-bold text-slate-700">Battery Limit</span>
      </Divider>

      <div className="flex flex-col gap-3">
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
