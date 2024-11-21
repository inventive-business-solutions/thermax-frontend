// ControlSchemeConfigurator.tsx
import { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState } from "react"
import jspreadsheet from "jspreadsheet-ce"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"
import Modal from "components/Modal/Modal"

interface ControlSchemeConfiguratorProps {
  isOpen: boolean
  onClose: () => void
  controlSchemes: any[]
  typedControlSchemeColumns: any[]
  onConfigurationComplete: (selectedSchemes: string[]) => void
}

const ControlSchemeConfigurator: React.FC<ControlSchemeConfiguratorProps> = ({
  isOpen,
  onClose,
  controlSchemes,
  typedControlSchemeColumns,
  onConfigurationComplete,
}) => {
  const controlSchemeSheetRef = useRef<HTMLDivElement | null>(null)
  const controlSchemeSelectedSheetRef = useRef<HTMLDivElement | null>(null)
  const [controlSchemeInstance, setControlSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [selectedSchemeInstance, setSelectedSchemeInstance] = useState<JspreadsheetInstance | null>(null)
  const [controlSchemesSelected, setControlSchemesSelected] = useState<any[]>([])
  const [isControlSchemeEmpty, setIsControlSchemeEmpty] = useState(false)

  // Initialize main control scheme spreadsheet
  useEffect(() => {
    if (isOpen && controlSchemeSheetRef.current) {
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
  }, [isOpen, controlSchemes, typedControlSchemeColumns, controlSchemeInstance])

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
  }, [controlSchemesSelected, selectedSchemeInstance, typedControlSchemeColumns])

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
    localStorage.setItem("selected_control_scheme", JSON.stringify([...selectedSchemes, "NA"]))
    onConfigurationComplete(selectedSchemes)
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
