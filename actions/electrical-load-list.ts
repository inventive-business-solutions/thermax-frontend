"use server"

import { DB_REVISION_STATUS, HEATING, LOAD_LIST_REVISION_STATUS } from "configs/constants"
import { getData } from "./crud-actions"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  CABLE_SIZE_HEATING_API,
  CABLE_SIZING_DATA_API,
  CABLE_TRAY_LAYOUT,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  HEATING_SWITCHGEAR_HEATER_API,
  MOTOR_CANOPY_METADATA,
  MOTOR_CANOPY_REVISION_HISTORY_API,
  SLD_REVISIONS_API,
} from "configs/api-endpoints"

export const getCurrentCalculation = async (loadListData: any) => {
  const division = loadListData.divisionName
  const calcData = loadListData.data
  const cableSizingHeatingData = await getData(`${CABLE_SIZE_HEATING_API}?fields=["*"]&limit=1000`)
  const heatingSwitchgearHeaterData = await getData(`${HEATING_SWITCHGEAR_HEATER_API}?fields=["*"]&limit=1000`)

  const calculatedData = calcData.map((item: any) => {
    const kw = item.kw
    const supplyVoltage = item.supplyVoltage
    const phase = item.phase
    const powerFactor = item.powerFactor
    const starterType = item.starterType
    let current = 0

    if (division === HEATING) {
      if (starterType === "DOL-HTR" && supplyVoltage === 415 && phase === "3 Phase") {
        const standardCurrent = heatingSwitchgearHeaterData.find((data: any) => data.kw === kw)
        if (standardCurrent) {
          current = standardCurrent.fla
        } else {
          current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
        }
      } else if (supplyVoltage === 415 && phase === "3 Phase") {
        const standardCurrent = cableSizingHeatingData.find(
          (data: any) => data.kw === kw && data.voltage === supplyVoltage
        )
        if (standardCurrent) {
          current = standardCurrent.motor_current_amp_il
        } else {
          current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
        }
      } else if (supplyVoltage !== 415 && phase === "3 Phase") {
        current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
      } else if (phase === "1 Phase") {
        current = (kw * 1000) / (supplyVoltage * powerFactor)
      }
    } else {
      if (starterType === "DOL-HTR" && supplyVoltage === 415) {
        const standardCurrent = heatingSwitchgearHeaterData.find((data: any) => data.kw === kw)
        if (standardCurrent) {
          current = standardCurrent.fla
        } else {
          current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
        }
      } else if (phase === "3 Phase") {
        // current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
        current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage * powerFactor)
      } else if (phase === "1 Phase") {
        current = (kw * 1000) / (supplyVoltage * powerFactor)
      }
    }

    return {
      ...item,
      motorRatedCurrent: current.toFixed(2),
    }
  })

  return calculatedData
}

export const getLatestLoadlistRevision = async (projectId: string) => {
  const dbRevisionData = await getData(
    `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectId}"], ["status", "in", ["${LOAD_LIST_REVISION_STATUS.NotReleased}"]]]&fields=["*"]&order_by=creation desc`
  )

  return dbRevisionData
}

export const getLatestCableScheduleRevision = async (projectId: string) => {
  const dbRevisionData = await getData(
    `${CABLE_SCHEDULE_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectId}"], ["status", "in", ["${LOAD_LIST_REVISION_STATUS.NotReleased}"]]]&fields=["*"]&order_by=creation desc`
  )

  return dbRevisionData
}
export const getAllSldRevisions = async (projectId: string) => {
  // ["status", "in", ["${LOAD_LIST_REVISION_STATUS.NotReleased}"]]
  const dbRevisionData = await getData(
    `${SLD_REVISIONS_API}?filters=[["project_id", "=", "${projectId}"]]&fields=["*"]&order_by=creation desc`
  )

  return dbRevisionData
}
export const getLatestMotorCanopyRevision = async (projectId: string) => {
  const dbRevisionData = await getData(
    `${MOTOR_CANOPY_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectId}"], ["status", "in", ["${LOAD_LIST_REVISION_STATUS.NotReleased}"]]]&fields=["*"]&order_by=creation desc`
  )

  return dbRevisionData
}
export const getFrameSizeCalculation = async (loadListData: any) => {
  const division = loadListData.divisionName
  const calcData = loadListData.data

  const motorCanopyListMetadata = await getData(`${MOTOR_CANOPY_METADATA}?fields=["*"]&limit=1000`)
  if (division === HEATING) {
    return calcData
  } else {
    const calculatedData = calcData?.map((item: any) => {
      const kw = item.kw
      const speed = item.speed
      const moutingType = item.mounting_type

      const filteredFrameSize = motorCanopyListMetadata.filter(
        (data: any) => data.speed === speed && data.mounting_type === moutingType
      )

      if (filteredFrameSize.length === 0) {
        // If no data is available, return empty frameSize
        return {
          ...item,
          frameSize: "",
        }
      }

      const filteredKWs = filteredFrameSize.map((data: any) => data.kw).sort((a: any, b: any) => a - b)

      const sameSizeKw = filteredFrameSize.find((data: any) => data.kw === kw)
      if (sameSizeKw) {
        return {
          ...item,
          frameSize: sameSizeKw.frame_size,
        }
      }

      const nextHigherKw = filteredKWs.find((value: number) => value > kw)

      if (nextHigherKw) {
        // Find the frame size for the next higher `kw`
        const nextHigherKwFrame = filteredFrameSize.find((data: any) => data.kw === nextHigherKw)
        return {
          ...item,
          frameSize: nextHigherKwFrame ? nextHigherKwFrame.frame_size : "",
        }
      }

      return {
        ...item,
        frameSize: "",
      }
    })
    return calculatedData
  }
}

