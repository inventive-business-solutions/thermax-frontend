"use client"

import { Button, message, Spin, Table, TableColumnsType, TableColumnType, Tabs, Tag, Tooltip } from "antd"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  COMMON_CONFIGURATION,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  GET_LOAD_LIST_EXCEL_API,
  LBPS_SPECIFICATIONS_REVISION_HISTORY_API,
  LOCAL_ISOLATOR_REVISION_HISTORY_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
  MOTOR_SPECIFICATIONS_REVISION_HISTORY_API,
} from "configs/api-endpoints"
import { DB_REVISION_STATUS } from "configs/constants"
import { useGetData } from "hooks/useCRUD"
// import "./DownloadComponent.css"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { mutate } from "swr"
import PanelTab from "./PanelTab"
import { getData } from "actions/crud-actions"

interface Props {
  designBasisRevisionId: string
  cableScheduleRevisionId: string
  loadListLatestRevisionId: any
}
const useDataFetching = (loadListLatestRevisionId: string, cableScheduleRevisionId: string) => {
  const { isLoading, setLoading: setIsLoading } = useLoading()
  const [motorCanopyData, setMotorCanopyData] = useState<any[]>([])
  const [motorCanopySavedData, setMotorCanopySavedData] = useState<any[]>([])
  // const {setLoading} = useLoading();
  const [loadListData, setLoadListData] = useState<any[]>([])
  const [cableScheduleData, setCableScheduleData] = useState<any[]>([])
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return

    try {
      setIsLoading(true)
      const loadList = await getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`)
      const cableScheduleData = await getData(`${CABLE_SCHEDULE_REVISION_HISTORY_API}/${cableScheduleRevisionId}`)
      console.log(cableScheduleData, "cableScheduleData")
      console.log(loadList)
      setCableScheduleData(cableScheduleData.cable_schedule_data)
      // const motorCanopySavedData = await getData(`${MOTOR_CANOPY_REVISION_HISTORY_API}/${motorCanopyRevisionId}`)
      // const formattedData = getArrayOfMotorCanopyData(loadList, motorCanopySavedData)
      //   console.log(savedCableSchedule, "savedCableSchedule")

      setLoadListData(loadList?.electrical_load_list_data)
      // setMotorCanopyData(formattedData)
    } catch (error) {
      console.error("Error fetching data:", error)
      message.error("Failed to load data")
      setMotorCanopyData([])
    } finally {
      setIsLoading(false)
    }
  }, [loadListLatestRevisionId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { cableScheduleData, motorCanopyData, loadListData, isLoading, refetch: fetchData }
}

const SLDTabs: React.FC<Props> = ({ designBasisRevisionId, cableScheduleRevisionId, loadListLatestRevisionId }) => {
  const { setLoading: setModalLoading } = useLoading()
  // const router = useRouter()

  const params = useParams()
  const project_id = params.project_id as string

  // const dbLoadlistHistoryUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]&order_by=creation asc`
  const { motorCanopyData, cableScheduleData, loadListData, isLoading, refetch } = useDataFetching(
    loadListLatestRevisionId,
    cableScheduleRevisionId
  )

  // const dbLoadlistHistoryUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`
  // const { data: loadListData } = useGetData(dbLoadlistHistoryUrl)
  // console.log(loadListData)

  const [panelWiseData, setPanelWiseData] = useState<any[]>([])

  // const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    console.log(loadListData, "loadListData")
    // if(loadListData)
    if (loadListData.length) {
      const panelWiseData = Object.values(
        loadListData.reduce((acc, item) => {
          const panelName = item.panel
          if (!acc[panelName]) {
            acc[panelName] = { panelName, data: [] }
          }
          const cablesize = cableScheduleData.find((el: any) => el.tag_number === item.tag_number) || []
          acc[panelName].data.push({
            ...item,
            cablesize:
              cablesize && cablesize.number_of_runs && cablesize.number_of_cores && cablesize.final_cable_size
                ? `${cablesize.number_of_runs}R X ${cablesize.number_of_cores} X ${cablesize.final_cable_size} Sqmm`
                : "",
          })
          return acc
        }, {})
      )
      setPanelWiseData(panelWiseData)
      console.log(panelWiseData)
    }
    // console.log(dataSource)
  }, [loadListData])

  // const panels = ["MCC", "MCC1"]

  const SLDTabs: any = panelWiseData.map((tab: any, index) => {
    return {
      label: tab.panelName,
      key: index + 1,
      children: (
        <>
          <PanelTab panelData={tab} designBasisRevisionId={designBasisRevisionId} />
        </>
      ),
    }
  })

  const onChange = async (key: string) => {
    // setModalLoading(true)
    // console.log(key)
    // console.log(documentList)
    // console.log(getApiEndpoint(key))
    // try {
    //   // const documentList = await getData()
    //   // console.log(staticData,"staticData");
    //   const data = await getData(getApiEndpoint(key))
    //   console.log(data)
    //   const dataSource = data?.map((item: any, index: number) => ({
    //     key: item.name,
    //     documentName: getName(key),
    //     status: item.status,
    //     documentRevision: `R${index}`,
    //     createdDate: item.creation,
    //   }))
    //   if (key === "6") {
    //     await getIsolatorData()
    //   }
    //   console.log(dataSource)
    //   setDataSource(dataSource)
    //   console.log(data)
    // } catch (error) {
    // } finally {
    //   setModalLoading(false)
    // }
    // setTabKey(key)
  }

  return (
    <div className="">
      <Tabs onChange={onChange} type="card" style={{ fontSize: "11px !important" }} items={SLDTabs} />
    </div>
  )
}

export default SLDTabs
