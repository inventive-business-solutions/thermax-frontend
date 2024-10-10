"use client"

import { BellFilled, CopyOutlined, DownloadOutlined, FolderOpenOutlined } from "@ant-design/icons"
import { Button, Table, TableColumnType, Tooltip } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import GeneralInfo from "./GeneralInfo"
import MainLayout from "./Layout/Main"
import MainMCC from "./MCC-PCC/Main"
import MotorParameters from "./MotorParameters"

const tabData = [
  { label: "Document Revision", key: "1" },
  { label: "General Info", key: "2" },
  { label: "Motor Parameters", key: "3" },
  { label: "MCC/PCC", key: "4" },
  { label: "Layout", key: "5" },
]

interface TableDataType {
  key: React.Key
  documentName: React.ReactNode
  status: string
  documentRevision: string
  createdDate: string
  action: React.ReactNode
  download: React.ReactNode
  release: React.ReactNode
}

// Ensure columns is defined as an array of ColumnType
const columns: TableColumnType<TableDataType>[] = [
  { title: "Document Name", dataIndex: "documentName" },
  { title: "Status", dataIndex: "status" },
  { title: "Document Revision", dataIndex: "documentRevision" },
  { title: "Created Date", dataIndex: "createdDate" }, // New column added here
  { title: "Action", dataIndex: "action" },
  { title: "Download", dataIndex: "download", align: "left" },
  { title: "Release", dataIndex: "release" },
]

interface DesignBasisProps {
  handleSave: () => void
}

const DesignBasis = () => {
  const [openTab, setOpenTab] = useState<string>("1")
  const [tabsEnabled, setTabsEnabled] = useState<boolean[]>([true, true, true, true, true])
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])

  const enableTabs = () => {
    setTabsEnabled(new Array(tabData.length).fill(true))
  }

  const dataSource: TableDataType[] = [
    {
      key: 1,
      documentName: (
        <div>
          <Tooltip title="Edit Revision" placement="top">
            <Button
              type="link"
              onClick={() => {
                enableTabs()
                setOpenTab("2")
              }}
              iconPosition="start"
              icon={<FolderOpenOutlined />}
            >
              Document 1
            </Button>
          </Tooltip>
        </div>
      ),
      status: "Approved",
      documentRevision: "Rev 1",
      createdDate: "2024-09-19", // Sample created date
      action: <CopyOutlined />,
      download: (
        <div className="flex flex-row justify-start gap-2">
          <DownloadOutlined />
          <BellFilled />
        </div>
      ),
      release: (
        <Button type="primary" size="small" name="Release">
          Release
        </Button>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold underline">DESIGN BASIS TAB</div>
      <div className="">
        <div className="flex gap-2">
          {tabData.map((tab, index) => (
            <div
              key={tab.key}
              className={
                "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-300 p-2 text-sm font-bold uppercase tracking-wide text-gray-600"
              }
              onClick={(e) => {
                e.preventDefault()
                if (tabsEnabled[index]) {
                  setOpenTab(tab.key)
                }
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white">
          <div className="flex-auto px-4 py-5">
            <div className="tab-content tab-space">
              {/* Tab Content */}
              <div className={openTab === "1" ? "block" : "hidden"} id="link1">
                <Table columns={columns} dataSource={dataSource} />
              </div>

              <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                <GeneralInfo handleSave={() => setOpenTab("3")} />
              </div>

              <div className={openTab === "3" ? "block" : "hidden"} id="link3">
                <p>Content of Motor Parameters</p>

                <MotorParameters handleSave={() => setOpenTab("4")} />
              </div>

              <div className={openTab === "4" ? "block" : "hidden"} id="link4">
                <p>Content of MCC/PCC</p>
                <MainMCC />
              </div>

              <div className={openTab === "5" ? "block" : "hidden"} id="link5">
                <MainLayout />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row justify-end">
            <Button type="primary">Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignBasis
