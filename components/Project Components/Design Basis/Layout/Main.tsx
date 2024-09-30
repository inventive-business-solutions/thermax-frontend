import { Tabs } from "antd"
import React, { useState } from "react"
import CableTray from "./CableTray"
import Earthing from "./Earthing"

const MainLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab

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
    console.log(key)
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
