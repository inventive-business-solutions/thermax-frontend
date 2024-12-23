import { Button } from "antd"
import Modal from "components/Modal/Modal"
import React from "react"

import { Divider, Radio, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { useGetData } from "hooks/useCRUD"
interface Props {
  isOpen: boolean
  onClose: () => void
  panelType: string
  revision_id: string
  panel_id: string
}

const AddIncomer: React.FC<Props> = ({ isOpen, onClose, panelType, revision_id, panel_id }) => {
    const getPanelDoctype = (name:string)=>{
        switch (name) {
            case "MCC":
            //   return `${LOCAL_ISOLATOR_REVISION_HISTORY_API}${id}`
      
            default:
              return ""
          }
    }
  const { data: panelData, isLoading } = useGetData(
    `${panelType}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  )
  console.log(panelData);
  
  const columns: TableColumnsType<any> = [
    {
      title: "Model Number",
      dataIndex: "model",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ]

  const data: any[] = [
    {
      key: "1",
      model: "John Brown",
      rating: 32,
      type: "New York No. 1 Lake Park",
      quantity: "New York No. 1 Lake Park",
      description: "Microprocessor Trip Unit, ETU320 LI,3 POLE,85kA,40A ",
    },
    {
      key: "1",
      model: "John Brown",
      rating: 32,
      type: "New York No. 1 Lake Park",
      quantity: "New York No. 1 Lake Park",
      description: "Microprocessor Trip Unit, ETU320 LI,3 POLE,85kA,40A ",
    },
    {
      key: "1",
      model: "John Brown",
      rating: 32,
      type: "New York No. 1 Lake Park",
      quantity: "New York No. 1 Lake Park",
      description: "Microprocessor Trip Unit, ETU320 LI,3 POLE,85kA,40A ",
    },
    {
      key: "1",
      model: "John Brown",
      rating: 32,
      type: "New York No. 1 Lake Park",
      quantity: "New York No. 1 Lake Park",
      description: "Microprocessor Trip Unit, ETU320 LI,3 POLE,85kA,40A ",
    },
  ]
  const rowSelection: TableProps<any>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-100 max-h-screen min-h-screen overflow-auto">
      <div className="flex items-center justify-start gap-4">
        <p className="font-semibold text-blue-500">Recommended Rating for Incomer (Ampere)</p>
        <p>1000</p>
        <Button type="primary" onClick={() => {}} disabled={true}>
          Add Incomer
        </Button>
        <p className="font-semibold text-blue-500">Make</p>
        <p>Seimens</p>
        <p className="font-semibold text-blue-500">Device</p>
        <p>MCCB</p>
        <Button type="primary" onClick={() => {}} disabled={true}>
          Clear Search
        </Button>
      </div>
      <div>
        <Divider />
        <Table rowSelection={{ type: "radio", ...rowSelection }} columns={columns} dataSource={data} />
      </div>
    </Modal>
  )
}

export default AddIncomer
