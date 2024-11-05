"use client"
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  FolderAddOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, GetProps, Input, Popconfirm, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { deleteData, getData, updateData } from "actions/crud-actions"
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
  STATIC_DOCUMENT_API,
} from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import ProjectFormModal from "./ProjectFormModal"
import { UploadProjectFilesModal } from "./UploadProjectFilesModal"

interface DataType {
  key: string
  name?: string
  project_oc_number: string
  client_name: string
  project_name: string
  creation: string
  modified: string
}

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>

const changeNameToKey = (projectList: any[]) => {
  if (!projectList) return []
  projectList.forEach((project) => {
    project.key = project.name
  })
  return projectList
}

export default function ProjectList({ userInfo, isComplete }: any) {
  const [open, setOpen] = useState(false)
  const [uploadFileOpen, setUploadFileOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [projectRow, setProjectRow] = useState<any>(null)
  const getProjectUrl = `${PROJECT_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"], ["is_complete", "=", "${isComplete}"]]&order_by=creation desc`
  const { data: projectList, isLoading } = useGetData(getProjectUrl, false)
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: ColumnsType<DataType> = [
    { title: "Project OC No", dataIndex: "project_oc_number", key: "project_oc_number" },
    { title: "Client Name", dataIndex: "client_name" },
    {
      title: "Project",
      dataIndex: "project_name",
      key: "project_name",
      render: (text, record) => (
        <Link href={`/project/${record.name}`} className="hover:underline" onClick={() => setModalLoading(true)}>
          {record.project_name}
        </Link>
      ),
    },
    { title: "Created Date", dataIndex: "creation", key: "creation", render: (text) => new Date(text).toDateString() },
    { title: "Modified Date", dataIndex: "modified", key: "modified", render: (text) => new Date(text).toDateString() },
    { title: "Approver", dataIndex: "approver", key: "approver" },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (text, record: any) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          </Tooltip>
          <Tooltip placement="top" title="Upload Files">
            <Button type="link" shape="circle" icon={<UploadOutlined />} onClick={() => handleUploadFiles(record)} />
          </Tooltip>
          <Tooltip placement="top" title="Complete Project">
            <Popconfirm
              title="Are you sure to mark this project as complete?"
              onConfirm={async () => await handleCompleteProject(record)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="link" shape="circle" icon={<FileDoneOutlined />} />
            </Popconfirm>
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={async () => await handleDeleteProject(record.key)}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button type="link" shape="circle" icon={<DeleteOutlined />} danger />
            </Popconfirm>
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

  const handleEditProject = (selectedRow: any) => {
    setOpen(true)
    setEditMode(true)
    setProjectRow(selectedRow)
  }

  const handleUploadFiles = (selectedRow: any) => {
    setUploadFileOpen(true)
    setProjectRow(selectedRow)
  }

  const handleDeleteProject = async (selectedRowID: string) => {
    console.log("selectedRowID", selectedRowID)
    // Delete Project Information
    await deleteData(`${PROJECT_INFO_API}/${selectedRowID}`, false)

    // Delete Static Document List
    await deleteData(`${STATIC_DOCUMENT_API}/${selectedRowID}`, false)
    // Delete Design Basis Revision History
    const designBasisRevisionHistory = await getData(
      `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${selectedRowID}"]]&fields=["*"]`,
      false
    )
    console.log("designBasisRevisionHistory", designBasisRevisionHistory)
    designBasisRevisionHistory?.forEach(async (revision: any) => {
      const revisionID = revision.name
      console.log("revision", revision)
      // Delete Design Basis General Information
      const designBasisGeneralInfo = await getData(
        `${DESIGN_BASIS_GENERAL_INFO_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      designBasisGeneralInfo?.forEach(async (dbGeneralInfo: any) => {
        const dbGeneralInfoID = dbGeneralInfo.name
        console.log(`${revisionID}: dbGeneralInfoID`, dbGeneralInfoID)
        await deleteData(`${DESIGN_BASIS_GENERAL_INFO_API}/${dbGeneralInfoID}`, false)
      })
      console.log(`${revisionID}: designBasisGeneralInfo`, designBasisGeneralInfo)

      // Delete Motor Parameters
      const motorParameters = await getData(
        `${MOTOR_PARAMETER_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: motorParameters`, motorParameters)
      motorParameters?.forEach(async (motorParameter: any) => {
        const motorParameterID = motorParameter.name
        console.log(`${revisionID}: motorParameterID`, motorParameterID)
        await deleteData(`${MOTOR_PARAMETER_API}/${motorParameterID}`, false)
      })

      // Delete Project Main Package
      const projectMainPackage = await getData(
        `${PROJECT_MAIN_PKG_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: projectMainPackage`, projectMainPackage)
      projectMainPackage?.forEach(async (projectMainPkg: any) => {
        const projectMainPkgID = projectMainPkg.name
        console.log(`${revisionID}: projectMainPkgID`, projectMainPkgID)
        await deleteData(`${PROJECT_MAIN_PKG_API}/${projectMainPkgID}`, false)
      })

      // Delete Make of Components
      const makeOfComponents = await getData(
        `${MAKE_OF_COMPONENT_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: makeOfComponents`, makeOfComponents)
      makeOfComponents?.forEach(async (makeOfComponent: any) => {
        const makeOfComponentID = makeOfComponent.name
        console.log(`${revisionID}: makeOfComponentID`, makeOfComponentID)
        await deleteData(`${MAKE_OF_COMPONENT_API}/${makeOfComponentID}`, false)
      })

      // Delete Common Configuration
      const commonConfigurations = await getData(
        `${COMMON_CONFIGURATION}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: commonConfigurations`, commonConfigurations)
      commonConfigurations?.forEach(async (commonConfiguration: any) => {
        const commonConfigurationID = commonConfiguration.name
        console.log(`${revisionID}: commonConfigurationID`, commonConfigurationID)
        await deleteData(`${COMMON_CONFIGURATION}/${commonConfigurationID}`, false)
      })

      // Delete all MCC Panel Data
      const mccPanelData = await getData(
        `${MCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      if (mccPanelData) {
        mccPanelData?.forEach(async (mccPanel: any) => {
          const mccPanelID = mccPanel.name
          console.log(`${revisionID}: mccPanelID`, mccPanelID)
          await deleteData(`${MCC_PANEL}/${mccPanelID}`, false)
        })
      }

      // Delete all PCC Panel Data
      const pccPanelData = await getData(
        `${PCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      if (pccPanelData) {
        pccPanelData?.forEach(async (pccPanel: any) => {
          const pccPanelID = pccPanel.name
          console.log(`${revisionID}: pccPanelID`, pccPanelID)
          await deleteData(`${PCC_PANEL}/${pccPanelID}`, false)
        })
      }

      // Delete all MCC Cum PCC MCC Panel Data
      const mccCumPccMccPanelData = await getData(
        `${MCC_CUM_PCC_MCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      if (mccCumPccMccPanelData) {
        mccCumPccMccPanelData?.forEach(async (mccCumPccMccPanel: any) => {
          const mccCumPccMccPanelID = mccCumPccMccPanel.name
          console.log(`${revisionID}: mccCumPccMccPanelID`, mccCumPccMccPanelID)
          await deleteData(`${MCC_CUM_PCC_MCC_PANEL}/${mccCumPccMccPanelID}`, false)
        })
      }

      // Delete all MCC_PCC_PLC_PANEL_1 Data
      const mccPccPlcPanel1Data = await getData(
        `${MCC_PCC_PLC_PANEL_1}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )

      if (mccPccPlcPanel1Data) {
        mccPccPlcPanel1Data?.forEach(async (mccPccPlcPanel1: any) => {
          const mccPccPlcPanel1ID = mccPccPlcPanel1.name
          console.log(`${revisionID}: mccPccPlcPanel1ID`, mccPccPlcPanel1ID)
          await deleteData(`${MCC_PCC_PLC_PANEL_1}/${mccPccPlcPanel1ID}`, false)
        })
      }

      // Delete all MCC_PCC_PLC_PANEL_2 Data
      const mccPccPlcPanel2Data = await getData(
        `${MCC_PCC_PLC_PANEL_2}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )

      if (mccPccPlcPanel2Data) {
        mccPccPlcPanel2Data?.forEach(async (mccPccPlcPanel2: any) => {
          const mccPccPlcPanel2ID = mccPccPlcPanel2.name
          console.log(`${revisionID}: mccPccPlcPanel2ID`, mccPccPlcPanel2ID)
          await deleteData(`${MCC_PCC_PLC_PANEL_2}/${mccPccPlcPanel2ID}`, false)
        })
      }

      // Delete Cable Tray Layout Data
      const cableTrayLayoutData = await getData(
        `${CABLE_TRAY_LAYOUT}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: cableTrayLayoutData`, cableTrayLayoutData)
      cableTrayLayoutData?.forEach(async (cableTrayLayout: any) => {
        const cableTrayLayoutID = cableTrayLayout.name
        console.log(`${revisionID}: cableTrayLayoutID`, cableTrayLayoutID)
        await deleteData(`${CABLE_TRAY_LAYOUT}/${cableTrayLayoutID}`, false)
      })

      // Delete Earthing Layout Data
      const earthingLayoutData = await getData(
        `${LAYOUT_EARTHING}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: earthingLayoutData`, earthingLayoutData)
      earthingLayoutData?.forEach(async (earthingLayout: any) => {
        const earthingLayoutID = earthingLayout.name
        console.log(`${revisionID}: earthingLayoutID`, earthingLayoutID)
        await deleteData(`${LAYOUT_EARTHING}/${earthingLayoutID}`, false)
      })

      // Delete Project Panel Data
      const projectPanelData = await getData(
        `${PROJECT_PANEL_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`,
        false
      )
      console.log(`${revisionID}: projectPanelData`, projectPanelData)
      projectPanelData?.forEach(async (projectPanel: any) => {
        const projectPanelID = projectPanel.name
        console.log(`${revisionID}: projectPanelID`, projectPanelID)

        // Delete Dynamic Document List
        await deleteData(`${DYNAMIC_DOCUMENT_API}/${projectPanelID}`, false)

        // Delete project panel data
        await deleteData(`${PROJECT_PANEL_API}/${projectPanelID}`, false)
      })

      await deleteData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revisionID}`, false)
    })
    await deleteData(`${PROJECT_API}/${selectedRowID}`, false)

    mutate(getProjectUrl)
  }

  const handleCompleteProject = async (selectedRow: { name: string; is_complete: boolean }) => {
    await updateData(`${PROJECT_API}/${selectedRow?.name}`, false, { is_complete: !selectedRow?.is_complete })
    mutate(getProjectUrl)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">Project Console</div>
        <div className="basis-1/2">
          <Search placeholder="Search Project" enterButton onSearch={onSearch} />
        </div>
        <div className="flex gap-3">
          <Tooltip title="Refresh">
            <div className="rounded-full hover:bg-blue-100">
              <Button
                type="link"
                shape="circle"
                icon={<SyncOutlined spin={isLoading} />}
                onClick={() => mutate(getProjectUrl)}
              />
            </div>
          </Tooltip>
          <Button type="primary" icon={<FolderAddOutlined />} iconPosition={"end"} onClick={handleAddProject}>
            Add Project
          </Button>
        </div>
      </div>
      <div className="shadow-md">
        <Table
          columns={columns}
          bordered
          dataSource={changeNameToKey(projectList)}
          pagination={{ size: "small", pageSize: 5 }}
          size="small"
        />
      </div>
      <ProjectFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={projectRow}
        userInfo={userInfo}
        getProjectUrl={getProjectUrl}
      />
      <UploadProjectFilesModal
        open={uploadFileOpen}
        setOpen={setUploadFileOpen}
        values={projectRow}
        userInfo={userInfo}
      />
    </div>
  )
}
