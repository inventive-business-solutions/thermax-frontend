"use client"
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import { Button, message, Spin } from "antd"
import { getData, updateData } from "actions/crud-actions"
import {
  COMMON_CONFIGURATION,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  MAKE_OF_COMPONENT_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
} from "configs/api-endpoints"
import { useLoading } from "hooks/useLoading"
import { useParams, useRouter } from "next/navigation"
import { switchGearSelectionColumns } from "components/Project Management/Electrical Load List/common/ExcelColumns"
import { ValidColumnType } from "components/Project Management/Electrical Load List/types"
import { getStandByKw } from "components/Project Management/Electrical Load List/Electrical Load List/LoadListComponent"
import { useCurrentUser } from "hooks/useCurrentUser"
import { HEATING } from "configs/constants"
import { getSwSelectionDetails } from "actions/sld"

interface Props {
  motorCanopyRevisionId: string
  designBasisRevisionId: string
  data: any[]
}

const getArrayOfSwitchgearSelectionData = (
  data: any,
  motorCanopySavedData: any,
  commonConfiguration: any,
  makeComponents: any,
  division: string
) => {
  if (!data) return []

  return data.map((item: any) => {
    const savedItem = motorCanopySavedData?.motor_canopy_data?.find((row: any) => row.tag_number === item.tag_number)
    let make
    if (item.starter_type.includes("VFD")) {
      make = makeComponents.preferred_vfdvsd
    } else if (item.starter_type.includes("SOFT STARTER")) {
      make = makeComponents.preferred_soft_starter
    } else {
      make = makeComponents.preferred_lv_switchgear
    }
    const arr = [
      item.tag_number,
      item.service_description,
      savedItem?.quantity || "",
      getStandByKw(item.working_kw, item.standby_kw),
      item.motor_rated_current,
      item.starter_type,
      savedItem?.make ? savedItem.make : make,
      savedItem?.mcc_switchgear_type ? savedItem.mcc_switchgear_type : commonConfiguration.mcc_switchgear_type,
      savedItem?.vfd || "",
      savedItem?.breaker_fuse || "",
      savedItem?.fuse_holder || "",
      savedItem?.contractor_main || "",
      savedItem?.contractor_star || "",
      savedItem?.contractor_delta || "",
      savedItem?.overlay_relay || "",
      savedItem?.terminal_part_number || "",
      item.cablesize || "",
      savedItem?.incomer ? savedItem.incomer : item.bus_segregation === "A" ? "Incomer 1" : "",
    ]
    if (division === HEATING) {
      arr.splice(8, 0, item.starting_time)
    }
    return arr
  })
}

