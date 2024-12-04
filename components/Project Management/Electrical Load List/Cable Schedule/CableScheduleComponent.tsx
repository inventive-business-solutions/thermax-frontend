// "use client"
// import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce"
// import React, { useRef, useEffect, useState, useMemo } from "react"
// import "jspreadsheet-ce/dist/jspreadsheet.css"

// import { CableSchedulecolumns, multicoreCableConfigColumns } from "../common/ExcelColumns"
// import "./CableScheduleComponent.css"
// import { Button } from "antd"
// import { ValidColumnType } from "../types"
// import MulticoreCableConfigurator from "./Multicore Cable Config/MulticoreCableConfig"
// import { useLoading } from "hooks/useLoading"

// interface CableScheduleProps {
//   // onNext: () => void
// }
// const CableSchedule: React.FC<CableScheduleProps> = ({}) => {
//   const jRef = useRef<HTMLDivElement | null>(null)
//   const [cableScheduleData, setCableScheduleData] = useState<any[]>([])
//   const [spreadsheetInstance, setSpreadsheetInstance] = useState<JspreadsheetInstance | null>(null)
//   const [isMulticoreModalOpen, setIsMulticoreModalOpen] = useState(false)

//   const typedCableScheduleColumns = useMemo(
//     () =>
//       CableSchedulecolumns().map((column) => ({
//         ...column,
//         type: column.type as ValidColumnType,
//       })),
//     []
//   )

//   const { setLoading: setModalLoading } = useLoading()
//   useEffect(() => {
//     setModalLoading(false)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//   const typedMulticoreCableConfigColumns = useMemo(
//     () =>
//       multicoreCableConfigColumns.map((column) => ({
//         ...column,
//         type: column.type as ValidColumnType,
//       })),
//     []
//   )

//   // const updateSpreadsheetColumns = (updatedColumns: any[]) => {
//   //   if (spreadsheetInstance) {
//   //     spreadsheetInstance.destroy()
//   //   }

//   //   if (jRef.current) {
//   //     const instance = jspreadsheet(jRef.current, {
//   //       ...cableScheduleOptions,
//   //       columns: updatedColumns,
//   //     })
//   //     setSpreadsheetInstance(instance)
//   //   }
//   // }

//   const cableScheduleOptions = useMemo(
//     () => ({
//       data: cableScheduleData,
//       license: "39130-64ebc-bd98e-26bc4",
//       columns: typedCableScheduleColumns,
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
//     [typedCableScheduleColumns, cableScheduleData]
//   )

//   useEffect(() => {
//     const updateCableSchedule = () => {
//       if (spreadsheetInstance) {
//         spreadsheetInstance.destroy()
//       }

//       if (jRef.current) {
//         const instance = jspreadsheet(jRef.current, {
//           ...cableScheduleOptions,
//           // columns: updatedColumns,
//         })
//         setSpreadsheetInstance(instance)
//       }
//     }
//     if (cableScheduleData?.length) {
//       updateCableSchedule()
//     }
//   }, [cableScheduleData, cableScheduleOptions, spreadsheetInstance])

//   // useEffect(() => {
//   //   if (typeof window !== "undefined") {
//   //     const savedLoadList = localStorage.getItem("loadList")
//   //     if (savedLoadList) {
//   //       // selectedItems = JSON.parse(savedLoadList) as string[]
//   //       console.log(JSON.parse(savedLoadList) as string[], "load list")
//   //       setCableScheduleData(JSON.parse(savedLoadList) as string[])
//   //     }
//   //   }

//   //   let instance: JspreadsheetInstance | null = null
//   //   let selectedItems: string[] = []
//   //   const storedSchemes = localStorage.getItem("selected_control_scheme")

//   //   if (storedSchemes) {
//   //     selectedItems = JSON.parse(storedSchemes) as string[]
//   //   }

//   //   typedCableScheduleColumns.forEach((column) => {
//   //     if (column.name === "controlScheme") {
//   //       column.source = selectedItems
//   //     }
//   //   })

//   //   if (jRef.current && !spreadsheetInstance) {
//   //     instance = jspreadsheet(jRef.current, cableScheduleOptions)
//   //     setSpreadsheetInstance(instance)
//   //   }

