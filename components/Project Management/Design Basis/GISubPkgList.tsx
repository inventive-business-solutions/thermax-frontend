"use client"

import { Checkbox, Radio, Select } from "antd"
import React, { useEffect, useState } from "react"
import {
  CLASSIFICATION_AREA_GAS_GROUP_API,
  CLASSIFICATION_AREA_STANDARD_API,
  CLASSIFICATION_AREA_TEMPERATURE_CLASS_API,
  CLASSIFICATION_AREA_ZONE_API,
} from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function GISubPkgList({
  main_package,
  generalInfoData,
  setGeneralInfoData,
}: {
  main_package: any
  generalInfoData: any
  setGeneralInfoData: any
}) {
  const { dropdownOptions: standardOptions } = useDropdownOptions(CLASSIFICATION_AREA_STANDARD_API, "name")
  const { dropdownOptions: zoneOptions } = useDropdownOptions(CLASSIFICATION_AREA_ZONE_API, "name")
  const { dropdownOptions: gasGroupOptions } = useDropdownOptions(CLASSIFICATION_AREA_GAS_GROUP_API, "name")
  const { dropdownOptions: temperatureClassOptions } = useDropdownOptions(
    CLASSIFICATION_AREA_TEMPERATURE_CLASS_API,
    "name"
  )

  const [hasHazardousArea, setHasHazardousArea] = useState(false)

  useEffect(() => {
    if (!generalInfoData?.pkgList) return // Safeguard if data is undefined or empty

    const mainPkgList = generalInfoData.pkgList
    const selectedMainPkg = mainPkgList.find((pkg: any) => pkg.main_package_name === main_package.main_package_name)

    // Check if any main package has a hazardous sub-package selected
    const hasHazardous = selectedMainPkg?.sub_packages?.some((subPkg: any) => {
      const isHazardous =
        (subPkg.is_sub_package_selected === 1 || subPkg.is_sub_package_selected === true) &&
        subPkg.area_of_classification === "Hazardous Area"

      return isHazardous
    })

    // Update state only if necessary
    if (hasHazardous !== hasHazardousArea) {
      setHasHazardousArea(hasHazardous)
    }
  }, [generalInfoData, hasHazardousArea, main_package.main_package_name])

  const getSubPkg = (main_package: any, subPkg: any, generalInfoData: any) => {
    const main_package_name = main_package.main_package_name
    const sub_package_name = subPkg.sub_package_name
    const defaultMainPkg = generalInfoData?.pkgList?.find((pkg: any) => pkg.main_package_name === main_package_name)
    const defaultSubPkg = defaultMainPkg?.sub_packages?.find((pkg: any) => pkg.sub_package_name === sub_package_name)
    return defaultSubPkg
  }

  return (
    <div className="flex flex-col gap-4">
      {main_package?.sub_packages?.map((subPkg: any, index: any) => (
        <div key={index.toString()} className="flex flex-col gap-4">
          <div className="flex items-center gap-10">
            <div>
              <Checkbox
                disabled={generalInfoData.is_package_selection_enabled === 0}
                checked={(() => {
                  const subPkgValue = getSubPkg(main_package, subPkg, generalInfoData)
                  return subPkgValue?.is_sub_package_selected
                })()}
                onChange={(e) => {
                  const newGeneralInfoData = { ...generalInfoData }
                  const main_package_name = main_package.main_package_name
                  const sub_package_name = subPkg.sub_package_name
                  const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                    (pkg: any) => pkg.main_package_name === main_package_name
                  )
                  const defaultSubPkg = defaultMainPkg?.sub_packages?.find(
                    (pkg: any) => pkg.sub_package_name === sub_package_name
                  )
                  defaultSubPkg.is_sub_package_selected = e.target.checked
                  setGeneralInfoData(newGeneralInfoData)
                }}
              >
                {subPkg.sub_package_name}
              </Checkbox>
            </div>
            <div>
              <Radio.Group
                disabled={generalInfoData.is_package_selection_enabled === 0}
                value={(() => {
                  const subPkgValue = getSubPkg(main_package, subPkg, generalInfoData)
                  return subPkgValue?.area_of_classification
                })()}
                onChange={
                  ((e: any) => {
                    const newGeneralInfoData = { ...generalInfoData }
                    const main_package_name = main_package.main_package_name
                    const sub_package_name = subPkg.sub_package_name
                    const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                      (pkg: any) => pkg.main_package_name === main_package_name
                    )
                    const defaultSubPkg = defaultMainPkg?.sub_packages?.find(
                      (pkg: any) => pkg.sub_package_name === sub_package_name
                    )
                    defaultSubPkg.area_of_classification = e.target.value
                    setGeneralInfoData(newGeneralInfoData)
                  }) as any
                }
              >
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
              <p className="font-semibold text-slate-700">Standard</p>
              <Select
                options={standardOptions}
                size="small"
                style={{ width: "100%" }}
                value={main_package?.standard || "IS"}
                disabled={generalInfoData.is_package_selection_enabled === 0}
                onChange={
                  ((value: any) => {
                    const newGeneralInfoData = { ...generalInfoData }
                    const main_package_name = main_package.main_package_name
                    const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                      (pkg: any) => pkg.main_package_name === main_package_name
                    )
                    defaultMainPkg.standard = value
                    setGeneralInfoData(newGeneralInfoData)
                  }) as any
                }
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-700">Zone</p>
              <Select
                options={zoneOptions}
                size="small"
                style={{ width: "100%" }}
                value={main_package?.zone || "Zone 2"}
                disabled={generalInfoData.is_package_selection_enabled === 0}
                onChange={
                  ((value: any) => {
                    const newGeneralInfoData = { ...generalInfoData }
                    const main_package_name = main_package.main_package_name
                    const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                      (pkg: any) => pkg.main_package_name === main_package_name
                    )
                    defaultMainPkg.zone = value
                    setGeneralInfoData(newGeneralInfoData)
                  }) as any
                }
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-700">Gas Group</p>
              <Select
                options={gasGroupOptions}
                size="small"
                style={{ width: "100%" }}
                value={main_package?.gas_group || "IIA/IIB"}
                disabled={generalInfoData.is_package_selection_enabled === 0}
                onChange={
                  ((value: any) => {
                    const newGeneralInfoData = { ...generalInfoData }
                    const main_package_name = main_package.main_package_name
                    const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                      (pkg: any) => pkg.main_package_name === main_package_name
                    )
                    defaultMainPkg.gas_group = value
                    setGeneralInfoData(newGeneralInfoData)
                  }) as any
                }
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-700">Temperature Class</p>
              <Select
                options={temperatureClassOptions}
                size="small"
                style={{ width: "100%" }}
                value={main_package?.temperature_class || "T3"}
                disabled={generalInfoData.is_package_selection_enabled === 0}
                onChange={
                  ((value: any) => {
                    const newGeneralInfoData = { ...generalInfoData }
                    const main_package_name = main_package.main_package_name
                    const defaultMainPkg = newGeneralInfoData?.pkgList?.find(
                      (pkg: any) => pkg.main_package_name === main_package_name
                    )
                    defaultMainPkg.temperature_class = value
                    setGeneralInfoData(newGeneralInfoData)
                  }) as any
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
