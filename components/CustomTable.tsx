"use client"
import { SyncOutlined } from "@ant-design/icons"
import { Button, Flex, Table, Tag, Tooltip } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import React, { useState } from "react"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
]

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))

export default function CustomTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-end gap-2">
        {hasSelected ? <Tag color="purple">Selected {selectedRowKeys.length} items</Tag> : null}
        <div onClick={start} className="flex cursor-pointer items-center gap-2">
          <Tooltip title="refresh" placement="topLeft">
            <SyncOutlined spin={loading} color="#492971" />
          </Tooltip>
          <Button type="primary" danger onClick={start} disabled={!hasSelected} loading={loading}>
            Bulk Delete
          </Button>
        </div>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
    </div>
  )
}
