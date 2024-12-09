"use client"
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import { Button, message, Spin } from "antd"
import { ValidColumnType } from "../types"
import MulticoreCableConfigurator from "./Multicore Cable Config/MulticoreCableConfig"
import { CableSchedulecolumns, multicoreCableConfigColumns } from "../common/ExcelColumns"
import "./CableScheduleComponent.css"
import { getData, updateData } from "actions/crud-actions"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  CABLE_TRAY_LAYOUT,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
} from "configs/api-endpoints"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"
import { getCableSizingCalculation } from "actions/electrical-load-list"
import { useCurrentUser } from "hooks/useCurrentUser"

interface CableScheduleProps {
  loadListLatestRevisionId: string
  cableScheduleRevisionId: string
  designBasisRevisionId: string
}

const getArrayOfCableScheduleData = (data: any, savedCableSchedule: any, cableTrayData: any) => {
  if (!data?.electrical_load_list_data) return []
  console.log(data.electrical_load_list_data, "load list")
  console.log(savedCableSchedule?.cable_schedule_data, "load list cable")

  return data.electrical_load_list_data.map((item: any) => {
    const cableScheduleData = savedCableSchedule?.cable_schedule_data?.find(
      (row: any) => row.tag_number === item.tag_number
    )

    return [
      item.tag_number,
      item.service_description,
      item.working_kw,
      item.standby_kw,
      item.kva,
      item.starter_type,
      item.supply_voltage + ` VAC`,
      item.motor_rated_current,
      cableScheduleData?.cable_material || "Copper",
      cableScheduleData?.cos_running ? cableScheduleData?.cos_running : 0.8,
      cableScheduleData?.cos_starting ? cableScheduleData?.cos_starting : 0.3,
      cableScheduleData?.resistance_meter,
      cableScheduleData?.reactance_meter,
      cableScheduleData?.apex_length,
      cableScheduleData?.vd_running,
      cableScheduleData?.vd_starting,
      cableScheduleData?.percent_vd_running,
      cableScheduleData?.percent_vd_starting,
      cableScheduleData?.selected_cable_capacity_amp,
      cableScheduleData?.derating_factor ? cableScheduleData.derating_factor : cableTrayData[0]?.derating_factor_air,
      cableScheduleData?.final_capacity,
      cableScheduleData?.number_of_runs
        ? cableScheduleData?.number_of_runs
        : item.starter_type === "STAR-DELTA"
        ? 2
        : 1,
      cableScheduleData?.no_of_cores
        ? cableScheduleData?.no_of_cores
        : item.starter_type === "DOL STARTER"
        ? "3C"
        : item.starter_type === "VFD"
        ? "3.5C"
        : item.starter_type === "SUPPLY FEEDER"
        ? "4C"
        : "",
      cableScheduleData?.final_cable_size,
      cableScheduleData?.cable_selected_status,
      cableScheduleData?.cable_size_as_per_heating_chart,
    ]
  })
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

const useDataFetching = (
  designBasisRevisionId: string,
  loadListLatestRevisionId: string,
  cableScheduleRevisionId: string
) => {
  const [isLoading, setIsLoading] = useState(true)
  const { setLoading } = useLoading()
  const [cableScheduleData, setCableScheduleData] = useState<any[]>([])
  const [cableScheduleSavedData, setCableScheduleSavedData] = useState<any[]>([])
  const [loadListData, setLoadListData] = useState<any[]>([])
  const [cableTrayData, setCableTrayData] = useState<any[]>([])
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return

    try {
      setIsLoading(true)
      const loadList = await getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`)
      const savedCableSchedule = await getData(`${CABLE_SCHEDULE_REVISION_HISTORY_API}/${cableScheduleRevisionId}`)
      const cableTrayData = await getData(
        `${CABLE_TRAY_LAYOUT}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      )
      const formattedData = getArrayOfCableScheduleData(loadList, savedCableSchedule, cableTrayData)
      console.log(savedCableSchedule, "savedCableSchedule")
      console.log(cableTrayData, "cableTrayData")
      setCableTrayData(cableTrayData[0])
      setCableScheduleSavedData(savedCableSchedule)
      setLoadListData(loadList?.electrical_load_list_data)
      setCableScheduleData(formattedData)
    } catch (error) {
      console.error("Error fetching data:", error)
      message.error("Failed to load data")
      setCableScheduleData([])
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }, [loadListLatestRevisionId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { cableScheduleSavedData, cableTrayData, cableScheduleData, loadListData, isLoading, refetch: fetchData }
}

const CableSchedule: React.FC<CableScheduleProps> = ({
  loadListLatestRevisionId,
  cableScheduleRevisionId,
  designBasisRevisionId,
}) => {
  const jRef = useRef<HTMLDivElement | null>(null)
  const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
  const { setLoading } = useLoading()
  const params = useParams()
  const router = useRouter()
  const userInfo: {
    division: string
  } = useCurrentUser()

  const project_id = params.project_id as string

  const [isMulticoreModalOpen, setIsMulticoreModalOpen] = useState(false)

  const { cableScheduleSavedData, cableTrayData, cableScheduleData, loadListData, isLoading, refetch } =
    useDataFetching(designBasisRevisionId, loadListLatestRevisionId, cableScheduleRevisionId)

  const typedCableScheduleColumns = useMemo(
    () =>
      CableSchedulecolumns().map((column) => ({
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
      data: cableScheduleData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedCableScheduleColumns,
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
    [typedCableScheduleColumns, cableScheduleData]
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
          number_of_cores: row[22],
          final_cable_size: row[23],
          cable_selected_status: row[24],
          cable_size_as_per_heating_chart: row[25],
        }
      }),
    }
    try {
      console.log(payload, "cable schedule payload")

      const respose = await updateData(
        `${CABLE_SCHEDULE_REVISION_HISTORY_API}/${cableScheduleRevisionId}`,
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
  const getStandByKw = (item2: any, item3: any) => {
    if (item2 == 0) {
      return Number(item3)
    } else {
      return Number(item2)
    }
  }
  const getCableSizing = async () => {
    setLoading(true)
    const cableScheduleData = spreadsheetInstance?.getData()
    console.log(cableTrayData, "cableTrayData")
    const cableSizeCalc = await getCableSizingCalculation({
      divisionName: userInfo.division,
      layoutCableTray: {
        motor_voltage_drop_during_running: cableTrayData[0]?.motor_voltage_drop_during_running,
        motor_voltage_drop_during_starting: cableTrayData[0]?.motor_voltage_drop_during_starting,
        copper_conductor: cableTrayData[0]?.copper_conductor,
        aluminium_conductor: cableTrayData[0]?.aluminium_conductor,
      },
      data: cableScheduleData?.map((row: any) => {
        return {
          tagNo: row[0],
          kw: getStandByKw(row[2], row[3]),
          starterType: row[5],
          supplyVoltage: Number(row[6].split(" ")[0]),
          phase: row[7],
          powerFactor: Number(row[34]),
          motorRatedCurrent: Number(row[7]),
          cableMaterial: row[8],
          startingCos: Number(row[10]),
          runningCos: Number(row[9]),
          numberOfRuns: Number(row[21]),
          numberOfCores: row[22],
          deratingFactor: Number(row[19]),
          appx_length: Number(row[13]),
        }
      }),
    })
    console.log(cableSizeCalc, "cableSizeCalc")

    const updatedCableSchedule: any = cableScheduleData?.map((row: any) => {
      const calculationResult = cableSizeCalc?.find((item: any) => item.tagNo === row[0])
      // const frameSizeResult = cableSizeCalc?.find((item: any) => item.tagNo === row[0])
      if (calculationResult) {
        const updatedRow = [...row]

        updatedRow[8] = calculationResult.moc
        updatedRow[11] = calculationResult.dbl_r
        updatedRow[12] = calculationResult.dbl_x
        updatedRow[14] = calculationResult.vd_run
        updatedRow[15] = calculationResult.vd_start
        updatedRow[16] = calculationResult.vd_run_percentage
        updatedRow[17] = calculationResult.vd_start_percentage
        updatedRow[20] = calculationResult.final_current_carrying_capacity
        updatedRow[23] = calculationResult.sizes.includes("/")
          ? calculationResult.sizes
          : parseFloat(calculationResult.sizes).toFixed(1)
        updatedRow[25] = "25" //cable size as per heating value
        return updatedRow
      }
      return row
    })
    console.log("updated calc", updatedCableSchedule)

    spreadsheetInstance?.setData(updatedCableSchedule)
    setLoading(false)

    // setLoadListData(updatedLoadList)
  }

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button type="primary" onClick={() => setIsMulticoreModalOpen(true)} className="hover:bg-blue-600">
          Multicore Cable Configurator
        </Button>
      </div>

      <div className="m-2 flex flex-col overflow-auto">
        {isLoading ? (
          <div className="flex h-[550px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div ref={jRef} />
        )}
      </div>

      <MulticoreCableConfigurator
        isOpen={isMulticoreModalOpen}
        onClose={() => setIsMulticoreModalOpen(false)}
        loadListData={loadListData}
        typedMulticoreCableColumns={typedMulticoreCableConfigColumns}
        onConfigurationComplete={(selectedCables: any) => {
          console.log("Selected cables:", selectedCables)
        }}
      />

      <div className="flex w-full flex-row justify-end gap-2">
        <Button type="primary">Download Voltage Drop Calculations</Button>
        <Button type="primary" onClick={getCableSizing}>
          Get Cable Sizing
        </Button>
        <Button type="primary" onClick={handleCableScheduleSave} disabled={isLoading}>
          Save
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setLoading(true)
            router.push(`/project/${project_id}/electrical-load-list/motor-canopy`)
          }}
          disabled={isLoading}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default CableSchedule
