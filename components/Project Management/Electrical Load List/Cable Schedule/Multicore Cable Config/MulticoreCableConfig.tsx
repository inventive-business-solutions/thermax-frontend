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

/// 18-11

// import { JspreadsheetInstance } from "jspreadsheet-ce"
// import React, { useRef, useEffect, useState, useMemo } from "react"
// import jspreadsheet from "jspreadsheet-ce"
// import { Button } from "antd"
// import AlertNotification from "components/AlertNotification"
// import Modal from "components/Modal/Modal"
// import { getData } from "actions/crud-actions"
// import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints"

// interface MulticoreCableConfiguratorProps {
//   isOpen: boolean
//   onClose: () => void
// //   loadListData: any[]
//   typedMulticoreCableColumns: any[]
//   onConfigurationComplete: (selectedCables: string[]) => void
// }

// const MulticoreCableConfigurator: React.FC<MulticoreCableConfiguratorProps> = ({
//   isOpen,
//   onClose,
// //   loadListData,
//   typedMulticoreCableColumns,
//   onConfigurationComplete,
// }) => {
//   const multicoreSheetRef = useRef<HTMLDivElement | null>(null)
//   const selectedCablesSheetRef = useRef<HTMLDivElement | null>(null)
//   const [multicoreInstance, setMulticoreInstance] = useState<JspreadsheetInstance | null>(null)
//   const [selectedCablesInstance, setSelectedCablesInstance] = useState<JspreadsheetInstance | null>(null)
//   const [selectedCables, setSelectedCables] = useState<any[]>([])
//   const [controlSchemes, setControlSchemes] = useState<any[]>([])

//   const [isSelectionEmpty, setIsSelectionEmpty] = useState(false)
//   const [selectedSparePercent, setSelectedSparePercent] = useState<string>("")

//   const sparePercentOptions = useMemo(() => ["10", "20"], [])
//   //fetch control schemes
//   useEffect(() => {
//     getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`).then((res) => {
//       const schemes = res
//         .map((item: any) => [
//           false,
//           item.scheme,
//           item.sub_scheme,
//           item.scheme_title,
//           item.description,
//           item.breaker,
//           item.lpbs,
//           item.lpbs_inc_dec_ind,
//           item.ammeter,
//           item.thermistor_relay,
//           item.motor_space_heater,
//           item.plc_current_signal,
//           item.plc_speed_signal,
//           item.olr,
//           item.phase,
//           item.limit_switch,
//           item.motor_protection_relay,
//           item.field_isolator,
//           item.local_panel,
//           item.field_ess,
//           item.electronic_relay,
//           item.plc1_and_plc2,
//           item.mcc_start_stop,
//           item.input_choke,
//           item.output_choke,
//           item.separate_plc_start_stop,
//           item.di,
//           item.do,
//           item.ai,
//           item.ao,
//         ])
//         .sort((a: any, b: any) => {
//           const [prefixA, numA] = a[2].split("-")
//           const [prefixB, numB] = b[2].split("-")
//           return prefixA === prefixB ? parseInt(numA, 10) - parseInt(numB, 10) : prefixA.localeCompare(prefixB)
//         })

//       setControlSchemes(schemes)
//     })
//   }, [])
//   // Initialize main multicore cable spreadsheet
//   useEffect(() => {
//     if (isOpen && multicoreSheetRef.current) {
//       if (multicoreInstance) {
//         multicoreInstance.destroy()
//       }

//       const LoadList = localStorage.getItem("loadList")
//       let savedLoadList;
//       if (LoadList) {
//         // selectedItems = JSON.parse(savedLoadList) as string[]
//         savedLoadList = JSON.parse(LoadList) as string[]
//         // console.log(JSON.parse(savedLoadList) as string[], "load list")
//         // setCableScheduleData(JSON.parse(savedLoadList) as string[])
//       }
//       // Update selected cables from localStorage
//       const storedCables = localStorage.getItem("selected_multicore_cables")
//     //   let updatedCables = [...loadListData]

