"use client"

import { DeleteTwoTone } from "@ant-design/icons"
import { Popconfirm, Tabs } from "antd"
import { deleteData, getData } from "actions/crud-actions"
import { PROJECT_MAIN_PKG_API } from "configs/api-endpoints"
import GISubPkgList from "./GISubPkgList"

export default function GIPkgSelectionTabs({ main_package_list }: any) {
  const tabItems = main_package_list?.map((main_package: any, index: number) => ({
    key: index.toString(),
    label: main_package?.main_package_name,
    children: <GISubPkgList main_package_id={main_package?.name} />,
  }))
  const remove = async (targetKey: React.MouseEvent | React.KeyboardEvent | string) => {
    const item = tabItems.find((item) => item.key === targetKey)
    const label = item?.label
    const data = await getData(
      `${PROJECT_MAIN_PKG_API}?fields=["name"]&filters=[["main_package_name", "=", "${label}"]]`,
      false
    )
    if (data && data.length > 0) {
      await deleteData(`${PROJECT_MAIN_PKG_API}/${data[0].name}`, false)
    }
  }
  if (tabItems && tabItems.length === 0) {
    return null
  }
  return (
    <Tabs
      defaultActiveKey="0"
      type="editable-card"
      items={tabItems?.map((tab) => ({
        ...tab,
        label: (
          <span>
            {tab.label}
            <Popconfirm
              title="Are you sure you want to delete this tab?"
              onConfirm={() => remove(tab.key)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteTwoTone twoToneColor="#ff7875" style={{ marginLeft: 8, cursor: "pointer" }} />
            </Popconfirm>
          </span>
        ),
      }))}
    />
  )
}
