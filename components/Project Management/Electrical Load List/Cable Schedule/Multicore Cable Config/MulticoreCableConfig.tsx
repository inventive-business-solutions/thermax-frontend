// "use client"
// import React, { useEffect, useMemo, useRef, useState } from "react"
// import { useRouter } from "next/router"
// import jspreadsheet, { Column, JspreadsheetInstance } from "jspreadsheet-ce"
// import { multicoreCableConfigColumns } from "../../common/ExcelColumns"
// import { ValidColumnType } from "../../types"
// import { mockExcel } from "app/Data"

// interface UserAuth {
//   divisionId: number
//   // Add other user auth properties as needed
// }

// interface PanelData {
//   [key: string]: any
// }

// const MulticoreCableConfig: React.FC = () => {
//   const router = useRouter()
//   const spreadsheetRef = useRef<HTMLDivElement>(null)
//   const groupingRef = useRef<HTMLDivElement>(null)
//   const [tble, setTble] = useState<any>(null)
//   const [tbleSelected, setTbleSelected] = useState<any>(null)
//   //   const [userData] = useState<UserAuth>(() => {
//   //     // Replace this with your actual user settings retrieval logic
//   //     const userAuth = localStorage.getItem('userAuth');
//   //     return userAuth ? JSON.parse(userAuth) : { divisionId: 7 };
//   //   });

//   const [selectedElMulticore, setSelectedElMulticore] = useState<any[][]>([])
//   const [grouping, setGrouping] = useState<any[][]>([])
//   const [groupId, setGroupId] = useState(0)
//   const [selectedElements, setSelectedElements] = useState<any[]>([])
//   const [selectedPercent, setSelectedPercent] = useState<string | number>("")

//   const sparePercent = [10, 20]
//   const DIDOSpare = ["2C", "3C", "4C", "6C", "8C", "12C", "16C", "24C", "30C", "37C", "1P", "2P", "6P", "12P"]
//   const AIAOSpare: string[] = []

//   const typedMulticoreCableColumns = useMemo(
//     () =>
//       multicoreCableConfigColumns.map((column) => ({
//         ...column,
//         type: column.type as ValidColumnType,
//       })),
//     []
//   )

//   const spareFormula = (DIDO: number): number => {
//     let calcSpare = 0
//     if (selectedPercent === 10) return DIDO * 1.1
//     else if (selectedPercent === 20) return DIDO * 1.2
//     return DIDO
//   }

//   const calculateSpare = (input: number, from: string): number | null => {
//     let spares: number[]
//     if (from === "DIDO") {
//       spares = [2, 3, 4, 6, 8, 12, 16, 24, 30, 37]
//     } else if (from === "AIAO") {
//       spares = [1, 2, 6, 12]
//     } else {
//       return null
//     }

//     // for (let i = 0; i < spares.length - 1; i++) {
//     //   if (input === spares[i]) {
//     //     return spares[i];
//     //   } else if (input > spares[i] && input <= spares[i + 1]) {
//     //     return spares[i + 1];
//     //   }
//     // }
//     return null
//   }

//   const onConfirm = () => {
//     if (grouping.length > 0) {
//       localStorage.setItem("grouping_of_cables_table", JSON.stringify(grouping))
//     }
//     router.push("/project/configloadlist")
//   }

//   const clearSelection = () => {
//     setSelectedPercent("")
//   }

//   const options = useMemo(
//     () => ({
//       data: mockExcel,
//       license: "39130-64ebc-bd98e-26bc4",
//       columns: typedMulticoreCableColumns,
//       // onchange: (instance, cell, col, row, val) => {},
//       columnSorting: true,
//       columnDrag: true,
//       columnResize: true,
//       tableOverflow: true,
//       lazyLoading: true,
//       loadingSpin: true,
//       filters: true,
//       tableWidth: "100%",
//       tableHeight: "550px",
//       freezeColumns: 4,
//       rowResize: true,
//     }),
//     [typedMulticoreCableColumns]
//   )

//   useEffect(() => {
//     // Initialize spreadsheets
//     if (spreadsheetRef.current && !tble) {
//       const loadListData = JSON.parse(localStorage.getItem("load_list_data") || "[]")
//       const processedData = [].map((item: any) => {
//         // Process your data here similar to your original code
//         // This is a simplified version
//         return [
//           false,
//           item[0],
//           item[1],
//           item[11],
//           "",
//           // ... rest of your data processing
//         ]
//       })

//       const spreadsheetInstance = jspreadsheet(spreadsheetRef.current, options)

//       setTble(spreadsheetInstance)
//     }
//   }, [])

