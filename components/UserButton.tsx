"use client";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Modal, notification, Space } from "antd";
import { signOut } from "next-auth/react";
import { SIGN_IN } from "@/configs/constants";
import { verifyEmailandGenerateToken } from "@/actions/verification-token";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";

export const UserButton = () => {
  const userInfo = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const handleChangePassword = async () => {
    setLoading(true);
    const response = await verifyEmailandGenerateToken(userInfo.email);
    setLoading(false);
    if (response.status === "success") {
      setOpen(false);
      api["success"]({
        message: "Change password instruction sent to your email.",
      });
    } else {
      setOpen(false);
      api["error"]({
        message: response.message,
      });
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => setOpen(true)}>Change Password</div>,
    },
    {
      key: "2",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: async () => await signOut({ callbackUrl: SIGN_IN }),
    },
  ];
  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        className="cursor-pointer"
        trigger={["click"]}
      >
        <Space>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </Dropdown>
      <Modal
        title="Change Password"
        open={open}
        onOk={async () => await handleChangePassword()}
        onCancel={() => setOpen(false)}
        okButtonProps={{ loading }}
      >
        <p>Are you sure you want to change your password?</p>
      </Modal>
    </>
  );
};