//     //   if (storedCables) {
//     //     try {
//     //       const selectedItems = JSON.parse(storedCables) as string[]
//     //       updatedCables = loadListData.map((cable) => {
//     //         if (selectedItems.includes(cable[2])) {
//     //           return [true, ...cable.slice(1)]
//     //         }
//     //         return cable
//     //       })
//     //     } catch (error) {
//     //       console.error("Error parsing selected_multicore_cables:", error)
//     //     }
//     //   }
//       if(!savedLoadList){
//         return ;
//       }
//       const otherData = (schemeTitle : String) => {
//         const divisionId = 7 ;
//         console.log(divisionId, "multicore ui");
//         if (divisionId === 7) {
//           return controlSchemes.find((item) => item[2] == schemeTitle);
//         }
//         // if (divisionId == 11) {
//         //   return [
//         //     ...Enviro_ControlSchemeDataDol,
//         //     ...Enviro_ControlSchemeDataSD,
//         //     ...Enviro_ControlSchemeDataVFD,
//         //   ].find((item) => item[1] == schemeTitle);
//         // }
//         // if (divisionId == 9) {
//         //   //spg and services

//         //   return SPG_ServicesConrolSchemesData.find(
//         //     (item) => String(item[1]).trim() == schemeTitle.trim()
//         //   );
//         // }
//         // if (divisionId == 8) {
//         //   //IPG

//         //   return WWS_IPG_data.find(
//         //     (item) => String(item[1]).trim() == schemeTitle.trim()
//         //   );
//         // }
//       };
//       const multicoredata = savedLoadList.map((item : any) => {
//         console.log(item[11], "multicore ui")

//         const schemedata = otherData(item[11])
//         console.log(schemedata, item[10])
//         console.log(schemedata, "multicore ui control scheme")
//         let divisionId = 7 // division id is to be dynamic
//         return [
//           false,
//           item[0],
//           item[1],
//           item[11],
//           "",
//           schemedata[26],
//           schemedata[27],
//           schemedata[28],
//           schemedata[29],
//         //   schemedata[
//         //     divisionId === 7 ? 26 : divisionId === 11 ? 6 : divisionId === 9 ? 9 : divisionId === 8 ? 9 : null
//         //   ],
//         //   schemedata[
//         //     divisionId === 7 ? 27 : divisionId === 11 ? 7 : divisionId === 9 ? 10 : divisionId === 8 ? 9 : null
//         //   ],
//         //   schemedata[
//         //     divisionId === 7 ? 28 : divisionId === 11 ? 8 : divisionId === 9 ? 11 : divisionId === 8 ? 9 : null
//         //   ],
//         //   schemedata[
//         //     divisionId === 7 ? 29 : divisionId === 11 ? 7 : divisionId === 9 ? 12 : divisionId === 8 ? 9 : null
//         //   ],
//           "",
//           item[12],
//         ]
//       })

//       const instance = jspreadsheet(multicoreSheetRef.current, {
//         data: multicoredata,
//         columns: typedMulticoreCableColumns,
//         columnSorting: true,
//         columnDrag: true,
//         columnResize: true,
//         tableOverflow: true,
//         lazyLoading: true,
//         loadingSpin: true,
//         onchange: () => setIsSelectionEmpty(false),
//         filters: true,
//         // updateTable: (instance, cell, col, row, val, label, cellName) => {
//         //   console.log("Current row data:", data[row]);
//         //   console.log(
//         //     "Selected elements before update:",
//         //     this.selectedElMulticore
//         //   );

//         //   // Condition to add class to a row

//         //   if (data[row][0] === true) {
//         //     if (!this.selectedElMulticore.includes(data[row])) {
//         //       if (cell.classList.length > 0) {
//         //         let className = cell.classList;
//         //         if (className[0] != "readonly") {
//         //           this.selectedElMulticore.push(data[row]);
//         //           console.log(
//         //             "Selected elements after update:",
//         //             this.selectedElMulticore
//         //           );

//         //           if (!this.selectedElements.includes(cell))
//         //             this.selectedElements.push(cell);
//         //         }
//         //       }
//         //     }
//         //     // if (rowElement) {
//         //     //   cell.classList.add("readonly");
//         //     //   // rowElement.classList.add('readonly');
//         //     // }
//         //   }
//         // }
//         tableWidth: "100%",
//         tableHeight: "500px",
//         freezeColumns: 4,
//         rowResize: true,
//       })
//       setMulticoreInstance(instance)
//     }

//     return () => {
//       if (multicoreInstance) {
//         multicoreInstance.destroy()
//         setMulticoreInstance(null)
//       }
//     }
//   }, [isOpen, controlSchemes, typedMulticoreCableColumns])

