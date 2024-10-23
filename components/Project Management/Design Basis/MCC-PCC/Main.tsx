"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import MakeOfComponent from "./MakeOfComponent/MakeOfComponent"
import CommonConfiguration from "./CommonConfiguration/CommonConfiguration"
import MCCcumPCCPanel from "./PLC/MCCcumPCC"
import MCCPanel from "./MCC/MCCPanel"
import PCCPanel from "./PCC/PCCPanel"

const MainMCCPCC = ({params} : any) => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TabMCC = [
    {
      label: "Make",
      key: "1",
      children: <MakeOfComponent params={params} handleSwitchTab={() => handleSwitchTab("2")} />,
    },
    {
      label: "Common Configuration",
      key: "2",
      children: <CommonConfiguration params={params} handleSwitchTab={() => handleSwitchTab("3")} />,
    },
    {
      label: "MCC",
      key: "3",
      children: <MCCPanel  />,
    },
    {
      label: "PCC",
      key: "4",
      children: <PCCPanel />,
    },
    {
      label: "MCCcumPCC",
      key: "5",
      children: <MCCcumPCCPanel />,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
    setActiveKey(key) // Update active tab
  }

  const handleSwitchTab = (key: string) => {
    setActiveKey(key) // Switch to the specified tab
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
