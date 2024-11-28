// ControlSchemeConfigurator.tsx
import { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo } from "react"
import jspreadsheet from "jspreadsheet-ce"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"
import Modal from "components/Modal/Modal"
import { controlSchemeColumnsForHeating } from "app/Data"
import { ValidColumnType } from "../../types"
import { useLoading } from "hooks/useLoading"
import { getData } from "actions/crud-actions"
import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints"

interface ControlSchemeConfiguratorProps {
  isOpen: boolean
  onClose: () => void
  // controlSchemes: any[]
  selectedControlSchemes: any[]
  onConfigurationComplete: (selectedSchemes: string[]) => void
}

const ControlSchemeConfigurator: React.FC<ControlSchemeConfiguratorProps> = ({
  isOpen,
  onClose,
  // controlSchemes,
  selectedControlSchemes,
  onConfigurationComplete,
}) => {
  const controlSchemeSheetRef = useRef<HTMLDivElement | null>(null)
  const controlSchemeSelectedSheetRef = useRef<HTMLDivElement | null>(null)
  const [controlSchemeInstance, setControlSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [selectedSchemeInstance, setSelectedSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [controlSchemes, setControlSchemes] = useState<any[]>([])
  const { setLoading } = useLoading()
  const [controlSchemesSelected, setControlSchemesSelected] = useState<any[]>([])
  const [isControlSchemeEmpty, setIsControlSchemeEmpty] = useState(false)
  const typedControlSchemeColumns = useMemo(
    () =>
      controlSchemeColumnsForHeating.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
  // Fetch control schemes
  useEffect(() => {
    setLoading(true)
    // fetchProjectInfo()

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

      // setLpbsSchemes(sortedSchemes)
      setControlSchemes(sortedSchemes)
      setLoading(false)
    })
  }, [])
  // Initialize main control scheme spreadsheet

  useEffect(() => {
    if (isOpen && controlSchemeSheetRef.current) {
      if (controlSchemeInstance) {
        controlSchemeInstance.destroy()
      }

      // Update selected schemes from localStorage
      // const storedSchemes = localStorage.getItem("selected_control_scheme")
      let updatedSchemes = [...controlSchemes]

      // if (storedSchemes) {
      try {
        // const selectedItems = JSON.parse(storedSchemes) as string[]
        const selectedItems = selectedControlSchemes
        updatedSchemes = controlSchemes.map((scheme) => {
          if (selectedItems.includes(scheme[2])) {
            return [true, ...scheme.slice(1)]
          }
          return scheme
        })
      } catch (error) {
        console.error("Error parsing selected_control_scheme:", error)
      }
      // }

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
  }, [isOpen, controlSchemes, typedControlSchemeColumns])

  // Initialize selected schemes spreadsheet
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

  const handleAdd = () => {
    const selected = controlSchemeInstance?.getData().filter((row) => row[0] === true)

    if (!selected?.length) {
      setIsControlSchemeEmpty(true)
      return
    }

    setControlSchemesSelected(selected)
    setIsControlSchemeEmpty(false)
  }

  const handleConfirm = () => {
    const selectedSchemes = controlSchemesSelected.map((item) => item[2])
    // localStorage.setItem("selected_control_scheme", JSON.stringify([...selectedSchemes, "NA"]))
    onConfigurationComplete([...selectedSchemes, "NA"])
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-100">
      <div className="m-2 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">Control Scheme Configurator</h2>
        {isControlSchemeEmpty && <AlertNotification message="Please select control scheme!" status="error" />}
        <div ref={controlSchemeSheetRef} />
        <div className="flex w-full flex-row justify-end py-2">
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
        {controlSchemesSelected.length > 0 && (
          <>
            <div ref={controlSchemeSelectedSheetRef} />
            <div className="flex w-full flex-row justify-end py-2">
              <Button type="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ControlSchemeConfigurator
