"use client"
import {
  CheckCircleOutlined,
  CloudDownloadOutlined,
  ExportOutlined,
  FolderOpenOutlined,
  RetweetOutlined,
  SyncOutlined,
} from "@ant-design/icons"
import { Button, message, Table, TableColumnsType, Tag, Tooltip } from "antd"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  CABLE_TRAY_LAYOUT,
  COMMON_CONFIGURATION,
  DESIGN_BASIS_GENERAL_INFO_API,
  DESIGN_BASIS_REVISION_HISTORY_API,
  LAYOUT_EARTHING,
  MAKE_OF_COMPONENT_API,
  MCC_PANEL,
  MCC_PCC_PLC_PANEL_1,
  MCC_PCC_PLC_PANEL_2,
  MOTOR_PARAMETER_API,
  PCC_PANEL,
  PROJECT_API,
  PROJECT_INFO_API,
  PROJECT_MAIN_PKG_API,
  PROJECT_PANEL_API,
  REVIEW_APPROVAL_EMAIL_API,
  REVIEW_SUBMISSION_EMAIL_API,
  THERMAX_USER_API,
} from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import { getThermaxDateFormat } from "utils/helpers"
import { createData, downloadFile, getData, updateData } from "actions/crud-actions"
import { DB_REVISION_STATUS, MCC_PANEL_TYPE, MCCcumPCC_PANEL_TYPE, PCC_PANEL_TYPE } from "configs/constants"
import { mutate } from "swr"
import { useCurrentUser } from "hooks/useCurrentUser"
import clsx from "clsx"
import ResubmitModel from "./ResubmitModel"
import { releaseRevision } from "actions/design-basis_revision"
import { getSuperuserEmail } from "actions/user-actions"