export const motorCanopyCalculation = async (loadListData: any) => {
  const motorCanopyListMetadata = await getData(`${MOTOR_CANOPY_METADATA}?fields=["*"]&limit=1000`)
  const calculatedData = loadListData.data.map((item: any) => {
    const kw = item.kw
    const speed = item.rpm
    const moutingType = item.mounting_type

    const filteredFrameSize = motorCanopyListMetadata.filter(
      (data: any) => data.speed === speed && data.mounting_type === moutingType
    )

    if (filteredFrameSize.length === 0) {
      return {
        ...item,
        canopy_model_number: "",
        canopy_leg_length: "",
        canopy_cut_out: "",
        part_code: "",
      }
    }

    const filteredKWs = filteredFrameSize.map((data: any) => data.kw).sort((a: any, b: any) => a - b)

    const sameSizeKw = filteredFrameSize.find((data: any) => data.kw === kw)
    if (sameSizeKw) {
      return {
        ...item,
        canopy_model_number: sameSizeKw.model,
        canopy_leg_length: sameSizeKw.leg_length,
        canopy_cut_out: sameSizeKw.cut_out,
        part_code: sameSizeKw.canopy_model_number,
      }
    }

    const nextHigherKw = filteredKWs.find((value: number) => value > kw)

    if (nextHigherKw) {
      // Find the frame size for the next higher `kw`
      const nextHigherKwFrame = filteredFrameSize.find((data: any) => data.kw === nextHigherKw)
      return {
        ...item,
        canopy_model_number: nextHigherKwFrame.model,
        canopy_leg_length: nextHigherKwFrame.leg_length,
        canopy_cut_out: nextHigherKwFrame.cut_out,
        part_code: nextHigherKwFrame.canopy_model_number,
      }
    }

    return {
      ...item,
      canopy_model_number: "",
      canopy_leg_length: "",
      canopy_cut_out: "",
      part_code: "",
    }
  })

  return calculatedData
}

const findCableHeatingUpto100M = (
  cableAsPerHeatingChart: any,
  kw: number,
  supplyVoltage: number,
  phase: string,
  starterType: string,
  cableMaterial: string,
  numberOfCores: number
) => {
  const cable = cableAsPerHeatingChart.find(
    (data: any) =>
      data.kw === kw &&
      data.voltage === supplyVoltage &&
      // data.phase === phase &&
      data.starter === starterType &&
      data.material === cableMaterial &&
      data.no_of_runs_core === `${numberOfCores}C`
  )
  return cable ? cable.size : ""
}

