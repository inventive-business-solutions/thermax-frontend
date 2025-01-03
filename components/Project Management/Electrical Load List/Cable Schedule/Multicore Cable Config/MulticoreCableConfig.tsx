"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import jspreadsheet from "jspreadsheet-ce";
import Modal from "@/components/Modal/Modal";
import { getData } from "@/actions/crud-actions";
import { HEATING_CONTROL_SCHEMES_URI } from "@/configs/api-endpoints";
import {
  multicoreCableConfigColumns,
  multicoreCableConfigGroupedColumns,
} from "../../common/ExcelColumns";
import { ValidColumnType } from "../../types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ENVIRO, HEATING, WWS_IPG, WWS_SPG } from "@/configs/constants";

interface MulticoreCableConfigProps {
  isOpen: boolean;
  onClose: () => void;
  //   loadListData: any[]
  loadListData: any[];
  // loadListData:,
  typedMulticoreCableColumns: any[];
  onConfigurationComplete: (selectedCables: any[]) => void;
}

const MulticoreCableConfigurator: React.FC<MulticoreCableConfigProps> = ({
  isOpen,
  onClose,
  //   loadListData,
  loadListData,
  // typedMulticoreCableColumns,
  onConfigurationComplete,
}) => {
  // const router = useRouter()
  const spreadsheetRef = useRef<HTMLDivElement>(null);
  const groupingRef = useRef<HTMLDivElement>(null);
  // spreadsheet_grouping
  const [tble, setTble] = useState<any>(null);
  const [tbleSelected, setTbleSelected] = useState<any>(null);
  const [selectedElMulticore, setSelectedElMulticore] = useState<any[][]>([]);
  const [grouping, setGrouping] = useState<any[][]>([]);
  const [groupId, setGroupId] = useState<number>(1);
  // const [insertedElementsLength, setInsertedElementsLength] =
  //   useState<number>(0);
  const [selectedElements, setSelectedElements] = useState<any[]>([]);
  const [selectedPercent, setSelectedPercent] = useState<string | number>("");
  const [controlSchemes, setControlSchemes] = useState<any[]>([]);
  const userInfo: {
    division: string;
  } = useCurrentUser();
  // const userData = { divisionId: 7 };

  const sparePercent = [10, 20];
  // const DIDOSpare = [
  //   "2C",
  //   "3C",
  //   "4C",
  //   "6C",
  //   "8C",
  //   "12C",
  //   "16C",
  //   "24C",
  //   "30C",
  //   "37C",
  //   "1P",
  //   "2P",
  //   "6P",
  //   "12P",
  // ];
  // const AIAOSpare: string[] = [];
  const typedMulticoreConfigColumns = useMemo(
    () =>
      multicoreCableConfigColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );
  const typedMulticoreCableConfigGroupedColumns = useMemo(
    () =>
      multicoreCableConfigGroupedColumns.map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    []
  );
  //fetch control schemes
  useEffect(() => {
    getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`).then(
      (res) => {
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
            const [prefixA, numA] = a[2].split("-");
            const [prefixB, numB] = b[2].split("-");
            return prefixA === prefixB
              ? parseInt(numA, 10) - parseInt(numB, 10)
              : prefixA.localeCompare(prefixB);
          });

        setControlSchemes(schemes);
      }
    );
  }, []);

  const spareFormula = (DIDO: number): number => {
    if (selectedPercent === "10") return DIDO * 1.1;
    else if (selectedPercent === "20") return DIDO * 1.2;
    else return DIDO;
  };
  const calculateSpare = (
    input: number,
    from: string = "DIDO"
  ): number | null => {
    let spares: number[] = [1, 2, 6, 12];
    if (from == "DIDO") {
      spares = [2, 3, 4, 6, 8, 12, 16, 24, 30, 37];
    }
    if (from == "AIAO") {
      spares = [1, 2, 6, 12];
    }
    if (!spares?.length) {
      return null;
    }

    for (let i = 0; i < spares.length - 1; i++) {
      if (input == spares[i]) {
        return spares[i] || 0;
      } else if (input > (spares[i] || 0) && input <= (spares[i + 1] || 0)) {
        return spares[i + 1] || 0;
      }
    }
    return null;
  };

  const findOtherData = (schemeTitle: string) => {
    const division = userInfo.division;

    switch (division) {
      case HEATING:
        return controlSchemes?.find((item) => item[2] === schemeTitle);
      case ENVIRO:
        return [].find((item) => item[1] === schemeTitle);
      case WWS_SPG:
        return [].find((item) => String(item[1]).trim() === schemeTitle.trim());
      case WWS_IPG:
        return [].find((item) => String(item[1]).trim() === schemeTitle.trim());
      default:
        return null;
    }
  };

  const initializeMulticoreUi = (data: any) => {
    if (!spreadsheetRef.current) return;

    const options = {
      data,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedMulticoreConfigColumns,
      updateTable: (instance: any, cell: any, col: number, row: number) => {
        if (data[row][0] === true && !selectedElMulticore.includes(data[row])) {
          if (cell.classList.length > 0) {
            const className = cell.classList;
            if (className[0] !== "readonly") {
              setSelectedElMulticore((prev: any) => [...prev, data[row]]);
              if (!selectedElements.includes(cell)) {
                setSelectedElements((prev) => [...prev, cell]);
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
    };

    const newTable = jspreadsheet(spreadsheetRef.current, options);
    setTble(newTable);
  };

  const initializeGroupingeUi = (data: any) => {
    if (groupingRef.current) {
      tbleSelected?.destroy();
    }
    if (!groupingRef.current) return;
    // source: DIDOSpare,
    // autocomplete: true,
    // multiple: false,
    const options = {
      data,
      license: "39130-64ebc-bd98e-26bc4",
      columns: typedMulticoreCableConfigGroupedColumns,

      updateTable: (instance: any, cell: any, col: number, row: number) => {
        if (data[row][0] === true && !selectedElMulticore.includes(data[row])) {
          if (cell.classList.length > 0) {
            const className = cell.classList;
            if (className[0] !== "readonly") {
              setSelectedElMulticore((prev: any) => [...prev, data[row]]);
              if (!selectedElements.includes(cell)) {
                setSelectedElements((prev) => [...prev, cell]);
              }
            }
          }
        }
      },
      tableOverflow: true,
      filters: true,
      tableWidth: "100%",
      tableHeight: "300px",
      freezeColumns: 0,
    };

    const newTable = jspreadsheet(groupingRef.current, options);
    setTbleSelected(newTable);
  };

  const addGroup = () => {
    if (selectedElMulticore.length === 0) return;

    setGroupId((prev) => prev + 1);

    let DI = 0,
      DO = 0,
      AI = 0,
      AO = 0;
    let serviceDescription = "";
    let panelName = "";

    selectedElMulticore.forEach((el) => {
      if (el[5] && el[5] !== "-") DI += Number(el[5]) * 2;
      if (el[6] && el[6] !== "-") DO += Number(el[6]) * 2;
      if (el[7] && el[7] !== "-") AI += Number(el[7]);
      if (el[8] && el[8] !== "-") AO += Number(el[8]);

      serviceDescription = serviceDescription
        ? serviceDescription.concat(", ", el[2])
        : el[2];
      panelName = el[10];
    });

    // Calculate spares
    const calcDISpare = Number(spareFormula(DI).toFixed(2));
    console.log(DI);
    console.log(DI * 1.2);
    console.log(selectedPercent);
    console.log(calcDISpare);

    const calDOSpare = Number(spareFormula(DO).toFixed(2));
    const DISpare = calculateSpare(calcDISpare, "DIDO");
    const DOSpare = calculateSpare(calDOSpare, "DIDO");

    const calcAISpare = Number(spareFormula(AI).toFixed(2));
    const calcAOSpare = Number(spareFormula(AO).toFixed(2));
    const AISpare = calculateSpare(calcAISpare, "AIAO");
    const AOSpare = calculateSpare(calcAOSpare, "AIAO");

    const newGroups = [
      [
        groupId,
        "DI Cable",
        DI,
        calcDISpare,
        `${DISpare}C`,
        "1",
        serviceDescription,
        panelName,
      ],
      [
        groupId,
        "DO Cable",
        DO,
        calDOSpare,
        `${DOSpare}C`,
        "1",
        serviceDescription,
        panelName,
      ],
      [
        groupId,
        "AI Cable",
        AI,
        calcAISpare || "-",
        AISpare ? `${AISpare}P` : "-",
        "1",
        serviceDescription,
        panelName,
      ],
      [
        groupId,
        "AO Cable",
        AO,
        calcAOSpare || "-",
        AOSpare ? `${AOSpare}P` : "-",
        "1",
        serviceDescription,
        panelName,
      ],
    ];
    console.log(grouping, "grouping");

    setGrouping((prev) => [...prev, ...newGroups]);
    setSelectedElMulticore([]);
    // setInsertedElementsLength((prev) => prev + newGroups.length);
    initializeGroupingeUi(grouping);
    selectedElements.forEach((element) => {
      element.classList.add("readonly");
      const checkbox = element.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.classList.add("readonly-checkbox");
        checkbox.disabled = true;
      }
    });
  };
  useEffect(() => {
    console.log(grouping, "grouping");
    if (grouping.length > 0) {
      initializeGroupingeUi(grouping);
    }
  }, [grouping]);
  const onConfirm = () => {
    console.log(grouping, "grouping");
    if (grouping.length > 0) {
      onConfigurationComplete(grouping);
      localStorage.setItem(
        "grouping_of_cables_table",
        JSON.stringify(grouping)
      );
      onClose();
    }
    // router.push("/project/configloadlist")
  };

  useEffect(() => {
    localStorage.setItem("load_list_tab", JSON.stringify(2));

    // const loadList = JSON.parse(localStorage.getItem('loadList'));
    console.log(loadListData, "loadListData");

    const processedData = loadListData?.map((item: any) => {
      const schemeData = findOtherData(item.control_scheme);
      // const divisionId = userData.divisionId // to be populated from dynamic
      const division = userInfo.division;

      const getSchemeIndex = () => {
        switch (division) {
          case HEATING:
            return 26;
          case ENVIRO:
            return 6;
          // case 9:
          // case 8:
          //   return 9
          default:
            return 0;
        }
      };
      console.log(item, "loadList item");
      if (!schemeData) {
        return [
          false,
          item.tag_number,
          item.service_description,
          item.control_scheme,
          "",
          0,
          0,
          0,
          0,
          "",
          item.panel,
        ];
      }

      return [
        false,
        item.tag_number,
        item.service_description,
        item.control_scheme,
        "",
        schemeData[getSchemeIndex()],
        schemeData[getSchemeIndex() + 1],
        schemeData[getSchemeIndex() + 2],
        schemeData[getSchemeIndex() + 3],
        "",
        item.panel,
      ];
    });
    console.log(processedData, "processedData");
    if (grouping.length > 0) {
      initializeGroupingeUi(grouping);
    }
    initializeMulticoreUi(processedData);
  }, [isOpen]);
  const handleClearSelection = () => {
    tbleSelected?.destroy();
    console.log(
      tble.getData().map((item: any) => {
        const arr = [...item];
        arr[0] = false;
        return arr;
      })
    );
    tble.setData(
      tble.getData().map((item: any) => {
        const arr = [...item];
        arr[0] = false;
        return arr;
      })
    );

    setGrouping([]);
    setSelectedPercent("");
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-42 max-h-screen overflow-auto"
    >
      <div className="w-100">
        <div className="flex-col px-2">
          <div className="my-4 flex justify-end gap-4 ">
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
              onClick={handleClearSelection}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Clear Selection
            </button>
          </div>
          <div className="overflow-auto">
            <div
              ref={spreadsheetRef}
              id="spreadsheet_multicore_ui"
              className=""
            />
          </div>
          <div className="my-4 flex justify-end">
            <button
              onClick={addGroup}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Add Group
            </button>
          </div>
          <div className="overflow-auto">
            <div ref={groupingRef} id="spreadsheet_grouping" />
          </div>
          {grouping.length > 0 && (
            <div className="my-2 flex justify-end">
              <button
                onClick={onConfirm}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MulticoreCableConfigurator;