//   // Initialize selected cables spreadsheet
//   useEffect(() => {
//     if (selectedCablesSheetRef.current && selectedCables.length > 0) {
//       if (selectedCablesInstance) {
//         selectedCablesInstance.destroy()
//       }

//       const instance = jspreadsheet(selectedCablesSheetRef.current, {
//         data: selectedCables,
//         columns: typedMulticoreCableColumns.map((column) => ({
//           ...column,
//           readOnly: true,
//         })),
//         columnSorting: true,
//         columnDrag: true,
//         columnResize: true,
//         tableOverflow: true,
//         lazyLoading: true,
//         loadingSpin: true,
//         filters: true,
//         tableWidth: "100%",
//         tableHeight: "250px",
//         freezeColumns: 4,
//         rowResize: true,
//       })
//       setSelectedCablesInstance(instance)
//     }

//     return () => {
//       if (selectedCablesInstance) {
//         selectedCablesInstance.destroy()
//         setSelectedCablesInstance(null)
//       }
//     }
//   }, [selectedCables, typedMulticoreCableColumns])

//   const handleAdd = () => {
//     if (!selectedSparePercent) {
//       setIsSelectionEmpty(true)
//       return
//     }

//     const selected = multicoreInstance?.getData().filter((row) => row[0] === true)

//     if (!selected?.length) {
//       setIsSelectionEmpty(true)
//       return
//     }

//     // Apply spare percentage calculation to selected cables
//     const processedCables = selected.map((cable: any) => {
//       const spareMultiplier = 1 + parseInt(selectedSparePercent) / 100
//       const totalCores = Math.ceil(parseInt(cable[3]) * spareMultiplier) // Assuming cable[3] contains the core count
//       return [...cable, totalCores]
//     })

//     setSelectedCables(processedCables)
//     setIsSelectionEmpty(false)
//   }

//   const handleConfirm = () => {
//     const selectedCableIds = selectedCables.map((item) => item[2])
//     localStorage.setItem("selected_multicore_cables", JSON.stringify(selectedCableIds))
//     onConfigurationComplete(selectedCableIds)
//     onClose()
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className="w-100">
//       <div className="m-2 flex flex-col">
//         <h2 className="mb-4 text-2xl font-bold">Multicore Cable Configurator</h2>

//         <div className="mb-4">
//           <select
//             value={selectedSparePercent}
//             onChange={(e) => setSelectedSparePercent(e.target.value)}
//             className="mr-4 rounded border p-2"
//           >
//             <option value="">Select Spare %</option>
//             {sparePercentOptions.map((percent) => (
//               <option key={percent} value={percent}>
//                 {percent}%
//               </option>
//             ))}
//           </select>
//         </div>

//         {isSelectionEmpty && (
//           <AlertNotification
//             message={!selectedSparePercent ? "Please select spare percentage!" : "Please select cables!"}
//             status="error"
//           />
//         )}

//         <div ref={multicoreSheetRef} />
//         <div className="flex w-full flex-row justify-end py-2">
//           <Button type="primary" onClick={handleAdd}>
//             Add
//           </Button>
//         </div>

//         {selectedCables.length > 0 && (
//           <>
//             <div ref={selectedCablesSheetRef} />
//             <div className="flex w-full flex-row justify-end py-2">
//               <Button type="primary" onClick={handleConfirm}>
//                 Confirm
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//     </Modal>
//   )
// }

// export default MulticoreCableConfigurator

"use client"

import { JspreadsheetInstance } from "jspreadsheet-ce"
import React, { useRef, useEffect, useState, useMemo } from "react"
import jspreadsheet from "jspreadsheet-ce"
import { Button } from "antd"
import AlertNotification from "components/AlertNotification"
import Modal from "components/Modal/Modal"
import { getData } from "actions/crud-actions"
import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints"
import { multicoreCableConfigColumns, multicoreCableConfigGroupedColumns } from "../../common/ExcelColumns"
import { ValidColumnType } from "../../types"

// import {
//   Heating_ControlSchemeData,
//   Enviro_ControlSchemeDataDol,
//   Enviro_ControlSchemeDataSD,
//   Enviro_ControlSchemeDataVFD,
//   WWS_IPG_data,
//   SPG_ServicesConrolSchemesData
// } from '../mocks/mock-data'; // Adjust import paths as needed

interface PanelData {
  [key: string]: any
}

interface UserAuth {
  divisionId: number
  [key: string]: any
}

// interface MulticoreCableConfigProps {

