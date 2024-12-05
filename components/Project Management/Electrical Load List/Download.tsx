"use client"
import {
  BellFilled,
  CloudDownloadOutlined,
  CopyOutlined,
  DownloadOutlined,
  ExportOutlined,
  FolderOpenOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { getData } from "actions/crud-actions"
import { releaseRevision } from "actions/design-basis_revision"
import { getLatestLoadlistRevision } from "actions/electrical-load-list"
import { Button, message, Table, TableColumnsType, TableColumnType, Tabs, Tag, Tooltip } from "antd"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  DESIGN_BASIS_REVISION_HISTORY_API,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
} from "configs/api-endpoints"
import { DB_REVISION_STATUS } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { getThermaxDateFormat } from "utils/helpers"

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
  const { setLoading: setModalLoading } = useLoading()
  const router = useRouter()
  const [downloadIconSpin, setDownloadIconSpin] = useState(false)
  const [submitIconSpin, setSubmitIconSpin] = useState(false)

  const params = useParams()
  const project_id = params.project_id as string
  const dbLoadlistHistoryUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`
  const { data: revisionHistory } = useGetData(dbLoadlistHistoryUrl)
  const [dataSource, setDataSource] = useState<any[]>([])
  // const [cableScheduleData, setCableScheduleData] = useState<any[]>([])

  console.log(revisionHistory, "revisionHistory")

  useEffect(() => {
    if (revisionHistory?.length) {
      const dataSource = revisionHistory?.map((item: any, index: number) => ({
        key: item.name,
        documentName: "Load List",
        status: item.status,
        documentRevision: `R${index}`,
        createdDate: item.creation,
      }))
      setDataSource(dataSource)
    }
  }, [revisionHistory])

  console.log(revisionHistory, "revisionHistory")

  const handleDownload = async (revision_id: string) => {}

  const handleRelease = async (revision_id: string) => {
    setModalLoading(true)
    try {
      await releaseRevision(project_id, revision_id)
      mutate(dbLoadlistHistoryUrl)
      message.success("Load list revision is released and locked")
    } catch (error) {
      console.error(error)
    } finally {
      setModalLoading(false)
    }
  }
  // const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    console.log(dataSource)
  }, [dataSource])
  const getColumns = (tab: string) => {
    const columns: TableColumnsType = [
      {
        title: () => <div className="text-center">Document Name</div>,
        dataIndex: "documentName",
        align: "center",
        render: (text, record) => (
          <Tooltip title="Edit Revision" placement="top">
            <Button
              type="link"
              iconPosition="start"
              onClick={() => {
                setModalLoading(true)
                router.push(`/project/${project_id}/electrical-load-list/${tab}`)
              }}
              icon={<FolderOpenOutlined style={{ color: "#fef65b", fontSize: "1.2rem" }} />}
              disabled={record.status === DB_REVISION_STATUS.Released}
            >
              {text}
            </Button>
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
      {
        title: () => <div className="text-center">Created Date</div>,
        dataIndex: "createdDate",
        render: (text) => {
          const date = new Date(text)
          const stringDate = getThermaxDateFormat(date)
          return stringDate
        },
      },
      {
        title: () => <div className="text-center">Download</div>,
        dataIndex: "download",
        render(text, record) {
          return (
            <div className="flex flex-row justify-center gap-2 hover:cursor-pointer">
              <div>
                <Tooltip title={"Download"}>
                  <Button
                    type="link"
                    shape="circle"
                    icon={
                      <CloudDownloadOutlined
                        style={{
                          fontSize: "1rem",
                          color: "green",
                        }}
                        spin={downloadIconSpin}
                      />
                    }
                    onClick={() => handleDownload(record?.key)}
                  />
                </Tooltip>
              </div>
            </div>
          )
        },
      },
      {
        title: () => <div className="text-center">Release</div>,
        dataIndex: "release",
        render: (text, record) => {
          return (
            <div className="text-center">
              <Button
                type="primary"
                size="small"
                name="Release"
                disabled={record.status === DB_REVISION_STATUS.Released}
                onClick={() => handleRelease(record.key)}
              >
                Release
              </Button>
            </div>
          )
        },
      },
    ]
    return columns
  }

  const DownloadTabs = [
    {
      label: `DOWNLOAD ELECTRICAL LOAD LIST`,
      key: "1",
      children: (
        <>
          <div className="text-end">
            <Button icon={<SyncOutlined color="#492971" />} onClick={() => mutate(dbLoadlistHistoryUrl)}>
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table columns={getColumns("load-list")} dataSource={dataSource} size="small" />
          </div>
        </>
      ),
    },
    {
      label: `DOWNLOAD CABLE SCHEDULE`,
      key: "2",
      children: (
        <>
          <div className="text-end">
            <Button icon={<SyncOutlined color="#492971" />} onClick={() => mutate(dbLoadlistHistoryUrl)}>
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table columns={getColumns("cable-schedule")} dataSource={dataSource} size="small" />
          </div>
        </>
      ),
    },
    {
      label: `DOWNLOAD MOTOR CANOPY LIST`,
      key: "3",
      children: (
        <>
          <div className="text-end">
            <Button icon={<SyncOutlined color="#492971" />} onClick={() => mutate(dbLoadlistHistoryUrl)}>
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table columns={getColumns("motor-canopy")} dataSource={dataSource} size="small" />
          </div>
        </>
      ),
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
  const getApiEndpoint = (key: any) => {
    const baseUrl = `?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`
    switch (key) {
      case "1":
        return `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}${baseUrl}`
      case "2":
        return `${CABLE_SCHEDULE_REVISION_HISTORY_API}${baseUrl}`
      case "3":
        return `${MOTOR_CANOPY_REVISION_HISTORY_API}${baseUrl}`
      case "4":
        return `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/motor-spec${baseUrl}`
      case "5":
        return `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/lbps${baseUrl}`
      case "6":
        return `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/local-isolator${baseUrl}`
      default:
        return ""
    }
  }
  const onChange = async (key: string) => {
    console.log(key)
    console.log(getApiEndpoint(key))
    const getName = (key: any) => {
      switch (key) {
        case "1":
          return "Load List"
        case "2":
          return "Cable Schedule"
        case "3":
          return "Motor Canopy"
        case "4":
          return "Motor Specification"
        case "5":
          return "LPBS Specification"
        case "6":
          return "Local Isolator Specification"
        default:
          return ""
      }
    }
    try {
      const data = await getData(getApiEndpoint(key))
      console.log(data);
      
      const dataSource = data?.map((item: any, index: number) => ({
        key: item.name,
        documentName: getName(key),
        status: item.status,
        documentRevision: `R${index}`,
        createdDate: item.creation,
      }))
      console.log(dataSource);
      
      setDataSource(dataSource)
      console.log(data)
    } catch (error) {}
  }

  return (
    <>
      <Tabs onChange={onChange} type="card" items={DownloadTabs} />
    </>
  )
}

export default Download
