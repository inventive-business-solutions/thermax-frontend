"use client"
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import { Button, message, Spin } from "antd"
import { ValidColumnType } from "../types"
import { CableSchedulecolumns, motorCanopyColumns, multicoreCableConfigColumns } from "../common/ExcelColumns"
import { getData, updateData } from "actions/crud-actions"
import { CABLE_SCHEDULE_REVISION_HISTORY_API, ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API, MOTOR_CANOPY_REVISION_HISTORY_API } from "configs/api-endpoints"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"

interface MotorCanopyProps {
  loadListLatestRevisionId: string
  motorCanopyRevisionId: string
}

const getArrayOfMotorCanopyData = (data: any) => {
  if (!data?.electrical_load_list_data) return []
  console.log(data.electrical_load_list_data, "load list")

  return data.electrical_load_list_data.map((item: any) => [
    item.tag_number,
    item.service_description,
    "1",
    item.motor_rated_current,
    item.motor_rpm,
    item.motor_mounting_type,
    item.motor_frame_size,
    item.motor_location,
    "FRP",
    "",
    "",
    "",
    "",
    "",
    "",

  
  ])
}
const motorCanopyPayload = {
  tag_number: "",
  service_description: "",
  qty: 0,
  motor_rated_current: 0,
  rpm: 0,
  motor_mounting_type: "",
  motor_frame_size: "",
  motor_location: "",
  moc: "",
  canopy_model_number: "",
  canopy_leg_length: "",
  canopy_cut_out: "",
  part_code: "",
  motor_scope: "",
  remark: "",
}

const useDataFetching = (loadListLatestRevisionId: string, motorCanopyRevisionId: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [motorCanopyData, setMotorCanopyData] = useState<any[]>([])
  const [cableScheduleSavedData, setCableScheduleSavedData] = useState<any[]>([])
  const [loadListData, setLoadListData] = useState<any[]>([])
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return

    try {
      setIsLoading(true)
      const loadList = await getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`)
    //   const savedCableSchedule = await getData(`${MOTOR_CANOPY_REVISION_HISTORY_API}/${motorCanopyRevisionId}`)
      const formattedData = getArrayOfMotorCanopyData(loadList)
    //   console.log(savedCableSchedule, "savedCableSchedule")

      setLoadListData(loadList?.electrical_load_list_data)
      setMotorCanopyData(formattedData)
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

  return { motorCanopyData, loadListData, isLoading, refetch: fetchData }
}

const MotorCanopy: React.FC<MotorCanopyProps> = ({ loadListLatestRevisionId, motorCanopyRevisionId }) => {
  const jRef = useRef<HTMLDivElement | null>(null)
  const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
  const { setLoading } = useLoading()
  const params = useParams()
  const router = useRouter()

  const project_id = params.project_id as string


  const { motorCanopyData, loadListData, isLoading, refetch } = useDataFetching(
    loadListLatestRevisionId,
    motorCanopyRevisionId
  )

  const typedMotorCanopyColumns = useMemo(
    () =>
        motorCanopyColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )

  const typedMulticoreCableConfigColumns = useMemo(
    () =>
      multicoreCableConfigColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )

  const cableScheduleOptions = useMemo(
    () => ({
      data: motorCanopyData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedMotorCanopyColumns,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      tableOverflow: true,
      lazyLoading: true,
      loadingSpin: true,
      filters: true,
      tableWidth: "100%",
      tableHeight: "550px",
      freezeColumns: 6,
      rowResize: true,
    }),
    [typedMotorCanopyColumns, motorCanopyData]
  )

  // Initialize or update spreadsheet
  useEffect(() => {
    if (isLoading || !jRef.current) return

    const initSpreadsheet = () => {
      if (spreadsheetInstance) {
        spreadsheetInstance.destroy()
      }

      const instance = jspreadsheet(jRef.current!, cableScheduleOptions)
      setSpreadsheetInstance(instance)
      setLoading(false)
    }

    initSpreadsheet()

    return () => {
      spreadsheetInstance?.destroy()
    }
  }, [isLoading, cableScheduleOptions])

  const handleCableScheduleSave = async () => {
    const data = spreadsheetInstance?.getData()

    console.log(data, "all load list data")

    let payload = {
      project_id: project_id,
      status: "Not Released",
      description: "test",
      cable_schedule_data: data?.map((row: any) => {
        return {
          tag_number: row[0],
          service_description: row[1],
          working_kw: Number(row[2]),
          standby_kw: Number(row[3]),
          kva: Number(row[4]),
          starter_type: row[5],
          supply_voltage: Number(row[6].split(" ")[0]),
          motor_rated_current: Number(row[7]),
          cable_material: row[8],
          cos_running: Number(row[9]),
          cos_starting: Number(row[10]),
          resistance_meter: parseFloat(row[11]),
          reactance_meter: parseFloat(row[12]),
          apex_length: parseFloat(row[13]),
          vd_running: parseFloat(row[14]),
          vd_starting: parseFloat(row[15]),
          percent_vd_running: parseFloat(row[16]),
          percent_vd_starting: parseFloat(row[17]),
          selected_cable_capacity_amp: parseFloat(row[18]),
          derating_factor: Number(row[19]),
          final_capacity: Number(row[20]),
          number_of_runs: Number(row[21]),
          no_of_cores: row[22],
          final_cable_size: row[23],
          cable_selected_status: row[24],
          cable_size_as_per_heating_chart: row[25],
        }
      }),
    }
    try {
      console.log(payload, "cable schedule payload")

      const respose = await updateData(
        `${CABLE_SCHEDULE_REVISION_HISTORY_API}/${motorCanopyRevisionId}`,
        false,
        payload
      )
      setLoading(false)
      message.success("Cable Schedule Saved !")

      console.log(respose, "Cable Schedule response")
    } catch (error) {
      message.error("Unable to save Cable Schedule list")

      setLoading(false)
    }
    // Add your save logic here
  }

  return (
    <>
      <div className="m-2 flex flex-col overflow-auto">
        {isLoading ? (
          <div className="flex h-[550px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div ref={jRef} />
        )}
      </div>

      <div className="flex w-full flex-row justify-end gap-2">
        {/* <Button type="primary">Get Cable Sizing</Button> */}
        <Button type="primary" onClick={handleCableScheduleSave} disabled={isLoading}>
          Save
        </Button>
        <Button type="primary" onClick={() => {}} disabled={isLoading}>
          Next
        </Button>
      </div>
    </>
  )
}

export default MotorCanopy
