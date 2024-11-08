import React, { useRef, useEffect, useState } from "react";
import jspreadsheet, { JspreadsheetInstance } from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { useGetData } from "hooks/useCRUD";
import { HEATING_CONTROL_SCHEMES_URI } from "configs/api-endpoints";
import { getData } from "actions/crud-actions";
import { LoadListcolumns } from "../common/ExcelColumns";
import Modal from "components/Modal/Modal";
import { mockExcel} from '../../../../app/Data'
const ExcelGrid: React.FC = () => {
  const jRef = useRef<HTMLDivElement | null>(null);
  const controlSchemeSheetRef = useRef<HTMLDivElement | null>(null);
  const spreadsheetInstance = useRef<JspreadsheetInstance | null>(null);
  const controlSchemespreadsheetInstance = useRef<JspreadsheetInstance | null>(null);
  const [isControlSchemeModalOpen, setIsControlSchemeModalOpen] = useState(false);
  const [isLPBSModalOpen, setIsLPBSModalOpen] = useState(false);
  
  const options = {
    data: mockExcel,
    // minDimensions: [6, 5] as [number, number],
    columns: LoadListcolumns,
    // Additional configuration options
    columnSorting: true,
    columnDrag: true,
    columnResize: true,
    tableOverflow: true,
    filters: true,
    tableWidth: "100%",
    freezeColumns: 4,
    rowResize: true,
    // defaultColWidth: ,
    
    onchange: (instance: JspreadsheetInstance, cell: HTMLElement, x: number, y: number, value: any) => {},
  };

  // const { data: heating_control_schemes } = useGetData(`${HEATING_CONTROL_SCHEMES_URI}?fields=["*"]`, false);

  useEffect(() => {
    getData(`${HEATING_CONTROL_SCHEMES_URI}?limit=1000&fields=["*"]`, false).then((res) => console.log(res));
    // console.log(heating_control_schemes, "heating_control_schemes ");
  }, []);

  // Initialize main spreadsheet
  useEffect(() => {
    if (jRef.current && !spreadsheetInstance.current) {
      spreadsheetInstance.current = jspreadsheet(jRef.current, options);
    }
  }, [options]);

  // Handle control scheme modal spreadsheet
  useEffect(() => {
    if (isControlSchemeModalOpen) {
      // Destroy previous instance if it exists
      if (controlSchemespreadsheetInstance.current) {
        controlSchemespreadsheetInstance.current.destroy();
        controlSchemespreadsheetInstance.current = null;
      }
      
      // Initialize new instance
      if (controlSchemeSheetRef.current) {
        setTimeout(() => {
          controlSchemespreadsheetInstance.current = jspreadsheet(controlSchemeSheetRef.current!, options);
        }, 0);
      }
    }
  }, [isControlSchemeModalOpen, options]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // if (spreadsheetInstance.current) {
      //   spreadsheetInstance.current.destroy();
      // }
      if (controlSchemespreadsheetInstance.current) {
        controlSchemespreadsheetInstance.current.destroy();
      }
    };
  }, []);

  // Handle modal close
  const handleControlSchemeModalClose = () => {
    if (controlSchemespreadsheetInstance.current) {
      controlSchemespreadsheetInstance.current.destroy();
      controlSchemespreadsheetInstance.current = null;
    }
    setIsControlSchemeModalOpen(false);
  };

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
        <div className="flex flex-col m-2">
          <h2 className="mb-4 text-2xl font-bold">Control Scheme Configurator</h2>
          <div ref={controlSchemeSheetRef} />
        </div>
      </Modal>
      <Modal isOpen={isLPBSModalOpen} onClose={() => setIsLPBSModalOpen(false)}>
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">LPBS Configurator</h2>
        </div>
      </Modal>
    </>
  );
};

export default ExcelGrid;