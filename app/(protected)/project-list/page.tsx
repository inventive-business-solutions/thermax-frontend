"use client"
import {
  AudioOutlined,
  DeleteFilled,
  EditFilled,
  FileDoneOutlined,
  FolderAddOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { Button, Divider, Flex, GetProps, Input, Modal, Table, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import Link from "next/link"
import { useState } from "react"
import ProjectForm from "components/ProjectForm"

interface DataType {
  key: React.Key
  PN: string
  client_name: string
  project: string
  start_date: string
  modified_date: string
  action: React.ReactNode
}

const columns: ColumnsType<DataType> = [
  { title: "Project OC No", dataIndex: "PN" },
  { title: "Client Name", dataIndex: "client_name" },
  {
    title: "Project",
    dataIndex: "project",
    render: (_: any, record: DataType) => {
      let link = record.project.replace(/ /g, "_")
      return (
        <Tooltip title="Open Project" placement="top">
          <Link href={`/project/${link}`}>{record.project}</Link>
        </Tooltip>
      )
    },
  },
  { title: "Start Date", dataIndex: "start_date" },
  { title: "Modified Date", dataIndex: "modified_date" },
  { title: "Action", dataIndex: "action" },
]

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  PN: `Edward King ${i}`,
  client_name: "32",
  project: `Project no. ${i}`,
  start_date: `01/07/2020`,
  modified_date: `01/02/2014`,
  action: (
    <Flex gap="middle">
      <Tooltip placement="top" title="Delete">
        <Button type="primary" shape="circle" size="middle" icon={<DeleteFilled />} danger />
      </Tooltip>
      <Tooltip placement="top" title="Edit">
        <Button type="primary" shape="circle" size="middle" icon={<EditFilled />} />
      </Tooltip>
      <Tooltip placement="top" title="Upload Files">
        <Button type="primary" shape="circle" size="middle" icon={<UploadOutlined />} />
      </Tooltip>
      <Tooltip placement="top" title="Complete Project">
        <Button type="primary" shape="circle" size="middle" icon={<FileDoneOutlined />} />
      </Tooltip>
    </Flex>
  ),
}))

const { Search } = Input

const suffix = <AudioOutlined />

type SearchProps = GetProps<typeof Input.Search>

const ProjectList = () => {
  const [loading, setLoading] = useState(false)
  const [help, setHelp] = useState(false)
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // const start = () => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000)
  // }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const onSubmit = () => {
    alert("Submited")
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between">
        <div>Project Console</div>
        <div>
          <Search placeholder="Search Project" enterButton onSearch={onSearch} />
        </div>
        <div className="flex gap-3">
          <Tooltip title="refresh" placement="top">
            <SyncOutlined spin={loading} color="#492971" />
          </Tooltip>
          <Button
            type="primary"
            icon={<FolderAddOutlined />}
            iconPosition={"end"}
            onClick={() => {
              setOpen(true)
              setHelp(false)
            }}
          >
            Add Project
          </Button>
          <Button
            type="primary"
            icon={<QuestionCircleOutlined />}
            iconPosition={"end"}
            onClick={() => {
              setOpen(true)
              setHelp(true)
            }}
          >
            Need Help
          </Button>
        </div>
      </div>

      <div className="shadow-md">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <Modal
        title={<span> {!help ? "Add Project" : "Watch a Video"} </span>}
        width={800}
        okText={!help ? "Submit" : "Close"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Divider />
        {help ? (
          <div className="flex items-center justify-center">
            <video width="620" height="540" controls preload="none">
              <source src="https://www.youtube.com/live/_lAcXv0oHPw?feature=shared" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <ProjectForm onSubmit={onSubmit} />
        )}
        <Divider />
      </Modal>
    </div>
  )
}

export default ProjectList