//   //   return () => {
//   //     if (instance) {
//   //       instance.destroy()
//   //     }
//   //   }
//   // }, [cableScheduleOptions, spreadsheetInstance, typedCableScheduleColumns])

//   // Fetch control schemes
//   // useEffect(() => {
//   //   getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`).then((res) => {
//   //     const schemes = res
//   //       .map((item: any) => [
//   //         false,
//   //         item.scheme,
//   //         item.sub_scheme,
//   //         item.scheme_title,
//   //         item.description,
//   //         item.breaker,
//   //         item.lpbs,
//   //         item.lpbs_inc_dec_ind,
//   //         item.ammeter,
//   //         item.thermistor_relay,
//   //         item.motor_space_heater,
//   //         item.plc_current_signal,
//   //         item.plc_speed_signal,
//   //         item.olr,
//   //         item.phase,
//   //         item.limit_switch,
//   //         item.motor_protection_relay,
//   //         item.field_isolator,
//   //         item.local_panel,
//   //         item.field_ess,
//   //         item.electronic_relay,
//   //         item.plc1_and_plc2,
//   //         item.mcc_start_stop,
//   //         item.input_choke,
//   //         item.output_choke,
//   //         item.separate_plc_start_stop,
//   //         item.di,
//   //         item.do,
//   //         item.ai,
//   //         item.ao,
//   //       ])
//   //       .sort((a: any, b: any) => {
//   //         const [prefixA, numA] = a[2].split("-")
//   //         const [prefixB, numB] = b[2].split("-")
//   //         return prefixA === prefixB ? parseInt(numA, 10) - parseInt(numB, 10) : prefixA.localeCompare(prefixB)
//   //       })
//   //     setLpbsSchemes(schemes)

//   //     setControlSchemes(schemes)
//   //   })
//   // }, [])

//   const handleCableScheduleSave = () => {
//     console.log(spreadsheetInstance?.getData(), "all load list data")
//   }

//   return (
//     <>
//       <div className="mb-4 flex justify-end gap-4">
//         <Button type="primary" onClick={() => setIsMulticoreModalOpen(true)} className="hover:bg-blue-600">
//           Multicore Cable Configurator
//         </Button>
//       </div>
//       <div className="m-2 flex flex-col overflow-auto">
//         <div ref={jRef} />
//       </div>

//       <MulticoreCableConfigurator
//         isOpen={isMulticoreModalOpen}
//         onClose={() => setIsMulticoreModalOpen(false)}
//         typedMulticoreCableColumns={typedMulticoreCableConfigColumns}
//         onConfigurationComplete={(selectedCables: any) => {
//           console.log("Selected cables:", selectedCables)
//           // Handle the selected cables
//         }}
//       />

//       <div className="flex w-full flex-row justify-end gap-2">
//         <Button type="primary">Get Cable Sizing</Button>

//         {/* <Button type="primary">Download Load List Template</Button> */}
//         <Button type="primary" onClick={handleCableScheduleSave}>
//           Save
//         </Button>
//         <Button type="primary" onClick={() => {}}>
//           Next
//         </Button>

//         {/* <Divider />

// <div className="flex w-full justify-end gap-3 mt-3">
//   <Button type="primary">Download Cable Sizing</Button>
//   <Button type="primary">Calculate</Button>
//   <Button type="primary">Recalculate</Button>
//   <Button type="primary">Save</Button>
//   <Button type="primary">Next</Button>
// </div> */}
//       </div>
//     </>
//   )
// }

// export default CableSchedule
"use client";
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { Button, message, Spin } from "antd";
import { ValidColumnType } from "../types";
import MulticoreCableConfigurator from "./Multicore Cable Config/MulticoreCableConfig";
import {
  CableSchedulecolumns,
  multicoreCableConfigColumns,
} from "../common/ExcelColumns";
import "./CableScheduleComponent.css";
import { getData } from "@/actions/crud-actions";
import { ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API } from "@/configs/api-endpoints";
import { useLoading } from "@/hooks/useLoading";

interface CableScheduleProps {
  loadListLatestRevisionId: string;
}

