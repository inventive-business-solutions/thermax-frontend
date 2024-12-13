"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { PROJECT_PANEL_API } from "configs/api-endpoints"
import { MCC_PANEL_TYPE, MCCcumPCC_PANEL_TYPE, PCC_PANEL_TYPE } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import CommonConfiguration from "./CommonConfiguration/CommonConfiguration"
import MakeOfComponent from "./MakeOfComponent/MakeOfComponent"
import MCCcumPCCPanel from "./Dynamic Panels/MCCcumPCC"
import MCCPanel from "./Dynamic Panels/MCCPanel"
import PCCPanel from "./Dynamic Panels/PCCPanel"
import { sortDatewise } from "utils/helpers"

const MainMCCPCC = ({ revision_id }: { revision_id: string }) => {
  const [activeKey, setActiveKey] = useState<string>("Make") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: projectPanelData } = useGetData(
    `${PROJECT_PANEL_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]&order_by=creation asc`
  )

  const TabMCC = [
    {
      label: "Make",
      key: "Make",
      children: <MakeOfComponent revision_id={revision_id} setActiveKey={setActiveKey} />,
    },
    {
      label: "Common Configuration",
      key: "Common Configuration",
      children: <CommonConfiguration revision_id={revision_id} setActiveKey={setActiveKey} />,
    },
  ]
  const sortedProjectPanelData = sortDatewise(projectPanelData)
  sortedProjectPanelData?.forEach((panel: any) => {
    if (panel.panel_main_type === MCC_PANEL_TYPE) {
      TabMCC.push({
        label: panel?.panel_name,
        key: panel?.panel_name,
        children: <MCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    } else if (panel.panel_main_type === PCC_PANEL_TYPE) {
      TabMCC.push({
        label: panel?.panel_name,
        key: panel?.panel_name,
        children: <PCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    } else if (panel.panel_main_type === MCCcumPCC_PANEL_TYPE) {
      TabMCC.push({
        label: panel?.panel_name,
        key: panel?.panel_name,
        children: <MCCcumPCCPanel revision_id={revision_id} panel_id={panel?.name} />,
      })
    }
  })

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
