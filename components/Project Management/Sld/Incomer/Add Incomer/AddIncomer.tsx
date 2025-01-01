import { Button, Input, message, Space, Spin } from "antd"
import Modal from "components/Modal/Modal"
import React, { useCallback, useEffect, useState } from "react"

import { Divider, Radio, Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import { useGetData } from "hooks/useCRUD"
import {
  CIRCUIT_BREAKER_API,
  GET_CB_COUNT,
  MAKE_OF_COMPONENT_API,
  MCC_PANEL,
  PCC_PANEL,
  SLD_REVISIONS_API,
} from "configs/api-endpoints"
import { getData } from "actions/crud-actions"
interface Props {
  isOpen: boolean
  onClose: () => void
  panelType: string
  revision_id: string
  panel_id: string
  sld_revision_id: string
  designBasisRevisionId: string
  panelData: any
}
const getRatingForIncomer = (sg_data: any) => {
  if (!sg_data) return 0
  let totalWorkingKW = 0
  let highestStandbyKW = 0

  sg_data?.switchgear_selection_data.forEach((item: any) => {
    totalWorkingKW += item.working_kw || 0
    if (item.standby_kw > highestStandbyKW) {
      highestStandbyKW = item.standby_kw
    }
  })
  const result = totalWorkingKW + totalWorkingKW * 0.2 + highestStandbyKW / 2
  return result.toFixed(2)
}
const getDevice = (sg_data: any, projectPanelData: any) => {
  return getRatingForIncomer(sg_data) <= projectPanelData?.incomer_ampere
    ? projectPanelData?.incomer_type
    : projectPanelData?.incomer_above_type
}

const getPoles = (sg_data: any, projectPanelData: any) => {
  return getRatingForIncomer(sg_data) <= projectPanelData?.incomer_ampere
    ? projectPanelData?.incomer_pole
    : projectPanelData?.incomer_above_pole
}

const useDataFetching = (panelType: string, revision_id: string, panel_id: string, sld_revision_id: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sg_data, setSg_data] = useState<any>([])
  const [makeComponents, setMakeComponents] = useState<any>([])
  // const [commonConfiguration, setCommonConfiguration] = useState<any[]>([])
  const [incomerResponse, setIncomerResponse] = useState<any[]>([])
  const [totalCountOfItems, setTotalCountOfItems] = useState<number>(0)

  const [projectPanelData, setProjectPanelData] = useState<any>([])
  const getPanelDoctype = (name: string) => {
    switch (name) {
      case "MCC":
        return MCC_PANEL
      case "PCC":
        return PCC_PANEL

      default:
        return ""
    }
  }

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const makeComponents = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["preferred_lv_switchgear"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )
      const projectPanelData = await getData(
        `${getPanelDoctype(
          panelType
        )}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
      )
      const sg_data = await getData(`${SLD_REVISIONS_API}/${sld_revision_id}`)
      console.log(projectPanelData,"vishal");
      console.log(sg_data, projectPanelData[0],"vishal");
      
      const preferredSwitchgear = makeComponents[0]?.preferred_lv_switchgear.toUpperCase()
      const pole = getPoles(sg_data, projectPanelData[0]) + "-POLE"
      const device = getDevice(sg_data, projectPanelData[0])
      const current_rating = getRatingForIncomer(sg_data)

      const filters = [
        ["manufacturer", "=", preferredSwitchgear],
        ["cb_type", "like", `%${pole}%`],
        ["type_int", "like", `%${device}%`],
        ["current_rating", ">", current_rating],
      ]

      const encodedFilters = encodeURIComponent(JSON.stringify(filters))
      // const limit_start = (page - 1) * pageSize
      // console.log(limit_start, pageSize)

      const url = `${CIRCUIT_BREAKER_API}?fields=["*"]&filters=${encodedFilters}&limit_start=${0}&limit=${200}`

      const response = await getData(url)
      console.log(response, "incomers all")

      setIncomerResponse(response || [])
      const total_count = await getData(GET_CB_COUNT + `&filters=${JSON.stringify(filters)}`)

      console.log(total_count, "total_count")
      console.log(projectPanelData[0], "data incomer projectPanelData")
      setTotalCountOfItems(total_count)
      setProjectPanelData(projectPanelData[0])
      setMakeComponents(makeComponents[0])
      setSg_data(sg_data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      message.error("Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { totalCountOfItems, incomerResponse, projectPanelData, sg_data, makeComponents, isLoading }
}
const AddIncomer: React.FC<Props> = ({
  isOpen,
  onClose,
  panelType,
  revision_id,
  panel_id,
  panelData,
  sld_revision_id,
}) => {
  let {
    totalCountOfItems,
    incomerResponse,
    projectPanelData,
    sg_data,
    makeComponents,
    isLoading: dataLoading,
  } = useDataFetching(panelType, revision_id, panel_id, sld_revision_id)

  // Table states
  console.log(sg_data, "vishal")
  // console.log(sg_data, "vishal")
  console.log(projectPanelData, "vishal")
  const [searchModel, setSearchModel] = useState("")
  const [searchRating, setSearchRating] = useState("")

  const [tableData, setTableData] = useState<any>(incomerResponse)
  console.log(tableData, "tableData")
  const [loading, setLoading] = useState(false)
  console.log(totalCountOfItems, "tableParams")
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 200,
      total: totalCountOfItems,
    },
  })
  console.log(tableParams, "tableParams")

  const [selectedBreaker, setSelectedBreaker] = useState<any>(null)

  const columns: TableColumnsType<any> = [
    {
      title: "Model Number",
      dataIndex: "catalog",
      key: "model",
      width: 20,
    },
    {
      title: "Rating",
      dataIndex: "current_rating",
      key: "current_rating",
      width: 20,
    },
    {
      title: "Type",
      dataIndex: "cb_type",
      key: "cb_type",
      width: 50,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      // width: "30%",
    },
  ]

  useEffect(() => {
    console.log(totalCountOfItems, "totalCountOfItems")
    if (totalCountOfItems) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalCountOfItems,
        },
      })
      console.log(totalCountOfItems, "totalCountOfItems")
    }
  }, [totalCountOfItems])

  useEffect(() => {
    console.log(tableParams, "totalCountOfItems")
    // getData(GET_CB_COUNT)
    //   .then((res: any) => console.log(res))
    //   .catch((err: any) => console.log(err))
  }, [tableParams])

  const getCircuitBreakersData = async (page = 1, pageSize = 200) => {
    try {
      setLoading(true)
      const preferredSwitchgear = makeComponents?.preferred_lv_switchgear.toUpperCase()
      const pole = getPoles(sg_data, projectPanelData) + "-POLE"
      const device = getDevice(sg_data, projectPanelData)
      console.log(sg_data);
      
      const current_rating = getRatingForIncomer(sg_data)

      const filters = [
        ["manufacturer", "=", preferredSwitchgear],
        ["cb_type", "like", `%${pole}%`],
        ["type_int", "like", `%${device}%`],
        ["current_rating", ">", current_rating],
      ]
      console.log("search Model : ", searchModel)
      console.log("search rating : ", searchRating)

      if (searchModel) {
        filters.push(["catalog", "like", `%${searchModel}%`])
      }

      if (searchRating) {
        filters.pop()
        filters.push(["current_rating", "=", searchRating])
      }

      const encodedFilters = encodeURIComponent(JSON.stringify(filters))
      const limit_start = (page - 1) * pageSize
      console.log(limit_start, pageSize)

      const url = `${CIRCUIT_BREAKER_API}?fields=["*"]&filters=${encodedFilters}&limit_start=${limit_start}&limit=${pageSize}`
      const total_count = await getData(GET_CB_COUNT + `&filters=${JSON.stringify(filters)}`)

      const response = await getData(url)
      console.log("total_count :", total_count)
      console.log(response)

      setTableData(response || [])
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: total_count || 0,
        },
      })
    } catch (error) {
      console.error("Error fetching circuit breaker data:", error)
      message.error("Failed to load circuit breaker data")
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    })
    getCircuitBreakersData(pagination.current, pagination.pageSize)
  }

  const rowSelection: TableProps<any>["rowSelection"] = {
    type: "radio",
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedBreaker(selectedRows[0])
    },
  }

  const handleClearSearch = async () => {
    setTableData([])
    setSelectedBreaker(null)
    setSearchModel("")
    setSearchRating("")
    setTableParams({
      pagination: {
        current: 1,
        pageSize: 200,
        total: 0,
      },
    })
    getCircuitBreakersData()
  }
  useEffect(() => {
    console.log(tableData, "tableData")
  }, [tableData])
  const addIncomer = () => {}
  const search = () => {}
  useEffect(() => {
    if (searchModel.length) {
      const handler = setTimeout(() => {
        getCircuitBreakersData()
      }, 500)

      return () => {
        clearTimeout(handler)
      }
    }
  }, [searchModel])
  useEffect(() => {
    if (searchRating.length) {
      const handler = setTimeout(() => {
        getCircuitBreakersData()
      }, 500)

      return () => {
        clearTimeout(handler)
      }
    }
  }, [searchRating])
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-100 max-h-screen min-h-screen overflow-auto">
      {dataLoading ? (
        <div className="flex h-[550px] items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-start gap-4">
            <p className="font-semibold text-blue-500">Recommended Rating for Incomer (Ampere)</p>
            <p>{sg_data && getRatingForIncomer(sg_data)}</p>
            <Button type="primary" onClick={() => addIncomer()}>
              Add Incomer
            </Button>
            <p className="font-semibold text-blue-500">Make</p>
            <p>{makeComponents?.preferred_lv_switchgear}</p>
            <p className="font-semibold text-blue-500">Device</p>
            <p>{getDevice(sg_data, projectPanelData)}</p>
          </div>
          <Divider />

          <div className="p-4">
            <Space className="mb-4 w-full" direction="horizontal">
              <Input
                placeholder="Search by Model Number"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="w-64"
              />
              <Input
                placeholder="Search by Rating"
                value={searchRating}
                onChange={(e) => setSearchRating(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleClearSearch}>{searchModel || searchRating ? "Clear Search" : "Search"}</Button>
            </Space>

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData.length ? tableData : incomerResponse}
              loading={loading}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
              rowKey="name"
              scroll={{ x: true }}
            />
          </div>
        </>
      )}
    </Modal>
  )
}

export default AddIncomer
