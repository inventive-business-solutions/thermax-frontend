"use server"

import { DB_REVISION_STATUS, HEATING, LOAD_LIST_REVISION_STATUS } from "configs/constants"
import { getData } from "./crud-actions"
import {
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  CABLE_SIZE_HEATING_API,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  HEATING_SWITCHGEAR_HEATER_API,
  MOTOR_CANOPY_METADATA,
  MOTOR_CANOPY_REVISION_HISTORY_API,
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
      if (starterType === "DOL STARTER") {
        if (supplyVoltage === 415) {
          const standardCurrent = heatingSwitchgearHeaterData.find((data: any) => data.kw === kw)
          if (standardCurrent) {
            current = standardCurrent.fla
          } else {
            current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage)
          }
        } else {
          current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage)
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
      if (starterType === "DOL STARTER") {
        if (supplyVoltage === 415) {
          const standardCurrent = heatingSwitchgearHeaterData.find((data: any) => data.kw === kw)
          if (standardCurrent) {
            current = standardCurrent.fla
          } else {
            current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage)
          }
        } else {
          current = (kw * 1000) / (Math.sqrt(3) * supplyVoltage)
        }
      } else if (phase === "3 Phase") {
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
  console.log(dbRevisionData)

  return dbRevisionData
}
export const getLatestMotorCanopyRevision = async (projectId: string) => {
  const dbRevisionData = await getData(
    `${MOTOR_CANOPY_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectId}"], ["status", "in", ["${LOAD_LIST_REVISION_STATUS.NotReleased}"]]]&fields=["*"]&order_by=creation desc`
  )
  console.log(dbRevisionData)

  return dbRevisionData
}
export const getFrameSizeCalculation = async (loadListData:any) => {
 
  const division = loadListData.divisionName
  const calcData = loadListData.data
  console.log(calcData,"calcData");
  
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
  const calculatedData = loadListData.map((item: any) => {
    const kw = item.kw
    const speed = item.speed
    const moutingType = item.mounting_type
    const frameSize = item.frame_size

    // Hit motor canopy doctype api and get all the values

    // Filter the data based on the speed, kw, mounting type and frame size

    // If the data is found, return the data

    // If the data is not found, return empty object

    return {
      ...item,
      frameSize: "",
    }
  })

  return calculatedData
}

export const getCableSizingCalculation = async (loadListData: any) => {
  const division = loadListData.divisionName
  const calcData = loadListData.data
  // Get the cable sizing data
  // e.g. const cableSizingData = await getData(`${CABLE_SIZE_API}?fields=["*"]&limit=1000`)

  // Get data from design basis via latest revision id
  // const perc_voltage_drop_running = designBasisData.perc_voltage_drop_running
  // const perc_voltage_drop_starting = designBasisData.perc_voltage_drop_starting
  // const copper_conductor = designBasisData.copper_conductor
  // const aluminium_conductor = designBasisData.aluminium_conductor

  if (division === HEATING) {
    return calcData
  }
}
