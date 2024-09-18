"use client"
import { SyncOutlined } from "@ant-design/icons"
import { Button, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useState } from "react"

interface DataType {
  key: React.Key
  PN: string
  client_name: string
  project: string
  start_date: string
  modified_date: string
  action: React.ReactNode
}

const columns: ColumnsType<DataType> = [
  { title: "Project OC No", dataIndex: "PN" },
  { title: "Client Name", dataIndex: "client_name" },
  { title: "Project", dataIndex: "project" },
  { title: "Start Date", dataIndex: "start_date" },
  { title: "Modified Date", dataIndex: "modified_date" },
  { title: "Action", dataIndex: "action" },
]

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  PN: `Edward King ${i}`,
  client_name: "32",
  project: `Project no. ${i}`,
  start_date: `01/07/2020`,
  modified_date: `01/02/2014`,
  action: (
    <Button type="primary" shape="circle" size="middle">
      D
    </Button>
  ),
}));

const ProjectList = () => {
  const [loading, setLoading] = useState(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem", paddingTop:"1.4rem" }} className="flex flex-col gap-1">
      <div style={{fontSize:"2rem"}}>Project Console</div>
      <div className="flex items-center justify-end gap-2">
        <div className="flex cursor-pointer items-center gap-2">
          <Tooltip title="refresh" placement="topLeft">
            <SyncOutlined spin={loading} color="#492971" />
          </Tooltip>
          <Button type="primary" danger loading={loading}>
            Bulk Delete
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default ProjectList