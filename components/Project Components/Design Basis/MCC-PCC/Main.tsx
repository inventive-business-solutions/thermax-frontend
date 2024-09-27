import React, { useState } from "react"
import { Tabs } from "antd"
import MakeOfComponent from "./MakeOfComponent"
import CommonConfiguration from "./commonConfiguration"
import MccComponent from "./MccComponent"

const MainMCC: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>("1") // Default active tab

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
      children: <MccComponent />,
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

export default MainMCC
