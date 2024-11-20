"use client"
import {
  DeleteOutlined,
  EditOutlined,
  FileDoneOutlined,
  FolderAddOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, GetProps, Input, Popconfirm, Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { updateData } from "actions/crud-actions"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import ProjectFormModal from "./ProjectFormModal"
import { UploadProjectFilesModal } from "./UploadProjectFilesModal"
import { getThermaxDateFormat } from "utils/helpers"
import { deleteProject } from "actions/project"
import { TagColors } from "configs/constants"

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
  const [projectListData, setProjectListData] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState("")
  console.log("userInfo", userInfo)

  let getProjectUrl = `${PROJECT_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"], ["is_complete", "=", "${isComplete}"]]&order_by=creation desc`
  if (userInfo.is_superuser) {
    getProjectUrl = `${PROJECT_API}?fields=["*"]&filters=[["is_complete", "=", "${isComplete}"]]&order_by=creation desc`
  }
  const { data: projectList, isLoading } = useGetData(getProjectUrl)
  console.log("projectList", projectList)
  const projectOCNos = projectList?.map((project: any) => project.project_oc_number)
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filteredList = projectList?.filter((project: any) =>
      Object.values(project).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setProjectListData(filteredList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList, searchQuery])

  const columns: ColumnsType<DataType> = [
    {
      title: () => <div className="text-center">Division</div>,
      dataIndex: "division",
      key: "division",
      render: (text: keyof typeof TagColors) => {
        return <Tag color={TagColors[text]}>{text}</Tag>
      },
    },
    {
      title: () => <div className="text-center">Project OC No</div>,
      dataIndex: "project_oc_number",
      key: "project_oc_number",
      render: (text) => {
        return <div className="text-center">{text}</div>
      },
    },
    {
      title: () => <div className="text-center">Client Name</div>,
      dataIndex: "client_name",
      render: (text) => {
        return <div className="text-center">{text}</div>
      },
    },
    {
      title: () => <div className="text-center">Project</div>,
      dataIndex: "project_name",
      align: "center",
      key: "project_name",

      render: (text, record) => (
        <Link
          href={`/project/${record.name}`}
          className="text-center hover:underline"
          onClick={() => setModalLoading(true)}
        >
          {record.project_name}
        </Link>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "creation",
      key: "creation",
      align: "center",
      render: (text) => {
        const date = new Date(text)
        const stringDate = getThermaxDateFormat(date)
        return stringDate
      },
    },
    {
      title: () => <div className="text-center">Modified Date</div>,
      dataIndex: "modified",
      key: "modified",
      align: "center",
      render: (text) => {
        const date = new Date(text)
        const stringDate = getThermaxDateFormat(date)
        return stringDate
      },
    },
    {
      title: () => <div className="text-center">Project Creator</div>,
      dataIndex: "owner",
      key: "owner",
      render: (text) => {
        return <div className="text-center">{text}</div>
      },
    },
    {
      title: () => <div className="text-center">Approver</div>,
      dataIndex: "approver",
      key: "approver",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      hidden: isComplete === 1,
      render: (text, record: any) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          </Tooltip>
          <Tooltip placement="top" title="Upload Files">
            <Button type="link" shape="circle" icon={<UploadOutlined />} onClick={() => handleUploadFiles(record)} />
          </Tooltip>
          {Boolean(userInfo.is_superuser) && (
            <>
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
            </>
          )}
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
    try {
      await deleteProject(selectedRowID)
    } catch (error) {
      console.error("Error deleting project", error)
    }
    mutate(getProjectUrl)
  }

  const handleCompleteProject = async (selectedRow: { name: string; is_complete: boolean }) => {
    await updateData(`${PROJECT_API}/${selectedRow?.name}`, false, { is_complete: !selectedRow?.is_complete })
    mutate(getProjectUrl)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-lg font-bold tracking-wide">
          {isComplete === 1 ? "Completed Project Console" : "Project Console"}
        </div>
        <div className="basis-1/2">
          <Search
            placeholder="Search Project"
            enterButton
            onSearch={onSearch}
            allowClear
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
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
          {!(isComplete === 1) && (
            <Button type="primary" icon={<FolderAddOutlined />} iconPosition={"end"} onClick={handleAddProject}>
              Add Project
            </Button>
          )}
        </div>
      </div>
      <div className="shadow-md">
        <Table
          columns={columns}
          bordered
          dataSource={changeNameToKey(projectListData)}
          pagination={{ size: "small", pageSize: 8 }}
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
        projectOCNos={projectOCNos}
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
