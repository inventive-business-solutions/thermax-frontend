"use client"
import { AppstoreOutlined, MailOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Drawer, Menu, MenuProps } from "antd"
import Link from "next/link"
import { useState } from "react"
import { UserButton } from "./UserButton"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13", label: <Link href="/">Home</Link> },
      { key: "14", label: <Link href="/form">Form Components</Link> },
      { key: "15", label: <Link href="/table">Table</Link> },
    ],
  },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Item 1",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
      {
        key: "g2",
        label: "Item 2",
        type: "group",
        children: [
          { key: "3", label: "Option 3" },
          { key: "4", label: "Option 4" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      { key: "11", label: "Option 11" },
      { key: "12", label: "Option 12" },
    ],
  },
]

export default function HeaderSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <header className="sticky left-0 top-0 flex items-center justify-between border-b border-gray-300 p-4 shadow-md">
        <Button type="primary" onClick={toggleSidebar}>
          <MenuOutlined />
        </Button>
        <UserButton />
      </header>

      <Drawer
        placement="left"
        title="Company Logo & Title"
        onClose={toggleSidebar}
        open={isSidebarOpen}
        closable={false}
      >
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={items} />
      </Drawer>
    </div>
  )
}
