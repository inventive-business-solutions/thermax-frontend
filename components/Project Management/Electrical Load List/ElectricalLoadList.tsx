"use client"

import { Button } from "antd"
import React, { useState } from "react"
import CableSchedule from "./CableSchedule"
import Download from "./Download"
import ExcelGrid from "./Electrical Load List/LoadListComponent"
import MotorCanopyList from "./MotorCanopyList"
// import ExcelGrid from "./Electrical Load List/LoadListComponent"
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

const ElectricalLoadList = () => {
  const [openTab, setOpenTab] = useState<string>("2")

  return (
    <>
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

          <div className="relative mb-2 flex w-full min-w-0 flex-col break-words rounded bg-white">
            <div className="flex-auto">
              <div className="">
                {/* Tab Content */}
                <div className={openTab === "1" ? "block" : "hidden"} id="link1">
                  <Download />
                </div>

                <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                  {/* <p> Electrical Load List</p> */}
                  <ExcelGrid/>
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
        <Button type="primary">Save</Button>
      </div>
    </>
  )
}

export default ElectricalLoadList
