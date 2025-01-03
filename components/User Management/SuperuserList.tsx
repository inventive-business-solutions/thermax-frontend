"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { THERMAX_USER_API, USER_API } from "@/configs/api-endpoints";
import { BTG, TagColors } from "@/configs/constants";
import { useGetData } from "@/hooks/useCRUD";
import { useLoading } from "@/hooks/useLoading";
import { changeNameToKey, mergeLists } from "@/utils/helpers";
import SuperuserFormModal from "./SuperuserModal";
import { deleteUser } from "@/actions/user-actions";

interface DataType {
  key: string;
  first_name?: string;
  last_name?: string;
  division: string;
  creation: string;
  modified: string;
}

export default function SuperuserList() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userRow, setUserRow] = useState<any>(null);
  const [editEventTrigger, setEditEventTrigger] = useState(false);
  const superuserUrl = `${THERMAX_USER_API}?fields=["*"]&filters=[["is_superuser", "=",  "1"]]`;
  const { data: thermaxUserList } = useGetData(superuserUrl);
  const { data: userList } = useGetData(`${USER_API}?fields=["*"]`);
  const mergedList = mergeLists(
    [thermaxUserList, userList],
    [{ fromKey: "name", toKey: "name" }]
  );

  const { setLoading: setModalLoading } = useLoading();
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => (
        <span>
          {record?.first_name} {record?.last_name}
        </span>
      ),
    },
    {
      title: "Initials",
      dataIndex: "name_initial",
      key: "name_initial",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
      render: (text, record) => (
        <Tag color={TagColors[record.division as keyof typeof TagColors]}>
          {text}
        </Tag>
      ),
    },

    {
      title: "Modified Date",
      dataIndex: "modified",
      key: "modified",
      render: (text) => new Date(text).toDateString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => {
        return (
          <div className="flex justify-center gap-2">
            <Tooltip placement="top" title="Edit">
              <div className="rounded-full hover:bg-blue-100">
                <Button
                  type="link"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  disabled={record.division === BTG}
                />
              </div>
            </Tooltip>

            <Tooltip placement="top" title="Delete">
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={async () => await handleDelete(record.key)}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <div className="rounded-full hover:bg-red-100">
                  <Button
                    type="link"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    danger
                    disabled={record.division === BTG}
                  />
                </div>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleAdd = () => {
    setEditEventTrigger(!editEventTrigger);
    setEditMode(false);
    setUserRow(null);
    setOpen(true);
  };

  const handleEdit = (selectedRow: any) => {
    setEditEventTrigger(!editEventTrigger);
    setEditMode(true);
    setUserRow(selectedRow);
    setOpen(true);
  };

  const handleDelete = async (selectedRowID: string) => {
    try {
      await deleteUser(selectedRowID);
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Error deleting user");
      console.error("Error deleting user", error);
    } finally {
      mutate(superuserUrl);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">User Management</div>

        <div className="flex gap-3">
          <Tooltip title="Refresh">
            <div className="rounded-full hover:bg-blue-100">
              <Button
                type="link"
                shape="circle"
                icon={<SyncOutlined />}
                onClick={() => mutate(`${superuserUrl}?fields=["*"]`)}
              />
            </div>
          </Tooltip>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            iconPosition={"start"}
            onClick={handleAdd}
          >
            New Superuser
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table
          columns={columns}
          dataSource={changeNameToKey(mergedList)}
          pagination={{ size: "small" }}
          size="small"
        />
      </div>

      <SuperuserFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={userRow}
        editEventTrigger={editEventTrigger}
      />
    </div>
  );
}
