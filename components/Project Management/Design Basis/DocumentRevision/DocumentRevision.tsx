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
  DYNAMIC_DOCUMENT_API,
  LAYOUT_EARTHING,
  MAKE_OF_COMPONENT_API,
  MCC_CUM_PCC_MCC_PANEL,
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
} from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import { getThermaxDateFormat } from "utils/helpers"
import { createData, getData, updateData } from "actions/crud-actions"
import { DB_REVISION_STATUS, MCC_PANEL_TYPE, MCCcumPCC_PANEL_TYPE, PCC_PANEL_TYPE } from "configs/constants"
import { mutate } from "swr"
import { useCurrentUser } from "hooks/useCurrentUser"
import clsx from "clsx"
import ResubmitModel from "./ResubmitModel"

export default function DocumentRevision() {
  const userInfo = useCurrentUser()
  const params = useParams()
  const project_id = params.project_id
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
          `${MCC_CUM_PCC_MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]&fields=["*"]`
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

    console.log({
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
      const createRevisionData = await createData(DESIGN_BASIS_REVISION_HISTORY_API, false, {
        project_id: project_id,
        status: DB_REVISION_STATUS.Unsubmitted,
      })
      const new_revision_id = createRevisionData.name
      const generalInfoData = await getData(
        `${DESIGN_BASIS_GENERAL_INFO_API}/?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
      )
      await createData(`${DESIGN_BASIS_GENERAL_INFO_API}`, false, {
        ...generalInfoData[0],
        revision_id: new_revision_id,
      })
      const projectMainPkgData = await getData(
        `${PROJECT_MAIN_PKG_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
      )

      for (const projectMainPkg of projectMainPkgData || []) {
        const mainPkgId = projectMainPkg.name
        const mainPkgData = await getData(`${PROJECT_MAIN_PKG_API}/${mainPkgId}`)
        await createData(`${PROJECT_MAIN_PKG_API}`, false, {
          ...mainPkgData,
          revision_id: new_revision_id,
        })
      }

      const motorParameterData = await getData(
        `${MOTOR_PARAMETER_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      await createData(`${MOTOR_PARAMETER_API}`, false, {
        ...motorParameterData[0],
        revision_id: new_revision_id,
      })

      const makeOfComponentData = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      await createData(MAKE_OF_COMPONENT_API, false, {
        ...makeOfComponentData[0],
        revision_id: new_revision_id,
      })

      const commonConfigurationData = await getData(
        `${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      await createData(COMMON_CONFIGURATION, false, {
        ...commonConfigurationData[0],
        revision_id: new_revision_id,
      })

      const projectPanelData = await getData(
        `${PROJECT_PANEL_API}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
      )

      for (const projectPanel of projectPanelData || []) {
        const old_panel_id = projectPanel.name
        const createPanelData = await createData(PROJECT_PANEL_API, false, {
          ...projectPanel,
          revision_id: new_revision_id,
        })
        const new_panel_id = createPanelData.name
        await createData(DYNAMIC_DOCUMENT_API, false, {
          panel_id: new_panel_id,
        })

        const mccPanelData = await getData(
          `${MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${old_panel_id}"]]&fields=["*"]`
        )

        for (const mccPanel of mccPanelData || []) {
          await createData(MCC_PANEL, false, {
            ...mccPanel,
            revision_id: new_revision_id,
            panel_id: new_panel_id,
          })
        }

        const pccPanelData = await getData(
          `${PCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${old_panel_id}"]]&fields=["*"]`
        )

        for (const pccPanel of pccPanelData || []) {
          await createData(PCC_PANEL, false, {
            ...pccPanel,
            revision_id: new_revision_id,
            panel_id: new_panel_id,
          })
        }

        const mccCumPccMccPanelData = await getData(
          `${MCC_CUM_PCC_MCC_PANEL}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${old_panel_id}"]]&fields=["*"]`
        )

        for (const mccCumPccMccPanel of mccCumPccMccPanelData || []) {
          await createData(MCC_CUM_PCC_MCC_PANEL, false, {
            ...mccCumPccMccPanel,
            revision_id: new_revision_id,
            panel_id: new_panel_id,
          })
        }

        const mccPccPlcPanel1Data = await getData(
          `${MCC_PCC_PLC_PANEL_1}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${old_panel_id}"]]&fields=["*"]`
        )

        for (const mccPccPlcPanel1 of mccPccPlcPanel1Data || []) {
          await createData(MCC_PCC_PLC_PANEL_1, false, {
            ...mccPccPlcPanel1,
            revision_id: new_revision_id,
            panel_id: new_panel_id,
          })
        }

        const mccPccPlcPanel2Data = await getData(
          `${MCC_PCC_PLC_PANEL_2}?filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${old_panel_id}"]]&fields=["*"]`
        )

        for (const mccPccPlcPanel2 of mccPccPlcPanel2Data || []) {
          await createData(MCC_PCC_PLC_PANEL_2, false, {
            ...mccPccPlcPanel2,
            revision_id: new_revision_id,
            panel_id: new_panel_id,
          })
        }
      }

      const cableTrayLayoutData = await getData(
        `${CABLE_TRAY_LAYOUT}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
      )

      await createData(CABLE_TRAY_LAYOUT, false, {
        ...cableTrayLayoutData[0],
        revision_id: new_revision_id,
      })

      const earthingLayoutData = await getData(
        `${LAYOUT_EARTHING}?filters=[["revision_id", "=", "${revision_id}"]]&fields=["*"]`
      )

      await createData(LAYOUT_EARTHING, false, {
        ...earthingLayoutData[0],
        revision_id: new_revision_id,
      })

      await updateData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revision_id}`, false, {
        status: DB_REVISION_STATUS.Released,
      })
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
      title: "Document Name",
      dataIndex: "documentName",
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
            <div className={clsx(projectData.approver !== userInfo.email && "hidden")}>
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
            <div className={clsx(projectData.approver !== userInfo.email && "hidden")}>
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
