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
  HEATING_CONTROL_SCHEMES_URI,
  LPBS_SCHEMES_URI,
  SPG_SERVICES_CONTROL_SCHEMES_URI,
} from "configs/api-endpoints"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"
import { getCableSizingCalculation } from "actions/electrical-load-list"
import { useCurrentUser } from "hooks/useCurrentUser"
import { ENVIRO, HEATING, SERVICES, WWS_IPG, WWS_SPG } from "configs/constants"
import {
  Enviro_ControlSchemeDataDol,
  Enviro_ControlSchemeDataSD,
  Enviro_ControlSchemeDataVFD,
  lcs_od_gland_data,
  WWS_IPG_data,
  WWS_SPG_DATA,
} from "app/Data"

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
      cableScheduleData?.number_of_cores
        ? cableScheduleData?.number_of_cores
        : item.starter_type === "DOL STARTER"
        ? "3C"
        : item.starter_type === "VFD"
        ? "3.5C"
        : item.starter_type === "SUPPLY FEEDER"
        ? "4C"
        : "",
      cableScheduleData?.final_cable_size,
      cableScheduleData?.cable_selected_status ? cableScheduleData?.cable_selected_status : "Safe",
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
  cableScheduleRevisionId: string,
  userInfo: any
) => {
  const [isLoading, setIsLoading] = useState(true)
  const { setLoading } = useLoading()
  const [cableScheduleData, setCableScheduleData] = useState<any[]>([])
  const [cableScheduleSavedData, setCableScheduleSavedData] = useState<any[]>([])
  const [lpbsSchemes, setLpbsSchemes] = useState<any[]>([])
  const [controlSchemes, setControlSchemes] = useState<any[]>([])

  const [loadListData, setLoadListData] = useState<any[]>([])
  const [cableTrayData, setCableTrayData] = useState<any>()
  const getApiEndpoint = (division: string) => {
    switch (division) {
      case HEATING:
        return `${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`
      case WWS_SPG:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`
      case SERVICES:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`
      case ENVIRO:
        return `${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`
      case WWS_IPG:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`

      default:
        return ""
    }
  }
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return

    try {
      setIsLoading(true)

      const division = userInfo?.division === WWS_SPG || userInfo?.division === SERVICES ? WWS_SPG : userInfo?.division
      const lpbsResponse = await getData(
        `${LPBS_SCHEMES_URI}?filters=[["division_name", "=", "${division}"]]&fields=["*"]`
      )

      const loadList = await getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`)
      const savedCableSchedule = await getData(`${CABLE_SCHEDULE_REVISION_HISTORY_API}/${cableScheduleRevisionId}`)
      const cableTrayData = await getData(
        `${CABLE_TRAY_LAYOUT}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      )
      const formattedData = getArrayOfCableScheduleData(loadList, savedCableSchedule, cableTrayData)
      console.log(savedCableSchedule, "savedCableSchedule")
      console.log(cableTrayData, "cableTrayData")
      getData(getApiEndpoint(userInfo?.division)).then((res) => {
        console.log(res)
        let sortedSchemes
        if (userInfo.division === SERVICES || userInfo.division === WWS_SPG) {
          sortedSchemes = WWS_SPG_DATA
        } else if (userInfo.division === ENVIRO) {
          sortedSchemes = [
            ...Enviro_ControlSchemeDataDol,
            ...Enviro_ControlSchemeDataSD,
            ...Enviro_ControlSchemeDataVFD,
          ]
        } else if (userInfo.division === WWS_IPG) {
          sortedSchemes = WWS_IPG_data
        } else {
          sortedSchemes = res
        }

        console.log(sortedSchemes, "control schemes sorted")

        setControlSchemes(sortedSchemes)
        setLoading(false)
      })
      setLpbsSchemes(lpbsResponse)
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

  return {
    controlSchemes,
    lpbsSchemes,
    cableScheduleSavedData,
    cableTrayData,
    cableScheduleData,
    loadListData,
    isLoading,
    refetch: fetchData,
  }
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
  const [cableSizeCalcData, setCableSizeCalcData] = useState<any[]>([])
  const router = useRouter()
  const userInfo: {
    division: string
  } = useCurrentUser()

  const project_id = params.project_id as string

  const [isMulticoreModalOpen, setIsMulticoreModalOpen] = useState(false)

  const {
    lpbsSchemes,
    controlSchemes,
    cableScheduleSavedData,
    cableTrayData,
    cableScheduleData,
    loadListData,
    isLoading,
    refetch,
  } = useDataFetching(designBasisRevisionId, loadListLatestRevisionId, cableScheduleRevisionId, userInfo)

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
  const getCableType = (tag_number: any) => {
    let feeder = cableSizeCalcData?.find((item: any) => item.tag_number == tag_number)
    return feeder ? feeder.type : ""
  }
  const getCableOd = (tag_number: any) => {
    let feeder = cableSizeCalcData?.find((item) => item.tagNo == tag_number)
    return feeder ? feeder.cableOd : ""
  }
  const getCableGlandSize = (tag_number: any) => {
    let feeder = cableSizeCalcData?.find((item) => item.tagNo == tag_number)
    return feeder ? feeder.gladSize : ""
  }
  const getOdLcs = (core: any, size: any) => {
    let od = lcs_od_gland_data.find((item) => item[0] == core && item[3] == size)
    return od ? od[1] : []
  }
  const getGladSizeLcs = (core: any, size: any) => {
    let od = lcs_od_gland_data.find((item) => item[0] == core && item[3] == size)
    return od ? od[2] : []
  }
  const handleCableScheduleSave = async () => {
    const data = spreadsheetInstance?.getData()
    console.log(data, "Cable schedule data")
    console.log("Load list data", loadListData)
    const individualFeeders: any = data?.map((row: any) => {
      const division = userInfo?.division
      const loadListItem = loadListData.find((item: any) => item.tag_number === row[0])

      const lpbsScheme = lpbsSchemes?.find((item) => item.lpbs_type === loadListItem.lpbs_type)
      const controlScheme = controlSchemes?.find((item) =>
        division === HEATING
          ? loadListItem.control_scheme === item.sub_scheme
          : loadListItem.control_scheme === item.control_scheme
      )
      console.log(lpbsScheme, "selected lpbsScheme")
      console.log(controlScheme, "selected controlScheme")
      const isPresentInGrouping = false
      const isSpaceHeater = loadListItem.space_heater === "Yes"
      const isThermister = loadListItem.thermistor === "Yes"
      console.log("Payload load list item", loadListItem)
      console.log("Payload spaceheater", isSpaceHeater)
      console.log("Payload thermistor", isThermister)
      const cables = []
      const motorCable = {
        panel_name: loadListItem?.panel,
        starter_type: loadListItem?.starter_type,
        name: row[0] + " MOTOR",
        voltage: division === HEATING ? row[6] : null,
        kw: getStandByKw(row[2], row[3]),
        type_of_cable: `${`Power - ${getCableType(row[0])}`}`,
        scope: "",
        number_of_runs: row[21],
        pair_core: row[22],
        sizemm2: row[23],
        cable_material: row[8],
        type_of_insulation: "XLPE",
        appx_length: row[13],
        cable_od: getCableOd(row[0]),
        gland_size: getCableGlandSize(row[0]),
        gland_qty: (Number(row[21]) * 2).toString(),
        comment: "POWER TO MOTOR",
      }
      cables.push(motorCable)

      if (isSpaceHeater) {
        const spaceheaterCable = {
          panel_name: "",
          starter_type: "",
          name: row[1] + " SPACE HEATER",
          voltage: "",
          kw: "",
          type_of_cable: "Power - 2XFY",
          scope: "",
          number_of_runs: "1",
          pair_core: "3C",
          sizemm2: "2.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: "8.0 - 13mm",
          gland_size: "3/4″",
          gland_qty: "2",
          comment: "POWER TO SPACE HEATER",
        }
        cables.push(spaceheaterCable)
      }
      if (lpbsScheme?.lcs) {
        const lcsCable = {
          panel_name: "",
          starter_type: "",
          name: row[1] + " LCS",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: lpbsScheme.lcs,
          sizemm2: "1.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: getOdLcs(lpbsScheme.lcs, "1.5"),
          gland_size: getGladSizeLcs(lpbsScheme.lcs, "1.5"),
          gland_qty: "2",
          comment: "START & STOP COMMAND FROM LCS",
        }
        cables.push(lcsCable)
      }
      if (lpbsScheme?.lcs_inc_dec) {
        const lcsIncDecCable = {
          panel_name: "",
          starter_type: "",
          name: row[1] + " LCS (INC/DEC)",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: lpbsScheme.lcs_inc_dec,
          sizemm2: "0.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: getOdLcs(lpbsScheme.lcs_inc_dec, "1.5"),
          gland_size: getGladSizeLcs(lpbsScheme.lcs_inc_dec, "1.5"),
          gland_qty: "2",
          comment: "START & STOP COMMAND FROM LCS (INC/DEC)",
        }
        cables.push(lcsIncDecCable)
      }
      if (lpbsScheme?.lcs_rpm) {
        const lcsRpmCable = {
          panel_name: "",
          starter_type: "",
          name: row[1] + " LCS (RPM)",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: lpbsScheme.lcs_rpm,
          sizemm2: "0.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: "8.0 - 13mm",
          gland_size: "3/4″",
          gland_qty: "2",
          comment: "START & STOP COMMAND FROM LCS (RPM)",
        }
        cables.push(lcsRpmCable)
      }
      if (!isPresentInGrouping && controlScheme?.di) {
        const diCable = {
          panel_name: "",
          starter_type: "",
          name: "PLC (DI)",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: controlScheme.di * 2 + "C",
          sizemm2: "0.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: getOdLcs(controlScheme.di * 2 + "C", "0.5"),
          gland_size: getGladSizeLcs(controlScheme.di * 2 + "C", "0.5"),
          gland_qty: "2",
          comment: "RUN TRIP & L/R FEEDBACK",
        }
        cables.push(diCable)
      }
      if (!isPresentInGrouping && controlScheme?.do) {
        const doCable = {
          panel_name: "",
          starter_type: "",
          name: "PLC (DO)",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: controlScheme.do * 2 + "C",
          sizemm2: "1.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: getOdLcs(controlScheme.do * 2 + "C", "0.5"),
          gland_size: getGladSizeLcs(controlScheme.do * 2 + "C", "0.5"),
          gland_qty: "2",
          comment: "START/STOP COMMAND FROM PLC",
        }
        cables.push(doCable)
      }
      if (!isPresentInGrouping && controlScheme?.ai) {
        const aiCable = {
          panel_name: "",
          starter_type: "",
          name: "PLC (AI)",
          voltage: "",
          kw: "",
          type_of_cable: "Signal - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: controlScheme.ai + "P",
          sizemm2: "0.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: "8.0 - 13mm",
          gland_size: "3/4″",
          gland_qty: "2",
          comment: "SPEED REFERANCE",
        }
        cables.push(aiCable)
      }
      if (!isPresentInGrouping && controlScheme?.ao) {
        const aoCable = {
          panel_name: "",
          starter_type: "",
          name: "PLC (AO)",
          voltage: "",
          kw: "",
          type_of_cable: "Signal - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: controlScheme.ao + "P",
          sizemm2: "0.5",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: "8.0 - 13mm",
          gland_size: "3/4″",
          gland_qty: "2",
          comment: "SPEED FEEDBACK",
        }
        cables.push(aoCable)
      }
      if (isThermister) {
        const thermisterCable = {
          panel_name: "",
          starter_type: "",
          name: row[1] + " THERMISTER CABLE",
          voltage: "",
          kw: "",
          type_of_cable: "Control - 2XWY",
          scope: "",
          number_of_runs: "1",
          pair_core: division === HEATING ? "1P" : division === ENVIRO ? "3C" : "", // question for javed sir
          sizemm2: division === HEATING ? "0.5" : division === ENVIRO ? "1.5" : "",
          cable_material: "CU",
          type_of_insulation: "XLPE",
          appx_length: row[13],
          cable_od: "8.0 - 13mm",
          gland_size: "3/4″",
          gland_qty: "2",
          comment: "THERMISTER CABLE",
        }
        cables.push(thermisterCable)
      }

      return {
        motor_name: row[1] + ` (${row[0]}) `,
        cables: cables,
      }
    })

    const grouping: any = JSON.parse(localStorage.getItem("grouping_of_cables_table") as string)
    let groupPayload = []
    if (grouping) {
      for (let i = 0; i < grouping.length; i++) {
        const cableSchedule: any = data?.filter((el) => el[1] == grouping[i][6].split(",")[0])[0]
        let Di = grouping[i][4]
        let Do = grouping[i++][4]
        let Ai = grouping[i++][4]
        let Ao = grouping[i++][4]
        i + 4

        let cables: any[] = []
        console.log(Di, Do, Ai, Ao, "DIDOAIAO")
        if (Di !== "-") {
          const diCable = {
            panel_name: grouping[i][7],
            starter_type: "",
            name: "PLC (DI)",
            voltage: "",
            kw: "",
            type_of_cable: "Control - 2XWY",
            scope: "",
            number_of_runs: "1",
            pair_core: Di + "C",
            sizemm2: "0.5",
            cable_material: "CU",
            type_of_insulation: "XLPE",
            appx_length: cableSchedule[13],
            cable_od: getOdLcs(Di, "0.5"),
            gland_size: getGladSizeLcs(Di, "0.5"),
            gland_qty: "2",
            comment: "RUN TRIP & L/R FEEDBACK",
          }
          cables.push(diCable)
        }
        if (Do !== "-") {
          const doCable = {
            panel_name: grouping[i][7],
            starter_type: "",
            name: "PLC (DO)",
            voltage: "",
            kw: "",
            type_of_cable: "Control - 2XWY",
            scope: "",
            number_of_runs: "1",
            pair_core: Do + "C",
            sizemm2: "1.5",
            cable_material: "CU",
            type_of_insulation: "XLPE",
            appx_length: cableSchedule[13],
            cable_od: getOdLcs(Do, "0.5"),
            gland_size: getGladSizeLcs(Do, "0.5"),
            gland_qty: "2",
            comment: "START/STOP COMMAND FROM PLC",
          }
          cables.push(doCable)
        }
        if (Ai !== "-") {
          const aiCable = {
            panel_name: grouping[i][7],
            starter_type: "",
            name: "PLC (AI)",
            voltage: "",
            kw: "",
            type_of_cable: "Signal - 2XWY",
            scope: "",
            number_of_runs: "1",
            pair_core: Ai + "P",
            sizemm2: "0.5",
            cable_material: "CU",
            type_of_insulation: "XLPE",
            appx_length: cableSchedule[13],
            cable_od: "8.0 - 13mm",
            gland_size: "3/4″",
            gland_qty: "2",
            comment: "SPEED REFERANCE",
          }
          cables.push(aiCable)
        }
        if (Ao !== "-") {
          const aoCable = {
            panel_name: grouping[i][7],
            starter_type: "",
            name: "PLC (AO)",
            voltage: "",
            kw: "",
            type_of_cable: "Signal - 2XWY",
            scope: "",
            number_of_runs: "1",
            pair_core: Ao + "P",
            sizemm2: "0.5",
            cable_material: "CU",
            type_of_insulation: "XLPE",
            appx_length: cableSchedule[13],
            cable_od: "8.0 - 13mm",
            gland_size: "3/4″",
            gland_qty: "2",
            comment: "SPEED FEEDBACK",
          }
          cables.push(aoCable)
        }
        groupPayload.push({
          motor_name: grouping[i][6],
          cables: cables,
        })
      }
    }
    console.log(individualFeeders, "final payload")
    console.log(groupPayload, "final payload group")

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
      excel_payload: { ...individualFeeders, ...groupPayload },
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
        motor_voltage_drop_during_running: cableTrayData?.motor_voltage_drop_during_running,
        motor_voltage_drop_during_starting: cableTrayData?.motor_voltage_drop_during_starting,
        copper_conductor: cableTrayData?.copper_conductor,
        aluminium_conductor: cableTrayData?.aluminium_conductor,
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
    const sizingCalcData: any = []

    const updatedCableSchedule: any = cableScheduleData?.map((row: any) => {
      const calculationResult = cableSizeCalc?.find((item: any) => item.tagNo === row[0])
      if (calculationResult) {
        const updatedRow = [...row]

        updatedRow[8] = calculationResult.moc
        updatedRow[11] = calculationResult.dbl_r
        updatedRow[12] = calculationResult.dbl_x
        updatedRow[14] = calculationResult.vd_run
        updatedRow[15] = calculationResult.vd_start
        updatedRow[16] = calculationResult.vd_run_percentage
        updatedRow[17] = calculationResult.vd_start_percentage
        updatedRow[18] = calculationResult.current_air
        updatedRow[20] = calculationResult.final_current_carrying_capacity
        updatedRow[23] = calculationResult.sizes.includes("/")
          ? calculationResult.sizes
          : parseFloat(calculationResult.sizes).toFixed(1)
        updatedRow[25] = calculationResult.heating_chart_cable_size //cable size as per heating value
        sizingCalcData.push({
          tag_number: calculationResult.tagNo,
          cableOd: calculationResult.od,
          gladSize: "ET″",
          type: calculationResult.cable_type,
        })

        return updatedRow
      }

      return row
    })
    console.log("updated calc", updatedCableSchedule)

    spreadsheetInstance?.setData(updatedCableSchedule)
    setCableSizeCalcData(sizingCalcData)
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
