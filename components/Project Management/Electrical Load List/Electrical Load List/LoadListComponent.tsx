"use client"
import jspreadsheet, { JspreadsheetInstance, Column } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo } from "react"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints"
import Modal from "components/Modal/Modal"
import { getData } from "actions/crud-actions"
import { controlSchemeColumnsForHeating, mockExcel } from "../../../../app/Data"
import { LoadListcolumns } from "../common/ExcelColumns"
import "./LoadListComponent.css"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"

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

interface CustomColumn extends Omit<Column, "type"> {
  type: ValidColumnType
  name: string
  title: string
  width: string
  readOnly?: boolean
  source?: string[]
  height?: string
}

const ExcelGrid: React.FC = () => {
  const jRef = useRef<HTMLDivElement | null>(null)
  const controlSchemeSheetRef = useRef<HTMLDivElement | null>(null)
  const controlSchemeSelectedSheetRef = useRef<HTMLDivElement | null>(null)
  const [controlSchemes, setControlSchemes] = useState<any[]>([])
  const [controlSchemesSelected, setControlSchemesSelected] = useState<any[]>([])
  const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
  const [controlSchemeInstance, setControlSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [selectedSchemeInstance, setSelectedSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [isControlSchemeModalOpen, setIsControlSchemeModalOpen] = useState(false)
  const [isLPBSModalOpen, setIsLPBSModalOpen] = useState(false)
  const [isControlSchemeEmpty, setIsControlSchemeEmpty] = useState(false)

  // Memoize the column configurations
  const typedLoadListColumns = useMemo(
    () =>
      LoadListcolumns.map((column) => ({
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

  // Memoize the options
  const options = useMemo(
    () => ({
      data: mockExcel,
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
    [typedLoadListColumns]
  )
  useEffect(() => {
    let instance: JspreadsheetInstance | null = null
    let selectedItems: string[] = []
    const storedSchemes = localStorage.getItem("selected_control_scheme")
    console.log(storedSchemes, "storedSchemes")
    if (storedSchemes) {
      selectedItems = JSON.parse(storedSchemes) as string[]
    }

    typedLoadListColumns.forEach((column) => {
      if (column.name === "controlScheme") {
        column.source = selectedItems;
      }
    });
    
    // console.log(typedLoadListColumns, "storedSchemes 2")
    // console.log(updatedColumns,);
    
    if (jRef.current && !spreadsheetInstance) {
      instance = jspreadsheet(jRef.current, options)
      setSpreadsheetInstance(instance)
    }

    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [])

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

      setControlSchemes(schemes)
    })
  }, [])

  // Handle control scheme modal
  useEffect(() => {
    if (isControlSchemeModalOpen && controlSchemeSheetRef.current) {
      // Clean up previous instance
      if (controlSchemeInstance) {
        controlSchemeInstance.destroy()
      }

      // Update selected schemes from localStorage
      const storedSchemes = localStorage.getItem("selected_control_scheme")
      let updatedSchemes = [...controlSchemes]

      if (storedSchemes) {
        try {
          const selectedItems = JSON.parse(storedSchemes) as string[]
          updatedSchemes = controlSchemes.map((scheme) => {
            if (selectedItems.includes(scheme[2])) {
              return [true, ...scheme.slice(1)]
            }
            return scheme
          })
        } catch (error) {
          console.error("Error parsing selected_control_scheme:", error)
        }
      }

      const instance = jspreadsheet(controlSchemeSheetRef.current, {
        data: updatedSchemes,
        columns: typedControlSchemeColumns,
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        onchange: () => setIsControlSchemeEmpty(false),
        filters: true,
        tableWidth: "100%",
        tableHeight: "500px",
        freezeColumns: 4,
        rowResize: true,
      })
      setControlSchemeInstance(instance)
    }

    return () => {
      if (controlSchemeInstance) {
        controlSchemeInstance.destroy()
        setControlSchemeInstance(null)
      }
    }
  }, [isControlSchemeModalOpen, controlSchemes, typedControlSchemeColumns])

  // Handle selected schemes spreadsheet
  useEffect(() => {
    if (controlSchemeSelectedSheetRef.current && controlSchemesSelected.length > 0) {
      if (selectedSchemeInstance) {
        selectedSchemeInstance.destroy()
      }

      const instance = jspreadsheet(controlSchemeSelectedSheetRef.current, {
        data: controlSchemesSelected,
        columns: typedControlSchemeColumns.map((column) => ({
          ...column,
          readOnly: true,
        })),
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        filters: true,
        tableWidth: "100%",
        tableHeight: "250px",
        freezeColumns: 4,
        rowResize: true,
      })
      setSelectedSchemeInstance(instance)
    }

    return () => {
      if (selectedSchemeInstance) {
        selectedSchemeInstance.destroy()
        setSelectedSchemeInstance(null)
      }
    }
  }, [controlSchemesSelected, typedControlSchemeColumns])

  const handleControlSchemeModalClose = () => {
    setIsControlSchemeModalOpen(false)
  }

  const onAdd = () => {
    const selected = controlSchemeInstance?.getData().filter((row) => row[0] === true)

    if (!selected?.length) {
      setIsControlSchemeEmpty(true)
      return
    }

    setControlSchemesSelected(selected)
    setIsControlSchemeEmpty(false)
  }

  const onConfirm = () => {
    localStorage.setItem("selected_control_scheme", JSON.stringify(controlSchemesSelected.map((item) => item[2])))

    // Update main spreadsheet columns
    const updatedColumns = typedLoadListColumns.map((column) => {
      if (column.name === "controlScheme") {
        return {
          ...column,
          source: controlSchemesSelected.map((item) => item[2]),
        }
      }
      return column
    })

    // Update main spreadsheet with new columns
    if (spreadsheetInstance) {
      spreadsheetInstance.destroy()
    }

    if (jRef.current) {
      const instance = jspreadsheet(jRef.current, {
        ...options,
        columns: updatedColumns,
      })
      setSpreadsheetInstance(instance)
    }

    setIsControlSchemeModalOpen(false)
  }

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <button
          className="rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          onClick={() => setIsControlSchemeModalOpen(true)}
        >
          Control Scheme Configurator
        </button>
        <button
          className="rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
          onClick={() => setIsLPBSModalOpen(true)}
        >
          LPBS configurator
        </button>
      </div>
      <div className="overflow-auto">
        <div ref={jRef} />
      </div>
      <Modal isOpen={isControlSchemeModalOpen} onClose={handleControlSchemeModalClose}>
        <div className="m-2 flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">Control Scheme Configurator</h2>
          {isControlSchemeEmpty && <AlertNotification message="Please select control scheme!" status="error" />}
          <div ref={controlSchemeSheetRef} />
          <div className="flex w-full flex-row justify-end py-2">
            <Button type="primary" onClick={onAdd}>
              Add
            </Button>
          </div>
          {controlSchemesSelected.length > 0 && (
            <>
              <div ref={controlSchemeSelectedSheetRef} />
              <div className="flex w-full flex-row justify-end py-2">
                <Button type="primary" onClick={onConfirm}>
                  Confirm
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <Modal isOpen={isLPBSModalOpen} onClose={() => setIsLPBSModalOpen(false)}>
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">LPBS Configurator</h2>
        </div>
      </Modal>
    </>
  )
}

export default ExcelGrid