//   return (
//     <div className="multicore-cable-config">
//       <div className="controls mb-4">
//         <select value={selectedPercent} onChange={(e) => setSelectedPercent(e.target.value)} className="mr-4">
//           <option value="">Select Spare %</option>
//           {sparePercent.map((percent) => (
//             <option key={percent} value={percent}>
//               {percent}%
//             </option>
//           ))}
//         </select>
//         {/* <button onClick={addGroup} className="mr-4">
//           Add Group
//         </button> */}
//         <button onClick={clearSelection}>Clear Selection</button>
//       </div>

//       <div ref={spreadsheetRef} id="spreadsheet_multicore_ui" className="mb-4" />
//       <div ref={groupingRef} id="spreadsheet_grouping" />

//       <div className="mt-4">
//         <button onClick={onConfirm}>Confirm</button>
//       </div>
//     </div>
//   )
// }

// export default MulticoreCableConfig

import { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo } from "react"
import jspreadsheet from "jspreadsheet-ce"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"
import Modal from "components/Modal/Modal"
import { getData } from "actions/crud-actions"
import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints"

interface MulticoreCableConfiguratorProps {
  isOpen: boolean
  onClose: () => void
  //   loadListData: any[]
  typedMulticoreCableColumns: any[]
  onConfigurationComplete: (selectedCables: string[]) => void
}

