"use client"
import { DeleteOutlined, EditOutlined, SyncOutlined, UserAddOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"
import { mutate } from "swr"
import { deleteData } from "actions/crud-actions"
import { DIVISION_API, getUsersUrl, THERMAX_USER_API, USER_API } from "configs/api-endpoints"
import { BTG, TagColors } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import SuperuserModal from "./SuperuserModal"
import { record } from "zod"

interface DataType {
  key: string
  first_name?: string
  last_name?: string
  division: string
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

const mergeLists = (lists: any[][], relations: any[]) => {
  // Start with the first list as the base
  return lists.reduce((mergedList, currentList, index) => {
    if (index === 0) {
      return currentList // Start with the first list
    }

    const relation = relations[index - 1]
    const { fromKey, toKey } = relation

    // Create a Map from the current list for faster lookups
    const currentListMap = new Map(currentList?.map((item) => [item[toKey], item]))

    // Merge the current list with the accumulated merged list
    return mergedList
      ?.map((prevItem) => {
        const matchedItem = currentListMap.get(prevItem[fromKey])
        return matchedItem ? { ...prevItem, ...matchedItem } : null
      })
      .filter(Boolean) // Remove unmatched elements
  }, [])
}

export default function SuperuserList() {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [userRow, setUserRow] = useState<any>(null)
  const [editEventTrigger, setEditEventTrigger] = useState(false)
  const { data: userList } = useGetData(`${THERMAX_USER_API}?fields=["*"]&filters=[["is_superuser", "=",  "1"]]`, false)
  const { data: thermaxUserList } = useGetData(`${USER_API}?fields=["*"]`, false)
  const mergedList = mergeLists([userList, thermaxUserList], [{ fromKey: "name", toKey: "name" }])

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
      render: (text, record) => <Tag color={TagColors[record.division]}>{text}</Tag>,
    },

    { title: "Modified Date", dataIndex: "modified", key: "modified", render: (text) => new Date(text).toDateString() },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => {
        console.log(record)
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
                title="Are you sure to delete this project?"
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

  const handleEdit = (selectedRow: any) => {
    setEditEventTrigger(!editEventTrigger)
    setEditMode(true)
    setUserRow(selectedRow)
    console.log(selectedRow)
    setOpen(true)
  }

  const handleDelete = async (selectedRowID: string) => {
    await deleteData(`${USER_API}/${selectedRowID}`, true)
    // Revalidate the cache
    mutate(getUsersUrl)
  }

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
                onClick={() => mutate(`${DIVISION_API}?fields=["*"]`)}
              />
            </div>
          </Tooltip>
          <Button type="primary" icon={<UserAddOutlined />} iconPosition={"start"} onClick={handleAdd}>
            New Superuser
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table columns={columns} dataSource={changeNameToKey(mergedList)} pagination={{ size: "small" }} size="small" />
      </div>

      <SuperuserModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={userRow}
        editEventTrigger={editEventTrigger}
      />
    </div>
  )
}
