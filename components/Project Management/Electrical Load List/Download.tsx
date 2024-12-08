"use client"
import {
  BellFilled,
  CloudDownloadOutlined,
  CopyOutlined,
  DownloadOutlined,
  ExportOutlined,
  FolderOpenOutlined,
  SaveTwoTone,
  SyncOutlined,
} from "@ant-design/icons"
import { getData, updateData } from "actions/crud-actions"
import { releaseRevision } from "actions/design-basis_revision"
import { Button, message, Table, TableColumnsType, TableColumnType, Tabs, Tag, Tooltip } from "antd"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  COMMON_CONFIGURATION,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  GET_LOAD_LIST_EXCEL_API,
  LOCAL_ISOLATOR_REVISION_HISTORY_API,
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
interface Props {
  designBasisRevisionId: string
  loadListLatestRevisionId: string
}

const Download: React.FC<Props> = ({ designBasisRevisionId, loadListLatestRevisionId }) => {
  const { setLoading: setModalLoading } = useLoading()
  const router = useRouter()
  const [downloadIconSpin, setDownloadIconSpin] = useState(false)
  const [submitIconSpin, setSubmitIconSpin] = useState(false)

  const params = useParams()
  const project_id = params.project_id as string
  const dbLoadlistHistoryUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`
  const { data: revisionHistory } = useGetData(dbLoadlistHistoryUrl)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [commonConfigData, setCommonConfigData] = useState<any[]>([])
  const [loadListData, setLoadListData] = useState<any[]>([])
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

  const handleDownload = async (revision_id: string) => {
    setDownloadIconSpin(true)
    const result = await downloadFile(GET_LOAD_LIST_EXCEL_API, true, {
      revision_id,
    })
    const byteArray = new Uint8Array(result?.data?.data) // Convert the array into a Uint8Array
    const excelBlob = new Blob([byteArray.buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    const url = window.URL.createObjectURL(excelBlob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `Electrical Load List.xlsx`) // Filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    try {
    } catch (error) {
      console.error(error)
    } finally {
      setDownloadIconSpin(false)
    }
  }

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
    const saveElement = {
      title: () => <div className="text-center">Save</div>,
      dataIndex: "download",
      render(text: any, record: any) {
        return (
          <div className="flex flex-row justify-center gap-2 hover:cursor-pointer">
            <div>
              <Tooltip title={"Save"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <SaveTwoTone
                      style={{
                        fontSize: "1rem",
                        color: "green",
                      }}
                    />
                  }
                  onClick={() => handleSave(record?.key, tab)}
                />
              </Tooltip>
            </div>
          </div>
        )
      },
    }
    if (tab === "local-isolator") {
      let position = columns.length - 2

      // Insert the element at the calculated position
      columns.splice(position, 0, saveElement)
    }
    return columns
  }
  // const getColumns = (tab: string) => {
  //   const columns: TableColumnsType = [
  //     {
  //       title: () => 'Document Name',
  //       dataIndex: "documentName",
  //       align: "center",
  //       render: (text, record) => (
  //         <Button
  //           onClick={() => {
  //             setModalLoading(true)
  //             router.push(`/project/${project_id}/electrical-load-list/${tab}`)
  //           }}
  //           icon={}
  //           disabled={record.status === DB_REVISION_STATUS.Released}
  //         >
  //           {text}
  //         </Button>
  //       ),
  //     },
  //     {
  //       title: () => 'Status',
  //       dataIndex: "status",
  //       render: (text) => (
  //         <span>{text}</span>
  //       ),
  //     },
  //     {
  //       title: () => 'Document Revision',
  //       dataIndex: "documentRevision",
  //       render: (text) => <span>{text}</span>,
  //     },
  //     {
  //       title: () => 'Created Date',
  //       dataIndex: "createdDate",
  //       render: (text) => {
  //         const date = new Date(text)
  //         const stringDate = getThermaxDateFormat(date)
  //         return stringDate
  //       },
  //     }
  //   ];

  //   // Add Save field if tab is local-isolator
  //   if (tab === 'local-isolator') {
  //     columns.push({
  //       title: () => 'Save',
  //       dataIndex: 'save',
  //       render: (text, record) => (
  //         <Button
  //           onClick={() => handleSave(record.key)}
  //         >
  //           Save
  //         </Button>
  //       ),
  //     });
  //   }

  //   // Add remaining columns
  //   columns.push(
  //     {
  //       title: () => 'Download',
  //       dataIndex: "download",
  //       render(text, record) {
  //         return (
  //           <Button
  //             onClick={() => handleDownload(record?.key)}
  //           />
  //         )
  //       },
  //     },
  //     {
  //       title: () => 'Release',
  //       dataIndex: "release",
  //       render: (text, record) => {
  //         return (
  //           <Button onClick={() => handleRelease(record.key)}>
  //             Release
  //           </Button>
  //         )
  //       },
  //     }
  //   );

  //   return columns
  // }

  const getSaveEndPoint = (id: any, tab: any) => {
    switch (tab) {
      case "local-isolator":
        return `${LOCAL_ISOLATOR_REVISION_HISTORY_API}${id}`

      default:
        return ""
    }
  }

  const handleSave = async (key: any, tab: any) => {
    if (tab === "local-isolator") {
      console.log(commonConfigData)
      console.log(loadListData)

      const payload = {
        project_id: project_id,
        status: "Not Released",
        description: "test",
        local_isolator_data: [
          {
            fmi_type: "",
            fmi_inclosure: "",
            fmi_material: "",
            fmi_qty: "",
            ifm_isolator_color_shade: "",
            ifm_cable_entry: "",
            canopy_on_top: "",
          },
        ],
        local_isolator_motor_details_data: [
          {
            serial_number: "",
            tag_number: "",
            service_description: "",
            working_kw: "",
            motor_rated_current: "",
            local_isolator: "",
            motor_location: "",
          },
        ],
      }
      // const respose = await updateData(getSaveEndPoint(key, tab), false, payload)

      // console.log(respose)
    }
    console.log(key, tab)
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
      children: (
        <>
          <div className="text-end">
            <Button icon={<SyncOutlined color="#492971" />} onClick={() => mutate(dbLoadlistHistoryUrl)}>
              {" "}
              Refresh
            </Button>
          </div>

          <div className="mt-2">
            <Table columns={getColumns("local-isolator")} dataSource={dataSource} size="small" />
          </div>
        </>
      ),
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
        return `${LOCAL_ISOLATOR_REVISION_HISTORY_API}${baseUrl}`
      default:
        return ""
    }
  }
  const getIsolatorData = async () => {
    console.log(designBasisRevisionId)

    try {
      const commonConfigData = await getData(
        `${COMMON_CONFIGURATION}?fields=["field_motor_type","field_motor_enclosure","field_motor_material", "field_motor_qty", "field_motor_isolator_color_shade", "field_motor_cable_entry","field_motor_canopy_on_top"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      )
      const loadListData = await getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`)
      setLoadListData(loadListData)
      setCommonConfigData(commonConfigData?.[0])
      console.log(loadListData, "loadlist")
      console.log(commonConfigData, "commonConfigData")
    } catch (error) {
      console.error(error)
    } finally {
      setModalLoading(false)
    }
  }
  const onChange = async (key: string) => {
    setModalLoading(true)

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
      console.log(data)

      const dataSource = data?.map((item: any, index: number) => ({
        key: item.name,
        documentName: getName(key),
        status: item.status,
        documentRevision: `R${index}`,
        createdDate: item.creation,
      }))
      if (key === "6") {
        await getIsolatorData()
      }
      console.log(dataSource)

      setDataSource(dataSource)
      console.log(data)
    } catch (error) {
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <>
      <Tabs onChange={onChange} type="card" items={DownloadTabs} />
    </>
  )
}

export default Download
