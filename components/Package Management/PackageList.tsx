"use client"
import {
  DeleteOutlined,
  EditOutlined,
  MinusSquareTwoTone,
  PlusCircleOutlined,
  PlusSquareTwoTone,
  SyncOutlined,
} from "@ant-design/icons"
import { Button, Popconfirm, Table, TableColumnsType, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { deleteData, getData } from "actions/crud-actions"
import { GET_PKG_API, MAIN_PKG_API, SUB_PKG_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import MainPackageModal from "./MainPackageModal"
import SubPackageModal from "./SubPackageModal"

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
  const [editModeMainPkg, setEditModeMainPkg] = useState(false)
  const [editModeSubPkg, setEditModeSubPkg] = useState(false)
  const [mainPkgopen, setMainPkgOpen] = useState(false)
  const [subPkgOpen, setSubPkgOpen] = useState(false)

  const [editEventTrigger, setEditEventTrigger] = useState(false)
  const [mainPkgRowData, setMainPkgRowData] = useState<any>(null)
  const [subPkgRowData, setSubPkgRowData] = useState<any>(null)
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: packageData, isLoading: packageLoading } = useGetData(GET_PKG_API)

  const handleMainPkgDelete = async (selectedRowID: string) => {
    const subPkgs = await getData(`${SUB_PKG_API}?filters=[["main_package_name", "=", "${selectedRowID}"]]`)
    for (const subPkg of subPkgs || []) {
      await deleteData(`${SUB_PKG_API}/${subPkg.name}`, false)
    }
    await deleteData(`${MAIN_PKG_API}/${selectedRowID}`, false)
    // Revalidate the cache
    mutate(GET_PKG_API)
  }

  const handleSubPkgDelete = async (selectedRowID: string) => {
    await deleteData(`${SUB_PKG_API}/${selectedRowID}`, false)
    // Revalidate the cache
    mutate(GET_PKG_API)
  }

  const handleAddMainPkg = () => {
    setMainPkgOpen(true)
    setEditModeMainPkg(false)
    setMainPkgRowData(null)
  }

  const handleAddSubPkg = (mainPkgRecord: any) => {
    setSubPkgOpen(true)
    setEditModeSubPkg(false)
    mainPkgRecord["main_package_label"] = mainPkgRecord.package_name
    setSubPkgRowData(mainPkgRecord)
  }

  const handleEditMainPkg = (values: any) => {
    setMainPkgOpen(true)
    setEditModeMainPkg(true)
    setEditEventTrigger(!editEventTrigger)
    setMainPkgRowData(values)
  }

  const handleEditSubPkg = (values: any) => {
    setSubPkgOpen(true)
    setEditModeSubPkg(true)
    setEditEventTrigger(!editEventTrigger)
    setSubPkgRowData(values)
  }

  const parentColumns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "name",
      key: "name",
      hidden: true,
    },
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
            <Button type="link" shape="circle" icon={<PlusCircleOutlined />} onClick={() => handleAddSubPkg(record)} />
          </Tooltip>
          <Tooltip placement="top" title="Edit Main Package">
            <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditMainPkg(record)} />
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
      render: (text, record) => (
        <div>
          <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => handleEditSubPkg(record)} />
          <Popconfirm
            title="Are you sure to delete this sub package?"
            onConfirm={async () => await handleSubPkgDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" shape="circle" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ]

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
      <div className="flex justify-end gap-2">
        <Tooltip title="Refresh">
          <div className="rounded-full hover:bg-blue-100">
            <Button
              type="link"
              shape="circle"
              icon={<SyncOutlined spin={packageLoading} />}
              onClick={() => mutate(GET_PKG_API)}
            />
          </div>
        </Tooltip>
        <Button type="primary" onClick={handleAddMainPkg}>
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
      <MainPackageModal
        open={mainPkgopen}
        setOpen={setMainPkgOpen}
        editMode={editModeMainPkg}
        values={mainPkgRowData}
        editEventTrigger={editEventTrigger}
      />
      <SubPackageModal
        open={subPkgOpen}
        setOpen={setSubPkgOpen}
        editMode={editModeSubPkg}
        values={subPkgRowData}
        editEventTrigger={editEventTrigger}
      />
    </div>
  )
}
