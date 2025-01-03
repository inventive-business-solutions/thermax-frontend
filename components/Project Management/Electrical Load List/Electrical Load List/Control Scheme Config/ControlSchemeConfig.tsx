// ControlSchemeConfigurator.tsx
import { JspreadsheetInstance } from "jspreadsheet-ce";
import React, { useRef, useEffect, useState, useMemo } from "react";
import jspreadsheet from "jspreadsheet-ce";
import { Button } from "antd";
import AlertNotification from "@/components/AlertNotification";
import Modal from "@/components/Modal/Modal";
import {
  columnsForWwsSPG,
  controlSchemeColumnsForHeating,
  getEnviroColumns,
  getEnviroSchemesData,
  getIPGColumns,
  getIPGSchemesData,
  WWS_SPG_DATA,
} from "@/app/Data";
import { ValidColumnType } from "../../types";
import { useLoading } from "@/hooks/useLoading";
import { getData } from "@/actions/crud-actions";
import {
  HEATING_CONTROL_SCHEMES_URI,
  SPG_SERVICES_CONTROL_SCHEMES_URI,
} from "@/configs/api-endpoints";
import {
  ENVIRO,
  HEATING,
  SERVICES,
  WWS_IPG,
  WWS_SPG,
} from "@/configs/constants";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface ControlSchemeConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  // controlSchemes: any[]
  selectedControlSchemes: any[];
  onConfigurationComplete: (selectedSchemes: string[]) => void;
}

