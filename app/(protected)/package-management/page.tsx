"use client"
import { DeleteOutlined, EditOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons"
import { Button, Table, TableColumnsType } from "antd"

interface DataType {
  key: React.Key
  main_package: string
  sub_packages: ExpandedDataType[]
}

interface ExpandedDataType {
  key: React.Key
  sub_package: string
  classification_area: string
}

export default function Package() {
  // Parent table columns
  const parentColumns: TableColumnsType<DataType> = [
    { title: "Main Package", dataIndex: "main_package", key: "main_package" },
    {
      title: "Action",
      key: "main_action",
      render: () => (
        <div>
          <Button type="link">Add Sub Pkg</Button>
          <Button type="link">
            <EditOutlined />
          </Button>
          <Button type="link" danger>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ]

  // Child table columns (sub-packages)
  const childColumns: TableColumnsType<ExpandedDataType> = [
    { title: "Sub-Package", dataIndex: "sub_package", key: "sub_package" },
    { title: "Area of Classification", dataIndex: "classification_area", key: "classification_area" },
    {
      title: "Action",
      key: "sub_action",
      render: () => (
        <div>
          <Button type="link">
            <EditOutlined />
          </Button>
          <Button type="link" danger>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ]

  // Data for the table
  const dataSource: DataType[] = [
    {
      key: "1",
      main_package: "Main Package 1",
      sub_packages: [
        {
          key: "1-1",
          sub_package: "Sub Package 1",
          classification_area: "Safe Area",
        },
        {
          key: "1-2",
          sub_package: "Sub Package 2",
          classification_area: "Hazardous Area",
        },
      ],
    },
    {
      key: "2",
      main_package: "Main Package 2",
      sub_packages: [], // No sub-packages for this main package
    },
    {
      key: "3",
      main_package: "Main Package 3",
      sub_packages: [], // No sub-packages for this main package
    },
  ]

  // Expanded row rendering for child table
  const expandedRowRender = (record: DataType) => {
    // Render child table only if there are children
    if (record.sub_packages && record.sub_packages.length > 0) {
      return <Table<ExpandedDataType> columns={childColumns} dataSource={record.sub_packages} pagination={false} />
    } else {
      return <p>No Sub-Packages Available</p>
    }
  }

  // Custom expand/collapse icons
  const expandIcon = ({ expanded, onExpand, record }: any) =>
    expanded ? (
      <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} className="text-xl" />
    ) : (
      <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} className="text-xl" />
    )

  return (
    <div className="px-20 py-4">
      <Table<DataType>
        columns={parentColumns}
        expandable={{
          expandedRowRender,
          expandIcon,
        }}
        dataSource={dataSource}
        size="small"
      />
    </div>
  )
}
