"use client"

import { Button, Checkbox, Radio, Select } from "antd"
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

export default function GISubPkgList({ main_package, generalInfoData }: { main_package: any; generalInfoData: any }) {
  const { dropdownOptions: standardOptions } = useDropdownOptions(CLASSIFICATION_AREA_STANDARD_API, "name")
  const { dropdownOptions: zoneOptions } = useDropdownOptions(CLASSIFICATION_AREA_ZONE_API, "name")
  const { dropdownOptions: gasGroupOptions } = useDropdownOptions(CLASSIFICATION_AREA_GAS_GROUP_API, "name")
  const { dropdownOptions: temperatureClassOptions } = useDropdownOptions(
    CLASSIFICATION_AREA_TEMPERATURE_CLASS_API,
    "name"
  )

  const [hasHazardousArea, setHasHazardousArea] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {main_package?.sub_packages?.map((subPkg: any, index: any) => (
        <div key={index.toString()} className="flex flex-col gap-4">
          <div className="flex items-center gap-10">
            <div>
              <Checkbox disabled={generalInfoData.package_selection === 0}>{subPkg.sub_package_name}</Checkbox>
            </div>
            <div>
              <Radio.Group disabled={generalInfoData.package_selection === 0}>
                <Radio value={"Safe Area"}>Safe Area</Radio>
                <Radio value={"Hazardous Area"}>Hazardous Area</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      ))}
      {hasHazardousArea && (
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-slate-800">Area of Classification</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select options={standardOptions} size="small" />
            </div>
            <div className="flex-1">
              <Select options={zoneOptions} size="small" />
            </div>
            <div className="flex-1">
              <Select options={gasGroupOptions} size="small" />
            </div>
            <div className="flex-1">
              <Select options={temperatureClassOptions} size="small" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
