"use client"
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import { Drawer, Menu, MenuProps, Tag } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BTG_SUPERUSER, HOME_PAGE, PACKAGE_PAGE, PROJECTS_PAGE, USER_MANAGEMENT_PAGE } from "configs/constants"
import Loader from "./Loader"
import { UserButton } from "./UserButton"
import { useGetCurrentUserRole } from "hooks/use-current-user"

type MenuItem = Required<MenuProps>["items"][number]

export default function HeaderSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  let roles = useGetCurrentUserRole()

  console.log("roles", roles)

  const handleLinkClick = () => {
    setLoading(true)
    setIsSidebarOpen(false)
    setLoading(false)
  }

  const items: MenuItem[] = [
    {
      key: "1",
      label: (
        <Link href={HOME_PAGE} onClick={handleLinkClick}>
          Dashboard
        </Link>
      ),
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: (
        <Link href={PROJECTS_PAGE} onClick={handleLinkClick}>
          {" "}
          Project List
        </Link>
      ),
      icon: <UnorderedListOutlined />,
    },
    {
      key: "3",
      label: (
        <Link href={USER_MANAGEMENT_PAGE} onClick={handleLinkClick}>
          User Management
        </Link>
      ),
      icon: <UserSwitchOutlined />,
    },
    {
      key: "4",
      label: (
        <Link href={PACKAGE_PAGE} onClick={handleLinkClick}>
          Package Management
        </Link>
      ),
      icon: <AppstoreAddOutlined />,
    },
  ]

  const visibleItems = items.filter((item: any) => {
    if (roles.includes(BTG_SUPERUSER) && item.key === "3") {
      return true
    }
    if (!roles.includes(BTG_SUPERUSER)) {
      return true
    }
    return false
  })

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (loading) {
    return <Loader />
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
            <Image src={"/eni_max_logo.png"} alt="Thermax logo" width={35} height={35} className="rounded-full" />
            <span className="ml-1 text-xl font-bold">Thermax</span>
            <div>
              <Tag color="blue">{roles[0].replace("Superuser ", "")} Division</Tag>
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
