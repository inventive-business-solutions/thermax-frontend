"use client"
import { DeleteOutlined, EditOutlined, FolderAddOutlined, SyncOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { mutate } from "swr"
import { deleteData } from "actions/crud-actions"
import { getUsersUrl, USER_URL } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import UserModal from "./UserModal"

interface DataType {
  key: string
  name?: string
  email: string
  client_name: string
  project_name: string
  creation: string
  modified: string
}

const changeNameToKey = (projectList: any[]) => {
  if (!projectList) return []
  projectList.forEach((project) => {
    project.key = project.name
  })
  return projectList
}

export default function UserList() {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [userRow, setUserRow] = useState<any>(null)
  const { data: userList, isLoading } = useGetData(getUsersUrl)

  const columns: ColumnsType<DataType> = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record: any) => `${record?.first_name} ${record?.last_name}`,
    },
    { title: "Name Initial", dataIndex: "name_initial", key: "name_initial" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Created Date", dataIndex: "creation", key: "creation", render: (text) => new Date(text).toDateString() },
    { title: "Modified Date", dataIndex: "modified", key: "modified", render: (text) => new Date(text).toDateString() },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>

          <Tooltip placement="top" title="Delete">
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={async () => await handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="link" shape="circle" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ]

  const handleAdd = () => {
    setOpen(true)
    setEditMode(false)
    setUserRow(null)
  }

  const handleEdit = (selectedRow: any) => {
    setOpen(true)
    setEditMode(true)
    setUserRow(selectedRow)
  }

  const handleDelete = async (selectedRowID: string) => {
    await deleteData(`${USER_URL}/${selectedRowID}`)
    // Revalidate the cache
    mutate(getUsersUrl)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">User Management</div>

        <div className="flex gap-3">
          <Tooltip title="Refresh">
            <Button
              type="link"
              shape="circle"
              icon={<SyncOutlined spin={isLoading} />}
              onClick={() => mutate(getUsersUrl)}
            />
          </Tooltip>
          <Button type="primary" icon={<FolderAddOutlined />} iconPosition={"end"} onClick={handleAdd}>
            Add User
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table
          columns={columns}
          dataSource={changeNameToKey(userList)}
          pagination={{ size: "small", pageSize: 5 }}
          size="small"
        />
      </div>

      <UserModal open={open} setOpen={setOpen} editMode={editMode} values={userRow} />
    </div>
  )
}
