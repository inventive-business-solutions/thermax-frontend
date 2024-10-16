"use client"

import { DeleteOutlined, EditOutlined, SyncOutlined, UserAddOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table, Tag, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { deleteData } from "actions/crud-actions"
import { getUsersUrl, THERMAX_USER_API, USER_API } from "configs/api-endpoints"
import { BTG, TagColors } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import { changeNameToKey, mergeLists } from "utils/helpers"
import UserFormModal from "./UserModal"
import { useLoading } from "hooks/useLoading"

interface DataType {
  key: string
  first_name?: string
  last_name?: string
  division: string
  creation: string
  modified: string
}

export const UserList = ({ userInfo }: any) => {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [userRow, setUserRow] = useState<any>(null)
  const [editEventTrigger, setEditEventTrigger] = useState(false)
  const thermaxUserUrl = `${THERMAX_USER_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"]]`
  const { data: thermaxUserList } = useGetData(thermaxUserUrl, false)
  const { data: userList } = useGetData(`${USER_API}?fields=["*"]`, false)
  const mergedList = mergeLists([thermaxUserList, userList], [{ fromKey: "name", toKey: "name" }])
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])

  const handleEdit = (selectedRow: any) => {
    setEditEventTrigger(!editEventTrigger)
    setEditMode(true)
    setUserRow(selectedRow)
    setOpen(true)
  }

  const handleDelete = async (selectedRowID: string) => {
    await deleteData(`${USER_API}/${selectedRowID}`, true)
    // Revalidate the cache
    mutate(getUsersUrl)
  }

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
                <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
              </div>
            </Tooltip>

            <Tooltip placement="top" title="Delete">
              <Popconfirm
                title="Are you sure to delete this project?"
                onConfirm={async () => await handleDelete(record.key)}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <div className="rounded-full hover:bg-red-100">
                  <Button type="link" shape="circle" icon={<DeleteOutlined />} danger disabled />
                </div>
              </Popconfirm>
            </Tooltip>
          </div>
        )
      },
    },
  ]

  const handleAdd = () => {
    setEditEventTrigger(!editEventTrigger)
    setOpen(true)
    setEditMode(false)
    setUserRow(null)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">User Management</div>

        <div className="flex gap-3">
          <Tooltip title="Refresh">
            <div className="rounded-full hover:bg-blue-100">
              <Button type="link" shape="circle" icon={<SyncOutlined />} onClick={() => mutate(thermaxUserUrl)} />
            </div>
          </Tooltip>
          <Button type="primary" icon={<UserAddOutlined />} iconPosition={"start"} onClick={handleAdd}>
            New User
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table columns={columns} dataSource={changeNameToKey(mergedList)} pagination={{ size: "small" }} size="small" />
      </div>

      <UserFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={userRow}
        editEventTrigger={editEventTrigger}
        userInfo={userInfo}
      />
    </div>
  )
}