// }
interface MulticoreCableConfigProps {
  isOpen: boolean
  onClose: () => void
  //   loadListData: any[]
  typedMulticoreCableColumns: any[]
  onConfigurationComplete: (selectedCables: any[]) => void
}

const MulticoreCableConfigurator: React.FC<MulticoreCableConfigProps> = ({
  isOpen,
  onClose,
  //   loadListData,
  typedMulticoreCableColumns,
  onConfigurationComplete,
}) => {
  // const router = useRouter()
  const spreadsheetRef = useRef<HTMLDivElement>(null)
  const groupingRef = useRef<HTMLDivElement>(null)
  // spreadsheet_grouping
  const [tble, setTble] = useState<any>(null)
  const [tbleSelected, setTbleSelected] = useState<any>(null)
  const [selectedElMulticore, setSelectedElMulticore] = useState<any[][]>([])
  const [grouping, setGrouping] = useState<any[][]>([])
  const [groupId, setGroupId] = useState<number>(1)
  const [insertedElementsLength, setInsertedElementsLength] = useState<number>(0)
  const [selectedElements, setSelectedElements] = useState<any[]>([])
  const [selectedPercent, setSelectedPercent] = useState<string | number>("")
  const [controlSchemes, setControlSchemes] = useState<any[]>([])

  const userData = { divisionId: 7 }

  const sparePercent = [10, 20]
  const DIDOSpare = ["2C", "3C", "4C", "6C", "8C", "12C", "16C", "24C", "30C", "37C", "1P", "2P", "6P", "12P"]
  const AIAOSpare: string[] = []
  const typedMulticoreConfigColumns = useMemo(
    () =>
      multicoreCableConfigColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
  const typedMulticoreCableConfigGroupedColumns = useMemo(
    () =>
      multicoreCableConfigGroupedColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  )
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

  const spareFormula = (DIDO: number): number => {
    let calcSpare = 0
    if (selectedPercent === 10) return DIDO * 1.1
    else if (selectedPercent === 20) return DIDO * 1.2
    else return DIDO
  }
  const calculateSpare = (input: number, from: string = "DIDO"): number | null => {
    let spares: number[] = [1, 2, 6, 12]
    if (from == "DIDO") {
      spares = [2, 3, 4, 6, 8, 12, 16, 24, 30, 37]
    }
    if (from == "AIAO") {
      spares = [1, 2, 6, 12]
    }
    if (!spares?.length) {
      return null
    }

    for (let i = 0; i < spares.length - 1; i++) {
      if (input == spares[i]) {
        return spares[i] || 0
      } else if (input > (spares[i] || 0) && input <= (spares[i + 1] || 0)) {
        return spares[i + 1] || 0
      }
    }
    return null
  }
  //   const calculateSpare = (input: number, from: string): number | null => {
  //     const spares = from === "DIDO" ? [2, 3, 4, 6, 8, 12, 16, 24, 30, 37] : [1, 2, 6, 12];

  //     // Check if input is larger than the last element
  //     if (input > spares[spares?.length - 1]) {
  //         return null;
  //     }

  //     for (let i = 0; i < spares.length - 1; i++) {
  //         if (input === spares[i]) return spares[i];
  //         if (input > spares[i] && input <= spares[i + 1]) return spares[i + 1];
  //     }

  //     // Explicitly return null as fallback
  //     return null;
  // }

  const findOtherData = (schemeTitle: string) => {
    const divisionId = userData.divisionId

    switch (divisionId) {
      case 7:
        return controlSchemes?.find((item) => item[2] === schemeTitle)
      case 11:
        return [].find((item) => item[1] === schemeTitle)
      case 9:
        return [].find((item) => String(item[1]).trim() === schemeTitle.trim())
      case 8:
        return [].find((item) => String(item[1]).trim() === schemeTitle.trim())
      default:
        return null
    }
  }

  const initializeMulticoreUi = (data: any) => {
    if (!spreadsheetRef.current) return

    const options = {
      data,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedMulticoreConfigColumns,
      updateTable: (instance: any, cell: any, col: number, row: number, val: any) => {
        if (data[row][0] === true && !selectedElMulticore.includes(data[row])) {
          if (cell.classList.length > 0) {
            const className = cell.classList
            if (className[0] !== "readonly") {
              setSelectedElMulticore((prev: any) => [...prev, data[row]])
              if (!selectedElements.includes(cell)) {
                setSelectedElements((prev) => [...prev, cell])
              }
            }
          }
        }
      },
      tableOverflow: true,
      filters: true,
      tableWidth: "100%",
      tableHeight: "600px",
      freezeColumns: 0,
    }

    const newTable = jspreadsheet(spreadsheetRef.current, options)
    setTble(newTable)
  }
  // const   selectedControllScheme = (data: any)=> {
  //   // if (groupingRef.current) {
  //   //   this.tbleSelected.setData(data);
  //   // } else {
  //   if()
  //     this.tbleSelected = jspreadsheet(
  //       groupingRef.current

  //       {
  //         data: data,
  //         license: "39130-64ebc-bd98e-26bc4",
  //         columns: [
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "Group No.",
  //             width: "80",
  //             height: "100",
  //           },
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "Type Of Cable",
  //             width: "100",
  //             height: "100",
  //           },
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "Total Number of cores",
  //             width: "170",
  //             height: "100",
  //           },
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "Total Number of cores with spare",
  //             width: "240",
  //             height: "100",
  //           },
  //           {
  //             type: "dropdown",
  //             name: "tag",
  //             title: "Multicore/Pair Cable Selected",
  //             width: "220",
  //             height: "100",
  //             source: DIDOSpare,
  //             autocomplete: true,
  //             multiple: false,
  //           },
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "No. Of cables",
  //             width: "100",
  //             height: "100",
  //           },
  //           {
  //             type: "text",
  //             name: "tag",
  //             title: "Service Description",
  //             width: "220",
  //             height: "100",
  //           },
  //           {
  //             type: "text",
  //             name: "panelName",
  //             title: "Panel Name",
  //             width: "220",
  //             height: "100",
  //           },
  //         ],
  //         // onchange: (instance, cell, col, row, val) => {
  //         //   // this.data[row][col] = val;
  //         //   if (col == 0) {
  //         //     if (!val) {
  //         //       // this.grouping.splice(row, 1);
  //         //       // this.selectedControllScheme(this.grouping);
  //         //     }
  //         //   }
  //         // },
  //         tableOverflow: true,
  //         filters: true,
  //         tableWidth: "100%",
  //         tableHeight: "auto",
  //         freezeColumns: 0,
  //       }
  //     );
  //   // }
  // }
  const initializeGroupingeUi = (data: any) => {
    if (groupingRef.current) {
      tbleSelected?.destroy()
    }
    if (!groupingRef.current) return
    // source: DIDOSpare,
    // autocomplete: true,
    // multiple: false,
    const options = {
      data,
      license: "39130-64ebc-bd98e-26bc4",
      columns:typedMulticoreCableConfigGroupedColumns,

      updateTable: (instance: any, cell: any, col: number, row: number, val: any) => {
        if (data[row][0] === true && !selectedElMulticore.includes(data[row])) {
          if (cell.classList.length > 0) {
            const className = cell.classList
            if (className[0] !== "readonly") {
              setSelectedElMulticore((prev: any) => [...prev, data[row]])
              if (!selectedElements.includes(cell)) {
                setSelectedElements((prev) => [...prev, cell])
              }
            }
          }
        }
      },
      tableOverflow: true,
      filters: true,
      tableWidth: "100%",
      tableHeight: "600px",
      freezeColumns: 0,
    }

    const newTable = jspreadsheet(groupingRef.current, options)
    setTbleSelected(newTable)
  }

  const addGroup = () => {
    if (selectedElMulticore.length === 0) return

    setGroupId((prev) => prev + 1)

    let DI = 0,
      DO = 0,
      AI = 0,
      AO = 0
    let serviceDescription = ""
    let panelName = ""

    selectedElMulticore.forEach((el) => {
      if (el[5] && el[5] !== "-") DI += Number(el[5])
      if (el[6] && el[6] !== "-") DO += Number(el[6])
      if (el[7] && el[7] !== "-") AI += Number(el[7])
      if (el[8] && el[8] !== "-") AO += Number(el[8])

      serviceDescription = serviceDescription ? serviceDescription.concat(", ", el[2]) : el[2]
      panelName = el[9]
    })

    // Calculate spares
    const calcDISpare = Number(spareFormula(DI).toFixed(2))
    const calDOSpare = Number(spareFormula(DO).toFixed(2))
    const DISpare = calculateSpare(calcDISpare, "DIDO")
    const DOSpare = calculateSpare(calDOSpare, "DIDO")

    const calcAISpare = Number(spareFormula(AI).toFixed(2))
    const calcAOSpare = Number(spareFormula(AO).toFixed(2))
    const AISpare = calculateSpare(calcAISpare, "AIAO")
    const AOSpare = calculateSpare(calcAOSpare, "AIAO")

    const newGroups = [
      [groupId, "DI Cable", DI, calcDISpare, `${DISpare}C`, "1", serviceDescription, panelName],
      [groupId, "DO Cable", DO, calDOSpare, `${DOSpare}C`, "1", serviceDescription, panelName],
      [groupId, "AI Cable", AI, calcAISpare || "-", AISpare ? `${AISpare}P` : "-", "1", serviceDescription, panelName],
      [groupId, "AO Cable", AO, calcAOSpare || "-", AOSpare ? `${AOSpare}P` : "-", "1", serviceDescription, panelName],
    ]
    console.log(grouping, "grouping")

    setGrouping((prev) => [...prev, ...newGroups])
    setSelectedElMulticore([])
    setInsertedElementsLength((prev) => prev + newGroups.length)
    initializeGroupingeUi(grouping)
    selectedElements.forEach((element) => {
      element.classList.add("readonly")
      const checkbox = element.querySelector('input[type="checkbox"]')
      if (checkbox) {
        checkbox.classList.add("readonly-checkbox")
        checkbox.disabled = true
      }
    })
  }
  useEffect(() => {
    console.log(grouping, "grouping")
    if (grouping.length > 0) {
      initializeGroupingeUi(grouping)
    }
  }, [grouping])
  const onConfirm = () => {
    console.log(grouping, "grouping")
    if (grouping.length > 0) {
      onConfigurationComplete(grouping)
      localStorage.setItem("grouping_of_cables_table", JSON.stringify(grouping))
      onClose()
    }
    // router.push("/project/configloadlist")
  }

  useEffect(() => {
    localStorage.setItem("load_list_tab", JSON.stringify(2))

    const savedLoadList = localStorage.getItem("loadList")
    let loadList: any[] = []
    if (savedLoadList) {
      // selectedItems = JSON.parse(savedLoadList) as string[]
      console.log(JSON.parse(savedLoadList) as string[], "load list")
      loadList = JSON.parse(savedLoadList) as string[]
      // setCableScheduleData(JSON.parse(savedLoadList) as string[])
    }
    // const loadList = JSON.parse(localStorage.getItem('loadList'));
    console.log(loadList, "loadList")

    const processedData = loadList?.map((item: any) => {
      const schemeData = findOtherData(item[11])
      // const divisionId = userData.divisionId // to be populated from dynamic
      const divisionId = 7

      const getSchemeIndex = () => {
        switch (divisionId) {
          case 7:
            return 26
          // case 11:
          //   return 6
          // case 9:
          // case 8:
          //   return 9
          // default:
          //   return null
        }
      }
      console.log(item, "loadList")
      if (!schemeData) {
        return
      }

      return [
        false,
        item[0],
        item[1],
        item[11],
        "",
        schemeData[getSchemeIndex()],
        schemeData[getSchemeIndex() + 1],
        schemeData[getSchemeIndex() + 2],
        schemeData[getSchemeIndex() + 3],
        "",
        item[12],
      ]
    })
    console.log(processedData, "processedData")
    if (grouping.length > 0) {
      initializeGroupingeUi(grouping)
    }
    initializeMulticoreUi(processedData)
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-100">
      <div className="w-full">
        <div className="mb-4 mt-4 flex justify-end gap-4 ">
          <select
            value={selectedPercent}
            onChange={(e) => setSelectedPercent(e.target.value)}
            className="rounded border p-2"
          >
            <option value="">Select Spare %</option>
            {sparePercent.map((percent) => (
              <option key={percent} value={percent}>
                {percent}%
              </option>
            ))}
          </select>

          <button
            onClick={() => setSelectedPercent("")}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Clear Selection
          </button>
        </div>

        <div ref={spreadsheetRef} id="spreadsheet_multicore_ui" className="" />
        <div className="my-4 flex justify-end">
          <button onClick={addGroup} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Add Group
          </button>
        </div>

        <div ref={groupingRef} id="spreadsheet_grouping" />
        {grouping.length > 0 && (
          <div className="my-2 flex justify-end">
            <button onClick={onConfirm} className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Confirm
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default MulticoreCableConfigurator