const ControlSchemeConfigurator: React.FC<ControlSchemeConfiguratorProps> = ({
  isOpen,
  onClose,
  // controlSchemes,
  selectedControlSchemes,
  onConfigurationComplete,
}) => {
  const controlSchemeSheetRef = useRef<HTMLDivElement | null>(null);
  const controlSchemeSelectedSheetRef = useRef<HTMLDivElement | null>(null);
  const [controlSchemeInstance, setControlSchemeInstance] =
    useState<JspreadsheetInstance | null>(null);
  const [selectedSchemeInstance, setSelectedSchemeInstance] =
    useState<JspreadsheetInstance | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("DOL");
  const options = ["VFD", "DOL", "SD"];
  const [controlSchemes, setControlSchemes] = useState<any[]>([]);
  const { setLoading } = useLoading();
  const userInfo: { division: string } = useCurrentUser();
  const [controlSchemesSelected, setControlSchemesSelected] = useState<any[]>(
    []
  );
  const [isControlSchemeEmpty, setIsControlSchemeEmpty] = useState(false);

  const getColumnsForDivision = () => {
    switch (userInfo.division) {
      case HEATING:
        return controlSchemeColumnsForHeating;
      case WWS_SPG:
        return columnsForWwsSPG;
      case SERVICES:
        return columnsForWwsSPG;
      case WWS_IPG:
        return getIPGColumns(selectedFilter);
      case ENVIRO:
        return getEnviroColumns(selectedFilter);

      default:
        return [];
    }
  };
  const typedControlSchemeColumns = useMemo(
    () =>
      getColumnsForDivision().map((column) => ({
        ...column,
        type: column.type as ValidColumnType,
      })),
    [selectedFilter]
  );
  const getApiEndpoint = (division: string) => {
    switch (division) {
      case HEATING:
        return `${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`;
      case WWS_SPG:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`;
      case SERVICES:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`;
      case ENVIRO:
        return `${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`;
      case WWS_IPG:
        return `${SPG_SERVICES_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`;

      default:
        return "";
    }
  };
  const getControlSchemeFields = (item: any, divison: string) => {
    if (divison === HEATING) {
      return [
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
      ];
    }
    if (divison === ENVIRO) {
      return [
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
      ];
    }
    if (divison === WWS_IPG) {
      return [
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
      ];
    }
    if (divison === SERVICES || divison === WWS_SPG) {
      // {
      //   "name": "01uugsat91",
      //   "owner": "Administrator",
      //   "creation": "2024-11-11 16:03:36.513071",
      //   "modified": "2024-11-11 16:03:36.513071",
      //   "modified_by": "Administrator",
      //   "docstatus": 0,
      //   "idx": 0,
      //   "scheme": "S/D-A-N-9",
      //   "starter_type": "Star/Delta ",
      //   "sub_type_filter": "SFU + Contactor + OLR+PLC",
      //   "description": "Typical Control schematics for Star Delta feeder",
      //   "type": "Distribution Board STP",
      //   "switchgear_combination": "SFU + Contactor + OLR",
      //   "selector_switch": "Auto / Manual",
      //   "lbps": "N",
      //   "indication": "On, Off, Trip",
      //   "di": 3,
      //   "do": 1,
      //   "ao": 0,
      //   "ai": 0,
      //   "plc_feedback": "Run, Trip & Remote selection",
      //   "plc_dcs_cmd": "On / Off Common CMD"
      // }
      return [
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
      ];
    }
  };
  useEffect(() => {
    // setControlSchemes
    if (userInfo.division === ENVIRO) {
      getColumnsForDivision();
      setControlSchemes(getEnviroSchemesData(selectedFilter));
    }
    if (userInfo.division === WWS_IPG) {
      getColumnsForDivision();
      setControlSchemes(getIPGSchemesData(selectedFilter));
    }
  }, [selectedFilter]);

  // Fetch control schemes
  useEffect(() => {
    setLoading(true);
    // fetchProjectInfo()

    if (controlSchemes.length) return;
    console.log(userInfo.division);

    getData(getApiEndpoint(userInfo?.division)).then((res) => {
      console.log(res);
      let sortedSchemes;
      if (userInfo.division === SERVICES || userInfo.division === WWS_SPG) {
        sortedSchemes = WWS_SPG_DATA;
      } else if (userInfo.division === ENVIRO) {
        sortedSchemes = getEnviroSchemesData(selectedFilter);
      } else if (userInfo.division === WWS_IPG) {
        sortedSchemes = getIPGSchemesData(selectedFilter);
      } else {
        sortedSchemes = res
          .map((item: any) => getControlSchemeFields(item, userInfo.division))
          .sort((a: any, b: any) => {
            const [prefixA, numA] = a[2].split("-");
            const [prefixB, numB] = b[2].split("-");
            return prefixA === prefixB
              ? parseInt(numA, 10) - parseInt(numB, 10)
              : prefixA.localeCompare(prefixB);
          });
      }

      console.log(sortedSchemes, "control schemes sorted");

      setControlSchemes(sortedSchemes);
      setLoading(false);
    });
  }, []);
  // Initialize main control scheme spreadsheet

  useEffect(() => {
    if (isOpen && controlSchemeSheetRef.current) {
      if (controlSchemeInstance) {
        controlSchemeInstance.destroy();
      }

      // Update selected schemes from localStorage
      // const storedSchemes = localStorage.getItem("selected_control_scheme")
      let updatedSchemes = [...controlSchemes];

      // if (storedSchemes) {
      try {
        // const selectedItems = JSON.parse(storedSchemes) as string[]
        const selectedItems = selectedControlSchemes;
        updatedSchemes = controlSchemes.map((scheme) => {
          if (selectedItems.includes(scheme[2])) {
            return [true, ...scheme.slice(1)];
          }
          return scheme;
        });
      } catch (error) {
        console.error("Error parsing selected_control_scheme:", error);
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
      });
      setControlSchemeInstance(instance);
    }

    return () => {
      if (controlSchemeInstance) {
        controlSchemeInstance.destroy();
        setControlSchemeInstance(null);
      }
    };
  }, [isOpen, controlSchemes, typedControlSchemeColumns]);

  // Initialize selected schemes spreadsheet
  useEffect(() => {
    if (
      controlSchemeSelectedSheetRef.current &&
      controlSchemesSelected.length > 0
    ) {
      if (selectedSchemeInstance) {
        selectedSchemeInstance.destroy();
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
      });
      setSelectedSchemeInstance(instance);
    }

    return () => {
      if (selectedSchemeInstance) {
        selectedSchemeInstance.destroy();
        setSelectedSchemeInstance(null);
      }
    };
  }, [controlSchemesSelected, typedControlSchemeColumns]);

  const handleAdd = () => {
    const selected = controlSchemeInstance
      ?.getData()
      .filter((row) => row[0] === true);

    if (!selected?.length) {
      setIsControlSchemeEmpty(true);
      return;
    }
    console.log(controlSchemesSelected);
    console.log(selected);
    setControlSchemesSelected((prev) =>
      Array.from(
        new Map(
          [...prev, ...selected].map((item) => [
            userInfo.division === HEATING ? item[2] : item[1],
            item,
          ])
        ).values()
      )
    );
    setIsControlSchemeEmpty(false);
  };

  const handleConfirm = () => {
    const selectedSchemes = controlSchemesSelected.map((item) => {
      switch (userInfo.division) {
        case HEATING:
          return item[2];

        case WWS_SPG:
          return item[1];
        case SERVICES:
          return item[1];
        case ENVIRO:
          return item[1];
        case WWS_IPG:
          return item[1];

        default:
          return item[1];
      }
    });
    // localStorage.setItem("selected_control_scheme", JSON.stringify([...selectedSchemes, "NA"]))
    onConfigurationComplete([...selectedSchemes, "NA"]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-100 max-h-screen overflow-auto"
    >
      <div className="m-2 flex flex-col">
        <h2 className="mb-4 text-2xl font-bold">Control Scheme Configurator</h2>
        <div className="w-1/4 py-1">
          {(userInfo.division === ENVIRO || userInfo.division === WWS_IPG) && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded border p-2"
            >
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        </div>
        {isControlSchemeEmpty && (
          <AlertNotification
            message="Please select control scheme!"
            status="error"
          />
        )}
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
  );
};

export default ControlSchemeConfigurator;
