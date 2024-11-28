"use client"

import React, { useEffect, useState } from "react"
import Download from "./Download"
import MotorCanopyList from "./MotorCanopyList"
import { useLoading } from "hooks/useLoading"
import LoadList from "./Electrical Load List/LoadListComponent"
import CableSchedule from "./Cable Schedule/CableScheduleComponent"

const tabData = [
  { label: "Download", key: 1 },
  { label: "Electrical Load List", key: 2 },
  { label: "Cable Schedule", key: 3 },
  { label: "Motor Canopy List", key: 4 },
]

const ElectricalLoadList = ({
  revision_id,
  loadListLatestRevisionId,
}: {
  revision_id: string
  loadListLatestRevisionId: string
}) => {
  const [openTab, setOpenTab] = useState<number>(2)
  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Download />
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <LoadList
                    designBasisRevisionId={revision_id}
                    loadListLatestRevisionId={loadListLatestRevisionId}
                  />{" "}
                </div>

                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  {/* <CableSchedule /> */}
                </div>

                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <MotorCanopyList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ElectricalLoadList
