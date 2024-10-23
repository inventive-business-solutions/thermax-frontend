import React, { useEffect, useState } from "react"
import  DataGrid,{ Column } from "react-data-grid"
// import DataGrid, { SelectColumn, textEditor } from '../excel-utility';

import "react-data-grid/lib/styles.css"
import "./LoadListComponent.css"
import SelectEditor from "../common/SelectEditor"
interface RowData {
  id: number
  feederTagNo: string
  serviceDescription: string
  workingLoadInKW: number
  standByLoadInKW: number
  kva: number
  starterType: string // dropdown
  supplyVoltage: string
  phase: "1 Phase" | "3 Phase" // dropdown
  startingTime: string
  eocrApplicable: "Yes" | "No" // dropdown
  lpbsType: "TYPE-1" | "TYPE-2" | "TYPE-3" // dropdown
  controlScheme: string
  panel: string
  busSegregation: "A" | "B" | "C" // dropdown
  motorRpm: number
  typeOfMotorMounting: "Foot Mounted (B3)" | "Flange Mounted (B5)" | "Foot & Flange Mounted" // dropdown
  motorFrameSize: string
  motorGd2: number
  equipmentGd2: number
  bkw: number
  typeOfCoupling: "Direct" | "Flexible" | "Belt Driven" // dropdown
  package: string
  area: "Safe" | "Hazardous" // dropdown
  standard: "IEC" | "ATEX" | "NA" // dropdown
  zone: "Zone 1" | "Zone 2" | "NA" // dropdown
  gasGroup: "IIA" | "IIB" | "IIC" | "NA" // dropdown
  temperatureClass: "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "NA" // dropdown
  remark: string
  rev: string
  spaceHeater: "Yes" | "No" // dropdown
  bearingRtd: "Yes" | "No" // dropdown
  windingRtd: "Yes" | "No" // dropdown
  thermistor: "Yes" | "No" // dropdown
  typeOfBearing: "Ball" | "Roller" | "Sleeve" // dropdown
  powerFactor: number
  motorEfficiency: "IE-1" | "IE-2" | "IE-3" | "IE-4" // dropdown
  localIsolator: "Yes" | "No" // dropdown
  panelAmmeter: "Y-Phase With CT" | "Digital" | "None" // dropdown
  motorMake: "TL Std" | "ABB" | "Siemens" | "Other" // dropdown
  motorScope: "THERMAX" | "VENDOR" // dropdown
  motorLocation: "INDOOR" | "OUTDOOR" // dropdown
}
// interface Row {
//   feederTagNo: string
//   serviceDescription: string
//   workingLoadKW: number
//   standbyLoadKW: number
//   kva: number
//   starterType: string
//   supplyVoltage: number
//   phase: string
//   startingTime: number
//   eocrApplicable: boolean
//   lpbsType: string
//   controlScheme: string
//   panel: string
//   busSegregation: boolean
//   motorRpm: number
//   motorMounting: string
//   motorFrameSize?: string
//   motorGD2?: string
//   drivenEquipmentGD2?: string
//   bkw?: string
//   typeOfCoupling?: string
//   package?: string
//   area?: string
//   standard?: string
//   zone?: string
//   gasGroup?: string
//   temperatureClass?: string
//   remark?: string
//   rev?: string
//   spaceHeater?: string
//   bearingRTD?: string
//   windingRTD?: string
//   thermistor?: string
//   typeOfBearing?: string
//   powerFactor?: string
//   motorEfficiency?: string
//   localIsolator?: string
//   panelAmmeter?: string
//   motorMake?: string
//   motorScope: string
//   motorLocation?: string
//   motorPartCode?: string
//   motorRatedCurrent?: string
// }
const columns: readonly Column<RowData>[] = [
  { key: "id", name: "Sr. No.", width: "max-content" },
  { key: "feederTagNo", name: "FEEDER TAG NO", width: "max-content" },
  { key: "serviceDescription", name: "SERVICE DESCRIPTION", width: "max-content" },
  { key: "workingLoadInKW", name: "WORKING LOAD IN KW", width: "max-content" },
  { key: "standByLoadInKW", name: "STAND-BY LOAD IN KW", width: "max-content" },
  { key: "kva", name: "KVA", width: "max-content" },
  {
    key: "starterType",
    name: "STARTER TYPE",
    width: "max-content",
    renderEditCell: ({ row, onRowChange }) => (
      <SelectEditor
        row={row}
        onRowChange={onRowChange}
        value={row.starterType}
        options={["VFD", "DOL", "Star Delta"]}
        columnKey="starterType"
      />
    ),
  },
  { key: "supplyVoltage", name: "SUPPLY VOLTAGE", width: "max-content", },
  {
    key: "phase",
    name: "PHASE",
    width: "max-content",
    renderEditCell: ({ row, onRowChange }) => (
      <SelectEditor
        row={row}
        onRowChange={onRowChange}
        value={row.phase}
        options={["1 Phase", "3 Phase"]}
        columnKey="phase"
      />
    ),
  },
  {
    key: "startingTime",
    name: "STARTING TIME",
    width: "max-content",
    renderEditCell: ({ row, onRowChange }) => (
      <SelectEditor
        row={row}
        onRowChange={onRowChange}
        value={row.startingTime}
        options={["10 Sec", "20 Sec", "30 Sec"]}
        columnKey="startingTime"
      />
    ),
  },
  {
    key: "eocrApplicable",
    name: "EOCR APPLICABLE",
    width: "max-content",
    renderEditCell: ({ row, onRowChange }) => (
      <SelectEditor
        row={row}
        onRowChange={onRowChange}
        value={row.eocrApplicable}
        options={["Yes", "No"]}
        columnKey="eocrApplicable"
      />
    ),
  },
  { key: "lpbsType", name: "LPBS TYPE", width: "max-content" },
  { key: "controlScheme", name: "CONTROL SCHEME", width: "max-content" },
  { key: "panel", name: "PANEL", width: "max-content" },
  {
    key: "busSegregation",
    name: "BUS SEGREGATION",
    width: "max-content",
    renderEditCell: ({ row, onRowChange }) => (
      <SelectEditor
        row={row}
        onRowChange={onRowChange}
        value={row.busSegregation}
        options={["A", "B", "C"]}
        columnKey="busSegregation"
      />
    ),
  },
  { key: "motorRpm", name: "MOTOR RPM", width: "max-content" },
  { key: "typeOfMotorMounting", name: "TYPE OF MOTOR MOUNTING", width: "max-content" },
  { key: "motorFrameSize", name: "MOTOR FRAME SIZE", width: "max-content" },
  { key: "motorGd2", name: "MOTOR GD 2", width: "max-content" },
  { key: "equipmentGd2", name: "EQUIPMENT GD2", width: "max-content" },
  { key: "bkw", name: "BKW", width: "max-content" },
  { key: "typeOfCoupling", name: "TYPE OF COUPLING", width: "max-content" },
  { key: "package", name: "PACKAGE", width: "max-content" },
  { key: "area", name: "AREA", width: "max-content" },
  { key: "standard", name: "STANDARD", width: "max-content" },
  { key: "zone", name: "ZONE", width: "max-content" },
  { key: "gasGroup", name: "GAS GROUP", width: "max-content" },
  { key: "temperatureClass", name: "TEMPERATURE CLASS", width: "max-content" },
  { key: "remark", name: "REMARK", width: "max-content" },
  { key: "rev", name: "REV.", width: "max-content" },
  { key: "spaceHeater", name: "SPACE HEATER", width: "max-content" },
  { key: "bearingRtd", name: "BEARING RTD", width: "max-content" },
  { key: "windingRtd", name: "WINDING RTD", width: "max-content" },
  { key: "thermistor", name: "THERMISTOR", width: "max-content" },
  { key: "typeOfBearing", name: "TYPE OF BEARING", width: "max-content" },
  { key: "powerFactor", name: "POWER FACTOR", width: "max-content" },
  { key: "motorEfficiency", name: "MOTOR EFFICIENCY", width: "max-content" },
  { key: "localIsolator", name: "LOCAL ISOLATOR", width: "max-content" },
  { key: "panelAmmeter", name: "PANEL AMMETER", width: "max-content" },
  { key: "motorMake", name: "MOTOR MAKE", width: "max-content" },
  { key: "motorScope", name: "MOTOR SCOPE", width: "max-content" },
  { key: "motorLocation", name: "MOTOR LOCATION", width: "max-content" },
  { key: "motorPartCode", name: "MOTOR PART CODE", editable: true, width: "max-content" },
  { key: "motorRatedCurrent", name: "Motor Rated Current (AMP)", editable: true, width: "max-content" },
]

