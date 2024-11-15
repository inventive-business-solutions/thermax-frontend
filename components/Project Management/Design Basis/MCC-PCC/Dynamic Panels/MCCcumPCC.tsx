"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import MCCcumPCCMCCPanel from "./MCCcumPCCMCC"
import MCCcumPCCPLCPanel from "./MCCcumPCCPLC"

const MCCcumPCC = ({ revision_id, panel_id }: { revision_id: string; panel_id: string }) => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TabMCC = [
    {
      label: "MCC",
      key: "1",
      children: <MCCcumPCCMCCPanel revision_id={revision_id} panel_id={panel_id} />,
    },
    {
      label: "PLC",
      key: "2",
      children: <MCCcumPCCPLCPanel revision_id={revision_id} panel_id={panel_id} />,
    },
  ]

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

export default MCCcumPCC
