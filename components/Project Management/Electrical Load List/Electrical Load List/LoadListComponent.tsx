"use client"
import jspreadsheet, { CellValue, Column, JspreadsheetInstance, JspreadsheetInstanceElement } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import {
  COMMON_CONFIGURATION,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  HEATING_CONTROL_SCHEMES_URI,
  MAIN_SUPPLY_LV_API,
  MAKE_OF_COMPONENT_API,
  MOTOR_PARAMETER_API,
  PROJECT_INFO_API,
  PROJECT_MAIN_PKG_LIST_API,
} from "configs/api-endpoints"
import { createData, getData, updateData } from "actions/crud-actions"
import * as XLSX from "xlsx"

import { LoadListcolumns } from "../common/ExcelColumns"
import "./LoadListComponent.css"
import { Button, message, Spin } from "antd"
import ControlSchemeConfigurator from "./Control Scheme Config/ControlSchemeConfig"
import LpbsConfigurator from "./LPBS Config/LpbsConfigurator"
import ValidatePanelLoad, { PanelData } from "./Validate Panel Load/ValidatePanelLoad"
import { useGetData } from "hooks/useCRUD"
import { useProjectPanelData } from "hooks/useProjectPanelData"
import { useParams } from "next/navigation"
import useMakeOfComponentDropdowns from "components/Project Management/Design Basis/MCC-PCC/MakeOfComponent/MakeDropdowns"
import { useLoading } from "hooks/useLoading"
import { getCurrentCalculation } from "actions/electrical-load-list"
import { useCurrentUser } from "hooks/useCurrentUser"
import path from "path"

// Types definition
type ValidColumnType =
  | "text"
  | "dropdown"
  | "checkbox"
  | "html"
  | "image"
  | "numeric"
  | "hidden"
  | "autocomplete"
  | "radio"
  | "calendar"
  | "color"

interface PanelSumData {
  panelName: string
  workingLoadSum: number
  standbyLoadSum: number
  totalLoadKw: number
  totalCurrent: number
}
interface ProjectInfo {
  main_supply_lv: string
}

interface LoadListProps {
  // onNext: () => void

  designBasisRevisionId: string
  loadListLatestRevisionId: any
}

// Custom hook type definitions
interface ProjectPanelData {
  panel_name: string
  // Add other relevant properties
}

interface DataFetchResult<T> {
  data: T[]
  isLoading: boolean
}