const ExcelGrid: React.FC = () => {
  const initialRows: RowData[] = [
    {
      id: 1,
      feederTagNo: "FT-001",
      serviceDescription: "Pump Motor 1",
      workingLoadInKW: 75,
      standByLoadInKW: 0,
      kva: 90,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "10 sec",
      eocrApplicable: "Yes",
      lpbsType: "TYPE-1",
      controlScheme: "Scheme-5",
      panel: "MCC-1",
      busSegregation: "A",
      motorRpm: 1000,
      typeOfMotorMounting: "Foot Mounted (B3)",
      motorFrameSize: "315S",
      motorGd2: 0.5,
      equipmentGd2: 0.8,
      bkw: 70,
      typeOfCoupling: "Flexible",
      package: "NA",
      area: "Safe",
      standard: "IEC",
      zone: "NA",
      gasGroup: "NA",
      temperatureClass: "NA",
      remark: "",
      rev: "R0",
      spaceHeater: "Yes",
      bearingRtd: "Yes",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Ball",
      powerFactor: 0.8,
      motorEfficiency: "IE-2",
      localIsolator: "Yes",
      panelAmmeter: "Y-Phase With CT",
      motorMake: "TL Std",
      motorScope: "THERMAX",
      motorLocation: "INDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
    {
      id: 2,
      feederTagNo: "FT-002",
      serviceDescription: "Compressor Motor 1",
      workingLoadInKW: 110,
      standByLoadInKW: 0,
      kva: 132,
      starterType: "DOL",
      supplyVoltage: "415 VAC",
      phase: "3 Phase",
      startingTime: "5 sec",
      eocrApplicable: "No",
      lpbsType: "TYPE-2",
      controlScheme: "Scheme-3",
      panel: "MCC-2",
      busSegregation: "B",
      motorRpm: 1500,
      typeOfMotorMounting: "Flange Mounted (B5)",
      motorFrameSize: "280M",
      motorGd2: 0.6,
      equipmentGd2: 1.0,
      bkw: 100,
      typeOfCoupling: "Direct",
      package: "NA",
      area: "Hazardous",
      standard: "ATEX",
      zone: "Zone 2",
      gasGroup: "IIA",
      temperatureClass: "T3",
      remark: "Ex-proof",
      rev: "R1",
      spaceHeater: "No",
      bearingRtd: "No",
      windingRtd: "Yes",
      thermistor: "Yes",
      typeOfBearing: "Roller",
      powerFactor: 0.85,
      motorEfficiency: "IE-3",
      localIsolator: "No",
      panelAmmeter: "Digital",
      motorMake: "ABB",
      motorScope: "VENDOR",
      motorLocation: "OUTDOOR",
    },
  ]

  const [rows, setRows] = useState<RowData[]>(initialRows)

  const onRowsChange = (updatedRows: RowData[]) => {
    setRows(updatedRows)
  }
  useEffect(() => {
    console.log(rows, "load list rows")
  }, [rows])
  // const direction = useDirection();

  const [selectedRows, setSelectedRows] = useState((): ReadonlySet<string> => new Set());

  return (
    <div>
      
      <DataGrid
        columns={columns}
        rows={rows}
        // rowKeyGetter={rowKeyGetter}
        onRowsChange={setRows}
        // onFill={handleFill}
        // onCopy={handleCopy}
        // onPaste={handlePaste}
        rowHeight={30}
        selectedRows={selectedRows}
        // isRowSelectionDisabled={(row) => row.id === 1}
        onSelectedRowsChange={setSelectedRows}
        className="fill-grid my-custom-grid"
        // rowClass={(row, index) => (row.id.includes("7") || index === 0 ? highlightClassname : undefined)}
        // direction={direction}
        onCellClick={(args, event) => {
          if (args.column.key === "name") {
            event.preventGridDefault()
            args.selectCell(true)
          }
        }}
      />
    </div>
  )
}

export default ExcelGrid
