"use client"
import { AppstoreOutlined, MailOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Drawer, Flex, Menu, MenuProps } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { HOME_PAGE, PACKAGE_PAGE, PROJECT_LIST_PAGE, USER_MANAGEMENT_PAGE } from "configs/constants"
import { UserButton } from "./UserButton"
import LogoImage from "../public/assets/images/eni_max_logo.png"

type MenuItem = Required<MenuProps>["items"][number]

export default function HeaderSidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const items: MenuItem[] = [
    { key: "1", label: <Link href={HOME_PAGE}>Project Console</Link> },
    { key: "2", label: <Link href={PROJECT_LIST_PAGE}> Project List</Link> },
    { key: "3", label: <Link href={USER_MANAGEMENT_PAGE}>User Management</Link> },
    { key: "4", label: <Link href={PACKAGE_PAGE}>Add Packages</Link> },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <header className="sticky left-0 top-0 flex items-center justify-between border-b border-gray-300 p-2 shadow-md">
        <div className="flex items-center gap-2">
          <div
            className="grid size-11 cursor-pointer place-content-center rounded-full hover:bg-gray-300"
            onClick={toggleSidebar}
          >
            <MenuOutlined />
          </div>
          <Link href={"/"} className="hidden items-center gap-2 md:flex">
            <Image src={LogoImage} alt="Thermax logo" width={35} height={35} className="rounded-full" />
            <span className="ml-1 text-xl font-bold">Thermax</span>
          </Link>
        </div>
        <UserButton />
      </header>

      <Drawer placement="left" title="Thermax" onClose={toggleSidebar} open={isSidebarOpen} closable={false}>
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={items} />
      </Drawer>
    </div>
  )
}