export default function DocumentRevision() {
  const userInfo = useCurrentUser()
  const params = useParams()
  const project_id = params.project_id as string
  const [submitIconSpin, setSubmitIconSpin] = useState(false)
  const [approvalIconSpin, setApprovalIconSpin] = useState(false)
  const [downloadIconSpin, setDownloadIconSpin] = useState(false)
  const [resubmitModalOpen, setResubmitModalOpen] = useState(false)
  const router = useRouter()

  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dbRevisionHistoryUrl = `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`

  const { data: revisionHistory } = useGetData(dbRevisionHistoryUrl)
  const { data: projectData } = useGetData(`${PROJECT_API}/${project_id}`)

  const handleReviewSubmission = async (revision_id: string) => {
    setSubmitIconSpin(true)
    try {
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
      setSubmitIconSpin(false)
    }
  }

  const handleDownload = async (revision_id: string) => {
    setDownloadIconSpin(true)
    const project = await getData(`${PROJECT_API}/${project_id}`)
    const projectInfo = await getData(`${PROJECT_INFO_API}/${project_id}`)
    const projectCreator = await getData(`${THERMAX_USER_API}/${project?.owner}`)
    const projectApprover = await getData(`${THERMAX_USER_API}/${project?.approver}`)
    const superuserEmail = await getSuperuserEmail(projectCreator?.division)
    const superuser = await getData(`${THERMAX_USER_API}/${superuserEmail}`)
    const documentRevisions = await getData(
      `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation desc`
    )
    const generalInfo = await getData(
      `${DESIGN_BASIS_GENERAL_INFO_API}/?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )
    const projectMainPackage = await getData(
      `${PROJECT_MAIN_PKG_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )
    const projectMainPkgData = []

    for (const projectMainPkg of projectMainPackage || []) {
      const projectMainPkgID = projectMainPkg.name
      const mainPkgData = await getData(`${PROJECT_MAIN_PKG_API}/${projectMainPkgID}`)
      projectMainPkgData.push(mainPkgData)
    }

    const motorParameters = await getData(
      `${MOTOR_PARAMETER_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    const makeOfComponents = await getData(
      `${MAKE_OF_COMPONENT_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    const commonConfigurations = await getData(
      `${COMMON_CONFIGURATION}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    const projectPanelData = await getData(
      `${PROJECT_PANEL_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    const finalProjectPanelData = []

    for (const projectPanel of projectPanelData || []) {
      const panel_id = projectPanel.name
      const panelType = projectPanel.panel_main_type
      if (panelType === MCC_PANEL_TYPE) {
        const mccPanelData = await getData(
          `${MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
        )
        finalProjectPanelData.push({
          ...projectPanel,
          panelData: mccPanelData[0],
        })
      }

      if (panelType === PCC_PANEL_TYPE) {
        const pccPanelData = await getData(
          `${PCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
        )
        finalProjectPanelData.push({
          ...projectPanel,
          panelData: pccPanelData[0],
        })
      }

      if (panelType === MCCcumPCC_PANEL_TYPE) {
        const mccCumPccMccPanelData = await getData(
          `${MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
        )

        const mccPccPlcPanel1Data = await getData(
          `${MCC_PCC_PLC_PANEL_1}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
        )

        const mccPccPlcPanel2Data = await getData(
          `${MCC_PCC_PLC_PANEL_2}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
        )

        finalProjectPanelData.push({
          ...projectPanel,
          mccPanelData: mccCumPccMccPanelData[0],
          plcPanelData: {
            ...mccPccPlcPanel1Data[0],
            ...mccPccPlcPanel2Data[0],
          },
        })
      }
    }

    const cableTrayLayoutData = await getData(
      `${CABLE_TRAY_LAYOUT}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    const earthingLayoutData = await getData(
      `${LAYOUT_EARTHING}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
    )

    try {
      const result = await downloadFile("/method/db_revision.get_design_basis_excel", true, {
        metadata: {
          prepared_by_initials: projectCreator?.initials,
          checked_by_initials: projectApprover?.initials,
          approved_by_initials: superuser?.initials,
          division_name: projectCreator?.division,
        },
        project,
        projectInfo,
        documentRevisions,
        generalInfo: generalInfo[0],
        projectMainPkgData,
        motorParameters: motorParameters[0],
        makeOfComponents: makeOfComponents[0],
        commonConfigurations: commonConfigurations[0],
        projectPanelData: finalProjectPanelData,
        cableTrayLayoutData: cableTrayLayoutData[0],
        earthingLayoutData: earthingLayoutData[0],
      })

      const payload = {
        metadata: {
          prepared_by_initials: projectCreator?.initials,
          checked_by_initials: projectApprover?.initials,
          approved_by_initials: superuser?.initials,
          division_name: projectCreator?.division,
        },
        project,
        projectInfo,
        documentRevisions,
        generalInfo: generalInfo[0],
        projectMainPkgData,
        motorParameters: motorParameters[0],
        makeOfComponents: makeOfComponents[0],
        commonConfigurations: commonConfigurations[0],
        projectPanelData: finalProjectPanelData,
        cableTrayLayoutData: cableTrayLayoutData[0],
        earthingLayoutData: earthingLayoutData[0],
      }

      // Log the payload
      console.log("Payload being sent:", JSON.stringify(payload, null, 2))

      const byteArray = new Uint8Array(result?.data?.data) // Convert the array into a Uint8Array
      const excelBlob = new Blob([byteArray.buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const url = window.URL.createObjectURL(excelBlob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "output.xlsx") // Filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error processing Excel file:", error)
    }

    setDownloadIconSpin(false)
  }

  const handleApprove = async (revision_id: string) => {
    setApprovalIconSpin(true)
    try {
      await updateData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revision_id}`, false, {
        status: DB_REVISION_STATUS.Approved,
      })

      await createData(REVIEW_APPROVAL_EMAIL_API, false, {
        approver_email: projectData?.approver,
        project_owner_email: projectData?.owner,
        project_oc_number: projectData?.project_oc_number,
        project_name: projectData?.project_name,
        subject: `Approved - EnIMAX - ${projectData?.project_oc_number}`,
      })
      mutate(dbRevisionHistoryUrl)
      message.success("Project approval email sent")
    } catch (error) {
      console.error(error)
    } finally {
      setApprovalIconSpin(false)
    }
  }

  const handleRelease = async (revision_id: string) => {
    setModalLoading(true)
    try {
      await releaseRevision(project_id, revision_id)
      mutate(dbRevisionHistoryUrl)
      message.success("Design Basis revision is released and locked")
    } catch (error) {
      console.error(error)
    } finally {
      setModalLoading(false)
    }
  }

  // Ensure columns is defined as an array of ColumnType
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
              router.push(`/project/${project_id}/design-basis/general-info`)
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
            <div>
              <Tooltip title={"Submit for Review"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <ExportOutlined
                      style={{
                        color: [
                          DB_REVISION_STATUS.Released,
                          DB_REVISION_STATUS.Submitted,
                          DB_REVISION_STATUS.Approved,
                        ].includes(record?.status)
                          ? "grey"
                          : "orange",
                      }}
                      spin={submitIconSpin}
                    />
                  }
                  onClick={async () => await handleReviewSubmission(record.key)}
                  disabled={[
                    DB_REVISION_STATUS.Released,
                    DB_REVISION_STATUS.Submitted,
                    DB_REVISION_STATUS.Approved,
                  ].includes(record?.status)}
                />
              </Tooltip>
            </div>
            <div className={clsx(projectData?.approver !== userInfo.email && "hidden")}>
              <Tooltip title={"Resubmit for Review"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <RetweetOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: [
                          DB_REVISION_STATUS.Released,
                          DB_REVISION_STATUS.Resubmitted,
                          DB_REVISION_STATUS.Approved,
                          DB_REVISION_STATUS.Unsubmitted,
                        ].includes(record?.status)
                          ? "grey"
                          : "#fcba2e",
                      }}
                    />
                  }
                  onClick={() => setResubmitModalOpen(true)}
                  disabled={[
                    DB_REVISION_STATUS.Released,
                    DB_REVISION_STATUS.Resubmitted,
                    DB_REVISION_STATUS.Approved,
                    DB_REVISION_STATUS.Unsubmitted,
                  ].includes(record?.status)}
                />
              </Tooltip>
            </div>
            <div className={clsx(projectData?.approver !== userInfo.email && "hidden")}>
              <Tooltip title={"Approve"}>
                <Button
                  type="link"
                  shape="circle"
                  icon={
                    <CheckCircleOutlined
                      style={{
                        color: [
                          DB_REVISION_STATUS.Released,
                          DB_REVISION_STATUS.Approved,
                          DB_REVISION_STATUS.Unsubmitted,
                          DB_REVISION_STATUS.Resubmitted,
                        ].includes(record?.status)
                          ? "grey"
                          : "green",
                      }}
                      spin={approvalIconSpin}
                    />
                  }
                  onClick={() => handleApprove(record.key)}
                  disabled={[
                    DB_REVISION_STATUS.Released,
                    DB_REVISION_STATUS.Approved,
                    DB_REVISION_STATUS.Unsubmitted,
                    DB_REVISION_STATUS.Resubmitted,
                  ].includes(record?.status)}
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
              disabled={record.status === DB_REVISION_STATUS.Released || record.status !== DB_REVISION_STATUS.Approved}
              onClick={() => handleRelease(record.key)}
            >
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
    <>
      <div className="text-end">
        <Button icon={<SyncOutlined color="#492971" />} onClick={() => mutate(dbRevisionHistoryUrl)}>
          {" "}
          Refresh
        </Button>
      </div>

      <div className="mt-2">
        <Table columns={columns} dataSource={dataSource} size="small" />
      </div>
      <ResubmitModel
        open={resubmitModalOpen}
        setOpen={setResubmitModalOpen}
        projectData={projectData}
        dbRevisionHistoryUrl={dbRevisionHistoryUrl}
      />
    </>
  )
}
