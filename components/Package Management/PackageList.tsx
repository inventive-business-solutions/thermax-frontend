"use client"
import {
  DeleteOutlined,
  EditOutlined,
  MinusSquareTwoTone,
  PlusCircleOutlined,
  PlusSquareTwoTone,
} from "@ant-design/icons"
import { Button, Popconfirm, Table, TableColumnsType, Tooltip } from "antd"
import { useState } from "react"
import AddPackageModal from "./AddPackageModal"
import { GET_PKG_URL, MAIN_PKG_URL } from "configs/api-endpoints"
import { useCreateData, useDeleteData, useGetData } from "hooks/useCRUD"

interface DataType {
  key: string
  package_name: string
  sub_packages: ExpandedDataType[]
}

interface ExpandedDataType {
  key: string
  package_name: string
  classification_area: string
}

// Function to rename the "name" key to "key"
function renameNameToKey(pkgList: any[]) {
  if (!pkgList) return []
  pkgList.forEach((main_package) => {
    main_package.key = main_package.name
    if (main_package.sub_packages) {
      main_package.sub_packages.forEach((sub_package: any) => {
        sub_package.key = sub_package.name
      })
    }
  })
  return pkgList
}

export default function PackageList() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { data: packageData } = useGetData(GET_PKG_URL)
  const { remove } = useDeleteData()

  const handleMainPkgDelete = async (selectedRowID: string) => {
    setLoading(true)
    await remove(`${MAIN_PKG_URL}/${selectedRowID}`)
    setLoading(false)
  }

  const parentColumns: TableColumnsType<DataType> = [
    {
      title: "Main Package",
      align: "center",
      dataIndex: "package_name",
      key: "package_name",
    },
    {
      title: "Action",
      align: "center",
      key: "main_action",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Tooltip placement="top" title="Add Sub Package">
            <Button type="link" shape="circle" icon={<PlusCircleOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Edit Main Package">
            <Button type="link" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip placement="top" title="Delete Main Package">
            <Popconfirm
              title="Are you sure to delete this row?"
              onConfirm={async () => await handleMainPkgDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" shape="circle" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ]

  // Child table columns (sub-packages)
  const childColumns: TableColumnsType<ExpandedDataType> = [
    { title: "Sub-Package", dataIndex: "package_name", key: "package_name" },
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

  const showModal = () => {
    setOpen(true)
  }

  // Expanded row rendering for child table
  const expandedRowRender = (record: DataType) => {
    // Render child table only if there are children
    if (record.sub_packages && record.sub_packages.length > 0) {
      return (
        <Table<ExpandedDataType> columns={childColumns} dataSource={record.sub_packages} pagination={false} bordered />
      )
    } else {
      return <p>No Sub-Packages Available</p>
    }
  }

  // Custom expand/collapse icons
  const expandIcon = ({ expanded, onExpand, record }: any) =>
    expanded ? (
      <MinusSquareTwoTone onClick={(e) => onExpand(record, e)} className="text-xl" />
    ) : (
      <PlusSquareTwoTone onClick={(e) => onExpand(record, e)} className="text-xl" />
    )

  return (
    <div className="flex flex-col gap-2 px-20 py-4">
      <div className="text-end">
        <Button type="primary" onClick={showModal}>
          Add Main Package
        </Button>
      </div>
      <Table<DataType>
        columns={parentColumns}
        bordered
        expandable={{
          expandedRowRender,
          expandIcon,
        }}
        dataSource={renameNameToKey(packageData)}
        size="small"
        className="shadow-lg"
      />
      <AddPackageModal open={open} setOpen={setOpen} />
    </div>
  )
}
