"use client"
import { BellTwoTone, CloudDownloadOutlined, CopyTwoTone, FolderOpenOutlined } from "@ant-design/icons"
import { Button, Table, TableColumnsType, Tag, Tooltip } from "antd"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"

export default function DocumentRevision() {
  const params = useParams()
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ensure columns is defined as an array of ColumnType
  const columns: TableColumnsType = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      render: (text) => (
        <Tooltip title="Edit Revision" placement="top">
          <Link href={`/project/${params.project_id}/design-basis/general-info`}>
            <Button
              type="link"
              iconPosition="start"
              onClick={() => setModalLoading(true)}
              icon={<FolderOpenOutlined style={{ color: "#fef65b", fontSize: "1.2rem" }} />}
            >
              {text}
            </Button>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: () => <div className="text-center">Status</div>,
      dataIndex: "status",
      render: (text) => (
        <div className="text-center">
          <Tag color="green">{text}</Tag>
        </div>
      ),
    },
    {
      title: () => <div className="text-center">Document Revision</div>,
      dataIndex: "documentRevision",
      render: (text) => <div className="text-center">{text}</div>,
    },
    { title: "Created Date", dataIndex: "createdDate" }, // New column added here
    {
      title: () => <div className="text-center">Action</div>,
      dataIndex: "action",
      render: () => (
        <div className="text-center">
          <CopyTwoTone />
        </div>
      ),
    },
    {
      title: () => <div className="text-center">Download</div>,
      dataIndex: "download",
      render() {
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
      title: () => <div className="text-center">Release</div>,
      dataIndex: "release",
      render: () => (
        <div className="text-center">
          <Button type="primary" size="small" name="Release">
            Release
          </Button>
        </div>
      ),
    },
  ]
  const { data: revisionHistory } = useGetData(
    `${DESIGN_BASIS_REVISION_HISTORY_API}?fields=["*"]&order_by=creation desc`,
    false
  )
  const dataSource = revisionHistory?.map((item: any, index: number) => ({
    key: item.name,
    documentName: "Design Basis",
    status: item.status,
    documentRevision: `R${index}`,
    createdDate: item.creation,
  }))

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} size="small" />
    </div>
  )
}
