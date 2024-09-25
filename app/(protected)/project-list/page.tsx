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
        <Button
          type="primary"
          shape="circle"
          size="middle"
          icon={<DeleteFilled style={{ fontSize: "1.3rem" }} />}
          danger
        />
      </Tooltip>
      <Tooltip placement="top" title="Edit">
        <Button type="primary" shape="circle" size="middle" icon={<EditFilled style={{ fontSize: "1.3rem" }} />} />
      </Tooltip>
      <Tooltip placement="top" title="Upload Files">
        <Button type="primary" shape="circle" size="middle" icon={<UploadOutlined style={{ fontSize: "1.3rem" }} />} />
      </Tooltip>
      <Tooltip placement="top" title="Complete Project">
        <Button
          type="primary"
          shape="circle"
          size="middle"
          icon={<FileDoneOutlined style={{ fontSize: "1.3rem" }} />}
        />
      </Tooltip>
    </Flex>
  ),
}))

const { Search } = Input

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
)

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
    <div style={{ marginLeft: "1rem", marginRight: "1rem", paddingTop: "1.4rem" }} className="flex flex-col gap-1">
      <div className="flex flex-row items-center justify-between">
        <div style={{ fontSize: "2rem" }}>Project Console</div>
        <div style={{ fontSize: "2rem" }}>
          <Search placeholder="Search Project" enterButton size="large" onSearch={onSearch} />
        </div>
        <div style={{ fontSize: "2rem" }} className="flex gap-3">
          <Button
            size="large"
            type="primary"
            icon={<FolderAddOutlined style={{ fontSize: "1.5rem" }} />}
            iconPosition={"end"}
            onClick={() => {
              setOpen(true)
              setHelp(false)
            }}
          >
            Add Project
          </Button>
          <Button
            style={{ backgroundColor: "#ffc107 !important", color: "black" }}
            size="large"
            type="primary"
            icon={<QuestionCircleOutlined style={{ fontSize: "1.3rem" }} />}
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
      <div className="flex items-center justify-end gap-2">
        <div className="flex cursor-pointer items-center gap-2">
          <Tooltip title="refresh" placement="top">
            <SyncOutlined style={{ fontSize: "1.5rem" }} spin={loading} color="#492971" />
          </Tooltip>
        </div>
      </div>
      <div className="shadow-md">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <Modal
        title={
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}> {!help ? "Add Project" : "Watch a Video"} </span>
        }
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
