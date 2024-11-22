"use server"

import { HEATING } from "configs/constants"
import { getData } from "./crud-actions"
import { CABLE_SIZE_HEATING_API, HEATING_SWITCHGEAR_HEATER_API } from "configs/api-endpoints"

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
      current: current.toFixed(2),
    }
  })

  return calculatedData
}