const MulticoreCableConfigurator: React.FC<MulticoreCableConfiguratorProps> = ({
  isOpen,
  onClose,
  //   loadListData,
  typedMulticoreCableColumns,
  onConfigurationComplete,
}) => {
  const multicoreSheetRef = useRef<HTMLDivElement | null>(null)
  const selectedCablesSheetRef = useRef<HTMLDivElement | null>(null)
  const [multicoreInstance, setMulticoreInstance] = useState<JspreadsheetInstance | null>(null)
  const [selectedCablesInstance, setSelectedCablesInstance] = useState<JspreadsheetInstance | null>(null)
  const [selectedCables, setSelectedCables] = useState<any[]>([])
  const [controlSchemes, setControlSchemes] = useState<any[]>([])

  const [isSelectionEmpty, setIsSelectionEmpty] = useState(false)
  const [selectedSparePercent, setSelectedSparePercent] = useState<string>("")

  const sparePercentOptions = useMemo(() => ["10", "20"], [])
  //fetch control schemes
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
  // Initialize main multicore cable spreadsheet
  useEffect(() => {
    if (isOpen && multicoreSheetRef.current) {
      if (multicoreInstance) {
        multicoreInstance.destroy()
      }

      const LoadList = localStorage.getItem("loadList")
      let savedLoadList
      if (LoadList) {
        // selectedItems = JSON.parse(savedLoadList) as string[]
        savedLoadList = JSON.parse(LoadList) as string[]
        // console.log(JSON.parse(savedLoadList) as string[], "load list")
        // setCableScheduleData(JSON.parse(savedLoadList) as string[])
      }
      // Update selected cables from localStorage
      // const storedCables = localStorage.getItem("selected_multicore_cables")
      //   let updatedCables = [...loadListData]

      //   if (storedCables) {
      //     try {
      //       const selectedItems = JSON.parse(storedCables) as string[]
      //       updatedCables = loadListData.map((cable) => {
      //         if (selectedItems.includes(cable[2])) {
      //           return [true, ...cable.slice(1)]
      //         }
      //         return cable
      //       })
      //     } catch (error) {
      //       console.error("Error parsing selected_multicore_cables:", error)
      //     }
      //   }
      if (!savedLoadList) {
        return
      }
      const otherData = (schemeTitle: String) => {
        const divisionId = 7
        console.log(divisionId, "multicore ui")
        if (divisionId === 7) {
          return controlSchemes.find((item) => item[2] === schemeTitle)
        }
        // if (divisionId == 11) {
        //   return [
        //     ...Enviro_ControlSchemeDataDol,
        //     ...Enviro_ControlSchemeDataSD,
        //     ...Enviro_ControlSchemeDataVFD,
        //   ].find((item) => item[1] == schemeTitle);
        // }
        // if (divisionId == 9) {
        //   //spg and services

        //   return SPG_ServicesConrolSchemesData.find(
        //     (item) => String(item[1]).trim() == schemeTitle.trim()
        //   );
        // }
        // if (divisionId == 8) {
        //   //IPG

        //   return WWS_IPG_data.find(
        //     (item) => String(item[1]).trim() == schemeTitle.trim()
        //   );
        // }
      }
      const multicoredata = savedLoadList.map((item: any) => {
        console.log(item[11], "multicore ui")

        const schemedata = otherData(item[11])
        console.log(schemedata, item[10])
        console.log(schemedata, "multicore ui control scheme")
        // let divisionId = 7 // division id is to be dynamic
        return [
          false,
          item[0],
          item[1],
          item[11],
          "",
          schemedata[26],
          schemedata[27],
          schemedata[28],
          schemedata[29],
          //   schemedata[
          //     divisionId === 7 ? 26 : divisionId === 11 ? 6 : divisionId === 9 ? 9 : divisionId === 8 ? 9 : null
          //   ],
          //   schemedata[
          //     divisionId === 7 ? 27 : divisionId === 11 ? 7 : divisionId === 9 ? 10 : divisionId === 8 ? 9 : null
          //   ],
          //   schemedata[
          //     divisionId === 7 ? 28 : divisionId === 11 ? 8 : divisionId === 9 ? 11 : divisionId === 8 ? 9 : null
          //   ],
          //   schemedata[
          //     divisionId === 7 ? 29 : divisionId === 11 ? 7 : divisionId === 9 ? 12 : divisionId === 8 ? 9 : null
          //   ],
          "",
          item[12],
        ]
      })

      const instance = jspreadsheet(multicoreSheetRef.current, {
        data: multicoredata,
        columns: typedMulticoreCableColumns,
        columnSorting: true,
        columnDrag: true,
        columnResize: true,
        tableOverflow: true,
        lazyLoading: true,
        loadingSpin: true,
        onchange: () => setIsSelectionEmpty(false),
        filters: true,
        tableWidth: "100%",
        tableHeight: "500px",
        freezeColumns: 4,
        rowResize: true,
      })
      setMulticoreInstance(instance)
    }

    return () => {
      if (multicoreInstance) {
        multicoreInstance.destroy()
        setMulticoreInstance(null)
      }
    }
  }, [isOpen, controlSchemes, typedMulticoreCableColumns, multicoreInstance])

  // Initialize selected cables spreadsheet
  useEffect(() => {
    if (selectedCablesSheetRef.current && selectedCables.length > 0) {
      if (selectedCablesInstance) {
        selectedCablesInstance.destroy()
      }

      const instance = jspreadsheet(selectedCablesSheetRef.current, {
        data: selectedCables,
        columns: typedMulticoreCableColumns.map((column) => ({
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
      setSelectedCablesInstance(instance)
    }

    return () => {
      if (selectedCablesInstance) {
        selectedCablesInstance.destroy()
        setSelectedCablesInstance(null)
      }
    }
  }, [selectedCables, selectedCablesInstance, typedMulticoreCableColumns])

  const handleAdd = () => {
    if (!selectedSparePercent) {
      setIsSelectionEmpty(true)
      return
    }

    const selected = multicoreInstance?.getData().filter((row) => row[0] === true)

    if (!selected?.length) {
      setIsSelectionEmpty(true)
      return
    }

    // Apply spare percentage calculation to selected cables
    const processedCables = selected.map((cable: any) => {
      const spareMultiplier = 1 + parseInt(selectedSparePercent) / 100
      const totalCores = Math.ceil(parseInt(cable[3]) * spareMultiplier) // Assuming cable[3] contains the core count
      return [...cable, totalCores]
    })

    setSelectedCables(processedCables)
    setIsSelectionEmpty(false)
  }

  const handleConfirm = () => {
    const selectedCableIds = selectedCables.map((item) => item[2])
    localStorage.setItem("selected_multicore_cables", JSON.stringify(selectedCableIds))
    onConfigurationComplete(selectedCableIds)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-100">
      <div className="m-2 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">Multicore Cable Configurator</h2>

        <div className="mb-4">
          <select
            value={selectedSparePercent}
            onChange={(e) => setSelectedSparePercent(e.target.value)}
            className="mr-4 rounded border p-2"
          >
            <option value="">Select Spare %</option>
            {sparePercentOptions.map((percent) => (
              <option key={percent} value={percent}>
                {percent}%
              </option>
            ))}
          </select>
        </div>

        {isSelectionEmpty && (
          <AlertNotification
            message={!selectedSparePercent ? "Please select spare percentage!" : "Please select cables!"}
            status="error"
          />
        )}

        <div ref={multicoreSheetRef} />
        <div className="flex w-full flex-row justify-end py-2">
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>

        {selectedCables.length > 0 && (
          <>
            <div ref={selectedCablesSheetRef} />
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

export default MulticoreCableConfigurator
