"use client"

import React, { useState } from "react"
import { Button, TableColumnType } from "antd"
import { BellFilled, CopyOutlined, DownloadOutlined } from "@ant-design/icons"
// import { ColumnType } from "antd/es/table"

const tabData = [
  { label: "Document Revision", key: "1" },
  { label: "General Info", key: "2" },
  { label: "Motor Parameters", key: "3" },
  { label: "MCC/PCC", key: "4" },
  { label: "Layout", key: "5" },
]

interface TableDataType {
  key: React.Key
  documentName: string
  status: string
  documentRevision: string
  createdDate: string
  action: React.ReactNode
  download: React.ReactNode
  release: React.ReactNode
}

// const columns: TableColumnType<TableDataType> = [
//   { title: "Document Name", dataIndex: "documentName" },
//   { title: "Status", dataIndex: "status" },
//   { title: "Document Revision", dataIndex: "documentRevision" },
//   { title: "Created Date", dataIndex: "createdDate" }, // New column added here
//   { title: "Action", dataIndex: "action" },
//   { title: "Download", dataIndex: "download" },
//   { title: "Release", dataIndex: "release" },
// ]

// const dataSource: DataType[] = [
//   {
//     key: 1,
//     documentName: "Document 1",
//     status: "Approved",
//     documentRevision: "Rev 1",
//     createdDate: "2024-09-19", // Sample created date
//     action: <CopyOutlined />,
//     download: (<div className="flex flex-row justify-center gap-2">
//       <DownloadOutlined />
//       <BellFilled />
//     </>),
//     release: "Release",
//   },
// ]

const DesignBasis = () => {
  const [openTab, setOpenTab] = useState<string>("1")
  const [tabsEnabled, setTabsEnabled] = useState<boolean[]>([true, false, false, false, false])

  const enableTabs = () => {
    setTabsEnabled(new Array(tabData.length).fill(true))
  }

  return (
    <>
      <div>DESIGN BASIS TAB</div>
      <div className="m-4 flex flex-wrap">
        <div className="w-full">
          <ul className="mb-0 flex list-none flex-row flex-wrap pb-4 pt-3" role="tablist">
            {tabData.map((tab, index) => (
              <li key={tab.key} className="-mb-px mr-2 flex-auto text-center last:mr-0">
                <a
                  className={
                    `block rounded px-5 py-3 text-xs font-bold uppercase leading-normal shadow-lg ` +
                    (openTab === tab.key && tabsEnabled[index]
                      ? "bg-primary-600 text-white"
                      : !tabsEnabled[index]
                      ? "cursor-not-allowed bg-gray-300 text-gray-500"
                      : "bg-white text-primary-600")
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    if (tabsEnabled[index]) {
                      setOpenTab(tab.key)
                    }
                  }}
                  data-toggle="tab"
                  href={`#link${tab.key}`}
                  role="tablist"
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="flex-auto px-4 py-5">
              <div className="tab-content tab-space">
                {/* Tab Content */}
                <div className={openTab === "1" ? "block" : "hidden"} id="link1">
                  <Button onClick={enableTabs} type="primary">
                    Enable Other Tabs
                  </Button>


                </div>

                <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                  <p>Content of General Info</p>
                </div>

                <div className={openTab === "3" ? "block" : "hidden"} id="link3">
                  <p>Content of Motor Parameters</p>
                </div>

                <div className={openTab === "4" ? "block" : "hidden"} id="link4">
                  <p>Content of MCC/PCC</p>
                </div>

                <div className={openTab === "5" ? "block" : "hidden"} id="link5">
                  <p>Content of Layout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignBasis
