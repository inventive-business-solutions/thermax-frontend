"use client"

import React, { useState } from "react"
import { Button, Table, TableColumnType, Tooltip } from "antd"
import { BellFilled, CopyOutlined, DownloadOutlined, FolderOpenOutlined } from "@ant-design/icons"
import Download from "./Download"
import CableSchedule from "./CableSchedule"
import MotorCanopyList from "./MotorCanopyList"
// import GeneralInfo from "./GeneralInfo"
// import MotorParameters from "./MotorParameters"
// import MainMCC from "./MCC-PCC/Main"
// import MainLayout from "./Layout/Main"

const tabData = [
  { label: "Download", key: "1" },
  { label: "Electrical Load List", key: "2" },
  { label: "Cable Schedule", key: "3" },
  { label: "Motor Canopy List", key: "4" },
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

interface ElectricalLoadListProps {
  handleSave: () => void
}

const ElectricalLoadList: React.FC<ElectricalLoadListProps> = ({ handleSave }) => {
  const [openTab, setOpenTab] = useState<string>("1")

  return (
    <>
      <div>DESIGN BASIS TAB</div>
      <div className="m-4 flex flex-wrap">
        <div className="w-full">
          <ul className="mb-0 flex list-none flex-row flex-wrap pb-4 pt-3" role="tablist">
            {tabData.map((tab) => (
              <li key={tab.key} className="-mb-px mr-2 flex-auto text-center last:mr-0">
                <a
                  className={`block rounded border px-5 py-3 text-xs font-bold uppercase leading-normal shadow-lg ${
                    openTab === tab.key ? "bg-primary-600 text-white" : "bg-white text-primary-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenTab(tab.key)
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

          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white">
            <div className="flex-auto px-4 py-5">
              <div className="tab-content tab-space">
                {/* Tab Content */}
                <div className={openTab === "1" ? "block" : "hidden"} id="link1">
                  <Download />
                </div>

                <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                  <p> Electrical Load List</p>
                </div>

                <div className={openTab === "3" ? "block" : "hidden"} id="link3">
                  <CableSchedule />
                </div>

                <div className={openTab === "4" ? "block" : "hidden"} id="link4">
                  <MotorCanopyList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-end">
        <Button type="primary" size="large" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  )
}

export default ElectricalLoadList
