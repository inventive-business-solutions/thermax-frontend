"use client"
import { BellTwoTone, CloudDownloadOutlined, CopyTwoTone, ExportOutlined, FolderOpenOutlined } from "@ant-design/icons"
import { Button, message, Table, TableColumnsType, Tag, Tooltip } from "antd"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DESIGN_BASIS_REVISION_HISTORY_API, PROJECT_API, REVIEW_SUBMISSION_EMAIL_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import { getThermaxDateFormat } from "utils/helpers"
import { createData, getData, updateData } from "actions/crud-actions"
import { DB_REVISION_STATUS } from "configs/constants"
import { mutate } from "swr"

export default function DocumentRevision() {
  const params = useParams()
  const [iconSpin, setIconSpin] = useState(false)
  const router = useRouter()
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dbRevisionHistoryUrl = `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${params.project_id}"]]&fields=["*"]&order_by=creation asc`

  const { data: revisionHistory } = useGetData(dbRevisionHistoryUrl)

  const handleReviewSubmission = async (revision_id: string) => {
    setIconSpin(true)
    try {
      const projectData = await getData(`${PROJECT_API}/${params.project_id}`)
      await updateData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revision_id}`, false, {
        status: DB_REVISION_STATUS.Submitted,
      })

      await createData(REVIEW_SUBMISSION_EMAIL_API, false, {
        approver_email: projectData?.approver,
        project_owner_email: projectData?.owner,
        project_oc_number: projectData?.project_oc_number,
        project_name: projectData?.project_name,
        subject: `Design Basis Approval - EnIMAX - ${projectData?.project_oc_number}`,
      })
      mutate(dbRevisionHistoryUrl)
      message.success("Review submission email sent")
    } catch (error) {
      console.error(error)
    } finally {
      setIconSpin(false)
    }
  }

  const handleDownload = () => {
    console.log("Download")
  }

  // Ensure columns is defined as an array of ColumnType
  const columns: TableColumnsType = [
    {
      title: "Document Name",
      dataIndex: "documentName",
      render: (text, record) => (
        <Tooltip title="Edit Revision" placement="top">
          <Button
            type="link"
            iconPosition="start"
            onClick={() => {
              setModalLoading(true)
              router.push(`/project/${params.project_id}/design-basis/general-info`)
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
      title: "Created Date",
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
        console.log("record", record)
        return (
          <div className="flex flex-row justify-center gap-4 hover:cursor-pointer">
            <Tooltip title={"Download"}>
              <Button
                type="link"
                shape="circle"
                icon={
                  <CloudDownloadOutlined
                    style={{
                      fontSize: "1rem",
                      color: record.status === DB_REVISION_STATUS.Released ? "grey" : "green",
                    }}
                  />
                }
                disabled
                onClick={handleDownload}
              />
            </Tooltip>
            <Tooltip title={"Submit for Review"}>
              <Button
                type="link"
                shape="circle"
                icon={
                  <ExportOutlined
                    style={{ color: record.status === DB_REVISION_STATUS.Released ? "grey" : "orange" }}
                    spin={iconSpin}
                  />
                }
                onClick={async () => await handleReviewSubmission(record.key)}
                disabled={record.status === DB_REVISION_STATUS.Released}
              />
            </Tooltip>
          </div>
        )
      },
    },
    {
      title: () => <div className="text-center">Release</div>,
      dataIndex: "release",
      render: (text, record) => {
        console.log("record", record)
        return (
          <div className="text-center">
            <Button type="primary" size="small" name="Release" disabled={record.status !== DB_REVISION_STATUS.Approved}>
              Release
            </Button>
          </div>
        )
      },
    },
  ]

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
