"use client"
import {
  BellFilled,
  BellTwoTone,
  CloudDownloadOutlined,
  CopyOutlined,
  DownloadOutlined,
  FolderOpenFilled,
  FolderOpenOutlined,
  FolderOpenTwoTone,
} from "@ant-design/icons"
import { Badge, Button, Table, TableColumnsType, Tag, Tooltip } from "antd"
import { ColumnType } from "antd/es/table"
import { useEffect } from "react"
import { useLoading } from "hooks/useLoading"

export default function DocumentRevision() {
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [])
  // Ensure columns is defined as an array of ColumnType
  const columns: TableColumnsType = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      render: (text) => (
        <Tooltip title="Edit Revision" placement="top">
          <Button
            type="link"
            iconPosition="start"
            icon={<FolderOpenOutlined style={{ color: "#fef65b", fontSize: "1.2rem" }} />}
          >
            {text}
          </Button>
        </Tooltip>
      ),
    },
    { title: "Status", dataIndex: "status", render: (text) => <Tag color="green">{text}</Tag> },
    { title: "Document Revision", dataIndex: "documentRevision" },
    { title: "Created Date", dataIndex: "createdDate" }, // New column added here
    { title: "Action", dataIndex: "action", render: (text) => <CopyOutlined /> },
    {
      title: () => <div className="text-center">Download</div>,
      dataIndex: "download",
      render(value, record, index) {
        return (
          <div className="flex flex-row justify-center gap-4 hover:cursor-pointer">
            <Tooltip title={"Download"}>
              <CloudDownloadOutlined style={{ fontSize: "1rem", color: "green" }} />
            </Tooltip>
            <div>
              <BellTwoTone style={{ fontSize: "1rem" }} twoToneColor={"red"} />
            </div>
          </div>
        )
      },
    },
    {
      title: "Release",
      dataIndex: "release",
      render: (text) => (
        <Button type="primary" size="small" name="Release">
          Release
        </Button>
      ),
    },
  ]
  const dataSource = [
    {
      key: 1,
      documentName: "Document 1",
      status: "Approved",
      documentRevision: "Rev 1",
      createdDate: "2024-09-19", // Sample created date
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} size="small" />
    </div>
  )
}