const findCable = (
  cableSizeData: any,
  row: any,
  layoutCableTray: any,
  division: string,
  cableAsPerHeatingChart: any
) => {
  const kw: number = +parseFloat(row.kw).toFixed(2)
  const supplyVoltage: number = row.supplyVoltage
  const appxLength: number = +parseFloat(row.appx_length).toFixed(2)
  const phase = row.phase
  const starterType = row.starterType
  const cableMaterial = row.cableMaterial
  const numberOfCores = parseFloat(row.numberOfCores.replace(/[^\d.]/g, ""))
  const numberOfRuns = parseInt(row.numberOfRuns)
  const efficiency = 0.86
  const cosPhiRunning: number = row.runningCos
  const sinPhiRunning = +Math.sqrt(1 - cosPhiRunning ** 2).toFixed(2)
  const cosPhiStarting: number = row.startingCos
  const sinPhiStarting = +Math.sqrt(1 - cosPhiStarting ** 2).toFixed(2)
  const motorRatedCurrent: number = +parseFloat(row.motorRatedCurrent).toFixed(2)
  const deratingFactor: number = +parseFloat(row.deratingFactor).toFixed(2)
  const tagNo = row.tagNo

  const perc_voltage_drop_running = +parseFloat(layoutCableTray.motor_voltage_drop_during_running).toFixed(2)
  const perc_voltage_drop_starting = +parseFloat(layoutCableTray.motor_voltage_drop_during_starting).toFixed(2)

  let motorStartingCurrent = 0

  if (starterType === "DOL") {
    motorStartingCurrent = +(motorRatedCurrent * 7.5).toFixed(2)
  } else if (starterType === "Supply Feeder") {
    motorStartingCurrent = motorRatedCurrent
  } else {
    motorStartingCurrent = +(motorRatedCurrent * 3).toFixed(2)
  }

  let finalCable = {}
  for (let cable of cableSizeData) {
    if (cable.current_air >= motorRatedCurrent && cable.number_of_core === numberOfCores) {
      const dbl_x = +parseFloat(cable.dbl_x).toFixed(2)
      const dbl_r = +parseFloat(cable.dbl_r).toFixed(2)

      const vd_run = +(
        (1.732 * motorRatedCurrent * appxLength * (cosPhiRunning * dbl_r + sinPhiRunning * dbl_x)) /
        numberOfRuns /
        1000
      ).toFixed(2)
      const vd_start = +(
        (1.732 * motorStartingCurrent * appxLength * (cosPhiStarting * dbl_r + sinPhiStarting * dbl_x)) /
        numberOfRuns /
        1000
      ).toFixed(2)

      const vd_run_percentage = +((vd_run / supplyVoltage) * 100).toFixed(2)
      const vd_start_percentage = +((vd_start / supplyVoltage) * 100).toFixed(2)
      const final_current_carrying_capacity = +(cable.current_air * deratingFactor * numberOfRuns).toFixed(2)

      if (vd_run_percentage <= perc_voltage_drop_running && vd_start_percentage <= perc_voltage_drop_starting) {
        finalCable = {
          ...cable,
          vd_run,
          vd_start,
          vd_run_percentage,
          vd_start_percentage,
          final_current_carrying_capacity,
          tagNo,
        }
        break // Stop iterating once a suitable cable is found.
      }
    }
  }
  let heating_chart_cable_size = ""
  if (division === HEATING && appxLength < 100) {
    heating_chart_cable_size = findCableHeatingUpto100M(
      cableAsPerHeatingChart,
      kw,
      supplyVoltage,
      phase,
      starterType,
      cableMaterial,
      numberOfCores
    )
  }
  return { ...finalCable, heating_chart_cable_size }
}

export const getCableSizingCalculation = async (cableScheduleData: any) => {
  const division = cableScheduleData.divisionName
  const cableScheduleRows = cableScheduleData.data
  const layoutCableTray = cableScheduleData.layoutCableTray
  const cableAsPerHeatingChart = await getData(`${CABLE_SIZE_HEATING_API}?fields=["*"]&limit=1000`)
  const cableSizingData = await getData(`${CABLE_SIZING_DATA_API}?fields=["*"]&limit=1000`)

  const copperCableSize = cableSizingData
    .filter((data: any) => data.moc === "Copper")
    .sort((a: any, b: any) => a.current_air - b.current_air)
  const aluminiumCableSize = cableSizingData
    .filter((data: any) => data.moc === "Aluminium")
    .sort((a: any, b: any) => a.current_air - b.current_air)

  const copper_conductor = +parseFloat(layoutCableTray.copper_conductor).toFixed(2)
  const aluminium_conductor = +parseFloat(layoutCableTray.aluminium_conductor).toFixed(2)

  const calculatedData = cableScheduleRows?.map((row: any) => {
    let finalCable: any = {}

    if (copper_conductor <= 4) {
      finalCable = findCable(copperCableSize, row, layoutCableTray, division, cableAsPerHeatingChart)

      if (Object.keys(finalCable).length > 0) {
        let size = finalCable.sizes
        // Handle cases with slash-separated values
        if (size && size.includes("/")) {
          size = size.split("/")[0] // Take the first part before the slash
        }

        // Convert to a number
        const sizeNumber = +parseFloat(size).toFixed(2)
        if (sizeNumber <= copper_conductor) {
          finalCable = finalCable
        } else {
          finalCable = findCable(aluminiumCableSize, row, layoutCableTray, division, cableAsPerHeatingChart)
        }
      }
    } else {
      finalCable = findCable(aluminiumCableSize, row, layoutCableTray, division, cableAsPerHeatingChart)
    }

    return { ...finalCable }
  })

  return calculatedData
}
