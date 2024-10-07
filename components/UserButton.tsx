"use client"

import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, MenuProps, Space } from "antd"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { RESET_PASSWORD, SIGN_IN } from "configs/constants"

export const UserButton = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={RESET_PASSWORD}>Change Password</Link>,
    },
    {
      key: "2",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut({ callbackUrl: SIGN_IN }),
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
