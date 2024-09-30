"use client"
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  FolderAddOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, GetProps, Input, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useState } from "react"
import ProjectFormModal from "components/ProjectFormModal"
import { PROJECT_URL } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"

interface DataType {
  key: React.Key
  name?: string
  project_oc_number: string
  client_name: string
  project_name: string
  creation: string
  modified: string
}

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>

export default function ProjectList() {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [projectRow, setProjectRow] = useState<any>(null)
  const { data: projectList, isLoading } = useGetData(PROJECT_URL)

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
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: () => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Upload Files">
            <Button type="link" shape="circle" icon={<UploadOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Complete Project">
            <Button type="link" shape="circle" icon={<FileDoneOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Button type="link" shape="circle" icon={<DeleteOutlined />} danger />
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">Project Console</div>
        <div className="basis-1/2">
          <Search placeholder="Search Project" enterButton onSearch={onSearch} />
        </div>
        <div className="flex gap-3">
          <Tooltip title="refresh" placement="top">
            <SyncOutlined spin={isLoading} color="#492971" />
          </Tooltip>
          <Button type="primary" icon={<FolderAddOutlined />} iconPosition={"end"} onClick={handleAddProject}>
            Add Project
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table columns={columns} dataSource={projectList} pagination={{ size: "small", pageSize: 5 }} size="small" />
      </div>

      <ProjectFormModal open={open} setOpen={setOpen} editMode={editMode} values={projectRow} />
    </div>
  )
}
