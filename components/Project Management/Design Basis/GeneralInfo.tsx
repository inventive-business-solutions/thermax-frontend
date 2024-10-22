"use client"
import { Button, Divider, Radio, RadioChangeEvent, Select } from "antd"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { createData, getData } from "actions/crud-actions"
import { createDropdownOptions } from "components/Package Management/package-management.logic"
import {
  BATTERY_LIMIT_API,
  DESIGN_BASIS_GENERAL_INFO_API,
  MAIN_PKG_API,
  PROJECT_MAIN_PKG_API,
  PROJECT_MAIN_PKG_LIST_API,
  SUB_PKG_API,
} from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useDropdownOptions } from "hooks/useDropdownOptions"
import { useLoading } from "hooks/useLoading"
import GIPkgSelectionTabs from "./GIPkgSelection"

const GeneralInfo = () => {
  const params = useParams()
  const [selectedPkg, setSelectedPkg] = useState("")
  const [addPkgLoading, setAddPkgLoading] = useState(false)
  const { data: dbPkgList } = useGetData(`${MAIN_PKG_API}?fields=["*"]`, false)
  const [generalInfoData, setGeneralInfoData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const generalInfoDefaultData = await getData(`${DESIGN_BASIS_GENERAL_INFO_API}?fields=["*"]`, false)
      console.log(generalInfoDefaultData)
      if (generalInfoDefaultData && generalInfoDefaultData.length > 0) {
        setGeneralInfoData({
          package_selection: generalInfoDefaultData[0]?.is_package_selection_enabled,
          pkgList: [],
          battery_limit: generalInfoDefaultData[0]?.battery_limit,
        })
      }
    }
    fetchData()
  }, [])
  console.log("generalInfoData", generalInfoData)

  const projectMainPkgUrl = `${PROJECT_MAIN_PKG_LIST_API}?project_id=${params.project_id}`
  const { data: mainPkgData } = useGetData(projectMainPkgUrl, false)
  const filteredOptions = dbPkgList?.filter(
    (pkg: any) =>
      pkg.package_name !== selectedPkg &&
      !mainPkgData?.some((mainPkg: any) => mainPkg.main_package_name === pkg.package_name)
  )
  const { dropdownOptions: batteryLimitOptions } = useDropdownOptions(BATTERY_LIMIT_API, "name")
  // wrap in useMemo to prevent re-rendering
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddPkg = async () => {
    setAddPkgLoading(true)

    const subPkgUrl = `${SUB_PKG_API}?fields=["*"]&filters=[["main_package_name", "=", "${selectedPkg}"]]`
    if (!selectedPkg) {
      setAddPkgLoading(false)
      return
    }
    const subPkgData = await getData(subPkgUrl, false)
    const subPkgCreateData = subPkgData?.map((subPkg: any) => ({
      main_package_name: selectedPkg,
      sub_package_name: subPkg?.package_name,
      area_of_classification: subPkg?.classification_area,
      is_sub_package_selected: false,
    }))
    await createData(PROJECT_MAIN_PKG_API, false, {
      project_id: params.project_id,
      main_package_name: selectedPkg,
      sub_packages: subPkgCreateData,
    })
    // const mainPkgData = await getData(projectMainPkgUrl, false)
    setSelectedPkg("")
    // setMainPkgData(mainPkgData)
    setAddPkgLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <div className="font-bold text-slate-800">Package Selection</div>
          <div>
            <Radio.Group
              value={generalInfoData.package_selection}
              onChange={(e: RadioChangeEvent) =>
                setGeneralInfoData({ ...generalInfoData, package_selection: e.target.value })
              }
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="text-sm font-semibold text-slate-700">Main Package</div>
          <div className="flex w-1/2">
            <Select
              placeholder="Select main package"
              onChange={setSelectedPkg}
              options={createDropdownOptions(filteredOptions, "package_name")}
              style={{ width: "100%" }}
              allowClear={false}
              disabled={generalInfoData.package_selection === 0}
            />
          </div>
          <div className="">
            <Button
              type="primary"
              onClick={handleAddPkg}
              loading={addPkgLoading}
              disabled={generalInfoData.package_selection === 0}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <GIPkgSelectionTabs
        main_package_list={mainPkgData}
        mainPkgUrl={projectMainPkgUrl}
        generalInfoData={generalInfoData}
        setMainPkgData={null}
      />
      <Divider>
        <span className="font-bold text-slate-700">Battery Limit</span>
      </Divider>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="flex w-3/4 gap-4">
            <p className="text-sm font-semibold"> Power Supply At </p>
            <div className="flex-1">
              <Select
                options={batteryLimitOptions}
                value={generalInfoData?.battery_limit}
                size="small"
                style={{ width: "100%" }}
                onChange={(value) => setGeneralInfoData({ ...generalInfoData, battery_limit: value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end gap-4">
        <Button type="primary" onClick={() => console.log(generalInfoData)}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default GeneralInfo
