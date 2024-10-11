"use client"

import { BellFilled, CopyOutlined, DownloadOutlined, FolderOpenOutlined } from "@ant-design/icons"
import { Button, Table, TableColumnType, Tooltip } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import GeneralInfo from "./GeneralInfo"
import MainLayout from "./Layout/Main"
import MainMCCPCC from "./MCC-PCC/Main"
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

interface DesignBasisProps {
  handleSave: () => void
}

const DesignBasis = () => {
  const [openTab, setOpenTab] = useState<string>("1")
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])

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
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white">
          <div className="flex-auto px-4 py-5">
            <div className="tab-content tab-space">
              {/* Tab Content */}
              <div className={openTab === "1" ? "block" : "hidden"} id="link1"></div>

              <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                <GeneralInfo handleSave={() => setOpenTab("3")} />
              </div>

              <div className={openTab === "3" ? "block" : "hidden"} id="link3">
                <p>Content of Motor Parameters</p>

                <MotorParameters handleSave={() => setOpenTab("4")} />
              </div>

              <div className={openTab === "4" ? "block" : "hidden"} id="link4">
                <p>Content of MCC/PCC</p>
                <MainMCCPCC />
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
