"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import CommonConfiguration from "./CommonConfiguration"
import MakeOfComponent from "./MakeOfComponent"
import MCCcumPCCPanel from "./MCCcumPCC"
import MCCPanel from "./MCCPanel"
import PCCPanel from "./PCCPanel"

const MainMCCPCC: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [setModalLoading])

  const TabMCC = [
    {
      label: "Make",
      key: "1",
      children: <MakeOfComponent handleSwitchTab={() => handleSwitchTab("2")} />,
    },
    {
      label: "Common Configuration",
      key: "2",
      children: <CommonConfiguration handleSwitchTab={() => handleSwitchTab("3")} />,
    },
    {
      label: "MCC",
      key: "3",
      children: <MCCPanel />,
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
