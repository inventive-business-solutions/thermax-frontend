"use client"

import { DeleteOutlined, EditOutlined, SyncOutlined, UserAddOutlined } from "@ant-design/icons"
import { Button, message, Popconfirm, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { createData, deleteData, getData } from "actions/crud-actions"
import { DELETE_USER_EMAIL_API, NEXT_AUTH_USER_API, THERMAX_USER_API, USER_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import { changeNameToKey, mergeLists } from "utils/helpers"
import UserFormModal from "./UserModal"

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
  const { data: thermaxUserList } = useGetData(thermaxUserUrl)
  const { data: userList } = useGetData(`${USER_API}?fields=["*"]`)
  const mergedList = mergeLists([thermaxUserList, userList], [{ fromKey: "name", toKey: "name" }])
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEdit = (selectedRow: any) => {
    setEditEventTrigger(!editEventTrigger)
    setEditMode(true)
    setUserRow(selectedRow)
    setOpen(true)
  }

  const handleDelete = async (selectedRowID: string) => {
    try {
      const thermaxUser = await getData(`${THERMAX_USER_API}/${selectedRowID}`)
      await deleteData(`${THERMAX_USER_API}/${selectedRowID}`, false)
      await deleteData(`${NEXT_AUTH_USER_API}/${selectedRowID}`, false)
      await createData(`${DELETE_USER_EMAIL_API}`, false, {
        email: thermaxUser?.email,
        subject: "User Removal Notification - EnIMAX",
        division_name: thermaxUser?.division,
        is_superuser: 0,
        sent_by: "Team BTG",
      })
      await deleteData(`${USER_API}/${selectedRowID}`, false)
      message.success("User deleted successfully")
    } catch (error) {
      message.error("Error deleting user")
      console.error("Error deleting user", error)
    } finally {
      mutate(thermaxUserUrl)
    }
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
      render: (text, record: any) => {
        return (
          <div className="flex justify-center gap-2">
            <Tooltip placement="top" title="Edit">
              <div className="rounded-full hover:bg-blue-100">
                <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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
                    disabled={record.key === userInfo?.email || record.is_superuser === 1}
                  />
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
