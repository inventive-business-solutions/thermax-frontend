"use client"
import { BellFilled, CopyOutlined, DownloadOutlined, FolderOpenOutlined } from "@ant-design/icons"
import { Button, Table, TableColumnType, Tabs, Tooltip } from "antd"
import { useState } from "react"

interface TableDataType {
  key: React.Key
  documentName: React.ReactNode
  status: string
  documentRevision: string
  createdDate: string
  action: React.ReactNode
  download: React.ReactNode
  release: React.ReactNode
}

const columns: TableColumnType<TableDataType>[] = [
  { title: "Document Name", dataIndex: "documentName" },
  { title: "Status", dataIndex: "status" },
  { title: "Document Revision", dataIndex: "documentRevision" },
  { title: "Created Date", dataIndex: "createdDate" },
  { title: "Action", dataIndex: "action" },
  { title: "Download", dataIndex: "download", align: "left" },
  { title: "Release", dataIndex: "release" },
]

const DownloadTable = ({ dataSource }: { dataSource: TableDataType[] }) => {
  return <Table columns={columns} dataSource={dataSource} pagination={false} />
}

const Download: React.FC = () => {
  const [openTab, setOpenTab] = useState<string>("1")

  const dataSource: TableDataType[] = [
    {
      key: 1,
      documentName: (
        <div>
          <Tooltip title="Edit Revision" placement="top">
            <Button
              type="link"
              onClick={() => {
                setOpenTab("2")
              }}
              iconPosition="start"
              icon={<FolderOpenOutlined />}
            >
              Document 1
            </Button>
          </Tooltip>
        </div>
      ),
      status: "Approved",
      documentRevision: "Rev 1",
      createdDate: "2024-09-19",
      action: <CopyOutlined />,
      download: (
        <div className="flex flex-row justify-start gap-2">
          <DownloadOutlined />
          <BellFilled />
        </div>
      ),
      release: (
        <Button type="primary" size="small" name="Release">
          Release
        </Button>
      ),
    },
  ]

  const DownloadTabs = [
    {
      label: `DOWNLOAD ELECTRICAL LOAD LIST`,
      key: "1",
      children: <DownloadTable dataSource={dataSource} />,
    },
    {
      label: `DOWNLOAD CABLE SCHEDULE`,
      key: "2",
      children: <DownloadTable dataSource={dataSource} />,
    },
    {
      label: `DOWNLOAD MOTOR CANOPY LIST`,
      key: "3",
      children: <DownloadTable dataSource={dataSource} />,
    },
    {
      label: `DOWNLOAD MOTOR SPEC. & LIST`,
      key: "4",
      children: <DownloadTable dataSource={dataSource} />,
    },
    {
      label: `LBPS SPECIFICATIONS & LIST`,
      key: "5",
      children: <DownloadTable dataSource={dataSource} />,
    },
    {
      label: `LOCAL ISOLATOR SPECIFICATIONS LIST`,
      key: "6",
      children: <DownloadTable dataSource={dataSource} />,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
    setOpenTab(key)
  }

  return (
    <>
      <Tabs onChange={onChange} type="card" items={DownloadTabs} />
    </>
  )
}

export default Download
