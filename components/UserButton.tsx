"use client"

import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, MenuProps, Space } from "antd"
import Link from "next/link"
import { signOut } from "next-auth/react"

export const UserButton = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/auth/change-password">Change Password</Link>,
    },
    {
      key: "2",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut(),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottomLeft" className="cursor-pointer">
      <Space>
        <Avatar icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  )
}
