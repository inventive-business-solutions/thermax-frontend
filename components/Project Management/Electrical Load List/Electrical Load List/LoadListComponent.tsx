"use client"
import jspreadsheet, { CellValue, Column, JspreadsheetInstance, JspreadsheetInstanceElement } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import {
  COMMON_CONFIGURATION,
  HEATING_CONTROL_SCHEMES_URI,
  MAIN_SUPPLY_LV_API,
  MAKE_OF_COMPONENT_API,
  MOTOR_PARAMETER_API,
  PROJECT_INFO_API,
  PROJECT_MAIN_PKG_LIST_API,
} from "configs/api-endpoints"
import { getData } from "actions/crud-actions"
import * as XLSX from "xlsx"

import { LoadListcolumns } from "../common/ExcelColumns"
import "./LoadListComponent.css"
import { Button, message } from "antd"
import ControlSchemeConfigurator from "./Control Scheme Config/ControlSchemeConfig"
import LpbsConfigurator from "./LPBS Config/LpbsConfigurator"
import ValidatePanelLoad, { PanelData } from "./Validate Panel Load/ValidatePanelLoad"
import { useGetData } from "hooks/useCRUD"
import { useProjectPanelData } from "hooks/useProjectPanelData"
import { useParams } from "next/navigation"
import useMakeOfComponentDropdowns from "components/Project Management/Design Basis/MCC-PCC/MakeOfComponent/MakeDropdowns"
import { useLoading } from "hooks/useLoading"
import { getCurrentCalculation } from "actions/electrical-load-list"

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
  onNext: () => void
  designBasisRevisionId: string
}
const LoadList: React.FC<LoadListProps> = ({ onNext, designBasisRevisionId }) => {
  console.log(designBasisRevisionId, "vishal")
  const jRef = useRef<HTMLDivElement | null>(null)
  const spreadsheetRef = useRef<JspreadsheetInstance | null>(null)

  const [loadListData, setLoadListData] = useState<any[]>([])
  const [controlSchemes, setControlSchemes] = useState<any[]>([])
  const [subPackages, setSubPackages] = useState<any[]>([])
  const [lpbsSchemes, setLpbsSchemes] = useState<any[]>([])
  const [panelList, setPanelList] = useState<string[]>([])
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const [panelsSumData, setPanelsSumData] = useState<PanelSumData[]>([])

  // Modal states
  const [isControlSchemeModalOpen, setIsControlSchemeModalOpen] = useState(false)
  const [isLPBSModalOpen, setIsLPBSModalOpen] = useState(false)
  const [isValidatePanelLoadOpen, setIsValidatePanelLoadOpen] = useState(false)

  const params = useParams()
  const project_id = params.project_id
  const { setLoading } = useLoading()
  // Data hooks
  const { data: motorParameters } = useGetData(
    `${MOTOR_PARAMETER_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  )
  const { data: commonConfigurationData } = useGetData(
    `${COMMON_CONFIGURATION}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  )

  const { data: makeOfComponent } = useGetData(
    `${MAKE_OF_COMPONENT_API}?fields=["*"]&filters=[["revision_id", "=", "${designBasisRevisionId}"]]`
  )
  const { motors_make_options } = useMakeOfComponentDropdowns()
  console.log(makeOfComponent, motors_make_options, "motors_make_options")

  const { data: projectPanelData, isLoading } = useProjectPanelData(designBasisRevisionId)

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
    console.log("col index :", typeof colIndex)

    if (colIndex === "21") {
      console.log(subPackages, "vishal motor parameters")

      subPackages?.forEach((pckg: any) => {
        let selectedPckg = pckg?.sub_packages?.find((item: any) => item.sub_package_name == newValue)
        console.log(selectedPckg)

        if (selectedPckg) {
          if (selectedPckg?.area_of_classification == "Hazardous Area") {
            ;(data[rowIndex][22] = "Hazardous"),
              (data[rowIndex][23] = pckg?.standard),
              (data[rowIndex][24] = pckg?.zone),
              (data[rowIndex][25] = pckg?.gas_group),
              (data[rowIndex][26] = pckg?.temperature_class)
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
      LoadListcolumns(7).map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )

  // Memoized spreadsheet options
  const loadListOptions = useMemo(
    () => ({
      data: loadListData,
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
      freezeColumns: 4,
      rowResize: true,
    }),
    [typedLoadListColumns, loadListData]
  )

  // Fetch and update functions with useCallback
  const fetchProjectInfo = useCallback(async () => {
    try {
      const projectInfo = await getData(
        `${PROJECT_INFO_API}?fields=["main_supply_lv"]&filters=[["project_id", "=", "${project_id}"]]`
      )
      const MAIN_SUPPLY_LV = await getData(`${MAIN_SUPPLY_LV_API}?fields=["*"]`)
      if (MAIN_SUPPLY_LV.length) {
        typedLoadListColumns.forEach((column) => {
          if (column.name === "supplyVoltage") {
            column.source = MAIN_SUPPLY_LV.map((item: any) => item.voltage)
          }
        })
      }

      console.log(MAIN_SUPPLY_LV, "projectInfo")

      setProjectInfo(projectInfo[0])
    } catch (error) {
      console.error("Error fetching project info:", error)
    }
  }, [project_id])

  const fetchSubPackageOptions = useCallback(async () => {
    try {
      const mainPkgData = await getData(`${PROJECT_MAIN_PKG_LIST_API}?revision_id=${designBasisRevisionId}`)
      console.log(mainPkgData, "vishal")

      if (mainPkgData?.length) {
        typedLoadListColumns.forEach((column) => {
          if (column.name === "pkg") {
            column.source = mainPkgData
              ?.map((pkg: any) => pkg.sub_packages)
              .flat()
              .map((item: any) => item.sub_package_name)
          }
        })
        setSubPackages(mainPkgData)
        console.log(mainPkgData?.map((pkg: any) => pkg.sub_packages).flat(), "vishal")

        // updateSpreadsheetColumns(updatedColumns)
      }
    } catch (error) {
      console.error("Error fetching sub-package options:", error)
    }
  }, [designBasisRevisionId, typedLoadListColumns])

  // Spreadsheet data update function
  const updateSpreadsheetColumns = useCallback(
    (updatedColumns: any[]) => {
      if (spreadsheetRef.current) {
        spreadsheetRef.current.destroy()
      }

      if (jRef.current) {
        const instance = jspreadsheet(jRef.current, {
          ...loadListOptions,
          data: loadListData,
          columns: updatedColumns,
        })
        spreadsheetRef.current = instance
      }
    },
    [loadListOptions, loadListData]
  )

  // Initialization effects
  useEffect(() => {
    fetchProjectInfo()
    if (designBasisRevisionId) {
      fetchSubPackageOptions()
    }
  }, [fetchProjectInfo, fetchSubPackageOptions, designBasisRevisionId])

  // useEffect(() => {
  //   if(loadListData.length){
  //     updateSheetData(loadListData)
  //   }

  // }, [loadListData])

  // Fetch control schemes
  useEffect(() => {
    // isLoading
    setLoading(true)
    let selectedItems: string[] = []
    const storedSchemes = localStorage.getItem("selected_control_scheme")
    const savedLoadList = localStorage.getItem("loadList")

    if (storedSchemes) {
      selectedItems = JSON.parse(storedSchemes) as string[]
    }
    if (savedLoadList) {
      // selectedItems = JSON.parse(savedLoadList) as string[]
      console.log(JSON.parse(savedLoadList) as string[], "load list")
      // updateSheetData(JSON.parse(savedLoadList) as string[])
      setLoadListData(JSON.parse(savedLoadList) as string[])
    }
    console.log(storedSchemes, "selectedSchemes")
    console.log(selectedItems, "selectedSchemes")

    typedLoadListColumns.forEach((column) => {
      if (column.name === "controlScheme") {
        column.source = selectedItems
      }
    })

    if (controlSchemes.length) return

    getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`).then((res) => {
      const sortedSchemes = res
        .map((item: any) => [
          false,
          item.scheme,
          item.sub_scheme,
          item.scheme_title,
          item.description,
          item.breaker,
          item.lpbs,
          item.lpbs_inc_dec_ind,
          item.ammeter,
          item.thermistor_relay,
          item.motor_space_heater,
          item.plc_current_signal,
          item.plc_speed_signal,
          item.olr,
          item.phase,
          item.limit_switch,
          item.motor_protection_relay,
          item.field_isolator,
          item.local_panel,
          item.field_ess,
          item.electronic_relay,
          item.plc1_and_plc2,
          item.mcc_start_stop,
          item.input_choke,
          item.output_choke,
          item.separate_plc_start_stop,
          item.di,
          item.do,
          item.ai,
          item.ao,
        ])
        .sort((a: any, b: any) => {
          const [prefixA, numA] = a[2].split("-")
          const [prefixB, numB] = b[2].split("-")
          return prefixA === prefixB ? parseInt(numA, 10) - parseInt(numB, 10) : prefixA.localeCompare(prefixB)
        })

      setLpbsSchemes(sortedSchemes)
      setControlSchemes(sortedSchemes)
    })
  }, [])

  // Update panel dropdown
  useEffect(() => {
    if (projectPanelData && !isLoading) {
      const updatedColumns = typedLoadListColumns.map((column) => {
        if (column.name === "panelList") {
          return { ...column, source: projectPanelData.map((item: any) => item.panel_name) }
        }
        return column
      })

      updateSpreadsheetColumns(updatedColumns)
      setPanelList(projectPanelData.map((item: any) => item.panel_name))
    }
  }, [projectPanelData, isLoading, typedLoadListColumns, updateSpreadsheetColumns])

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
      if (column.name === "controlScheme") {
        column.source = selectedSchemes
      }
    })
    // updateLoadList()
  }
  const getCurrentHandle = () => {
    // typedLoadListColumns.forEach((column) => {
    //   if (column.name === "controlScheme") {
    //     column.source = selectedSchemes
    //   }
    // })
    // updateLoadList()
  }
  const handleValidatePanelLoad = () => {}
  const downloadCurrentData = () => {
    console.log(spreadsheetRef?.current)

    spreadsheetRef?.current
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

  const handleLoadListSave = () => {
    if (validateLoadValues()) {
      return message.error("KW should be in one column only")
    }
    if (validateUniqueFeederTag()) {
      return message.error("Feeder tag no. can not be repeated")
    }
    console.log(spreadsheetRef?.current?.getData(), "all load list data")
    localStorage.setItem("loadList", JSON.stringify(spreadsheetRef?.current?.getData()))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let payload = {
      tagNo: "",
      serviceDescription: "",
      workingKw: 0.1,
      standByKw: 0.1,
      kva: 0,
      starterType: "",
      supplyVoltage: "",
      phase: "",
      startingTime: "",
      eocrApplicable: "",
      lpbsType: "",
      controlScheme: "",
      panel: "",
      busSegregation: "",
      motorRpm: 0,
      typeOfMotorMounting: "",
      motorFrameSize: "",
      motorGd2: "",
      motorDrivenEquipmentGd2: "",
      bkw: "",
      typeOfCoupling: "",
      package: "",
      area: "",
      standard: "",
      zone: "",
      gasGroup: "",
      tempClass: "",
      remark: "",
      rev: "",
      spaceHeater: "",
      bearingRtd: "",
      windingRtd: "",
      thermistor: "",
      typeOfBearing: "",
      powerFactor: "",
      motorEfficiency: "",
      localIsolator: "",
      panelAmmeter: "",
      motorMake: "",
      motorScope: "",
      motorLocation: "",
      motorPartCode: "",
      motorRatedCurrent: "",
    }
    const file = event.target.files?.[0] as File

    // const file = files[0] as File;
    const reader = new FileReader()

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })

      // Assuming there's only one sheet in the workbook
      // const sheetName = workbook.SheetNames[0];
      const sheetName = workbook.SheetNames[0]
      if (!sheetName) {
        console.error("No sheets found in workbook")
        return
      }
      const worksheet = workbook.Sheets[sheetName] as any
      // Convert the worksheet to an array of arrays
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(2) as any[][]

      // Remove the first element of each sub-array
      const newArray = jsonData.map((subArray) => subArray.slice(1))

      newArray.forEach((item) => {
        console.log(item[6], !item[6], "supply voltage")
        console.log(projectInfo?.main_supply_lv, "supply voltage")
        console.log(motorParameters, "upload sheet")
        // console.log(, 'supply voltage');

        if (!item[6]) {
          item[6] = projectInfo?.main_supply_lv || "" // pass main supply lv here revisit logic
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
            item[37] = commonConfigurationData[0]?.ammeter_configuration
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

      // Set the processed data to the spreadsheet instance
      spreadsheetRef?.current?.setData(newArray)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleCurrentCalculation = async () => {
    const data = await getCurrentCalculation({
      divisionName: "Heating",
      data: [
        {
          kw: 11,
          supplyVoltage: 415,
          phase: "3 Phase",
          powerFactor: 0.8,
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: "M01",
          starterType: "",
        },
        {
          kw: 0.75,
          supplyVoltage: 415,
          phase: "1 Phase",
          powerFactor: 0.8,
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: "M02",
        },
        {
          kw: 9.3,
          supplyVoltage: 460,
          phase: "1 Phase",
          powerFactor: 0.8,
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: "M03",
        },
        {
          kw: 6,
          supplyVoltage: 415,
          phase: "3 Phase",
          powerFactor: 0.8,
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: "M04",
        },
        {
          kw: 4,
          supplyVoltage: 460,
          phase: "1 Phase",
          powerFactor: 0.8,
          motorFrameSize: "",
          motorPartCode: "",
          motorRatedCurrent: "",
          tagNo: "M05",
        },
      ],
    })
    console.log("Current Calculation", data)
  }
  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button type="primary" onClick={() => setIsControlSchemeModalOpen(true)} className="hover:bg-blue-600">
          Control Scheme Configurator
        </Button>
        <Button type="primary" onClick={() => setIsLPBSModalOpen(true)} className="hover:bg-blue-600">
          LPBS configurator
        </Button>

        {/* <button
          className="rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          onClick={() => setIsLPBSModalOpen(true)}
        >
          LPBS configurator
        </button> */}
      </div>
      <div className="m-2 flex flex-col overflow-auto">
        <div ref={jRef} />
      </div>

      <ControlSchemeConfigurator
        isOpen={isControlSchemeModalOpen}
        onClose={() => setIsControlSchemeModalOpen(false)}
        controlSchemes={controlSchemes}
        onConfigurationComplete={handleControlSchemeComplete}
      />

      <LpbsConfigurator
        isOpen={isLPBSModalOpen}
        onClose={() => setIsLPBSModalOpen(false)}
        lpbsSchemes={lpbsSchemes}
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
        <Button type="primary">Download Load List Template</Button>
        <Button type="primary" onClick={handleLoadListSave}>
          Save
        </Button>
        <Button type="primary" onClick={onNext}>
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
