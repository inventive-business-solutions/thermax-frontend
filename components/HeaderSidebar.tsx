"use client"
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import { Drawer, Menu, MenuProps, Tag } from "antd"
import { set } from "lodash"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BTG, HOME_PAGE, PACKAGE_PAGE, PROJECTS_PAGE, TagColors, USER_MANAGEMENT_PAGE } from "configs/constants"
import { useCurrentUser } from "hooks/useCurrentUser"
import { UserButton } from "./UserButton"
import { useLoading } from "hooks/useLoading"

type MenuItem = Required<MenuProps>["items"][number]

export default function HeaderSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const userInfo = useCurrentUser()
  const router = useRouter()
  const { setLoading } = useLoading()

  const handleLinkClick = (path: string) => {
    setLoading(true)
    setIsSidebarOpen(false)
    router.push(path)
  }

  const items: MenuItem[] = [
    {
      key: "1",
      label: <div onClick={() => handleLinkClick(HOME_PAGE)}>Dashboard</div>,
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: <div onClick={() => handleLinkClick(PROJECTS_PAGE)}> Project List</div>,
      icon: <UnorderedListOutlined />,
    },
    {
      key: "3",
      label: <div onClick={() => handleLinkClick(USER_MANAGEMENT_PAGE)}> User Management</div>,

      icon: <UserSwitchOutlined />,
    },
    {
      key: "4",
      label: <div onClick={() => handleLinkClick(PACKAGE_PAGE)}> Package Management</div>,
      icon: <AppstoreAddOutlined />,
    },
  ]

  const visibleItems = items.filter((item: any) => {
    if (userInfo?.division === BTG && item.key === "3") {
      return true
    }
    if (userInfo?.division !== BTG) {
      return true
    }
    return false
  })

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
          <Link href={"/"} className="hidden items-center gap-3 md:flex">
            <Image src={"/eni_max_logo.png"} alt="Thermax logo" width={35} height={35} className="rounded-full" />
            <span className="ml-1 text-xl font-bold text-slate-800">EniMax</span>
            <div>
              <Tag color={TagColors[userInfo?.division]}>{userInfo?.division} Division</Tag>
            </div>
          </Link>
        </div>
        <UserButton />
      </header>

      <Drawer placement="left" title="Thermax" onClose={toggleSidebar} open={isSidebarOpen} closable={false}>
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={visibleItems} />
      </Drawer>
    </div>
  )
}
