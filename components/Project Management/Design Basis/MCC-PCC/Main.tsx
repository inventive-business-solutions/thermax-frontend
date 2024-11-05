"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import CommonConfiguration from "./CommonConfiguration/CommonConfiguration"
import MakeOfComponent from "./MakeOfComponent/MakeOfComponent"
import MCCcumPCCPanel from "./MCCcumPCC"
import MCCPanel from "./MCCPanel"
import PCCPanel from "./PCCPanel"
import { useGetData } from "hooks/useCRUD"
import { PROJECT_PANEL_API } from "configs/api-endpoints"
import { useParams } from "next/navigation"

const MainMCCPCC = ({ revision_id }: { revision_id: string }) => {
  const params = useParams()
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: projectPanelData } = useGetData(
    `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`,
    false
  )

  console.log("projectPanelData", projectPanelData)

  const TabMCC = [
    {
      label: "Make",
      key: "1",
      children: <MakeOfComponent revision_id={revision_id} />,
    },
    {
      label: "Common Configuration",
      key: "2",
      children: <CommonConfiguration revision_id={revision_id} />,
    },
  ]

  projectPanelData?.forEach((panel: any) => {
    if (panel.panel_main_type === "MCC") {
      TabMCC.push({
        label: panel?.panel_name,
        key: "3",
        children: <MCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    } else if (panel.panel_main_type === "PCC") {
      TabMCC.push({
        label: panel?.panel_name,
        key: "4",
        children: <PCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    } else if (panel.panel_main_type === "MCCcumPCC") {
      TabMCC.push({
        label: panel?.panel_name,
        key: "5",
        children: <MCCcumPCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    }
  })
  console.log("TabMCC", TabMCC)

  const onChange = (key: string) => {
    setActiveKey(key) // Update active tab
  }

  return (
    <div>
      <Tabs
        activeKey={activeKey} // Set the active tab
        onChange={onChange}
        type="card"
        items={TabMCC.map((tab) => ({
          label: tab.label,
          key: tab.key,
          children: tab.children,
        }))}
      />
    </div>
  )
}

export default MainMCCPCC