const useDataFetching = (designBasisRevisionId: string, loadListData: any, division: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [swSelectionData, setSwSelectionData] = useState<any[]>([])
  const [commonConfiguration, setCommonConfiguration] = useState<any[]>([])
  

  const [makeComponents, setMakeComponents] = useState<any[]>([])
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const commonConfiguration = await getData(
        `${COMMON_CONFIGURATION}?fields=["mcc_switchgear_type"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      )
      const makeComponents = await getData(
        `${MAKE_OF_COMPONENT_API}?fields=["preferred_soft_starter","preferred_lv_switchgear","preferred_vfdvsd"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
      )

      const formattedData = getArrayOfSwitchgearSelectionData(
        loadListData,
        [],
        commonConfiguration[0],
        makeComponents[0],
        division
      )
      setMakeComponents(makeComponents[0])
      setCommonConfiguration(commonConfiguration[0])
      setSwSelectionData(formattedData)
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

  return { commonConfiguration, makeComponents, swSelectionData, loadListData, isLoading, refetch: fetchData }
}

const SwitchgearSelection: React.FC<Props> = ({ designBasisRevisionId, motorCanopyRevisionId, data }) => {
  console.log(data, "switchgear")

  const jRef = useRef<HTMLDivElement | null>(null)
  const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
  const { setLoading } = useLoading()
  const params = useParams()
  const userInfo: { division: string } = useCurrentUser()
  const router = useRouter()

  const project_id = params.project_id as string

  let { commonConfiguration, makeComponents, swSelectionData, loadListData, isLoading, refetch } = useDataFetching(
    designBasisRevisionId,
    data,
    userInfo.division
  )
  //   console.log(switchGearSelectionColumns,"switchegear");

  const typedSwitchgearColumns = useMemo(
    () =>
      switchGearSelectionColumns(userInfo.division).map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
  useEffect(() => {
    const sortByBusSegregation = (data: any) => {
      const busA: any[] = []
      const busB: any[] = []
      const busC: any[] = []
      const others: any[] = [] // For items with empty or different bus segregation values

      data.forEach((item: { bus_segregation: any }) => {
        const segregation = (item.bus_segregation || "").trim().toUpperCase()
        switch (segregation) {
          case "A":
            busA.push(item)
            break
          case "B":
            busB.push(item)
            break
          case "C":
            busC.push(item)
            break
          default:
            others.push(item)
        }
      })

      return {
        busA,
        busB,
        busC,
        others,
      }
    }

    const sortedData = sortByBusSegregation(data)

    typedSwitchgearColumns.forEach((column) => {
      if (userInfo.division === HEATING) {
        if (column.name === "incomer") {
          column.source = ["Incomer 1", "Combine"]
        }
      } else {
        if (column.name === "incomer") {
          if (sortedData.busC.length) {
            column.source = ["Incomer 1", "Incomer 2", "Incomer 3", "Combine"]
          } else if (sortedData.busB.length) {
            column.source = ["Incomer 1", "Incomer 2", "Combine"]
          } else if (sortedData.busA.length) {
            column.source = ["Incomer 1", "Combine"]
          }
        }
      }
    })
  }, [loadListData])

  const swSelectionOptions = useMemo(
    () => ({
      data: swSelectionData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedSwitchgearColumns,
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
    [typedSwitchgearColumns, swSelectionData]
  )

  // Initialize or update spreadsheet
  const initSpreadsheet = () => {
    // console.log(data);

    if (spreadsheetInstance) {
      spreadsheetInstance.destroy()
    }
    console.log(swSelectionData)

    const instance = jspreadsheet(jRef.current!, swSelectionOptions)
    setSpreadsheetInstance(instance)
    setLoading(false)
  }

  useEffect(() => {
    if (isLoading || !jRef.current) return

    initSpreadsheet()

    return () => {
      spreadsheetInstance?.destroy()
    }
  }, [isLoading, swSelectionOptions])
  useEffect(() => {
    console.log(data)

    if (data.length) {
      const formattedData = getArrayOfSwitchgearSelectionData(
        loadListData,
        [],
        commonConfiguration,
        makeComponents,
        userInfo.division
      )
      // setSwSelectionData(formattedData)
      console.log(formattedData,"formattedData");
      spreadsheetInstance?.setData(formattedData)
      // swSelectionData=formattedData;
      // initSpreadsheet()
    }
  }, [data])

  const handleSgSave = async () => {
    const data = spreadsheetInstance?.getData()

    console.log(data, "all load list data")
    const temp = {
      tag_number: "",
      service_description: "",
      hp: 0,
      kw: 0,
      current: 0,
      starter: "",
      make: "",
      mcc_switchgear_type: "",
      vfd: "",
      breaker_fuse: "",
      fuse_holder: "",
      contractor_main: "",
      contractor_star: "",
      contractor_delta: "",
      overlay_relay: "",
      terminal_part_number: "",
      incomer: "",
    }

    let payload = {
      project_id: project_id,
      status: "Not Released",
      description: "test",
      motor_canopy_data: data?.map((row: any) => {
        return {
          tag_number: row[0],
          service_description: row[1],
          quantity: Number(row[2]),
          motor_rated_current: Number(row[3]),
          rpm: Number(row[4]),
          motor_mounting_type: row[5],
          motor_frame_size: row[6],
          motor_location: row[7],
          moc: row[8],
          canopy_model_number: row[9],
          canopy_leg_length: row[10],
          canopy_cut_out: row[11],
          part_code: row[12],
          motor_scope: row[13],
          remark: row[14],
        }
      }),
    }
    try {
      console.log(payload, "cable schedule payload")

      const respose = await updateData(`${MOTOR_CANOPY_REVISION_HISTORY_API}/${motorCanopyRevisionId}`, false, payload)
      setLoading(false)
      message.success("Motor Canopy Saved !")

      console.log(respose, "Motor Canopy response")
    } catch (error) {
      message.error("Unable to save Motor Canopy list")

      setLoading(false)
    }
    // Add your save logic here
  }
  const handleGetSwDetails = async () => {
    setLoading(true)

    const swData = spreadsheetInstance?.getData()
    try {
      const payload = {
        division: userInfo.division,
        data: swData?.map((item: any) => {
          return {
            tag_number: item[0],
            kw: Number(item[3]),
            starter_type: item[5],
            make: item[6],
            sw_type: item[7],
            starting_time: userInfo.division === HEATING ? item[8] : "",
          }
        }),
      }

      const sg_data = await getSwSelectionDetails(payload)
      const updatedSgData: any = swData?.map((row: any) => {
        const calculationResult = sg_data?.find((item: any) => item.tag_number === row[0])
        console.log(calculationResult)

        if (calculationResult) {
          const updatedRow = [...row]
          if (userInfo.division === HEATING) {
            updatedRow[9] = calculationResult.vfd
            updatedRow[10] = calculationResult.breaker_fuse
            updatedRow[11] = calculationResult.fuse_holder
            updatedRow[12] = calculationResult.contractor_main
            updatedRow[13] = calculationResult.contractor_star
            updatedRow[14] = calculationResult.contractor_delta
            updatedRow[15] = calculationResult.overlay_relay
            updatedRow[16] = calculationResult.terminal_part_no
          } else {
            updatedRow[8] = calculationResult.vfd
            updatedRow[9] = calculationResult.breaker_fuse
            updatedRow[10] = calculationResult.fuse_holder
            updatedRow[11] = calculationResult.contractor_main
            updatedRow[12] = calculationResult.contractor_star
            updatedRow[13] = calculationResult.contractor_delta
            updatedRow[14] = calculationResult.overlay_relay
            updatedRow[15] = calculationResult.terminal_part_no
          }

          return updatedRow
        }
        return row
      })
      console.log("updated sg_data", sg_data)
      console.log("updated calc", updatedSgData)

      spreadsheetInstance?.setData(updatedSgData)
      setLoading(false)
      // console.log(res,'motor calculations');
    } catch (error) {}
  }
  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <>
      <div className="m-2 flex flex-col overflow-auto">
        {/* <IncomerSelector /> */}
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

        <Button type="primary" onClick={handleGetSwDetails} disabled={isLoading}>
          Get Switchgear Details
        </Button>
        <Button type="primary" onClick={handleSgSave} disabled={isLoading}>
          Save
        </Button>
        <Button type="primary" onClick={() => {}} disabled={isLoading}>
          Next
        </Button>
      </div>
    </>
  )
}

export default SwitchgearSelection
