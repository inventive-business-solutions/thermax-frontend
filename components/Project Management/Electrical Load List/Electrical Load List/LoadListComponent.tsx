"use client"
import jspreadsheet, { Column, JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import {
  DESIGN_BASIS_REVISION_HISTORY_API,
  HEATING_CONTROL_SCHEMES_URI,
  PROJECT_PANEL_API,
} from "configs/api-endpoints"
import Modal from "components/Modal/Modal"
import { getData } from "actions/crud-actions"
import { controlSchemeColumnsForHeating, lpbsColumns, mockExcel } from "../../../../app/Data"
import * as XLSX from "xlsx"

import { LoadListcolumns } from "../common/ExcelColumns"
import "./LoadListComponent.css"
import { Button, message } from "antd"
import ControlSchemeConfigurator from "./Control Scheme Config/ControlSchemeConfig"
import LpbsConfigurator from "./LPBS Config/LpbsConfigurator"
import ValidatePanelLoad, { PanelData } from "./Validate Panel Load/ValidatePanelLoad"
import { useGetData } from "hooks/useCRUD"
import { useProjectPanelData } from "hooks/useProjectPanelData"

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

interface LoadListProps {
  onNext: () => void
}
const LoadList: React.FC<LoadListProps> = ({ onNext }) => {
  const jRef = useRef<HTMLDivElement | null>(null)
  const [controlSchemes, setControlSchemes] = useState<any[]>([])
  const [loadListData, setLoadListData] = useState<any[]>()
  const [panelList, setPanelList] = useState<string[]>(["Panel 1", "Panel A", "Panel B"])
  const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
  const [isControlSchemeModalOpen, setIsControlSchemeModalOpen] = useState(false)
  const [isLPBSModalOpen, setIsLPBSModalOpen] = useState(false)
  const [lpbsSchemes, setLpbsSchemes] = useState<any[]>([])
  const [isValidatePanelLoadOpen, setIsValidatePanelLoadOpen] = useState(false)
  const [revisionId, setRevisionId] = useState<string | null>(null)
  const [panelsSumData, setPanelsSumData] = useState<PanelSumData[]>([]) // Memoize the column configurations

  const { data: projectPanelData, isLoading } = useProjectPanelData(revisionId)

  const typedLoadListColumns = useMemo(
    () =>
      LoadListcolumns(7).map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )

  const typedControlSchemeColumns = useMemo(
    () =>
      controlSchemeColumnsForHeating.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
  const typedLpbsColumns = useMemo(
    () =>
      lpbsColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )

  const handleLpbsComplete = (selectedSchemes: string[]) => {
    const updatedColumns = typedLoadListColumns.map((column) => {
      if (column.name === "lbpsType") {
        return { ...column, source: selectedSchemes }
      }
      return column
    })

    updateSpreadsheetColumns(updatedColumns)
  }

  const updateSpreadsheetColumns = (updatedColumns: any[]) => {
    if (spreadsheetInstance) {
      spreadsheetInstance.destroy()
    }

    if (jRef.current) {
      const instance = jspreadsheet(jRef.current, {
        ...loadListOptions,
        columns: updatedColumns,
      })
      setSpreadsheetInstance(instance)
    }
  }
  const downloadCurrentData = () => {
    // spreadsheetInstance?.loadListOptions.csvFileName = "Motar Detail Data";
    // spreadsheetInstance?.loadListOptions.wordWrap = true;
    spreadsheetInstance?.download()
  }

  // Memoize the loadListOptions
  const loadListOptions = useMemo(
    () => ({
      data: loadListData,
      columns: typedLoadListColumns,
      columnSorting: true,
      columnDrag: true,
      columnResize: true,
      tableOverflow: true,
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

  // Initialize main spreadsheet

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRevisionId = localStorage.getItem("revision_id")
      setRevisionId(storedRevisionId)
    }

    let instance: JspreadsheetInstance | null = null
    let selectedItems: string[] = []
    const storedSchemes = localStorage.getItem("selected_control_scheme")
    const savedLoadList = localStorage.getItem("loadList")

    if (storedSchemes) {
      selectedItems = JSON.parse(storedSchemes) as string[]
    }
    if (savedLoadList) {
      // selectedItems = JSON.parse(savedLoadList) as string[]
      console.log(JSON.parse(savedLoadList) as string[], "load list")
      setLoadListData(JSON.parse(savedLoadList) as string[])
    }

    typedLoadListColumns.forEach((column) => {
      if (column.name === "controlScheme") {
        column.source = selectedItems
      }
    })

    if (jRef.current && !spreadsheetInstance) {
      instance = jspreadsheet(jRef.current, loadListOptions)
      setSpreadsheetInstance(instance)
    }

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [])
  useEffect(() => {
    if (loadListData?.length) {
      updateLoadList()
    }
  }, [loadListData])

  const updateLoadList = () => {
    if (spreadsheetInstance) {
      spreadsheetInstance.destroy()
    }

    if (jRef.current) {
      const instance = jspreadsheet(jRef.current, {
        ...loadListOptions,
        // columns: updatedColumns,
      })
      setSpreadsheetInstance(instance)
    }
  }
  //update panel dropdown
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
  }, [projectPanelData])

  // Fetch control schemes
  useEffect(() => {
    getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`).then((res) => {
      const schemes = res
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
      setLpbsSchemes(schemes)

      setControlSchemes(schemes)
    })
  }, [])

  // validate kw values
  const validateLoadValues = () => {
    let rows = spreadsheetInstance?.getData() || []
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
        spreadsheetInstance?.setStyle(cellAddress, "background-color", "white")
      }

      // If more than one column has a value greater than 0, highlight the cells
      if (greaterThanZeroCount > 1 || allZero) {
        isInvalid = true
        for (let colIndex = 2; colIndex <= 4; colIndex++) {
          let cellValue = parseFloat((row[colIndex] as string) || "0")

          if (cellValue > 0) {
            const cellAddress = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`
            spreadsheetInstance?.setStyle(cellAddress, "background-color", "yellow")
          }
        }
      }
    })

    return isInvalid
  }

  // validate unique feeder tag
  const validateUniqueFeederTag = () => {
    if (!spreadsheetInstance) {
      console.warn("Spreadsheet instance is not available.")
      return false
    }

    const firstColumnData = spreadsheetInstance.getColumnData(0) || []
    const duplicateValues: { [key: string]: number[] } = {}
    let isDuplicate = false

    // Reset background color for all cells in column A
    firstColumnData.forEach((value, index) => {
      const cellAddress = `A${index + 1}`
      spreadsheetInstance.setStyle(cellAddress, "background-color", "white")
    })

    // Find duplicate values and store their row indices
    firstColumnData.forEach((value, index) => {
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
          spreadsheetInstance.setStyle(cellAddress, "background-color", "red")
        })
      }
    })

    return isDuplicate
  }

  const handleControlSchemeComplete = (selectedSchemes: string[]) => {
    // Update main spreadsheet columns
    // const updatedColumns = typedLoadListColumns.map((column) => {
    //   if (column.name === "controlScheme") {
    //     return {
    //       ...column,
    //       source: selectedSchemes,
    //     }
    //   }
    //   return column
    // })

    typedLoadListColumns.forEach((column) => {
      if (column.name === "controlScheme") {
        column.source = selectedSchemes
      }
    })
    updateLoadList()

    // Update main spreadsheet with new columns
    // if (spreadsheetInstance) {
    //   spreadsheetInstance.destroy()
    // }

    // if (jRef.current) {
    //   const instance = jspreadsheet(jRef.current, {
    //     ...loadListOptions,
    //     columns: updatedColumns,
    //   })
    //   setSpreadsheetInstance(instance)
    // }
  }

  const handleLoadListSave = () => {
    if (validateLoadValues()) {
      return message.error("KW should be in one column only")
    }
    if (validateUniqueFeederTag()) {
      return message.error("Feeder tag no. can not be repeated")
    }
    console.log(spreadsheetInstance?.getData(), "all load list data")
    localStorage.setItem("loadList", JSON.stringify(spreadsheetInstance?.getData()))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!item[6]) {
          item[6] = 210 // pass main supply lv here revisit logic
        }
        if (getStandByKw(item[2], item[3]) >= Number(localStorage.getItem("ammeterKw"))) {
          if (!item[37]) {
            item[37] = localStorage.getItem("ammeterCt")
          }
        }
        if (getStandByKw(item[2], item[3]) <= Number(localStorage.getItem("dol_val"))) {
          if (!item[5]) {
            item[5] = "DOL STARTER"
          }
        }
        if (getStandByKw(item[2], item[3]) >= Number(localStorage.getItem("starDelta_val"))) {
          if (!item[5]) {
            item[5] = "STAR-DELTA"
          }
        }
      })

      // Set the processed data to the spreadsheet instance
      spreadsheetInstance?.setData(newArray)
    }

    reader.readAsArrayBuffer(file)
  }
  // const onFileChange = (files: FileList) => {
  //   const file = files[0] as File

  //   const reader = new FileReader()

  //   reader.onload = (e: any) => {
  //     const data = new Uint8Array(e.target.result)
  //     const workbook = XLSX.read(data, { type: "array" })

  //     // Assuming there's only one sheet in the workbook

  //     const sheetName = workbook.SheetNames[0]
  //     const worksheet = workbook.Sheets[sheetName]
  //     // Convert the worksheet to an array of arrays
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(2) as any[][]
  //     // Remove the first element of each sub-array
  //     const newArray = jsonData.map((subArray) => subArray.slice(1))
  //     // console.log(newArray, 'uploaded load list');
  //     // const main_supply_lv_val = JSON.parse(
  //     //   this.dataService.getData("main_supply_lv_val")
  //     // );
  //     // console.log(main_supply_lv_val, "system supply dat");

  //     newArray.forEach((item) => {
  //       if (!item[6]) {
  //         item[6] = main_supply_lv_val;
  //       }
  //       if (getStandByKw(item[2], item[3]) >= localStorage.getItem("ammeterKw")) {
  //         if (item[37] == "" || item[37] == undefined) {
  //           // console.log(localStorage.getItem('ammeterCt'), 'uploaded load list');
  //           item[37] = localStorage.getItem("ammeterCt")
  //         }
  //       }
  //       if (getStandByKw(item[2], item[3]) <= localStorage.getItem("dol_val")) {
  //         if (item[5] == "" || item[5] == undefined) {
  //           item[5] = "DOL STARTER"
  //         }
  //       }
  //       if (getStandByKw(item[2], item[3]) >= localStorage.getItem("starDelta_val")) {
  //         if (item[5] == "" || item[5] == undefined) {
  //           item[5] = "STAR-DELTA"
  //         }
  //       }
  //     })

  //     // console.log(newArray, 'uploaded load list');

  //     // this.dataService.setData("load_list_data", JSON.stringify(newArray))
  //     spreadsheetInstance?.setData(newArray)
  //   }

  //   reader.readAsArrayBuffer(file)
  // }
  const getStandByKw = (item2: any, item3: any) => {
    if (item2 != "" || item2 != "0") {
      return item2
    } else {
      return item3
    }
  }
  // const calculatePanelSum = (electricalLoadListData: any[]) => {
  //   console.log(panelList, "panel sum")
  //   console.log(electricalLoadListData, "panel sum electricalLoadListData")

  //   // Transform panelList if needed
  //   let workingPanelList = [...panelList]
  //   if (workingPanelList[0] && typeof workingPanelList[0] === "object" && "name" in workingPanelList[0]) {
  //     workingPanelList = workingPanelList.map((p: any) => p.name)
  //   }

  //   // Initialize panelsSumData object
  //   const panelsSumData: { [key: string]: PanelSumData } = {}

  //   workingPanelList.forEach((panelType: string) => {
  //     if (panelType) {
  //       panelsSumData[panelType] = {
  //         panelName: panelType,
  //         workingLoadSum: 0,
  //         standbyLoadSum: 0,
  //         totalLoadKw: 0,
  //         totalCurrent: 0,
  //       }
  //     }
  //   })

  //   console.log(panelsSumData, "panel sum")

  //   // Calculate sums for each panel
  //   electricalLoadListData?.forEach((row: any) => {
  //     const panelType = row[12]

  //     if (
  //       panelType && // Ensure panelType is not null or undefined
  //       panelsSumData[panelType] &&
  //       !isNaN(parseFloat(row[2])) && // Check if row[2] is a valid number
  //       !isNaN(parseFloat(row[3])) // Check if row[3] is a valid number
  //     ) {
  //       panelsSumData[panelType].workingLoadSum =
  //         (panelsSumData[panelType].workingLoadSum || 0) + parseFloat(row[2] || "0")
  //       panelsSumData[panelType].standbyLoadSum =
  //         (panelsSumData[panelType].standbyLoadSum || 0) + parseFloat(row[3] || "0")
  //       panelsSumData[panelType].totalLoadKw = panelsSumData[panelType].workingLoadSum
  //       panelsSumData[panelType].totalCurrent =
  //         (panelsSumData[panelType].totalCurrent || 0) +
  //         (row[2] !== "" && row[2] !== "0" ? parseFloat(row[42] || "0") : 0)
  //     }
  //   })

  //   // Filter out panels with zero current
  //   const filteredPanelData = Object.values(panelsSumData).filter((item) => item.totalCurrent !== 0)

  //   console.log(filteredPanelData, "panel sum")
  //   console.log(panelsSumData, "panel sum")

  //   setPanelsSumData(filteredPanelData)
  //   return filteredPanelData
  // }

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

  // export default calculatePanelSum;

  const handleValidatePanelLoad = () => {
    if (spreadsheetInstance) {
      const data = spreadsheetInstance.getData()
      console.log(data, "load list data")

      calculatePanelSum(data)
      setIsValidatePanelLoadOpen(true)
    }
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
        typedControlSchemeColumns={typedControlSchemeColumns}
        onConfigurationComplete={handleControlSchemeComplete}
      />

      <LpbsConfigurator
        isOpen={isLPBSModalOpen}
        onClose={() => setIsLPBSModalOpen(false)}
        lpbsSchemes={lpbsSchemes}
        typedLpbsColumns={typedLpbsColumns}
        onConfigurationComplete={handleLpbsComplete}
      />
      <ValidatePanelLoad
        isOpen={isValidatePanelLoadOpen}
        onClose={() => setIsValidatePanelLoadOpen(false)}
        panelsSumData={panelsSumData}
      />

      <div className="flex w-full flex-row justify-end gap-2">
        <Button type="primary">Get Current</Button>
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
