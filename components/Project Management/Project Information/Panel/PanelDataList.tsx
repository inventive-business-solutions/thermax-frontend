import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table, Tooltip } from "antd"
import { useState } from "react"
import { mutate } from "swr"
import { deleteData } from "actions/crud-actions"
import { DYNAMIC_DOCUMENT_API, PROJECT_PANEL_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { changeNameToKey } from "utils/helpers"
import PanelFormModal from "./PanelFormModal"

export default function PanelDataList({ projectId }: any) {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [projectRow, setProjectRow] = useState<any>(null)
  const getProjectPanelDataUrl = `${PROJECT_PANEL_API}?fields=["name", "project_id", "panel_name", "panel_type"]&filters=[["project_id", "=", "${projectId}"]]`
  const { data: projectPanelData } = useGetData(getProjectPanelDataUrl, false)

  const columns = [
    { title: "Panel Name", dataIndex: "panel_name", key: "panel_name" },
    { title: "Panel Type", dataIndex: "panel_type", key: "panel_type" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Edit">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditPanel(record)} />
          </Tooltip>

          <Tooltip placement="top" title="Delete">
            <Popconfirm
              title="Are you sure to delete this panel?"
              onConfirm={async () => await handleDeletePanel(record.name)}
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
  const handleAddPanel = () => {
    setOpen(true)
    setEditMode(false)
    setProjectRow(null)
  }

  const handleEditPanel = async (record: any) => {
    setOpen(true)
    setEditMode(true)
    setProjectRow(record)
    console.log("record", record)
  }

  const handleDeletePanel = async (selectedRowID: string) => {
    await deleteData(`${DYNAMIC_DOCUMENT_API}/${selectedRowID}`, false)
    await deleteData(`${PROJECT_PANEL_API}/${selectedRowID}`, false)
    // Revalidate the cache
    mutate(getProjectPanelDataUrl)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-slate-800">Panel Summary</h4>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-700">Number of Panels: {projectPanelData?.length}</h4>
          <Button
            type="primary"
            iconPosition="start"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleAddPanel()}
          >
            Add Panel
          </Button>
        </div>
      </div>
      <PanelFormModal
        open={open}
        setOpen={setOpen}
        editMode={editMode}
        values={projectRow}
        getProjectPanelUrl={getProjectPanelDataUrl}
        projectId={projectId}
      />
      <Table columns={columns} dataSource={changeNameToKey(projectPanelData)} bordered size="small" />
    </div>
  )
}
