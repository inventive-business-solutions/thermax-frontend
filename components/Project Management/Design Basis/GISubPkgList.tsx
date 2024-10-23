"use client"

import { Button } from "antd"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createData, updateData } from "actions/crud-actions"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import {
  CLASSIFICATION_AREA_GAS_GROUP_API,
  CLASSIFICATION_AREA_STANDARD_API,
  CLASSIFICATION_AREA_TEMPERATURE_CLASS_API,
  CLASSIFICATION_AREA_ZONE_API,
  PROJECT_MAIN_PKG_API,
  SUB_PKG_API,
} from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import GISubPkgInfo from "./GISubPkgInfo"

const getDefaultValues = (mainPkgData: any) => {
  const defaultValues: any = {
    standard: null,
    zone: null,
    gas_group: null,
    temperature_class: null,
  }
  mainPkgData?.sub_packages?.forEach((subPkg: any) => {
    defaultValues[`active_sub_pkg_${subPkg.sub_package_name}`] = Boolean(subPkg.is_sub_package_selected)
    defaultValues[`classification_area_${subPkg.sub_package_name}`] = subPkg.area_of_classification
  })

  return defaultValues
}

export default function GISubPkgList({ main_package_id }: { main_package_id: string }) {
  const params = useParams()
  const mainPkgUrl = `${PROJECT_MAIN_PKG_API}/${main_package_id}`
  const { data: mainPkgData } = useGetData(mainPkgUrl, false)
  const { dropdownOptions: standardOptions } = useDropdownOptions(CLASSIFICATION_AREA_STANDARD_API, "name")
  const { dropdownOptions: zoneOptions } = useDropdownOptions(CLASSIFICATION_AREA_ZONE_API, "name")
  const { dropdownOptions: gasGroupOptions } = useDropdownOptions(CLASSIFICATION_AREA_GAS_GROUP_API, "name")
  const { dropdownOptions: temperatureClassOptions } = useDropdownOptions(
    CLASSIFICATION_AREA_TEMPERATURE_CLASS_API,
    "name"
  )

  const [hasHazardousArea, setHasHazardousArea] = useState(false)

  const { control, handleSubmit, setValue, getValues, watch, formState } = useForm({
    defaultValues: getDefaultValues(mainPkgData),
  })

  const onSubmit = async (data: any) => {
    data["project_id"] = params.project_id
    data["main_package_name"] = main_package_id

    try {
      if (mainPkgData.length === 0) {
        await createData(PROJECT_MAIN_PKG_API, false, data)
      } else {
        const mainPkgId = mainPkgData[0].name
        await updateData(`${PROJECT_MAIN_PKG_API}/${mainPkgId}`, false, data)
      }
    } catch (error) {
      console.log("Error:", error)
    }

    console.log("Submitted Data:", data)
  }

  const formObj = watch()

  useEffect(() => {
    let hazardousFound = false
    console.log(formObj, mainPkgData)
    if (mainPkgData) {
      for (const subPkg of mainPkgData?.sub_packages) {
        console.log(subPkg)
        if (
          formObj[`classification_area_${subPkg.sub_package_name}`] === "Hazardous Area" &&
          formObj[`active_sub_pkg_${subPkg.sub_package_name}`]
        ) {
          hazardousFound = true
        }
      }
    }

    setHasHazardousArea(hazardousFound)
  }, [formObj, mainPkgData])

  return (
    <div className="flex flex-col gap-4">
      {mainPkgData?.sub_packages?.map((option: any, index: any) => (
        <GISubPkgInfo key={index.toString()} subPkg={option} control={control} />
      ))}
      {hasHazardousArea && (
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-slate-800">Area of Classification</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="standard"
                label="Standard"
                options={standardOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="zone" label="Zone" options={zoneOptions} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="gas_group"
                label="Gas Group"
                options={gasGroupOptions}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="temperature_class"
                label="Temperature Class"
                options={temperatureClassOptions}
                size="small"
              />
            </div>
          </div>
        </div>
      )}
      <div className="">
        <Button type="primary" htmlType="button" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </div>
  )
}
