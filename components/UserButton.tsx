"use client"

import { DownOutlined, LogoutOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd"
import Link from "next/link"
import { signOut } from "next-auth/react"

export const UserButton = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: <Link href="/auth/change-password">Change Password</Link>,
    },
    {
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut(),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottomLeft" className="cursor-pointer">
      <Space>
        <Avatar src={"https://i.pravatar.cc/200"} size="large" icon={<UserOutlined />} />
      </Space>
    </Dropdown>
  )
}
