"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import CommonConfiguration from "./CommonConfiguration"
import MakeOfComponent from "./MakeOfComponent"
import MCCcumPCCPanel from "./MCCcumPCC"
import MCCcumPCCMCCPanel from "./MCCcumPCCMCC"
import MCCcumPCCPLCPanel from "./MCCcumPCCPLC"
import MCCPanel from "./MCCPanel"
import PCCPanel from "./PCCPanel"

const MCCcumPCC: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])

  const TabMCC = [
    {
      label: "Make",
      key: "1",
      children: <MCCcumPCCMCCPanel />,
    },
    {
      label: "Common Configuration",
      key: "2",
      children: <MCCcumPCCPLCPanel />,
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

export default MCCcumPCC
