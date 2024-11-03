"use client"
import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import { useLoading } from "hooks/useLoading"
import CableTray from "./CableTray/CableTray"
import Earthing from "./Earthing/Earthing"

const MainLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TabMCC = [
    {
      label: "Cable Tray",
      key: "1",
      children: <CableTray />,
    },
    {
      label: "Earthing",
      key: "2",
      children: <Earthing />,
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

export default MainLayout
