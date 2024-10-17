"use client"

import { Button } from "antd"
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

const DesignBasis = () => {
  const [openTab] = useState<string>("1")
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold underline">DESIGN BASIS TAB</div>
      <div className="">
        <div className="flex gap-2">
          {tabData.map((tab, index) => (
            <div
              key={index.toString()}
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
              <div className={openTab === "1" ? "block" : "hidden"} id="link1"></div>

              <div className={openTab === "2" ? "block" : "hidden"} id="link2">
                <GeneralInfo />
              </div>

              <div className={openTab === "3" ? "block" : "hidden"} id="link3">
                <p>Content of Motor Parameters</p>

                <MotorParameters />
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
