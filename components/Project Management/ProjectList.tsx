"use client"
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  FolderAddOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, GetProps, Input, Popconfirm, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useState } from "react"
import { mutate } from "swr"
import { deleteData } from "actions/crud-actions"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import ProjectFormModal from "./ProjectFormModal"

interface DataType {
  key: string
  name?: string
  project_oc_number: string
  client_name: string
  project_name: string
  creation: string
  modified: string
}

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>

const changeNameToKey = (projectList: any[]) => {
  if (!projectList) return []
  projectList.forEach((project) => {
    project.key = project.name
  })
  return projectList
}

export default function ProjectList({ userInfo }: any) {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [projectRow, setProjectRow] = useState<any>(null)
  const getProjectUrl = `${PROJECT_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"]]&order_by=creation desc`
  const { data: projectList, isLoading } = useGetData(getProjectUrl, false)

  const columns: ColumnsType<DataType> = [
    { title: "Project OC No", dataIndex: "project_oc_number", key: "project_oc_number" },
    { title: "Client Name", dataIndex: "client_name" },
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      render: (text, record) => (
        <Link href={`/project/${record.name}`} className="hover:underline">
          {record.project_name}
        </Link>
      ),
    },
    { title: "Created Date", dataIndex: "creation", key: "creation", render: (text) => new Date(text).toDateString() },
    { title: "Modified Date", dataIndex: "modified", key: "modified", render: (text) => new Date(text).toDateString() },
    { title: "Approver", dataIndex: "approver", key: "approver" },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          </Tooltip>
          <Tooltip placement="top" title="Upload Files">
            <Button type="link" shape="circle" icon={<UploadOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Complete Project">
            <Button type="link" shape="circle" icon={<FileDoneOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={async () => await handleDeleteProject(record.key)}
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

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value)

  const handleAddProject = () => {
    setOpen(true)
    setEditMode(false)
    setProjectRow(null)
  }

  const handleEditProject = (selectedRow: any) => {
    setOpen(true)
    setEditMode(true)
    setProjectRow(selectedRow)
  }

  const handleDeleteProject = async (selectedRowID: string) => {
    await deleteData(`${PROJECT_API}/${selectedRowID}`, false)
    // Revalidate the cache
    mutate(getProjectUrl)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">Project Console</div>
        <div className="basis-1/2">
          <Search placeholder="Search Project" enterButton onSearch={onSearch} />
        </div>
        <div className="flex gap-3">
          <Tooltip title="Refresh">
            <Button
              type="link"
              shape="circle"
              icon={<SyncOutlined spin={isLoading} />}
              onClick={() => mutate(getProjectUrl)}
            />
          </Tooltip>
          <Button type="primary" icon={<FolderAddOutlined />} iconPosition={"end"} onClick={handleAddProject}>
            Add Project
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table
          columns={columns}
          dataSource={changeNameToKey(projectList)}
          pagination={{ size: "small", pageSize: 5 }}
          size="small"
        />
      </div>

      <ProjectFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={projectRow}
        userInfo={userInfo}
        getProjectUrl={getProjectUrl}
      />
    </div>
  )
}