const useDataFetching = (designBasisRevisionId: string, loadListLatestRevisionId: string, project_id: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadListData, setLoadListData] = useState<any>(null)
  const [motorParameters, setMotorParameters] = useState<any[]>([])
  const [commonConfigurationData, setCommonConfigurationData] = useState<any[]>([])
  const [makeOfComponent, setMakeOfComponent] = useState<any[]>([])
  // const [projectPanelData, setProjectPanelData] = useState<ProjectPanelData[]>([]);
  const [projectInfo, setProjectInfo] = useState<any>(null)
  const [mainSupplyLV, setMainSupplyLV] = useState<string[]>([])
  const [subPackages, setSubPackages] = useState<any[]>([])
  const { data: projectPanelData } = useProjectPanelData(designBasisRevisionId)

  const fetchAllData = useCallback(async () => {
    try {
      setIsLoading(true)

      // Modify the panel data fetching to extract the array
      // const panelData = projectPanelResult.data;

      // Fetch all required data in parallel
      const [loadList, motorParams, commonConfig, makeComponent, projInfo, mainSupply, mainPkgData] = await Promise.all(
        [
          getData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`),
          getData(`${MOTOR_PARAMETER_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`),
          getData(`${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`),
          getData(`${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`),
          getData(`${PROJECT_INFO_API}?fields=["main_supply_lv"]&filters=[["project_id", "=", "${project_id}"]]`),
          getData(`${MAIN_SUPPLY_LV_API}?fields=["voltage"]`),
          getData(`${PROJECT_MAIN_PKG_LIST_API}?revision_id=${designBasisRevisionId}`),
        ]
      )

      setLoadListData(loadList)
      setMotorParameters(motorParams)
      setCommonConfigurationData(commonConfig)
      setMakeOfComponent(makeComponent)
      // setProjectPanelData(panelData);
      setProjectInfo(projInfo[0])
      setMainSupplyLV(mainSupply.map((item: any) => item.voltage))
      setSubPackages(mainPkgData)
    } catch (error) {
      console.error("Error fetching data:", error)
      message.error("Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }, [designBasisRevisionId, loadListLatestRevisionId])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  return {
    isLoading,
    loadListData,
    motorParameters,
    commonConfigurationData,
    makeOfComponent,
    projectPanelData,
    projectInfo,
    mainSupplyLV,
    subPackages,
    refetch: fetchAllData,
  }
}
const LoadList: React.FC<LoadListProps> = ({ designBasisRevisionId, loadListLatestRevisionId }) => {
  const jRef = useRef<HTMLDivElement | null>(null)
  const spreadsheetRef = useRef<JspreadsheetInstance | null>(null)
  const params = useParams()
  const project_id = params.project_id as string

  const {
    isLoading,
    loadListData,
    motorParameters,
    commonConfigurationData,
    projectPanelData,
    projectInfo,
    mainSupplyLV,
    subPackages,
  } = useDataFetching(designBasisRevisionId, loadListLatestRevisionId, project_id)
  console.log(mainSupplyLV, "panelList")

  // Memo for panel list
  const panelList = useMemo(() => projectPanelData?.map((item: any) => item.panel_name) || [], [projectPanelData])
  console.log(panelList, "panelList")

  // Effect to initialize spreadsheet

  // console.log(loadListLatestRevisionId, "loadListLatestRevisionId")

  // const jRef = useRef<HTMLDivElement | null>(null)
  // const spreadsheetRef = useRef<JspreadsheetInstance | null>(null)

  // // const [loadListData, setLoadListData] = useState<any[]>([])
  // const [controlSchemes, setControlSchemes] = useState<any[]>([])
  // const [subPackages, setSubPackages] = useState<any[]>([])
  // const [lpbsSchemes, setLpbsSchemes] = useState<any[]>([])
  // const [panelList, setPanelList] = useState<string[]>([])
  // const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const [panelsSumData, setPanelsSumData] = useState<PanelSumData[]>([])

  // // Modal states
  const [isControlSchemeModalOpen, setIsControlSchemeModalOpen] = useState(false)
  const [isLPBSModalOpen, setIsLPBSModalOpen] = useState(false)
  const [isValidatePanelLoadOpen, setIsValidatePanelLoadOpen] = useState(false)
  const userInfo: {
    division: string
  } = useCurrentUser()
  // const params = useParams()
  // const project_id = params.project_id
  const { setLoading } = useLoading()
  // // Data hooks

  // const gerLoadListUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`
  // const getLoadListUrl = `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?fields=["*"]&filters=[["revision_id", "=", "${loadListLatestRevisionId}"]]`

  // const { data: loadListData }: any = useGetData(gerLoadListUrl)
  // console.log(loadListData, "getLoadListUrl")
  // const { data: motorParameters } = useGetData(
  //   `${MOTOR_PARAMETER_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  // )
  // const { data: commonConfigurationData } = useGetData(
  //   `${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  // )

  // const { data: makeOfComponent } = useGetData(
  //   `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  // )
  // const { motors_make_options } = useMakeOfComponentDropdowns()
  // console.log(makeOfComponent, motors_make_options, "motors_make_options")

  // const { data: projectPanelData, isLoading } = useProjectPanelData(designBasisRevisionId)
  // console.log(loadListLatestRevisionId, "load list rev")

  const handleCellChange = (
    element: JspreadsheetInstanceElement,
    cell: HTMLTableCellElement,
    colIndex: string | number,
    rowIndex: string | number,
    newValue: CellValue,
    oldValue: CellValue
  ) => {
    let data: any = spreadsheetRef?.current?.getData() || []
    console.log(data, "load list data")
    // console.log("col index :", typeof colIndex)

    if (colIndex === "21") {
      console.log(subPackages, "sub package")

      subPackages?.forEach((pckg: any) => {
        let selectedPckg = pckg?.sub_packages?.find((item: any) => item.sub_package_name == newValue)
        console.log(selectedPckg)

        if (selectedPckg) {
          if (selectedPckg?.area_of_classification === "Hazardous Area") {
            data[rowIndex][22] = "Hazardous"
            data[rowIndex][23] = pckg?.standard
            data[rowIndex][24] = pckg?.zone
            data[rowIndex][25] = pckg?.gas_group
            data[rowIndex][26] = pckg?.temperature_class
          } else {
            data[rowIndex][22] = "Safe"
            data[rowIndex][23] = "NA"
            data[rowIndex][24] = "NA"
            data[rowIndex][25] = "NA"
            data[rowIndex][26] = "NA"
          }
        }
      })
      // updateSheetData(data)
      // setLoadListData(data)
      spreadsheetRef?.current?.setData(data)
      console.log(data, "load list data")
    }
    // if (col == "5" || col == "4") {
    //   if (
    //     value == "VFD" ||
    //     value == "VFD BYPASS-S/D" ||
    //     value == "VFD Bypass DOL"
    //   ) {
    //     data[row][32] = "Yes";
    //   }
    // }

    console.log(element, cell, colIndex, rowIndex, newValue, oldValue)
  }
  // Memoized columns with typed validation
  const typedLoadListColumns = useMemo(
    () =>
      LoadListcolumns(userInfo?.division).map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
  const getArrayOfLoadListData = (data: any) => {
    return data?.electrical_load_list_data?.map((item: any) => [
      item.tag_number,
      item.service_description,
      item.working_kw,
      item.standby_kw,
      item.kva,
      item.starter_type,
      item.supply_voltage + ` VAC`,
      item.phase,
      item.starting_time,
      item.eocr_applicable,
      item.lpbs_type,
      item.control_scheme,
      item.panel,
      item.bus_segregation,
      item.motor_rpm,
      item.motor_mounting_type,
      item.motor_frame_size,
      item.motor_gd2,
      item.motor_driven_equipment_gd2,
      item.bkw,
      item.coupling_type,
      item.package,
      item.area,
      item.standard,
      item.zone,
      item.gas_group,
      item.temperature_class,
      item.remark,
      item.rev,
      item.space_heater,
      item.bearing_rtd,
      item.winding_rtd,
      item.thermistor,
      item.bearing_rtd,
      item.power_factor,
      item.motor_efficiency,
      item.local_isolator,
      item.panel_ammeter,
      item.motor_make,
      item.motor_scope,
      item.motor_location,
      item.motor_part_code,
      item.motor_rated_current,
    ])
  }

  // Memoized spreadsheet options
  const loadListOptions = useMemo(
    () => ({
      data: getArrayOfLoadListData(loadListData),
      columns: typedLoadListColumns,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      tableOverflow: true,
      onchange: handleCellChange,
      lazyLoading: true,
      loadingSpin: true,
      filters: true,
      tableWidth: "100%",

      tableHeight: "550px",
      freezeColumns: 6,
      rowResize: true,
    }),
    [typedLoadListColumns, loadListData]
  )

  // Fetch and update functions with useCallback
  // const fetchProjectInfo = useCallback(async () => {
  //   try {
  //     const projectInfo = await getData(
  //       `${PROJECT_INFO_API}?fields=["main_supply_lv"]&filters=[["project_id", "=", "${project_id}"]]`
  //     )
  //     const MAIN_SUPPLY_LV = await getData(`${MAIN_SUPPLY_LV_API}?fields=["voltage"]`)

  //     if (MAIN_SUPPLY_LV.length) {
  //       typedLoadListColumns.forEach((column) => {
  //         if (column.name === "supplyVoltage") {
  //           column.source = ["110 VAC", "230 VAC", ...MAIN_SUPPLY_LV.map((item: any) => item.voltage)]
  //         }
  //       })
  //     }

  //     console.log(MAIN_SUPPLY_LV, "projectInfo")

  //     setProjectInfo(projectInfo[0])
  //   } catch (error) {
  //     console.error("Error fetching project info:", error)
  //   }
  // }, [project_id])

  // const fetchSubPackageOptions = useCallback(async () => {
  //   try {
  //     const mainPkgData = await getData(`${PROJECT_MAIN_PKG_LIST_API}?revision_id=${designBasisRevisionId}`)
  //     console.log(mainPkgData, "main package")

  //     if (mainPkgData?.length) {
  //       typedLoadListColumns.forEach((column) => {
  //         if (column.name === "pkg") {
  //           column.source = [
  //             ...mainPkgData
  //               ?.map((pkg: any) => pkg.sub_packages)
  //               .flat()
  //               .map((item: any) => item.sub_package_name),
  //             "NA",
  //           ]
  //         }
  //       })
  //       console.log(mainPkgData, "main package")

  //       setSubPackages(mainPkgData)
  //     }
  //   } catch (error) {
  //     console.error("Error fetching sub-package options:", error)
  //   }
  // }, [designBasisRevisionId, typedLoadListColumns])

  // Spreadsheet data update function
  const updateSpreadsheetColumns = useCallback(
    (updatedColumns: any[]) => {
      console.log(getArrayOfLoadListData(loadListData), "load list data")
      console.log(updatedColumns, "load list data")

      if (spreadsheetRef.current) {
        spreadsheetRef.current.destroy()
      }

      if (jRef.current) {
        const instance = jspreadsheet(jRef.current, {
          ...loadListOptions,
          data: getArrayOfLoadListData(loadListData),
          columns: updatedColumns,
        })
        spreadsheetRef.current = instance
      }
    },
    [loadListOptions, loadListData, projectInfo]
  )
  const getSelectedSchemes = () => {
    if (loadListData?.electrical_load_list_data?.length) {
      const getSchemes = loadListData?.electrical_load_list_data?.map((item: any) => item.control_scheme)
      return getSchemes?.filter((item: any) => item != "")
    } else {
      return []
    }
  }
  const getSelectedLpbsSchemes = () => {
    if (loadListData?.electrical_load_list_data?.length) {
      const getSchemes = loadListData?.electrical_load_list_data?.map((item: any) => item.lpbs_type)
      return getSchemes?.filter((item: any) => item != "")
    } else {
      return []
    }
  }

  // Initialization effects
  // useEffect(() => {
  //   // fetchProjectInfo()
  //   if (designBasisRevisionId) {
  //     fetchSubPackageOptions()
  //   }
  // }, [fetchProjectInfo, fetchSubPackageOptions, designBasisRevisionId])

  useEffect(() => {
    console.log(loadListData, "getSchemes")
    if (loadListData) {
      let selectedControlSchemeItems: string[] = []
      let selectedLpbsItems: string[] = []

      const storedSchemes = localStorage.getItem("selected_control_scheme")
      if (storedSchemes) {
        selectedControlSchemeItems = JSON.parse(storedSchemes) as string[]
      } else {
        const getSchemes = loadListData?.electrical_load_list_data?.map((item: any) => item.control_scheme)
        const getLpbsSchemes = loadListData?.electrical_load_list_data?.map((item: any) => item.lpbs_type)
        console.log(getLpbsSchemes, "selectedLpbsItems")
        selectedControlSchemeItems = getSchemes?.filter((item: any) => item != "" || item != "NA")
        selectedLpbsItems = getLpbsSchemes?.filter((item: any) => item != "" || item != "NA")
      }
      typedLoadListColumns.forEach((column) => {
        if (column.name === "controlScheme") {
          console.log(
            [...new Set(selectedControlSchemeItems.filter((item: any) => item != "NA")), "NA"],
            "selectedLpbsItems"
          )
          column.source = [...new Set(selectedControlSchemeItems.filter((item: any) => item != "NA")), "NA"]
        }
        if (column.name === "lbpsType") {
          console.log([...new Set(selectedLpbsItems), "NA"], "selectedLpbsItems")

          column.source = [...new Set(selectedLpbsItems.filter((item: any) => item != "NA")), "NA"]
        }
      })
      // updateSheetData(loadListData)
    }
  }, [loadListData])

  useEffect(() => {
    console.log(mainSupplyLV, "mainSupplyLV")
    console.log(subPackages, "subPackages")
    if (subPackages?.length) {
      typedLoadListColumns.forEach((column) => {
        if (column.name === "pkg") {
          column.source = [
            ...subPackages
              ?.map((pkg: any) => pkg.sub_packages)
              .flat()
              .map((item: any) => item.sub_package_name),
            "NA",
          ]
        }
      })
    }

    if (panelList.length) {
      typedLoadListColumns.forEach((column) => {
        if (column.name === "panelList") {
          column.source = panelList
        }
      })
    }
    if (mainSupplyLV.length) {
      typedLoadListColumns.forEach((column) => {
        if (column.name === "supplyVoltage") {
          column.source = ["110 VAC", "230 VAC", ...mainSupplyLV]
        }
      })
    }
    // fetchProjectInfo()
  }, [mainSupplyLV, panelList, subPackages])
  useEffect(() => {
    if (!isLoading && loadListData && panelList.length > 0 && mainSupplyLV.length && jRef.current) {
      if (spreadsheetRef.current) {
        spreadsheetRef.current.destroy()
      }

      const instance = jspreadsheet(jRef.current, loadListOptions)
      spreadsheetRef.current = instance
    }
  }, [isLoading, loadListData, loadListOptions, panelList])

  // Rest of the existing methods remain the same...

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" tip="Loading load list data..." />
      </div>
    )
  }

  // Update panel dropdown
  // useEffect(() => {
  //   if (projectPanelData && !isLoading) {
  //     const updatedColumns = typedLoadListColumns.map((column) => {
  //       if (column.name === "panelList") {
  //         return { ...column, source: projectPanelData.map((item: any) => item.panel_name) }
  //       }
  //       return column
  //     })

  //     updateSpreadsheetColumns(updatedColumns)
  //     setPanelList(projectPanelData.map((item: any) => item.panel_name))
  //   }
  // }, [projectPanelData, isLoading, typedLoadListColumns, updateSpreadsheetColumns])

  // Utility function to update spreadsheet data
  // const updateSheetData = useCallback(
  //   (newData: any[], options?: { columns?: any[] }) => {
  //     setLoadListData(newData)

  //     if (spreadsheetRef.current) {
  //       spreadsheetRef.current.destroy()
  //     }

  //     if (jRef.current) {
  //       const columns = options?.columns || typedLoadListColumns
  //       const instance = jspreadsheet(jRef.current, {
  //         ...loadListOptions,
  //         data: newData,
  //         columns: columns,
  //       })
  //       spreadsheetRef.current = instance
  //     }
  //   },
  //   [typedLoadListColumns, loadListOptions]
  // )

  const handleControlSchemeComplete = (selectedSchemes: string[]) => {
    console.log(selectedSchemes)

    typedLoadListColumns.forEach((column) => {
      if (column.name === "controlScheme") {
        column.source = selectedSchemes
      }
    })
    // updateLoadList()
  }
  const handleLpbsComplete = (selectedSchemes: string[]) => {
    typedLoadListColumns.forEach((column) => {
      if (column.name === "lbpsType") {
        column.source = selectedSchemes
      }
    })
    // updateLoadList()
  }

  const downloadCurrentData = () => {
    console.log(spreadsheetRef?.current)

    spreadsheetRef?.current?.download()
  }
  const validateUniqueFeederTag = () => {
    if (!spreadsheetRef) {
      console.warn("Spreadsheet instance is not available.")
      return false
    }

    const firstColumnData = spreadsheetRef?.current?.getColumnData(0) || []
    const duplicateValues: { [key: string]: number[] } = {}
    let isDuplicate = false

    // Reset background color for all cells in column A
    firstColumnData.forEach((value: any, index: number) => {
      const cellAddress = `A${index + 1}`
      spreadsheetRef?.current?.setStyle(cellAddress, "background-color", "white")
    })

    // Find duplicate values and store their row indices
    firstColumnData.forEach((value: any, index: number) => {
      if (!value) return

      const cellValue = String(value)

      if (cellValue in duplicateValues) {
        duplicateValues[cellValue]?.push(index)
        isDuplicate = true
      } else {
        duplicateValues[cellValue] = [index]
      }
    })

    // Highlight cells containing duplicate values in red
    Object.entries(duplicateValues).forEach(([value, indices]) => {
      if (indices.length > 1) {
        indices.forEach((rowIndex) => {
          const cellAddress = `A${rowIndex + 1}`
          spreadsheetRef?.current?.setStyle(cellAddress, "background-color", "red")
        })
      }
    })

    return isDuplicate
  }

  const getStandByKw = (item2: any, item3: any) => {
    if (item2 == 0) {
      return Number(item3)
    } else {
      return Number(item2)
    }
  }
  const validateLoadValues = () => {
    let rows = spreadsheetRef?.current?.getData() || []
    let isInvalid = false

    rows.forEach((row, rowIndex) => {
      let greaterThanZeroCount = 0
      let allZero = true

      // Check last three columns (indexes 2, 3, 4 assuming 0-based indexing)
      for (let colIndex = 2; colIndex <= 4; colIndex++) {
        let cellValue = parseFloat((row[colIndex] as string) || "0")

        if (cellValue > 0) {
          greaterThanZeroCount++
          allZero = false
        }

        // Reset background color
        const cellAddress = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
        spreadsheetRef?.current?.setStyle(cellAddress, "background-color", "white")
      }

      // If more than one column has a value greater than 0, highlight the cells
      if (greaterThanZeroCount > 1 || allZero) {
        isInvalid = true
        for (let colIndex = 2; colIndex <= 4; colIndex++) {
          let cellValue = parseFloat((row[colIndex] as string) || "0")

          if (cellValue > 0) {
            const cellAddress = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
            spreadsheetRef?.current?.setStyle(cellAddress, "background-color", "yellow")
          }
        }
      }
    })

    return isInvalid
  }

  const handleLoadListSave = async () => {
    setLoading(true)
    if (validateLoadValues()) {
      return message.error("KW should be in one column only")
    }
    if (validateUniqueFeederTag()) {
      return message.error("Feeder tag no. can not be repeated")
    }

    let payload = {
      project_id: project_id,
      status: "Not Released",
      description: "test",
      electrical_load_list_data: spreadsheetRef?.current?.getData().map((row: any) => {
        return {
          tag_number: row[0],
          service_description: row[1],
          working_kw: row[2],
          standby_kw: row[3],
          kva: row[4],
          starter_type: row[5],
          supply_voltage: row[6].split(" ")[0],
          phase: row[7],
          starting_time: row[8],
          eocr_applicable: row[9],
          lpbs_type: row[10],
          control_scheme: row[11],
          panel: row[12],
          bus_segregation: row[13],
          motor_rpm: row[14],
          motor_mounting_type: row[15],
          motor_frame_size: row[16],
          motor_gd2: row[17],
          motor_driven_equipment_gd2: row[18],
          bkw: row[19],
          coupling_type: row[20],
          package: row[21],
          area: row[22],
          standard: row[23],
          zone: row[24],
          gas_group: row[25],
          temperature_class: row[26],
          remark: row[27],
          rev: row[28],
          space_heater: row[29],
          bearing_rtd: row[30],
          winding_rtd: row[31],
          thermistor: row[32],
          bearing_type: row[33],
          power_factor: row[34],
          motor_efficiency: row[35],
          local_isolator: row[36],
          panel_ammeter: row[37],
          motor_make: row[38],
          motor_scope: row[39],
          motor_location: row[40],
          motor_part_code: row[41],
          motor_rated_current: row[42],
        }
      }),
    }
    try {
      console.log(payload, "load list payload")

      const respose = await updateData(
        `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`,
        false,
        payload
      )
      setLoading(false)
      message.success("Electrical Load List Saved !")

      console.log(respose, "load list response")
    } catch (error) {
      message.error("Unable to save electrical load list")

      setLoading(false)
    }
    console.log(spreadsheetRef?.current?.getData(), "all load list data")
    // localStorage.setItem("loadList", JSON.stringify(spreadsheetRef?.current?.getData()))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File

    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })

      const sheetName = workbook.SheetNames[0]
      if (!sheetName) {
        console.error("No sheets found in workbook")
        return
      }
      const worksheet = workbook.Sheets[sheetName] as any
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(2) as any[][]

      const newArray = jsonData.map((subArray) => subArray.slice(1))

      newArray.forEach((item) => {
        console.log(item[6], !item[6], "supply voltage")
        console.log(projectInfo?.main_supply_lv, "supply voltage")
        console.log(motorParameters, "upload sheet")
        if (!item[6]) {
          item[6] = projectInfo?.main_supply_lv || "" // main supply lv
        }
        if (!item[7]) {
          item[7] = "3 Phase" //Phase
        }
        if (!item[9]) {
          item[9] = "No" // EOCR
        }
        if (!item[29]) {
          item[29] = getStandByKw(item[2], item[3]) >= Number(motorParameters[0]?.safe_area_space_heater) ? "Yes" : "No" // space heater criteria
        }
        if (!item[30]) {
          item[30] = getStandByKw(item[2], item[3]) >= Number(motorParameters[0]?.safe_area_bearing_rtd) ? "Yes" : "No" // bearing rtd criteria
        }
        if (!item[31]) {
          item[31] = getStandByKw(item[2], item[3]) >= Number(motorParameters[0]?.safe_area_winding_rtd) ? "Yes" : "No" // winding rtd criteria
        }
        if (!item[32]) {
          item[32] =
            getStandByKw(item[2], item[3]) >= Number(motorParameters[0]?.safe_area_thermister) &&
            item[5]?.includes("VFD")
              ? "Yes"
              : "No" // thermistor criteria
        }
        if (!item[34]) {
          item[34] = "0.8" // power factor
        }
        if (!item[35]) {
          item[35] = motorParameters[0]?.safe_area_efficiency_level // efficieany
        }
        if (!item[36]) {
          item[36] = "No" // local isolator
        }
        console.log(commonConfigurationData)

        // }
        if (getStandByKw(item[2], item[3]) >= Number(commonConfigurationData[0]?.ammeter)) {
          if (!item[37]) {
            item[37] = commonConfigurationData[0]?.ammeter_configuration //ametter config selection
          }
        }
        if (getStandByKw(item[2], item[3]) <= Number(commonConfigurationData[0]?.dol_starter)) {
          if (!item[5]) {
            item[5] = "DOL STARTER"
          }
        }
        if (getStandByKw(item[2], item[3]) >= Number(commonConfigurationData[0]?.star_delta_starter)) {
          if (!item[5]) {
            item[5] = "STAR-DELTA"
          }
        }
      })
      console.log(newArray)

      spreadsheetRef?.current?.setData(newArray)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleCurrentCalculation = async () => {
    setLoading(true)
    const loadList = spreadsheetRef?.current?.getData()
    const data = await getCurrentCalculation({
      divisionName: "Heating",
      data: loadList?.map((row: any) => {
        return {
          kw: getStandByKw(row[2], row[3]),
          supplyVoltage: Number(row[6].split(" ")[0]),
          phase: row[7],
          powerFactor: Number(row[34]),
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: row[0],
          starterType: row[5],
        }
      }),
    })
    const updatedLoadList: any = loadList?.map((row: any) => {
      const calculationResult = data?.find((item: any) => item.tagNo === row[0])
      if (calculationResult) {
        const updatedRow = [...row]
        updatedRow[42] = calculationResult.motorRatedCurrent
        return updatedRow
      }
      return row
    })

    spreadsheetRef?.current?.setData(updatedLoadList)
    setLoading(false)

    // setLoadListData(updatedLoadList)
  }
  const handleTemplateDownload = () => {
    const filePath = "./Motor_Details_Template.xlsx"
    const fileName = "Motor_Details_Template.xlsx"

    // Create a temporary anchor element
    const link = document.createElement("a")
    link.href = path.join(filePath)
    link.setAttribute("download", fileName)
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Clean up the temporary anchor element
    link?.parentNode?.removeChild(link)
  }
  const handleValidatePanelLoad = () => {
    if (spreadsheetRef?.current) {
      const data = spreadsheetRef?.current?.getData()
      console.log(data, "load list data")

      calculatePanelSum(data)
      setIsValidatePanelLoadOpen(true)
    }
  }
  const calculatePanelSum = (electricalLoadListData: any) => {
    // Transform panelList to string array
    const workingPanelList: string[] = panelList
      .map((p: any) => (typeof p === "object" && p !== null && "name" in p ? p.name : String(p)))
      .filter(Boolean)

    // Initialize panelsSumData object
    const panelsSumData: Record<string, PanelSumData> = Object.fromEntries(
      workingPanelList.map((panelType) => [
        panelType,
        {
          panelName: panelType,
          workingLoadSum: 0,
          standbyLoadSum: 0,
          totalLoadKw: 0,
          totalCurrent: 0,
        },
      ])
    )

    // Calculate sums for each panel
    electricalLoadListData.forEach((row: any) => {
      const panelType = String(row[12] || "")
      const workingLoad = parseFloat(String(row[2] || "0"))
      const standbyLoad = parseFloat(String(row[3] || "0"))
      const current = parseFloat(String(row[42] || "0"))

      // Type guard to ensure panel exists
      if (!panelType || !(panelType in panelsSumData)) {
        return
      }

      if (!isNaN(workingLoad) && !isNaN(standbyLoad)) {
        // TypeScript now knows panel must exist
        const panel = panelsSumData[panelType] as PanelSumData
        panel.workingLoadSum += workingLoad
        panel.standbyLoadSum += standbyLoad
        panel.totalLoadKw = panel.workingLoadSum

        if (workingLoad !== 0) {
          panel.totalCurrent += current
        }
      }
    })

    // Filter out panels with zero current
    const filteredPanelData = Object.values(panelsSumData).filter((item) => item.totalCurrent !== 0)

    setPanelsSumData(filteredPanelData)
    // return Object.values(panelsSumData).filter((item) => item.totalCurrent !== 0)
  }
  // console.log(panelsSumData, "panelsSumData")

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button type="primary" onClick={() => setIsControlSchemeModalOpen(true)} className="hover:bg-blue-600">
          Control Scheme Configurator
        </Button>
        <Button type="primary" onClick={() => setIsLPBSModalOpen(true)} className="hover:bg-blue-600">
          LPBS Configurator
        </Button>
      </div>
      <div className="m-2 flex flex-col overflow-auto">
        <div ref={jRef} />
      </div>

      <ControlSchemeConfigurator
        isOpen={isControlSchemeModalOpen}
        onClose={() => setIsControlSchemeModalOpen(false)}
        // controlSchemes={controlSchemes}
        selectedControlSchemes={getSelectedSchemes()}
        onConfigurationComplete={handleControlSchemeComplete}
      />

      <LpbsConfigurator
        isOpen={isLPBSModalOpen}
        onClose={() => setIsLPBSModalOpen(false)}
        selectedLpbsSchemes={getSelectedLpbsSchemes()}
        onConfigurationComplete={handleLpbsComplete}
      />
      <ValidatePanelLoad
        isOpen={isValidatePanelLoadOpen}
        onClose={() => setIsValidatePanelLoadOpen(false)}
        panelsSumData={panelsSumData}
      />

      <div className="flex w-full flex-row justify-end gap-2">
        <Button type="primary" onClick={handleCurrentCalculation}>
          Get Current
        </Button>
        <Button type="primary" onClick={handleValidatePanelLoad}>
          Validate Panel Load
        </Button>
        <Button type="primary">
          Upload Load List
          <input
            type="file"
            style={{
              position: "absolute",
              opacity: 0,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onChange={handleFileChange}
          />
        </Button>
        <Button type="primary" onClick={downloadCurrentData}>
          Download Current Data
        </Button>
        <Button type="primary" onClick={handleTemplateDownload}>
          {/* <a href="public/files/Motor_Details_Template.xlsx" download>
            Download Load List Template

          </a> */}
          Download Load List Template
        </Button>
        <Button type="primary" onClick={handleLoadListSave}>
          Save
        </Button>
        <Button type="primary" onClick={() => {}}>
          Next
        </Button>
      </div>
    </>
  )
}

export default LoadList

// "use client"

// import React, { useRef, useEffect, useMemo, useState } from "react"
// import Jspreadsheet, { CellValue, JspreadsheetRefElement, JSpreadsheetOptions } from "jspreadsheet-ce"
// import { JspreadsheetRef } from "jspreadsheet-ce"

// import "jspreadsheet-ce/dist/jspreadsheet.css"
// import { LoadListcolumns } from "../common/ExcelColumns"
// import { ValidColumnType } from "../types"

// // Extend the Window interface to include Jspreadsheet
// declare global {
//   interface Window {
//     jspreadsheet: typeof Jspreadsheet
//   }
// }

// const SpreadsheetComponent: React.FC = () => {
//   // const spreadsheetRef = useRef<JspreadsheetRef | null>(null)
//   const [spreadsheetRef, setspreadsheetRef] = useState<JspreadsheetRef | null>(null)

//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const [loadListColumns, setloadListColumns] = useState<any[]>(
//     LoadListcolumns(7).map((column) => ({
//       ...column,
//       type: column.type as ValidColumnType,
//     }))
//   )
//   useEffect(() => {
//     console.log(loadListColumns, "loadListColumns")
//   }, [loadListColumns])

//   const handleSheetChange = (
//     element: JspreadsheetRefElement,
//     cell: HTMLTableCellElement,
//     colIndex: string | number,
//     rowIndex: string | number,
//     newValue: CellValue,
//     oldValue: CellValue
//   ) => {
//     console.log("Cell changed:", {
//       newValue: newValue,
//     })

//     // Example of more complex change handling
//     try {
//       const sheetData = spreadsheetRef?.getData()
//       if (!sheetData)
//         if (rowIndex === 2 && newValue !== "") {
//         }
//     } catch (error) {
//       console.error("Error in sheet change handler:", error)
//     }
//   }

//   useEffect(() => {
//     if (containerRef.current && !spreadsheetRef) {
//       // Jspreadsheet configuration with TypeScript-friendly options
//       const options: JSpreadsheetOptions = {
//         data: [
//           ["", "", "", ""],
//           ["", "", "", ""],
//           ["", "", "", ""],
//         ],
//         columns: loadListColumns,
//         onchange: handleSheetChange,
//         allowRenameColumn: true,
//         columnSorting: true,
//       }

//       // Initialize Jspreadsheet

//       const instance = Jspreadsheet(containerRef.current, options) as JspreadsheetRef
//       setspreadsheetRef(instance)
//       // spreadsheetRef.current =
//     }

//     // Cleanup function
//     return () => {
//       if (spreadsheetRef) {
//         spreadsheetRef?.destroy()
//         // spreadsheetRef = null
//         setspreadsheetRef(null)
//       }
//     }
//   }, [])

//   return (
//     <div className="p-4 overflow-x-auto">
//       <h2 className="mb-4 text-xl">Jspreadsheet TypeScript Example</h2>
//       <div ref={containerRef} />
//     </div>
//   )
// }

// export default SpreadsheetComponent
