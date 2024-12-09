import { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react"
import jspreadsheet from "jspreadsheet-ce"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"
import Modal from "components/Modal/Modal"
import { lpbsColumns } from "app/Data"
import { ValidColumnType } from "../../types"
import { getData } from "actions/crud-actions"
import { LPBS_SCHEMES_URI } from "configs/api-endpoints"
// import { HEATING, TagColors } from "configs/constants"
import { useCurrentUser } from "hooks/useCurrentUser"
import { useLoading } from "hooks/useLoading"
import { SERVICES, WWS_SPG } from "configs/constants"

interface LpbsConfiguratorProps {
  isOpen: boolean
  onClose: () => void
  selectedLpbsSchemes: any[]
  onConfigurationComplete: (selectedSchemes: string[]) => void
}

interface LpbsScheme {
  scheme: string
  sub_scheme: string
  scheme_title: string
  description: string
  [key: string]: any
}

const LpbsConfigurator: React.FC<LpbsConfiguratorProps> = React.memo(
  ({ isOpen, onClose, selectedLpbsSchemes, onConfigurationComplete }) => {
    const lpbsSheetRef = useRef<HTMLDivElement | null>(null)
    const lpbsSelectedSheetRef = useRef<HTMLDivElement | null>(null)
    const [lpbsInstance, setLpbsInstance] = useState<JspreadsheetInstance | null>(null)
    const [selectedLpbsInstance, setSelectedLpbsInstance] = useState<JspreadsheetInstance | null>(null)
    const [lpbsSchemesSelected, setLpbsSchemesSelected] = useState<any[]>([])
    const { setLoading, isLoading } = useLoading()
    const userInfo: {
      division: string
    } = useCurrentUser()
    const [lpbsSchemes, setLpbsSchemes] = useState<any[]>([])
    const [isLpbsSchemeEmpty, setIsLpbsSchemeEmpty] = useState(false)

    // Memoize columns configuration
    const typedLpbsColumns = useMemo(
      () =>
        lpbsColumns.map((column) => ({
          ...column,
          type: column.type as ValidColumnType,
        })),
      []
    )

    // Memoize spreadsheet configuration
    const getSpreadsheetConfig = useCallback(
      (data: any[], isReadOnly = false) => ({
        data,
        columns: isReadOnly ? typedLpbsColumns.map((column) => ({ ...column, readOnly: true })) : typedLpbsColumns,
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        filters: true,
        tableWidth: "100%",
        tableHeight: isReadOnly ? "250px" : "500px",
        freezeColumns: 4,
        rowResize: true,
        ...(isReadOnly ? {} : { onchange: () => setIsLpbsSchemeEmpty(false) }),
      }),
      [typedLpbsColumns]
    )

    // Transform LPBS scheme data
    const transformSchemeData = useCallback(
      (scheme: LpbsScheme) => [
        false,
        scheme.lpbs_type,
        scheme.start_push_button,
        scheme.emergency_stop_push_button,
        scheme.start_indication_button,
        scheme.stop_indication_button,
        scheme.local_remote_selector_switch,
        scheme.speed_push_button,
        scheme.analog_ammeter,
        scheme.analog_rpm_meter,
        scheme.lcs?.split("x")[0],
        scheme.lcs_inc_dec?.split("x")[0],
        scheme.lcs_rpm?.split("x")[0],
        "",
      ],
      []
    )

    // Fetch LPBS schemes
    useEffect(() => {
      if (lpbsSchemes.length || !isOpen) return
      setLoading(true)
      const fetchSchemes = async () => {
        try {
          const division = userInfo?.division === WWS_SPG || userInfo?.division === SERVICES ?  WWS_SPG : userInfo?.division
          const response = await getData(
            `${LPBS_SCHEMES_URI}?filters=[["division_name", "=", "${division}"]]&fields=["*"]`
          )
          console.log(response, "lpbs schemes")

          const transformedSchemes = response.map(transformSchemeData).sort((a: any[], b: any[]) => {
            const [prefixA, numA] = a[1].split("-")
            const [prefixB, numB] = b[1].split("-")
            return prefixA === prefixB ? parseInt(numA, 10) - parseInt(numB, 10) : prefixA.localeCompare(prefixB)
          })
          console.log(transformedSchemes,"transformedSchemes");
          
          setLpbsSchemes(transformedSchemes)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error("Error fetching LPBS schemes:", error)
        }
      }

      fetchSchemes()
    }, [isOpen, lpbsSchemes.length, transformSchemeData])

    // Initialize main LPBS spreadsheet
    useEffect(() => {
      if (!isOpen || !lpbsSheetRef.current) return

      console.log(selectedLpbsSchemes,'selectedLpbsSchemes');
      console.log(lpbsSchemes,'selectedLpbsSchemes');
      
      const storedSchemes = selectedLpbsSchemes
      let updatedSchemes = [...lpbsSchemes]

      if (storedSchemes) {
        try {
          // const selectedItems = JSON.parse(storedSchemes) as string[]
          updatedSchemes = lpbsSchemes.map((scheme) =>
            storedSchemes.includes(scheme[1]) ? [true, ...scheme.slice(1)] : scheme
          )
        } catch (error) {
          console.error("Error parsing selected_lpbs_scheme:", error)
        }
      }

      const instance = jspreadsheet(lpbsSheetRef.current, getSpreadsheetConfig(updatedSchemes))
      setLpbsInstance(instance)

      return () => {
        instance.destroy()
        setLpbsInstance(null)
      }
    }, [isOpen, lpbsSchemes, getSpreadsheetConfig])

    // Initialize selected schemes spreadsheet
    useEffect(() => {
      if (!lpbsSelectedSheetRef.current || !lpbsSchemesSelected.length) return

      const instance = jspreadsheet(lpbsSelectedSheetRef.current, getSpreadsheetConfig(lpbsSchemesSelected, true))
      setSelectedLpbsInstance(instance)

      return () => {
        instance.destroy()
        setSelectedLpbsInstance(null)
      }
    }, [lpbsSchemesSelected, getSpreadsheetConfig])

    const handleAdd = useCallback(() => {
      const selected = lpbsInstance?.getData().filter((row) => row[0] === true)

      if (!selected?.length) {
        setIsLpbsSchemeEmpty(true)
        return
      }

      setLpbsSchemesSelected(selected)
      setIsLpbsSchemeEmpty(false)
    }, [lpbsInstance])

    const handleConfirm = useCallback(() => {
      const selectedSchemes = lpbsSchemesSelected.map((item) => item[1])
      // localStorage.setItem("selected_lpbs_scheme", JSON.stringify([...selectedSchemes, "NA"]))
      onConfigurationComplete([...selectedSchemes, "NA"])
      onClose()
    }, [lpbsSchemesSelected, onConfigurationComplete, onClose])
    if (isLoading) {
      return null
    }
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="m-2 flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">LPBS Configurator</h2>
          {isLpbsSchemeEmpty && <AlertNotification message="Please select LPBS scheme!" status="error" />}
          <div ref={lpbsSheetRef} />
          <div className="flex w-full flex-row justify-end py-2">
            <Button type="primary" onClick={handleAdd}>
              Add
            </Button>
          </div>
          {lpbsSchemesSelected.length > 0 && (
            <>
              <div ref={lpbsSelectedSheetRef} />
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
)

LpbsConfigurator.displayName = "LpbsConfigurator"

export default LpbsConfigurator
