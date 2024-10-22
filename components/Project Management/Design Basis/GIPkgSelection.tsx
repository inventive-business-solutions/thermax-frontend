"use client"

import { DeleteTwoTone } from "@ant-design/icons"
import { Popconfirm, Tabs } from "antd"
import { deleteData, getData } from "actions/crud-actions"
import { PROJECT_MAIN_PKG_API } from "configs/api-endpoints"
import GISubPkgList from "./GISubPkgList"
import { mutate } from "swr"

export default function GIPkgSelectionTabs({
  mainPkgUrl,
  generalInfoData,
  setMainPkgData,
  setGeneralInfoData,
  refresh,
  setRefresh,
}: {
  mainPkgUrl: string
  generalInfoData: any
  setMainPkgData: any
  setGeneralInfoData: any
  refresh?: boolean
  setRefresh?: any
}) {
  const tabItems = generalInfoData?.pkgList?.map((main_package: any, index: number) => ({
    key: index.toString(),
    label: main_package?.main_package_name,
    children: (
      <GISubPkgList
        main_package={main_package}
        generalInfoData={generalInfoData}
        setGeneralInfoData={setGeneralInfoData}
      />
    ),
    disabled: generalInfoData.is_package_selection_enabled === 0,
  }))
  const remove = async (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
    const item = tabItems.find((item: any) => item.key === targetKey)
    const label = item?.label
    const data = await getData(
      `${PROJECT_MAIN_PKG_API}?fields=["name"]&filters=[["main_package_name", "=", "${label}"]]`,
      false
    )
    if (data && data.length > 0) {
      await deleteData(`${PROJECT_MAIN_PKG_API}/${data[0].name}`, false)
    }
    setRefresh(!refresh)
  }
  if (tabItems && tabItems.length === 0) {
    return null
  }
  return (
    <Tabs
      defaultActiveKey="0"
      type="editable-card"
      removeIcon={null}
      items={tabItems?.map((tab: any) => ({
        ...tab,
        label: (
          <span>
            {tab.label}
            <Popconfirm
              title="Are you sure you want to delete this tab?"
              onConfirm={() => remove(tab.key)}
              okText="Yes"
              cancelText="No"
              disabled={generalInfoData.is_package_selection_enabled === 0}
            >
              <DeleteTwoTone
                twoToneColor="#ff7875"
                style={{ marginLeft: 8, cursor: "pointer" }}
                disabled={generalInfoData.is_package_selection_enabled === 0}
              />
            </Popconfirm>
          </span>
        ),
      }))}
    />
  )
}