const getArrayOfCableScheduleData = (data: any) => {
  if (!data?.electrical_load_list_data) return [];
  console.log(data.electrical_load_list_data, "load list");

  return data.electrical_load_list_data.map((item: any) => [
    item.tag_number,
    item.service_description,
    item.working_kw,
    item.standby_kw,
    item.kva,
    item.starter_type,
    item.supply_voltage + ` VAC`,
    item.motor_rated_current,
    "Copper",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
};

const useDataFetching = (loadListLatestRevisionId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cableScheduleData, setCableScheduleData] = useState<any[]>([]);
  const [loadListData, setLoadListData] = useState<any[]>([]);
  const fetchData = useCallback(async () => {
    if (!loadListLatestRevisionId) return;

    try {
      setIsLoading(true);
      const loadList = await getData(
        `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${loadListLatestRevisionId}`
      );
      const formattedData = getArrayOfCableScheduleData(loadList);
      setLoadListData(loadList?.electrical_load_list_data);
      setCableScheduleData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data");
      setCableScheduleData([]);
    } finally {
      setIsLoading(false);
    }
  }, [loadListLatestRevisionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { cableScheduleData, loadListData, isLoading, refetch: fetchData };
};

const CableSchedule: React.FC<CableScheduleProps> = ({
  loadListLatestRevisionId,
}) => {
  const jRef = useRef<HTMLDivElement | null>(null);
  const [spreadsheetInstance, setSpreadsheetInstance] =
    useState<JspreadsheetInstance | null>(null);
  const { setLoading } = useLoading();
  const [isMulticoreModalOpen, setIsMulticoreModalOpen] = useState(false);

  const { cableScheduleData, loadListData, isLoading } = useDataFetching(
    loadListLatestRevisionId
  );

  const typedCableScheduleColumns = useMemo(
    () =>
      CableSchedulecolumns().map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );

  const typedMulticoreCableConfigColumns = useMemo(
    () =>
      multicoreCableConfigColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );

  const cableScheduleOptions = useMemo(
    () => ({
      data: cableScheduleData,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedCableScheduleColumns,
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
    [typedCableScheduleColumns, cableScheduleData]
  );

  // Initialize or update spreadsheet
  useEffect(() => {
    if (isLoading || !jRef.current) return;

    const initSpreadsheet = () => {
      if (spreadsheetInstance) {
        spreadsheetInstance.destroy();
      }

      const instance = jspreadsheet(jRef.current!, cableScheduleOptions);
      setSpreadsheetInstance(instance);
      setLoading(false);
    };

    initSpreadsheet();

    return () => {
      spreadsheetInstance?.destroy();
    };
  }, [isLoading, cableScheduleOptions, spreadsheetInstance, setLoading]);

  const handleCableScheduleSave = () => {
    const data = spreadsheetInstance?.getData();
    console.log(data, "all load list data");
    // Add your save logic here
  };

  return (
    <>
      <div className="mb-4 flex justify-end gap-4">
        <Button
          type="primary"
          onClick={() => setIsMulticoreModalOpen(true)}
          className="hover:bg-blue-600"
        >
          Multicore Cable Configurator
        </Button>
      </div>

      <div className="m-2 flex flex-col overflow-auto">
        {isLoading ? (
          <div className="flex h-[550px] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div ref={jRef} />
        )}
      </div>

      <MulticoreCableConfigurator
        isOpen={isMulticoreModalOpen}
        onClose={() => setIsMulticoreModalOpen(false)}
        loadListData={loadListData}
        typedMulticoreCableColumns={typedMulticoreCableConfigColumns}
        onConfigurationComplete={(selectedCables: any) => {
          console.log("Selected cables:", selectedCables);
        }}
      />

      <div className="flex w-full flex-row justify-end gap-2">
        <Button type="primary">Get Cable Sizing</Button>
        <Button
          type="primary"
          onClick={handleCableScheduleSave}
          disabled={isLoading}
        >
          Save
        </Button>
        <Button type="primary" onClick={() => {}} disabled={isLoading}>
          Next
        </Button>
      </div>
    </>
  );
};

export default CableSchedule;
